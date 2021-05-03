const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsyncs = require("../utils/catchAsyncs");
const passport = require("passport");
const users = require("../controllers/users");

// register a user
router
  .route("/register")
  .get(catchAsyncs(users.renderRegister))
  .post(catchAsyncs(users.register));

// login
router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

// logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
});
module.exports = router;
