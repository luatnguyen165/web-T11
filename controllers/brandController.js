const mongoose = require('mongoose');
const brand = require("../model/brand")
module.exports = {
    getListBrand: async function (req, res, next) {
        try {
        const take = 8;
        const page = req.query.page || 1;
        const brandList = await brand.find().skip((page * take) - take).limit(take).select('_id createdAt name');
        const count = await brand.find();
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
    postBrand:async function (req, res, next) {
        const data=req.body;
        const post = new brand(data);
        const postSu = await post.save();
        postSu?res.status(404).json({message: 'succes'}):res.status(200).json({
            message: 'failed'
        })
    },
    getById : async function (req, res, next) {
        const id =  req.params.id;
        if(!mongoose.Types.ObjectId(id)){
            throw new Error('Không tồn tại')
        }
        let data = await brand.findById(id).select('_id createdAt name')
        res.status(200).json({
            message:'success',
            data
        })
        
    },
    updateBrand: async function (req, res, next) {
        const id =  req.params.id;
        const datas=req.body;
        let data = await brand.findById(id)
        if(!data){
            res.status(404).json({
                message: `${id} không tồn tại`
            })
        }
        const update = await brand.findByIdAndUpdate(id,datas)
        update?res.status(200).json({
            message: 'success',
        }):res.status(404).json({
            message: 'failed ',
            
        })
    },
    deleteById  : async function (req, res, next){
        const id =  req.params.id;
        let data = await brand.findById(id)
        if(!data){
            res.status(404).json({
                message: `${id} không tồn tại`
            })
        }
        if(await brand.findByIdAndDelete(id)){
            res.status(200).json({
                message: 'success',
            })
        }
    }

}