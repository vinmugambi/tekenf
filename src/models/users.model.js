const NeDB = require("nedb");
const path = require("path");

module.exports = function (app) {
  const dbPath = app.get("nedb");
  let Model;
  try {
    Model = new NeDB({
      filename: path.join(dbPath, "users.db"),
      autoload: true,
    });
  } catch (error) {
    throw new Error("Already exist");
  }

  Model.ensureIndex({ fieldName: "email", unique: true });

  return Model;
};
