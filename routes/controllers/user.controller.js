const User = require("../../models/User");

exports.getUser = (req, res, next) => {
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
};

exports.addFavorite = async (req, res, next) => {
  const placeId = req.params.place_id;

  const favoriteList = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { favorite: placeId } },
    { new: true, upsert: true }
  ).select("-_id favorite");

  return res.status(200).send({ favoriteList });
};

exports.removeFavorite = async (req, res, next) => {
  const placeId = req.params.place_id;

  const favoriteList = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $pull: { favorite: placeId } },
    { new: true }
  ).select("-_id favorite");

  return res.status(200).send({ favoriteList });
};
