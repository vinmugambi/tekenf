module.exports = function (options = {}) {
  return async (context) => {
    const { params } = context;
    if (params.provider && !params.authentication) {
      context.params = {
        ...params,
        authentication: { strategy: "anonymous" },
      };
    }

    return context;
  };
};
