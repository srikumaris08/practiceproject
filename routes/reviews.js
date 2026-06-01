const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing");
const Review=require("../models/review");
const wrapasync=require("../utils/wrapasync");
const ExpressError=require("../utils/expresserror");
const{ listingschema,reviewschema }=require("../schema");
const { isLoggedIn ,isreviewOwner }=require("../middleware");
const reviewcontroller=require("../controllers/review");


const validatereviews=(req,res,next)=>{
  let { error }=reviewschema.validate(req.body);
    
    if(error)
    {
        let errmsg=error.details.map((el)=>el.message).join(" ");
        throw new ExpressError(400,errmsg);
    } else{
        next();
    }
}

router.post("/", isLoggedIn, validatereviews, wrapasync(reviewcontroller.createreview))

router.delete("/:reviewid",isLoggedIn,isreviewOwner,wrapasync(reviewcontroller.deletereview
))

module.exports=router;