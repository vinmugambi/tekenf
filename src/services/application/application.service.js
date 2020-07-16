// Initializes the `visa` service on path `/visa`
const {Application } = require("./application.class");
const createModel = require("../../models/application.model");
const hooks = require("./application.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/application", new Application(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("application");

  service.hooks(hooks);
};
