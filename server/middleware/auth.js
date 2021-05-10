import model__accounts from '../Models/model__accounts.js';
let auth=(req,res,next)=>{
    let token=req.cookies.x_auth;
    model__accounts.findByToken(token,(err,account)=>{
        if(err) throw err;
        if(!account) return res.json({isAuth:false,error:true});
        req.token=token;
        req.account=account;
        next();
    });
}

export default auth;