const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");

router.post("/", async (req, res, next) => {
  const { placeId, text, score } = req.body;

  await Comment.create({
    place: placeId,
    created_by: req.user,
    created_at: new Date(),
    comment_text: text,
    evaluation: score
  });

  return res.status(200).send({ successCommentMessage: "댓글 생성 완료" });
});

router.get("/:place_id", async (req, res, next) => {
  try {
    const placeId = req.params.place_id;
    const comments = await Comment.find({ place: placeId });
    const commentsInfo = await Promise.all(
      comments.map(async comment => {
        const commentDoc = JSON.parse(JSON.stringify(comment._doc));
        const createUser = await User.findById(commentDoc.created_by);

        commentDoc.created_by = createUser.username;

        return commentDoc;
      })
    );

    if (commentsInfo.length === 0) {
      return res.status(400).send({ commentErrorMessage: "댓글이 없습니다." });
    }

    const initialValue = 0;
    const sum = commentsInfo.reduce(
      (accumulator, currentValue) => accumulator + currentValue.evaluation,
      initialValue
    );
    const avgScore = Number(sum / commentsInfo.length).toFixed(1);

    return res.status(200).send({ comments: commentsInfo, avgScore });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ commentErrorMessage: "댓글을 찾지 못했습니다." });
  }
});

module.exports = router;
