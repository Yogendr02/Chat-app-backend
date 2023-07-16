const {usermodel} = require("../Models/user") 

const userpost = async(req,res)=>{
    await usermodel.create(req.body)
    console.log("saved")
    res.json({"arey":"done"})
}

const alluser = async(req,res)=>{
    const allusers = await usermodel.find()
    res.send(allusers)
}

const userget = async(req,res)=>{
    console.log(req.body)
    const user = await usermodel.find(req.body)
    if(user[0] !== undefined){
        res.sendStatus(200)
    }else{
        res.sendStatus(404)
    }
}

module.exports = {userpost,userget,alluser}