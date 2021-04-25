import express from "express";
import { home, login } from "../controller/authController";
import { requireLogin } from "../middlewares";
const router = express.Router();

router.get("/", requireLogin, home);
router.get("/login", login);

module.exports = router;
