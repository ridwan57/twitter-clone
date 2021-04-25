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
export const registerCredentials = (req, res, next) => {
  console.log("req.body:", req.body);
  let { firstName, lastName, username, email, password } = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();
  username = username.trim();
  email = email.trim();
  let payload = req.body;
  if (firstName && lastName && username && email && password) {
    payload.errorMessage = "Something went wrong.";
  } else {
    payload.errorMessage = " Fillup all value";
    res.render("register", payload);
  }
  const payload = {
    userLoggedIn: {
      firstName: "New title",
    },
  };
};
