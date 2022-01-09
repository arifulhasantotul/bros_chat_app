// external imports
const createError = require("http-errors");

// internal imports
const User = require("../models/People");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const escape = require("../utilities/escape");

// get inbox page
async function getInbox(req, res, next) {
  try {
    const conversations = await Conversation.find({
      $or: [
        { creator_id: req.user.userId },
        { participant_id: req.params.userId },
      ],
    });

    res.local.data = conversations;
    res.render("inbox");
  } catch (err) {
    next(err);
  }
}

// module exports
module.exports = {};
