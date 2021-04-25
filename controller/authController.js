import User from "../models/User";
import bcrypt from "bcrypt";

export const home = (req, res, next) => {
  const payload = { userLoggedIn: req.session.user, pageTitle: "Home" };
  console.log("req.session.user:", req.session.user);
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

export const loginCredentials = async (req, res, next) => {
  let payload = req.body;
  const { logUsername, logPassword } = req.body;

  if (!logUsername || !logPassword) {
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("login");
  }

  let user = await User.findOne({
    $or: [{ username: logUsername }, { email: logUsername }],
  }).catch((error) => {
    console.log(error);
    payload.errorMessage = "Something went wrong.";
    res.status(200).render("login", payload);
  });

  if (user === null) {
    payload.errorMessage = "Login credentials incorrect.";
    return res.status(200).render("login", payload);
  }

  let result = await bcrypt.compare(logPassword, user.password);
  if (result) {
    req.session.user = user;
    return res.redirect("/");
  } else {
    payload.errorMessage = "Wrong password.";
    return res.status(200).render("login", payload);
  }
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
  let data = req.body;
  data.password = await bcrypt.hash(data.password, 10);
  const newUser = await User.create(data).catch(() => {
    payload.errorMessage = "Creating User Database Error ";
    req.session.user = newUser;
    res.render("register", payload);
    // res.status(200).redirect("/");
  });

  req.session.user = newUser;
  // res.render("register", payload);
  res.status(200).redirect("/");
};

export const logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  } else {
    ress.redirect("/login");
  }
};
