const category = require("../model/category");
const cloudinary = require("../function/cloudinary");

module.exports = {
    createCategory: async (req, res, next) => {
        const {title} = req.body;
        const file = req.file;
        if(!file) {
            res.status(404).json({message:'please choose your file'})
        }
        let multiplePicturePromise = await
        cloudinary.uploader.upload(file.path,{
            folder:'category'
        })
      
        const Cate = new category({
            title: title,
            image:multiplePicturePromise.secure_url,
            cloudinary_id: multiplePicturePromise.public_id
        });
        const cate = await Cate.save();
        cate?res.status(200).json({
            message:'success',
            data:cate
        }):res.status(404).json({
            message:'Vui lòng kiểm tra',
            
        });
    },
    getById: async (req, res, next) => {
        try {
            const findById =await category.findById(req.params.id);
            if(!findById) res.status(404).json({
                message:'data is not exists'
            })
            res.status(200).json({
                message:'success',
                data:findById
            })
        } catch (error) {
            
        }
    },
    updateBrand: async function (req, res, next) {
        const id =  req.params.id;
        const datas=req.body;
        let data = await category.findById(id)
        if(!data){
            res.status(404).json({
                message: `${id} không tồn tại`
            })
        }
        const update = await category.findByIdAndUpdate(id,datas)
        update?res.status(200).json({
            message: 'success',
        }):res.status(404).json({
            message: 'failed ',
            
        })
    },
    deleteById  : async function (req, res, next){
        try {
            const id =  req.params.id;
            let data = await category.findById(id)
            if(!data){
                res.status(404).json({
                    message: `${id} không tồn tại`
                })
            }
            if(await category.findByIdAndDelete(id)&&cloudinary.uploader.destroy(data.cloudinary_id) ){
                res.status(200).json({
                    message: 'success',
                })
            }
        } catch (error) {
                throw new Error(error)
        }
      
    },
    getList: async (req, res, next) => {
        try {
            const take =8;
            let page = req.query.page||1;
            const getList = await category.find().skip((page*take)-take).limit(take);
            const getCount = await category.find();
            getList.length>0?res.status(200).json({
                message:'success',
                data:getList,
                total:getCount.length,
                page:page,
                totalPage: Math.ceil(getCount.length/take)
    
            }):res.status(200).json({
                message:'Data chưa có dữ liệu'
            })
        } catch (error) {
            throw new Error(error)
        }
        
    }
}