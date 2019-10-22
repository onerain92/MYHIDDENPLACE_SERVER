const express = require("express");
const router = express.Router();
const { isSignedIn } = require("./middleware/authorization");
const User = require("../models/User");

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

router.put("/favorite", async (req, res, next) => {
  const placeId = req.body.placeId;

  const favoriteList = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { "$push": { "favorite": placeId } },
    { "upsert": true }
  ).select("-_id favorite");

  console.log(favoriteList);
});

module.exports = router;
