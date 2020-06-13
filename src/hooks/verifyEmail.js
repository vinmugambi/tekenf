const Joi = require("@hapi/joi");
const { Unprocessable } = require("@feathersjs/errors");
// Create a joi validation schema
const typeToken = Joi.number().integer().min(100000).max(999999).required();

module.exports = () => {
  return async (context) => {
    if (!context.data.action || context.data.action !== "verifyEmail") {
      return context;
    }
    const verifyToken = context.data.verifyToken.trim();
    const { error } = typeToken.validate(verifyToken);
    if (error) {
      context.result = new Unprocessable("Validation error " + error);
    }
    let token;
    const verifyService = context.app.service("verify");
    try {
      const { data } = await verifyService.find({
        query: { visa: context.id },
      });

      token = data[0];
    } catch (error) {
      context.result = new Unprocessable(
        "No verification token found. Request a new one"
      );
      return context;
    }

    if (!token) {
      throw new Error("Token is not found");
    }

    if (token.invalid === true) {
      if (token.expired === true) {
        context.result = new Unprocessable("Verification token is expired");
      } else {
        context.result = new Unprocessable("Verification token is invalid");
      }
      return context;
    }
    let matches = token.verifyToken.toString() === verifyToken;
    if (matches) {
      let { invalid } = await verifyService.patch(token._id, { used: true });
      if (invalid === true) {
        context.result = new Unprocessable(
          "Verification token is expired. Request a new one"
        );
        return context;
      }
      context.data = { verified: true };
    } else {
      let { invalid } = await verifyService.patch(token._id, {
        attempted: token.attempted + 1,
      });
      if (invalid === true) {
        context.result = new Unprocessable(
          "You have reached the maximum attempts. Request a new token"
        );
        return context;
      }
      context.result = new Unprocessable("Verification token did not match");
    }
    return context;
  };
};
