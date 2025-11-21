const express = require("express");

const userController = require("../../controllers/v1/user");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const isAuthenticated = require("./../../middlewares/authenticated");

const router = express.Router();


router
  .route("/")

  .get(isAuthenticated, isAdminMiddleware, userController.getAll);

router
  .route("/:id")
  .delete(isAuthenticated, isAdminMiddleware, userController.removeUser);

  router
  .route("/ban/:id")
  .put(isAuthenticated, isAdminMiddleware, userController.banUser);

  module.exports = router;