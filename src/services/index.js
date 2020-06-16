const users = require("./users/users.service.js");
const visa = require("./visa/visa.service.js");
const verify = require("./verify/verify.service.js");
const mailer = require("./mailer/mailer.service.js");
const authmanager = require('./authmanager/authmanager.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(visa);
  app.configure(verify);
  app.configure(mailer);
  app.configure(authmanager);
};
