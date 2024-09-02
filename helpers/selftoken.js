const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.selfToken = async(req,res,next)=>{
    try {
        let authorization = req.headers['authorization'];
        if(!authorization){
            return json({message:"Not Authorized"});
        }
        let token = authorization.split(" ")[1];
        let payload = await jwt.verify(token,process.env.JWT_SECRET);
        if(!payload){
            return res.status(404).json({message:"unauthorized"});
        }
        let user = await User.findOne({_id:payload.userId,isDelete:false});
        if(!user){
            return res.status(404).json({_id:payload.userId,isDelete:false});
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
}
