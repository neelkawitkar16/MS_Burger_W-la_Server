import express from "express";
import passport from "passport";
import { getAdminAllUsers, getAdminStats, logout, myProfile } from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.get( "/googlelogin", passport.authenticate("google", { scope: ["profile"]}) )

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
  })
);

router.get("/me", isAuthenticated, myProfile)

router.get("/logout", logout)

// Admin route
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminAllUsers)

router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats)

export default router