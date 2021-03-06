const users = require("./users/users.service.js");
const visa = require("./visa/visa.service.js");
const mailer = require("./mailer/mailer.service.js");
const files = require("./files/files.service.js");
const application = require('./application/application.service.js');
const nation = require('./nation/nation.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(visa);
  app.configure(mailer);
  app.configure(files);
  app.configure(application);
  app.configure(nation);
};
