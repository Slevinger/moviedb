exports.meta = function() {
  return {
    user: {
      //_id:null,
      email: null,
      password: null,
      permissions: "user",
      favorites: [],
      timestamp: new Date().getTime()
    }
  };
};
