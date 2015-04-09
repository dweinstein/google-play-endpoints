var assert = require('assert');

var flatten = require('lodash.flatten');

module.exports = (function() {

  function strToObj(str) {
    // 'foo'     => [{ id: 'foo' }]
    // 'foo:123' => [{ id: 'foo', version: 123 }]
    // 'foo:123,bar:456' => [{ id: 'foo', version: 123 }, { id: 'bar', version: 456 }]
    return str.replace(/ /g,'').split(',').map(function (str) {
      var split = str.split(':');
      var pkg = split[0];
      var vc = split[1];
      var ret = { id: pkg };
      if (vc) { ret.version = Number(vc); }
      return ret;
    });
  }

  function toPkgObj(thing) {
    if (typeof thing === 'string') {
      return strToObj(thing);
    } else if (Array.isArray(thing)) {
      return flatten(thing.map(toPkgObj));
    } else if (typeof thing === 'object') {
      return thing;
    } else {
      return [];
    }
  }

  function extractPackages(pkgs) {
    pkgs = [].concat(toPkgObj(pkgs));
    return pkgs;
  }

  return {
    packages: extractPackages
  };

})();

