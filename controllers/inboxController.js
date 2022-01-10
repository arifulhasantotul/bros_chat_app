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
        { "conversation.id": req.user.userId },
        { "participant.id": req.user.userId },
      ],
    });

    // setting conversation data to res.local
    res.locals.data = conversations;

    // render inbox page
    res.render("inbox");
  } catch (err) {
    next(err);
  }
}

// search user
async function searchUser(req, res, next) {
  const user = req.body.user;
  const searchQuery = user.replace("+88", "");

  // using regex to create filter option
  const name_search_regex = new RegExp(escape(searchQuery), "i");
  const mobile_search_regex = new RegExp("^" + escape("+88" + searchQuery));
  const email_search_regex = new RegExp("^" + escape(searchQuery) + "$", "i");

  try {
    if (searchQuery !== "") {
      const users = await User.find(
        {
          $or: [
            {
              name: name_search_regex,
            },
            {
              email: email_search_regex,
            },
            {
              mobile: mobile_search_regex,
            },
          ],
        },
        "name avatar"
      );
      res.json(users);
    } else {
      throw createError("Please provide me some text to search!");
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// add conversation
async function addConversation(req, res, next) {
  try {
    const newConversation = new Conversation({
      creator: {
        id: req.user.userId,
        name: req.user.username,
        avatar: req.user.avatar || null,
      },
      participant: {
        id: req.body.id,
        name: req.body.participant,
        avatar: req.body.avatar || null,
      },
    });

    const result = await newConversation.save();
    res.status(200).json({
      message: "Conversation added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// get messages of a conversation
async function getMessages(req, res, next) {
  try {
    // filter message
    const messages = await Message.find({
      conversation_id: req.params.conversation_id,
    }).sort("-createdAt");

    // get participant
    const { participant } = await Conversation.findById(
      req.params.conversation_id
    );
    res.status(200).json({
      data: {
        messages: messages,
        participant,
      },
      user: req.user.userId,
      conversation_id: req.params.conversation_id,
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
}

// module exports
module.exports = { getInbox, searchUser, addConversation, getMessages };
