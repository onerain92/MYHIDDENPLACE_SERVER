const express = require("express");
const router = express.Router();
const { isSignedIn, isNotSignedIn } = require("./middleware/authorization");
const authController = require("./controllers/auth.controller");

router.post("/signup", authController.executeSignUp);
router.post("/signin", isNotSignedIn, authController.executeSignIn);
router.post("/signout", isSignedIn, authController.executeSignOut);

module.exports = router;
