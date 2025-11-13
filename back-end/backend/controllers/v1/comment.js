const commentModel = require("../../models/comment");
const userModel = require("../../models/user");
const courseModel = require("../../models/course");

exports.create = async (req, res) => {
  const { body, courseShortName } = req.body;

  const course = await courseModel.findOne({ shortName: courseShortName });

  const comment = await commentModel.create({
    body,
    course: course._id,
    creator: req.user._id,
  });

  return res.status(201).json(comment);
};
exports.getAll = async (req, res) => {
  try {
    const comments = await commentModel
      .find({})
      .populate("creator", "name")   // نمایش نام کاربر
      .populate("course", "title shortName") // نمایش اطلاعات دوره
      .sort({ createdAt: -1 }); // جدیدترین کامنت‌ها بالا باشند

    return res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // چک کن کامنت وجود داشته باشه
    const comment = await commentModel.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // حذف کامنت از دیتابیس
    await commentModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// exports.getAll = async (req, res) => {
//   const courses = await courseModel.find().populate("creator", "-password");

//   return res.json(courses);
// };
