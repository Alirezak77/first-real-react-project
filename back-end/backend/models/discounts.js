const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  percent: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  maxUsage: {
    type: Number,
    required: true,
    default: 1,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const discountModel = mongoose.model("Discount", discountSchema);
module.exports = discountModel;
