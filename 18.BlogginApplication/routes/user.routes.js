import Router from "express";
import {
  signupController,
  signinController,
  logoutController,
} from "../contollers/user.controller.js";

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.post("/signup", signupController);
router.post("/signin", signinController);
router.get("/logout", logoutController);

export default router;
