const express = require("express");
const router = express.Router();
const commentController = require("./controllers/comment.controller");

router.post("/", commentController.createComment);
router.get("/:place_id", commentController.getComment);

module.exports = router;
