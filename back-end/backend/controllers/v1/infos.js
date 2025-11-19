const categoryModel = require("../../models/category");
const courseModel = require("../../models/course");
const userModel = require("../../models/user");
const infosModel = require("../../models/infos");
const sessionModel = require("../../models/session");
const courseUserModel = require("../../models/course-user");

exports.getIndex = async (req, res) => {
  const allInfos = await infosModel.find();
  const coursesCount = await courseModel.find().lean().count();
  const usersCount = await userModel.find().lean().count();
  const sessions = await sessionModel.find().lean();

  const totalTime = sessions.reduce(
    (prev, current) => prev + Number(current.time.slice(0, 2)),
    0
  );

  res.json({
    phone: allInfos[0].phone,
    email: allInfos[0].email,
    coursesCount,
    usersCount,
    totalTime,
  });
};

exports.getPAdmin = async (req, res) => {
  try {
    // 1) پیدا کردن ادمین
    const admin = await userModel.findById(req.user._id).select("name");

    // 2) تعداد کل ثبت‌نامی‌ها
    const coursesRegistersCount = await courseUserModel.countDocuments();

    // 3) تعداد دوره‌ها
    const coursesCount = await courseModel.countDocuments();

    // 4) تعداد جلسات
    const sessionsCount = await sessionModel.countDocuments();

    // 5) آخرین 5 کاربر ثبت‌نام‌شده
    const lastUsers = await userModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email username phone createdAt");

    res.status(200).json({
      adminName: admin.name,

      infos: [
        {
          title: "ثبت نامی‌ها",
          count: coursesRegistersCount,
        },
        {
          title: "دوره‌ها",
          count: coursesCount,
        },
        {
          title: "جلسات",
          count: sessionsCount,
        },
      ],

      lastUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "خطا در دریافت اطلاعات پنل ادمین" });
  }
};

