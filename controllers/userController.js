const { hash, decrypt, accessToken } = require("../function/generate");
const userModel = require("../model/userModel");
const faker = require('faker');
const cron = require('cron');
const jwt = require('jsonwebtoken');
const { transporter } = require("../function/mailer");
module.exports = {
    login: async (req, res, next) => {
        try {
            let { email, password } = req.body
            let user = await userModel.findOne({ email: email })

            if (!user) throw new Error('user is not found')
            let isMatch = await decrypt(password, user.password)

            if (!isMatch) throw new Error('password is not correctly')
            user = {
                _id: user._id,
                role: user.role
            }
            const accesstoken = await accessToken(user)
            console.log(accesstoken);
            res.status(200).json({
                message: 'sucess',
                data: accesstoken,
            })
        } catch (error) {
            throw new Error(error)
        }


    },
    register: async (req, res, next) => {
        try {
            const { username, password, email } = req.body;
            const hashPass = await hash(password)
            const key = faker.datatype.number({ min: 300, max: 5000 })
            const user = new userModel({
                username,
                password: hashPass,
                email,
                verifyNumber: key
            })

            const add = await user.save()
            try {
                const info = await transporter.sendMail({
                    from: 'luatnguyen165@gmail.com',
                    to: email,
                    subject: 'Verify Account',
                    html: `Verify number: ${key} <a href=http://localhost:3000/verify>Click here to verify</a>`
                })
                console.log((await info).messageId);
            } catch (error) {
                console.log(error);
            }
            add ? res.status(200).json({
                code: 200,
                message: "Đăng ký tài khoản thành công",
                data: user,
            }) : res.status(404).json({
                code: 404,
                message: "Vui lòng kiểm tra thông tin"
            })
        } catch (error) {
            throw new Error(error)
        }


    },
    verify: async (req, res, next) => {
        const { token } = req.params;
        const {password } = req.body;
        if (token) {
            const { exp } = jwt.verify(token, process.env.SECRET_FORGOT)
            if (Date.now() > exp * 1000) {
                throw new Error("expired token verify please try again")
            }
            const user = await userModel.findOne({ tokenPassword: token })
            if (!user) throw new Error('Không thể chứng thực')
            await userModel.findByIdAndUpdate(user._id, {
                tokenPassword: null,
                password
            })
        }
    },
    isVerify: async (req, res, next) => {
        try {
            const { verifyNumber } = req.body;
            const verify = await userModel.findOne({ verifyNumber: verifyNumber })
            if (!verify) throw new Error('Không thể chứng thực')
            const user = await userModel.findByIdAndUpdate(verify._id, {
                verifyNumber: null,
                isVerify: true
            })
            if (!user) throw new Error('Không thể chứng thực tài khoản')
            res.status(200).json({
                message: 'sucess'
            })
        } catch (error) {
            throw new Error(error)
        }
    },
    logout : async function (req,res,next) {
        if(req._id&&req.role){
            req._id=null;
            req.role=null;
            res.redirect('/')
        }
        res.redirect('/')
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            let user = await userModel.findOne({ email: email })
            if (!user) throw new Error('email is not exists')
            user = {
                _id: user._id,
            }
            const token = jwt.sign(user, process.env.SECRET_FORGOT, {
                expiresIn: process.env.resetToken
            })
            const info = await transporter.sendMail({
                from: 'luatnguyen165@gmail.com',
                to: email,
                subject: 'forgot Account',
                html: `Please click link to reset your password: <a href=http://localhost:3000/verify/${token}>Click here to verify</a>`
            })
            console.log(info.messageId);
            res.status(200).json({
                message: 'sucess'
            })
        } catch (error) {
            console.log(error);
        }
    }

}
