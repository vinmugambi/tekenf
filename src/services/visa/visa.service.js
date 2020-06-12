// Initializes the `visa` service on path `/visa`
const { Visa } = require('./visa.class');
const createModel = require('../../models/visa.model');
const hooks = require('./visa.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/visa', new Visa(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('visa');

  service.hooks(hooks);
};
