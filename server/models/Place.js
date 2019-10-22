const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  created_by: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  created_at: {
    type: Date
  },
  place_picture: [
    {
      type: String,
      required: true
    }
  ],
  description: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  tag: [
    {
      type: ObjectId,
      ref: "Tag"
    }
  ]
});

placeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Place", placeSchema);
