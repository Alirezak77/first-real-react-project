const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course"
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isApproved: { type: Boolean, default: false } // تایید یا رد

  },
  { timestamps: true }
);

const model = mongoose.model("Comment", schema);

module.exports = model;
