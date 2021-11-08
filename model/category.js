const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    image:{type:String},
    cloudinary_id:{type:String},
},{
    timestamps:true
})
module.exports = mongoose.model('Category',categorySchema);