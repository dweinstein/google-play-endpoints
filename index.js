var pluck = require('lodash.pluck');

var validator = require('./schema').validator;
var extract = require('./extract');
var extractPackages = extract.packages;

module.exports = function routes(opt) {
  opt = opt || {};
  var auth = opt.auth || false;
  var googleApi = opt.googleApi;

  if (!googleApi) {
    throw new Error('must supply google play API');
  }

  return {
    name: 'Google Play Endpoints',
    description: 'Endpoints for interacting with Google Play APIs',
    endpoints: [ {
      name: 'App Details',
      description: 'Retrieve current app details from Google.',
      method: ['GET', 'POST'],
      auth: auth,
      path: ['/google/details', '/google/details/:pkg'],
      version: '1.0.0',
      params: validator.schemas['/request/details'],
      returns: {
        200:  {
          type: 'array',
          items: {
          }
        }
      },
      fn: function (req, res, next) {
        var r = validator.validate(req.params, '/request/details');
        if (!r.valid) {
          return res.send(409, r.errors);
        }

        var pkgs = extractPackages(req.params.pkg);
        if (pkgs.length === 0) {
          res.send(409, {success: false, message: 'no pkgs supplied'});
          return next();
        }

        if (pkgs.length > 150) {
          res.send(409, {success: false, message: 'too many pkgs supplied'});
          return next();
        }

        googleApi.bulkDetails(pluck(pkgs, 'id'), function (err, details) {
          if (err) {
            res.send(501, {success: false, message: err});
            return next();
          }
          res.send(200, pluck(details, 'doc'));
        });
      }
    }, {
      name: 'App Download Info',
      description: 'Retrieve app download info.',
      method: ['GET', 'POST'],
      auth: auth,
      path: ['/google/downloadInfo', '/google/downloadInfo/:pkg'],
      version: '1.0.0',
      params: validator.schemas['/request/downloadInfo'],
      returns: {
        200:  {
          type: 'array',
          items: {
          }
        }
      },
      fn: function (req, res, next) {
        var r = validator.validate(req.params, '/request/downloadInfo');
        if (!r.valid) {
          return res.send(409, r.errors);
        }

        var pkg = extractPackages(req.params.pkg)[0];
        if (!pkg) {
          res.send(409, {success: false, message: 'no pkg supplied'});
          return next();
        }

        googleApi.downloadInfo(pkg.id, pkg.version, function (err, downloadInfo) {
          if (err) {
            res.send(500, err);
            return next();
          }
          res.send(200, downloadInfo);
        });
      }
    } ]
  };
};

