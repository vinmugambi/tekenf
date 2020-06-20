const crypto = require("crypto");

var _randomBytes = function _randomBytes(len) {
  return new Promise(function (resolve, reject) {
    crypto.randomBytes(len, function (err, buf) {
      return err ? reject(err) : resolve(buf.toString("hex"));
    });
  });
};

exports.getLongToken = function (len) {
  return _randomBytes(len);
};

exports.getTokenLink= function (token, app){
  const host= app.get("host");
  const port=app.get("port") || null;
  return port ?`http://${host}:${port}/magic?token=${token}`: `https://${host}/magic?token=${token}`;
};