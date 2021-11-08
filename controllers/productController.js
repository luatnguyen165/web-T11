const mongoose = require('mongoose');
const product = require('../model/product');
const cloudinary =require('../function/cloudinary');
module.exports = {
    getListProduct: async function (req, res, next) {
        try {
        const take = 8;
        const page = req.query.page || 1;
        const brandList = await product.find().skip((page * take) - take).limit(take);
        const count = await product.find();
        brandList.length > 0 ? res.status(200).json({
            message: 'success',
            totol: count.length,
            data: brandList,
            totalPage: Math.ceil(count.length / take),

        }) : res.status(200).json({
            message: 'succes',
            data:'Data hiện tại chưa có'
        })
        } catch (error) {
            throw new Error(error)
        }
    },
    postProduct:async function (req, res, next) {
        try {
            const {name,price,description,category_id,brand_id,images}=req.body;
            const file = req.files;
            if(!file) {
                res.status(404).json({message:'please choose your file'})
            }
            let multiplePicturePromise = file.map((picture) =>
            cloudinary.uploader.upload(picture.path,{
                folder:'products'
            })
          );
            let dataFile = await Promise.all(multiplePicturePromise)
            const post = new product({
                name,
                price,
                description,
                category_id,
                brand_id,
                images:dataFile,
            });

            const postSu = await post.save();
            postSu?res.status(200).json({message: 'succes'}):res.status(200).json({
                message: 'failed'
            })
        } catch (error) {
            throw new Error(error)
        }
       
    },
    getByIdProduct : async function (req, res, next) {
        const id =  req.params.id;
        if(!mongoose.Types.ObjectId(id)){
            throw new Error('Không tồn tại')
        }
        let data = await product.findById(id).select('_id createdAt name')
        res.status(200).json({
            message:'success',
            data
        })
        
    },
    updateProduct: async function (req, res, next) {
        const id =  req.params.id;
        const datas=req.body;
        let data = await product.findById(id)
        if(!data){
            res.status(404).json({
                message: `${id} không tồn tại`
            })
        }
        const update = await product.findByIdAndUpdate(id,datas)
        update?res.status(200).json({
            message: 'success',
        }):res.status(404).json({
            message: 'failed ',
            
        })
    },
    deleteByIdProduct  : async function (req, res, next){
        const id =  req.params.id;
        let data = await product.findById(id)
        if(!data){
            res.status(404).json({
                message: `${id} không tồn tại`
            })
        }
        if(await product.findByIdAndDelete(id)){
            res.status(200).json({
                message: 'success',
            })
        }
    }

}