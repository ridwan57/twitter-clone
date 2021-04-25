import express from "express";
import {
  home,
  login,
  register,
  registerCredentials,
  loginCredentials,
} from "../controller/authController";
import { requireLogin } from "../middlewares";
const router = express.Router();

router.get("/", requireLogin, home);
router.get("/login", login);
router.post("/login", loginCredentials);
router.get("/register", register);
router.post("/register", registerCredentials);

module.exports = router;
