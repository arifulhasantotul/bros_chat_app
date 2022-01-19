// external imports
const express = require("express");

// internal imports
const {
  getInbox,
  searchUser,
  addConversation,
  sendMessage,
  getMessages,
} = require("../controllers/inboxController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const attachmentUpload = require("../middlewares/Inbox/attachmentUpload");

const router = express.Router();

// inbox page
router.get("/", decorateHTMLResponse("Inbox"), getInbox);

// search user for conversation
router.post("/search", checkLogin, searchUser);

// add conversation
router.post("/conversation", checkLogin, addConversation);

// get messages of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessages);

// send message
router.post("/message", checkLogin, attachmentUpload, sendMessage);

// module export
module.exports = router;
