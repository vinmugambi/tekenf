const crypto = require("crypto");

const iv = Buffer.alloc(16, 0);
const pass = process.env.PASS || "MMska08ndaa90()8sdh";
const password = crypto.scryptSync(pass, "salt", 24);

function encrypt(text){
  let cipher = crypto.createCipheriv("aes-192-cbc", password, iv);
  let encodedText = cipher.update(text, "utf8", "hex");
  encodedText += cipher.final("hex");
  return encodedText;
}
exports.decrypt= function (encrypted){
  let decipher = crypto.createDecipheriv("aes-192-cbc", password, iv);
  let clearText = decipher.update(encrypted,"hex","utf8");
  clearText+=decipher.final("utf8");
  return clearText;
};


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

exports.getTokenLink = function (token, email, app) {
  const host = app.get("host");
  const port = app.get("client") || null;
  const encryptedEmail=encrypt(email);

  return port
    ? `http://${host}:${port}/magic?token=${token}&acc=${encryptedEmail}`
    : `https://${host}/magic?token=${token}&acc=${encryptedEmail}`;
};
