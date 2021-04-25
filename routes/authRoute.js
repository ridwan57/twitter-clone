import express from "express";
import {
  home,
  login,
  register,
  registerCredentials,
} from "../controller/authController";
import { requireLogin } from "../middlewares";
const router = express.Router();

router.get("/", requireLogin, home);
router.get("/login", login);
router.get("/register", register);
router.post("/register", registerCredentials);

module.exports = router;
