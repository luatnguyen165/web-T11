const mongoose = require('mongoose');
const generateConstants = require('../constants/generateConstants');

const orders = mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    },
    phone:{
        type:String,
        required:true,
    },
    district:{
        type:String,
    },
    address_1:{
        type:String,
        required:true,
    },
    address_2:{
        type:String,
    },
    orderItem:[
        {
            type:mongoose.Types.ObjectId,
            ref:'orderSchema',
            required:true,
        }
    ],
    total:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:generateConstants.statusOrder.PENDING,
        enum:[generateConstants.statusOrder],
        required:true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('Orders',orders)