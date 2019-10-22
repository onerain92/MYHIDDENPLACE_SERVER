const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isSignedIn, isNotSignedIn } = require("./middleware/authorization");
const User = require("../models/User");

router.post("/signup", async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ errorMessage: "이미 가입된 회원입니다." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hash,
      username
    });

    return res.status(200).send({ successMessage: "회원 가입 완료." });
  } catch (err) {
    console.error(err);
    return next(error);
  }
});

router.post("/signin", isNotSignedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return res.status(500).send({ signinErrorMessage: authError });
    }

    if (!user) {
      console.log("/signin user", user);
      return res.status(401).send({ signinErrorMessage: info.message });
    }

    return req.logIn(user, loginError => {
      if (loginError) {
        console.error(loginError);
        return res.status(401).send({ signinErrorMessage: loginError.message });
      }

      return res
        .status(200)
        .send({
          user: {
            id: req.user._id,
            username: req.user.username,
            favorite: req.user.favorite
          },
          isAuthenticated: true
        });
    });
  })(req, res, next);
});

router.post("/signout", isSignedIn, (req, res) => {
  req.logOut();
  req.session.destroy();
  res.status(200).send({ isAuthenticated: false });
});

module.exports = router;
