// external imports
const express = require("express");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const { getLogin, login, logout } = require("../controllers/loginController");

// internal imports

const router = express.Router();

// set page title
const page_title = "Login";

// login page
router.get("/", decorateHTMLResponse("login"), getLogin);

// module export
module.exports = router;
