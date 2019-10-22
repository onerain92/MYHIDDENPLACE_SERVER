const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const commentSchema = new mongoose.Schema({
  created_by: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  created_at: {
    type: Date,
  },
  comment_text: {
    type: String
  },
  evaluation: {
    type: Number
  }
});

module.exports = mongoose.model("Comment", commentSchema);
