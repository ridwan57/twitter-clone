export const home = (req, res, next) => {
  const payload = {
    userLoggedIn: {
      firstName: "New title",
    },
  };
  res.render("home", payload);
};

export const login = (req, res, next) => {
  const payload = {
    userLoggedIn: {
      firstName: "New title",
    },
  };
  res.render("login", payload);
};

export const register = (req, res, next) => {
  const payload = {
    userLoggedIn: {
      firstName: "New title",
    },
  };
  res.render("register", payload);
};
