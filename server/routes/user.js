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

router.put("/:place_id", async (req, res, next) => {
  const placeId = req.params.place_id;

  const favoriteList = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { favorite: placeId } },
    { new: true, upsert: true }
  ).select("-_id favorite");

  return res.status(200).send({ favoriteList });
});

router.put("/remove/:place_id", async (req, res, next) => {
  const placeId = req.params.place_id;

  const favoriteList = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $pull: { favorite: placeId } },
    { new: true }
  ).select("-_id favorite");

  return res.status(200).send({ favoriteList });
});

module.exports = router;
