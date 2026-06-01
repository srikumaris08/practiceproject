const User=require("../models/user");
module.exports.signup=async(req,res)=>{
    try{
     let{ username,email,password }=req.body;
     const newuser= new User({email,username});
     let registereduser=await User.register(newuser,password);
     req.login(registereduser,(err)=>{
        if(err)
        {
            return next(err);
        }
     req.flash("success","Welcome to wanderlust");
     res.redirect("/listings");
    })
}
    catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}
module.exports.loginform=(req,res)=>{
    res.render("./users/login.ejs")
}
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to wandelust");
     res.redirect(res.locals.redirecturl||"/listings");
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/listings");
    })
}
module.exports.signupform=(req,res)=>{
    res.render("./users/signup.ejs")
}
