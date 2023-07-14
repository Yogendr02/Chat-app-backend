const express = require("express")
const app = express()
const cors = require("cors")
const http = require("http")
const socketIO = require('socket.io');
app.use(cors())
app.use(express.json())
const server = http.createServer(app)
const mongoose = require("mongoose")
const localStorage = require("localStorage")


const {userpost,userget,alluser} = require("./routes/user")
const {messagepost,messageget,messagedelete} = require("./routes/messages")
const {getid,postid} = require("./routes/connectid")

let active = {}

const io = socketIO(server,{
    cors:{
        origin:["http://127.0.0.1:5173"],
        methods:["GET","POST"]
        
    }
});


const pro = async()=>{
    const keyss = "mongodb+srv://Yogendra:e5EZWizeiQciByly@chat-app.rqizduu.mongodb.net/?retryWrites=true&w=majority"
    try{await mongoose.connect(keyss).then(()=>{console.log("connected to server")})}catch{console.log("connection denied")}
    app.get("/",(req,res)=>{res.send("yoyo")})
    app.get("/getall",alluser)
    app.post("/ok",userpost)
    app.post("/finduser",userget)
    app.post("/getmessage",messageget)
    app.post("/postmessage",messagepost)
    app.post("/deletemessage",messagedelete)
    app.post("/getid",getid)
    app.post("/postid",postid)
}

pro()

let activeuser = []
io.on("connection",(socket)=>{
    const y = socket.id
    let actives
    socket.on("checked",async(data)=>{
        active = {...active,[data]:y}
        actives = data
        localStorage.setItem("loginusername",data)
        activeuser.push(data)
    })
    
    setInterval(()=>{socket.emit("getactives",activeuser)},3000)
    socket.on("getid",(data)=>{
        const up = active[data]
        socket.emit("received",up)
    })

    socket.on("send-message",async(data)=>{
        socket.to(data.id).emit("receive",data.message)
    })

    
    socket.on("disconnect",async()=>{
        const fury = (item)=>{
            return item!==actives
        }
        activeuser = activeuser.filter(fury)
    })
})
const PORT = process.env.PORT || 3001
server.listen(PORT,()=>{
    console.log(`server connected to 3001`)
})