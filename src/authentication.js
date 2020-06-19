const {
  AuthenticationService,
  JWTStrategy,
  AuthenticationBaseStrategy,
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const Joi = require("@hapi/joi");
const { BadRequest } = require("@feathersjs/errors");
const { getLongToken } = require("./hooks/tokens");

class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication, params) {
    Object.keys(authentication).forEach((key) =>
      console.log(key + " = " + authentication[key])
    );
    Object.keys(params).forEach((key) =>
      console.log(key + " = " + params[key])
    );
    console.log(this.configration);
    // Object.keys(this.configuration).forEach(key=> console.log(key+" = "+this.configuration[key]));

    return {
      anonymous: true,
    };
  }
}

class NoPasswordStrategy extends LocalStrategy {
  async authenticate(authentication, params) {
    console.log(authentication, params, this.configuration);

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
        async (context) => {
          if (context.data.action && context.data.action.trim() === "sendMagicLink") {
            if (!context.data.email) {
              throw new BadRequest("Email must be provided");
            }
            const validateEmail = Joi.string().email({ minDomainSegments: 2 });
            const { error, value } = await validateEmail.validate(
              context.data.email.trim()
            );
            if (error) {
              throw new BadRequest("Email is invalid");
            }

            let token = await getLongToken(16).catch((err) => console.error(err));
            console.log(token+"---token---");
            try {
              const { data } = await context
                .app.service("users")
                .find({ query: { email: value } })
                .catch((err) => console.error(err));
              console.log(data+"---data---");
              if (data && data.length == 1) {
                await context.app
                  .service("users")
                  .patch(data[0]._id, { magic: token });
              } else {
                await context
                  .app.service("users")
                  .create({ email: value, magic: token });
              }
            } catch (err) {
              console.error(err);
            } 
            // finally {
            //   app
            //     .service("mailer")
            //     .create({
            //       from: "ford20@ethereal.com",
            //       to: value,
            //       subject: "Magin login link",
            //     });
            // }

            context.result = "magic";
          }
          return context;
        },
      ],
    },
  });
};
