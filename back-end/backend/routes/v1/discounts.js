const express = require("express");
const router = express.Router();
const discountController = require("../../controllers/v1/discountController");
const { verifyToken, isAdmin } = require("../../middlewares/auth");

// فقط ادمین بتواند کد تخفیف بسازد یا حذف کند
router.post("/", verifyToken, isAdmin, discountController.createDiscount);
router.get("/", verifyToken, isAdmin, discountController.getAllDiscounts);
router.delete("/:id", verifyToken, isAdmin, discountController.deleteDiscount);

module.exports = router;
