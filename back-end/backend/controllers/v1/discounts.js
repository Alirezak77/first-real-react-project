const discountModel = require("./../../models/discounts");
const courseModel = require("./../../models/course");

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

exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await discountModel
      .find({})
      .populate("course", "name shortName");

    res.status(200).json(discounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در دریافت کدهای تخفیف" });
  }
};

exports.deleteDiscount = async (req, res) => {
  try {
    const discountId = req.params.id;
    const discount = await discountModel.findByIdAndDelete(discountId);

    if (!discount) {
      return res.status(404).json({ message: "کد تخفیف یافت نشد" });
    }

    res.status(200).json({ message: "کد تخفیف با موفقیت حذف شد" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در حذف کد تخفیف" });
  }
};
