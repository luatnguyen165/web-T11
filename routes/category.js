var express = require('express');

const { createCategory, getList, getById } = require('../controllers/cateController');
const upload = require('../function/multer');
const uploadFile = upload.single('image')
var router = express.Router();
router.get('/',getList);
router.post('/',uploadFile,createCategory);
router.get('/getcategory/:id',getById);
module.exports = router;