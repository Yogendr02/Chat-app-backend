const {messagesmodel} = require("../Models/messages")

const messagepost = async(req,res)=>{
    await messagesmodel.create(req.body)
    res.sendStatus(200)
}

const messageget = async(req,res)=>{
    const message = await messagesmodel.find(req.body)
    res.send(message)
}
const messagedelete = async(req,res)=>{
    await messagesmodel.deleteOne(req.body)
    res.sendStatus(200)
}

module.exports = {messagepost,messageget,messagedelete} 