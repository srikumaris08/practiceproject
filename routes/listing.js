const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");
const {isLoggedIn, isOwner }=require("../middleware");
const wrapasync=require("../utils/wrapasync");
const ExpressError=require("../utils/expresserror");
const{ listingschema,reviewschema }=require("../schema")
const listingcontroller=require("../controllers/listing");
const multer=require("multer");
const { storage }=require("../cloudConfig");
const upload=multer({ storage });
const validatelisting=(req,res,next)=>{
  let { error }=listingschema.validate(req.body);
    
    if(error)
    {
        let errmsg=error.details.map((el)=>el.message).join(" ");
        throw new ExpressError(400,errmsg);
    } else{
        next();
    }
}

router.route("/")
 .get(wrapasync(listingcontroller.index))
 .post(upload.single("listing[image]"), validatelisting, isLoggedIn, wrapasync(listingcontroller.newlist));



router.get("/new",isLoggedIn,listingcontroller.renderform)

router.route("/:id")
.get( wrapasync(listingcontroller.show))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validatelisting, wrapasync(listingcontroller.updatelist))
.delete(isLoggedIn,isOwner,wrapasync(listingcontroller.deletelist));



router.get("/:id/edit", isLoggedIn, isOwner, wrapasync(listingcontroller.editlist));




module.exports=router;