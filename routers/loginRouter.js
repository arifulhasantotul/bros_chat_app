// external imports
const express = require("express");

// internal imports
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const { getLogin, login, logout } = require("../controllers/loginController");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");

const router = express.Router();

// set page title
const page_title = "Login";

// login page
router.get("/", decorateHTMLResponse(page_title), redirectLoggedIn, getLogin);

// process login
router.post(
  "/",
  decorateHTMLResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

// logout
router.delete("/", logout);

// module export
module.exports = router;
