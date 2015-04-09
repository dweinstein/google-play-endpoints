var Validator = require('jsonschema').Validator;

module.exports = (function() {
  var validator = new Validator();
  var models = [require('./types'), require('./requests')];

  for (var key in models) {
    if (models.hasOwnProperty(key)) {
      var model = models[key];

      for (var name in model) {
        if (model.hasOwnProperty(name)) {
          validator.addSchema(model[name], model[name].id);
        }
      }
    }
  }

  return {
    types: require('./types'),
    requests: require('./requests'),
    models: models,
    validator: validator
  };
})();
