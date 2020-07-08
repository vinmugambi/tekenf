const users = require("./users/users.service.js");
const visa = require("./visa/visa.service.js");
const mailer = require("./mailer/mailer.service.js");
const files = require("./files/files.service.js");
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(visa);
  app.configure(mailer);
  app.configure(files);
};
