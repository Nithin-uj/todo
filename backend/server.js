import express from "express";
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const salt = 10;
const PORT = 8080
const app = express();
app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ['POST','GET'],
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    // console.log(token)
    if(!token){
        return res.json({Error : "You are not verified"});
    }
    else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error : "Token is not ok"})
            }
            else{
                req.email = decoded.email;
                next();
            }
        })
    }
}

app.get("/",verifyUser,(req,res)=>{
    return res.json({Status : "Success",email : req.email})
})

app.post('/signup',(req,res)=>{
    const sql = "INSERT INTO user (Name,Email,Password) values (?)";
    bcrypt.hash(req.body.cpassword.toString(),salt,(err,hashed)=>{
        if(err){
            console.log("Error while hashing")
        }
        const val = [
            req.body.name,
            req.body.email,
            hashed
        ]
        db.query(sql,[val],(err,result)=>{
            if(err) return res.json({Message : err});
            return res.json({Status : "Success"})
        })
    })

})

app.post("/login",(req,res)=>{
    const sql = "SELECT * FROM user where Email = ?";
    db.query(sql,[req.body.email],(err,data)=>{
        if(err) return res.json({Message : err})
        if(data.length>0){
            bcrypt.compare(req.body.password.toString(),data[0].Password,(err,response)=>{
                if(err) return res.json({Error : "password compare error"})
                if(response){
                    const email = data[0].Email;
                    const token = jwt.sign({email},"jwt-secret-key",{expiresIn:'1D'})
                    res.cookie('token',token);
                    return res.json({Status : "Success"})
                }
                else{
                    return res.json({Error:"Incorrect password"})
                }
            })
        }
        else{
            return res.json({Error : "Email doesn't exist"})
        }
    })
}) 

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Nithin@20",
    database : "react_node"
});
db.connect((err) =>{
    if(err){
    console.log("Error while connection to MySQL");
    console.log(err)
    return;
    }
    console.log("Connected to MySQL");
})


app.listen(PORT,()=>{
    console.log("Listening on port : ",PORT)
})