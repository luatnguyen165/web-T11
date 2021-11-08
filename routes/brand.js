const express = require('express');
const { getListBrand, postBrand, getById, updateBrand, deleteById } = require('../controllers/brandController');
const router =express.Router();

router.get('/',getListBrand)
router.get('/getbrand/:id',getById)
router.post('/',postBrand)
router.put('/update/:id',updateBrand)
router.delete('/delete/:id',deleteById)


module.exports =router;