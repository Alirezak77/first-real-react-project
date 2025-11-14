const discountModel = require("../../models/discounts");
const courseModel = require("../../models/course");

exports.createDiscount = async (req, res) => {
  try {
    const { code, percent, maxUsage, courseId } = req.body;

    if (!code || !percent || !maxUsage || !courseId) {
      return res.status(400).json({ message: "همه فیلدها الزامی هستند" });
    }

    // پیدا کردن دوره با ID
    const courseDoc = await courseModel.findById(courseId);
    if (!courseDoc) {
      return res.status(404).json({ message: "دوره پیدا نشد" });
    }

    const newDiscount = await discountModel.create({
      code,
      percent,
      maxUsage,
      course: courseDoc._id,
    });

    res.status(201).json({
      message: "کد تخفیف با موفقیت ایجاد شد",
      newDiscount,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در ایجاد کد تخفیف" });
  }
};
