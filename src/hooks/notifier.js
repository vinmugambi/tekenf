module.exports = function configureNotifier (app) {
  const FROM_EMAIL = "ford20@ethereal.com";

  function getLink(type, hash) {
    const url = "http://localhost:3030/" + type + "?token=" + hash;
    return url;
  }

  async function sendEmail(email) {
    try {
      await app.service("mailer").create(email);
    } catch (error) {
      console.log("Error sending email", error);
    }
  }

  return {
    notifier: function (type, user) {
      let tokenLink;
      let email;
      switch (type) {
      case "resendVerifySignup": //sending the user the verification email
        tokenLink = getLink("verifies", user.verifyToken);
        email = {
          from: FROM_EMAIL,
          to: user.email,
          subject: "Verify Signup",
          html: tokenLink,
        };
        return sendEmail(email);

      case "verifySignup": // confirming verification
        tokenLink = getLink("verify", user.verifyToken);
        email = {
          from: FROM_EMAIL,
          to: user.email,
          subject: "Confirm Signup",
          html: "Thanks for verifying your email",
        };
        return sendEmail(email);

      case "sendResetPwd":
        tokenLink = getLink("reset", user.resetToken);
        return sendEmail({
          to: user.email,
          from: FROM_EMAIL,
          subject: "Sign in",
          template: "signIn",
          html: tokenLink,
        });

      case "resetPwd":
        tokenLink = getLink("reset", user.resetToken);
        return sendEmail({
          to: user.email,
          from: FROM_EMAIL,
          subject: "password has reset",
          html:"Password has been reset"
        });


      case "passwordChange":
        email = {};
        return sendEmail(email);

      case "identityChange":
        tokenLink = getLink("verifyChanges", user.verifyToken);
        email = {};
        return sendEmail(email);

      default:
        break;
      }
    },
  };
};
