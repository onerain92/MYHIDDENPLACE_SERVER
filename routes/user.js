const express = require("express");
const router = express.Router();
const { isSignedIn } = require("./middleware/authorization");
const userController = require("./controllers/user.controller");

router.get("/", isSignedIn, userController.getUser);
router.put("/:place_id", userController.addFavorite);
router.put("/remove/:place_id", userController.removeFavorite);

module.exports = router;
