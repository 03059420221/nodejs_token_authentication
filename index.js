const express=require("express");
const jwt=require("jsonwebtoken");
const app= express();
const secretKey="secretkey";

// im making app
app.get("/", (req,res)=>{
    res.json({
        message: "this is a sample api"
    })
})
app.post("/login", function(req,res){
    const user={
        id:1,
        username:"zain",
        email: "ulabideenzain77@gmail.com"
    }
    jwt.sign({user},secretKey,{expiresIn:"300s"},function(err,token){
       res.json({
        token
       })
    })
})
//profile api
app.post("/profile",verifyToken,function(req,res){
    jwt.verify(req.token,secretKey,function(err,authdata){
        if(err){
            res.send({result:"invalid token"})
        }else{
            res.json({
                message:"wow the token is valid and profole is accessed",authdata
            })
        }

    })

})
//token verification by server
function verifyToken(req,res,next){
    const bearerHeader=req.headers["authorization"]
    if (typeof bearerHeader !== "undefined"){
    const bearer=bearerHeader.split(" ");
    const token=bearer[1];
    req.token=token;
    next()
    }else{
        res.send({
            result : "token is not valid"
        })
    }

}

app.listen(5054,function(){
    console.log("application is running on 5054 port");
})