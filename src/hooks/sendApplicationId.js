module.exports = () => {
  return async (context) => {
    if (!context.data.action || context.data.action !== "verifyEmail") {
      return context;
    }
    if (context.result.verified && context.result.verified === true) {
      context.app.service("mailer").create({
        to: context.result.email,
        from: "ford20@ethereal.com",
        subject: "Indian visa application Id",
        text: `application id: ${context.result._id}. You should this id to resume your application `,
      });
    }
  };
};
