const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUND=10
require('dotenv').config();
module.exports ={
    hash: async (password)=>{
        return await bcrypt.hashSync(password,SALT_ROUND)
    },
    decrypt: async (password,decrypt)=>{
        return await bcrypt.compareSync(password,decrypt)
    },
    accessToken: async (payload)=>{
        
        return  await jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:process.env.ExpireToken
        })
    }
}