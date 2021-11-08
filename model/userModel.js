const mongoose = require('mongoose');
const generateConstants = require('../constants/generateConstants');

const userSchema = mongoose.Schema({
    username: {
        type:String,
    },
    address: {
        type:String,
    },
    phone:{
        type:String,
    },
    email: {
        type:String,
    },
    googleId:{
        type:String,
    },
    fbId:{
        type:String,
    },
    password: {
        type:String,
    },
    isVerify: {
        type:Boolean,
        default:false,
    },
    verifyNumber: {
        type:Number,
    },
    tokenPassword: {
        type:String,
    },
    role:{
        type:String,
        enum:[generateConstants.roleEnum],
        default:generateConstants.roleEnum.USER
    }
},{
    timestamps:true
})
module.exports =mongoose.model('Users', userSchema)