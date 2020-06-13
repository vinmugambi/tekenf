const { Service } = require("feathers-nedb");

exports.Verify = class Verify extends Service {
  static options() {
    return {
      maxAge: 480000,
      maxRequest: 3,
      maxAttempts: 3,
    };
  }

  async create(data, params) {
    const verifyToken = 100000 + Math.floor(Math.random() * 900000);
    data = {
      ...data,
      verifyToken,
      invalid: false,
      attempted: 0,
      createdAt: Date.now(),
      requested: 1,
    };

    return super.create(data, params);
  }

  async patch(id, data, params) {
    if (data.attempted && data.attempted === Verify.options().maxAttempts) {
      data = { ...data, invalid: true };
    }
    return super.patch(id, data, params);
  }
};
