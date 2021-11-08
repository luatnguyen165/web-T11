const mongoose = require('mongoose');
const productsChema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
    },
    price:{
        type:Number,
        unique:true,
    },
    description:{
        type:String,
    },
    evalute:{
        type:Number,
        default:5
    },
    images:[],
    category_id:{
        type: mongoose.Types.ObjectId,
        ref:'Category'
    },
    brand_id:{
        type:mongoose.Types.ObjectId,
        ref:'Brand'
    },
    active:{
        type:Boolean,
        default:true
    },
    status:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
})
module.exports = mongoose.model('products', productsChema);