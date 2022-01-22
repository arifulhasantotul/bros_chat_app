// external imports
const express = require("express");

// internal imports
const { getUsers, addUser } = require("../controllers/usersController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidator");

// internal imports

const router = express.Router();

// users page
router.get("/", decorateHTMLResponse("Users"), getUsers);

// add user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// module export
module.exports = router;
