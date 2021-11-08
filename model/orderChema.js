const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    products:
        {
            type: mongoose.Types.ObjectId,
            ref:'products'
        }
    ,
    quantity:{
        type:Number,
        default:1,
        required:true,
    }
},{
    timestamps:true
})
module.exports =  mongoose.model('orderSchema', orderSchema)