var express = require("express");
var router = express.Router();
const { isSignedIn } = require("./middleware/authorization");

router.get("/", isSignedIn, (req, res, next) => {
  if (req.user) {
    return res.status(200).send({
      user: {
        id: req.user._id,
        username: req.user.username,
        favorite: req.user.favorite
      },
      isAuthenticated: true
    });
  }
});

module.exports = router;
