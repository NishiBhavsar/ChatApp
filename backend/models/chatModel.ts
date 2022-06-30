//chatName
//isGrpChat
//users
// latestMsg
// grpAdmin
export {};
const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  // for grpChat
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
    {
    timestamps:true
}
);
const Chat = mongoose.model("chat", chatModel);
module.exports = Chat;