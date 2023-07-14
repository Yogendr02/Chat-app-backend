const mongoose = require("mongoose")

const connections = new mongoose.Schema({
    p1:String,
    p2:String,
    id:{type:String,unique:true}
})

const connectidmodel = mongoose.model("connectid",connections)

module.exports = {connections,connectidmodel}