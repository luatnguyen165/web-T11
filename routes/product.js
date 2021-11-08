const express = require('express');
const { getListProduct, postProduct, updateProduct, deleteByIdProduct, getByIdProduct } = require('../controllers/productController');
const upload = require('../function/multer');
const uploadFile = upload.array('images',12)
const router = express.Router();
router.get('/',getListProduct)
router.get('/getProduct/:id',getByIdProduct)
router.post('/',uploadFile,postProduct)
router.put('/update/:id',updateProduct)
router.delete('/delete/:id',deleteByIdProduct)
module.exports =router;