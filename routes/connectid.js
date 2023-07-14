const {connectidmodel} = require("../Models/connectid")

const postid = async(req,res)=>{
    try{await connectidmodel.create(req.body)}catch{console.log("don't worry keep going")}
    res.sendStatus(200)
}
const getid = async(req,res)=>{
    const takeid = await connectidmodel.find(req.body)
    res.send(takeid)
}

module.exports = {getid,postid}