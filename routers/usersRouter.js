/*
 * Title: Project User Router
 * Description: Handling user routing
 * Author: MD ARIFUL HASAN
 * Date: 21/01/2022
 *
 */

// external imports
const express = require("express");

// internal imports
const {
  getUsers,
  addUser,
  removeUser,
  makeAdmin,
} = require("../controllers/usersController");
const { checkLogin, requireRole } = require("../middlewares/common/checkLogin");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidator");

// internal imports

const router = express.Router();

// GET: users page
router.get("/", decorateHTMLResponse("Users"), checkLogin, getUsers);

// POST: add user
router.post(
  "/",
  checkLogin,
  requireRole(["Admin"]),
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// PUT: promote admin

// PUT: demote admin
router.put("demoteadmin/:id", checkLogin, requireRole(["Admin"]));

// DELETE: remove user
router.delete("/:id", checkLogin, requireRole(["Admin"]), removeUser);

router.put("makeadmin/:id", checkLogin, makeAdmin);
// module export
module.exports = router;
