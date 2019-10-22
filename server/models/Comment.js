const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const commentSchema = new mongoose.Schema({
  place: {
    type: ObjectId,
    ref: "Place",
    required: true
  },
  created_by: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  comment_text: {
    type: String,
    required: true
  },
  evaluation: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Comment", commentSchema);
