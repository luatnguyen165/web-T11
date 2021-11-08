var jwt = require('jsonwebtoken');
module.exports = {

    authenticate: async (req, res, next)=>{
        let token = req.headers.authorization.replace('Bearer ','');
        if(!token){
            res.status(404).json({message: 'Unauthorization token'})
        }
        let {exp,_id,role} = jwt.verify(token,process.env.SECRET_KEY)
        if(exp*1000<Date.now()){
            res.status(404).json({message: 'Unauthorization token'})
        }
        req.userId =_id
        req.role=role
        next();
    },
    roleAdmin: async(admin)=>{
        return  async function(req, res, next){
            if(admin === 'ADMIN'){
                next();
            }
            res.status(404).json({message: 'Unauthorization'})
        }
            
        
    },
    roleUser: async(user)=>{
        return  async function(req, res, next){
            if(user === 'USER'){
                next();
            }
            res.status(404).json({message: 'Unauthorization'})
        }
    } 
}