const jwt = require('jsonwebtoken');
const User = require('../model/user.model')

exports.verifyToken = async(req,res,next)=>{
    try {
        let authorization = req.headers['authorization'];
        if(!authorization){
            return res.json({message:"Not authorized "})
        }
        let token = authorization.split(" ")[1];
        let {userId} = await jwt.verify(token,process.env.JWT_SECRET);
        if(!userId){
            return res.status(401).json({message:'unauthorized'});
        }
        let user = await User.findOne({_id:payload.userId,isDelete:false});
        if(!user){
            return res.status(404).json({_id:payload.userId,isDelete:false});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Errror"});
    }
}
