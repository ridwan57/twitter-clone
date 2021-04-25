import User from "../models/User";

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

export const registerCredentials = async (req, res, next) => {
  // console.log("req.body:", req.body);
  let { firstName, lastName, username, email, password } = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();
  username = username.trim();
  email = email.trim();
  let payload = req.body;
  if (!firstName || !lastName || !username || !email || !password) {
    payload.errorMessage = " Fillup all value";
    res.render("register", payload);
  }

  const found = await User.findOne({
    $or: [{ username, email }],
  }).catch(() => {
    payload.errorMessage = "User Searching Database Error ";
    res.render("register", payload);
  });
  console.log("found:", found);
  if (found) {
    payload.errorMessage = ` ${
      email === found.email ? "email" : "username"
    } already in use`;
    res.render("register", payload);
  }
  const newUser = await User.create(req.body).catch(() => {
    payload.errorMessage = "Creating User Database Error ";
    res.render("register", payload);
  });

  payload.errorMessage = `Created User ${newUser}`;
  res.render("register", payload);
};
