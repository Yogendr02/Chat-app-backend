const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name:String
  });

const usermodel = mongoose.model("user", userschema);

module.exports = {usermodel,userschema}