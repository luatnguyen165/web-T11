const mongoose = require('mongoose');
const ConnectDB = async ()=>{
    try {
        mongoose.connect('mongodb://localhost:27017/e-shop')
        console.log('Database connection established');
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports =ConnectDB;