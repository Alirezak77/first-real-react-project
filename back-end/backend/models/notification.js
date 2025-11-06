const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Notification", schema);

module.exports = model;
