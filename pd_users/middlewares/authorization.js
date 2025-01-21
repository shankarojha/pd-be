const jwt = require('jsonwebtoken')
const {globalResponse} = require('./globalResponse')
require("dotenv").config();


const generateToken = async(user, secretKey=process.env.jwt_secret_key) =>{
    return jwt.sign(user, secretKey, {expiresIn: '48h'});
}

const verifyToken = (req,res,next) =>{
    const authHeaders = req.headers['authorization'];
    console.log(authHeaders)
    const token = authHeaders && authHeaders.split(' ')[1];

    if(!token){
        const response = globalResponse(401, 'token not provided', "token not provided", null)
        return res.json(response)
    }
        jwt.verify(token, process.env.jwt_secret_key, (err, decoded)=>{
            if(err){
                const response = globalResponse(401, 'token incorrect', err, null)
                res.json(response)
            }else{
                req.user = decoded;
                next();
            }
        })
    
}

module.exports={
    generateToken,
    verifyToken
}
