import express from "express";
import { home, login, register } from "../controller/authController";
import { requireLogin } from "../middlewares";
const router = express.Router();

router.get("/", requireLogin, home);
router.get("/login", login);
router.get("/register", register);

module.exports = router;
