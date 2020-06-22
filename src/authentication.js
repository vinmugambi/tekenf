const {
  AuthenticationService,
  JWTStrategy,
  AuthenticationBaseStrategy,
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const sendMagicLink = require("./hooks/sendMagicLink");
const omit = require("lodash/omit");

class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication, params) {
    return {
      anonymous: true,
    };
  }
}

class MagicLinkStrategy extends LocalStrategy {
  async authenticate (data, params) {
    const { passwordField, usernameField, entity } = this.configuration;
    const username = data[usernameField];
    const password = data[passwordField];
    const result = await this.findEntity(username, omit(params, "provider"));

    const user =await this.getEntity(result, params).catch(err=> {throw new Error("User not found", err);});
    if (user) {
      await this.app.service("users").patch(user._id, {magic: null}).catch(err=> {throw new Error("Unable to null magic", err);});
    }
    await this.comparePassword(result, password);

    return {
      authentication: { strategy: this.name },
      [entity]: user
    };
  }
}

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());
  authentication.register("anonymous", new AnonymousStrategy());
  authentication.register("link", new MagicLinkStrategy());

  app.use("/authentication", authentication);
  app.configure(expressOauth());

  const auth = app.service("authentication");

  auth.hooks({
    before: {
      create: [sendMagicLink()],
    }
  });
};
