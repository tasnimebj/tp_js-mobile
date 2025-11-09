import express from "express";
import passport from "passport";
import { User } from "../models/User.js";

const router = express.Router();

router.get("/register", (req, res) => res.render("register"));
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  await User.create({ email, password });
  res.redirect("/login");
});

router.get("/login", (req, res) => res.render("login"));
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => res.redirect("/books")
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

export default router;
