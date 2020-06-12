const Joi = require("@hapi/joi");

// Create a joi validation schema
const application = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});
//  Trim data to avoid unexpected validation errors
const trimmed = (data) => {
  let clean = {};
  Object.keys(data).forEach((key) => (clean[key] = data[key].trim()));
  return clean;
};

module.exports = (options = {}) => {
  return async (context) => {
    const { error, value } = application.validate(trimmed(context.data));
    if (error) {
      throw new Error(error);
    }
    context.data = {
      ...value,
      verified: false,
      createdAt: Date.now(),
    };
    return context;
  };
};
