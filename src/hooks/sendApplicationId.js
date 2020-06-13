const email = require("./email");

module.exports = () => {
  return async (context) => {
    if (!context.data.action || context.data.action !== "verifyEmail") {
      return context;
    }
    if (context.result.verified && context.result.verified === true) {
      await email(
        context.result.email,
        "Indian visa application Id",
        `application id: ${context.result._id}. You should this id to resume your application `
      );
    }
  };
};
