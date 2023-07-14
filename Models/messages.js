const mongoose = require("mongoose")

const messagesschema = new mongoose.Schema({
    writter:String,
    time:Number,
    date:String,
    message:String,
    id:String
  });

const messagesmodel = mongoose.model("messages", messagesschema);

module.exports = {messagesmodel,messagesschema}