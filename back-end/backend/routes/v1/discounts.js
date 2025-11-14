const express = require("express");
const discountController = require("../../controllers/v1/discounts");
const authenticatedMiddleware = require("../../middlewares/authenticated");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const router = express.Router();

// فقط ادمین بتواند کد تخفیف بسازد یا حذف کند
router
  .route("/")
  .post(
    authenticatedMiddleware,
    isAdminMiddleware,
    discountController.createDiscount
  )
  .get(
    authenticatedMiddleware,
    isAdminMiddleware,
    discountController.getAllDiscounts
  );

router
  .route("/:id")
  .delete(
    authenticatedMiddleware,
    isAdminMiddleware,
    discountController.deleteDiscount
  );

module.exports = router;
