// Initializes the `nation` service on path `/nation`
const { Nation } = require('./nation.class');
const hooks = require('./nation.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/nation', new Nation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('nation');

  service.hooks(hooks);
};
