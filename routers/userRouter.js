import express from "express";
import { getAuthenticatedUser, userRegister } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { logout } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth.js";

let router = express.Router()

router.route("/userRegister").post(userRegister)
router.route("/userLogin").post(login)
router.route("/userLogout").get(isAuthenticated, logout)
router.route("/getUser").get(isAuthenticated, getAuthenticatedUser)

export default router