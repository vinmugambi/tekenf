const {
  AuthenticationService,
  JWTStrategy,
  AuthenticationBaseStrategy,
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const sendMagicLink = require("./hooks/sendMagicLink");


class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication, params) {
    return {
      anonymous: true,
    };
  }
}

class NoPasswordStrategy extends LocalStrategy {
  async authenticate(authentication, params) {
    return {
      magic: true,
    };
  }
}

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());
  authentication.register("anonymous", new AnonymousStrategy());
  authentication.register("magic", new NoPasswordStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());
  const auth = app.service("authentication");

  auth.hooks({
    before: {
      create: [
        sendMagicLink()
      ],
    },
  });
};
