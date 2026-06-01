const Listing=require("./models/listing");
const Review=require("./models/review");

module.exports.isLoggedIn=(req,res,next)=>{
    console.log("Session =", req.session);
    if(!req.isAuthenticated()){
        req.session.redirecturl=req.originalUrl;
        req.flash("error","You must be logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedurl=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let { id }=req.params;
    let list=await Listing.findById(id);
    if(!list.owner.equals(req.user._id)){
        req.flash("error","You don't have permission to do that");
        return res.redirect("/listings");
    }
    next();
}

module.exports.isreviewOwner=async(req,res,next)=>{
    let { id, reviewid }=req.params;
    let review=await Review.findById(reviewid);
    if(!review.author.equals(req.user._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${ id }`);
    }
    next();
}