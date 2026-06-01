const Listing=require("../models/listing");

module.exports.index=async(req,res)=>
{
    let filter = {};

    if(req.query.category){
        filter.category = req.query.category;
    }

    const alllist = await Listing.find(filter);

    res.render("./listings/index.ejs",{ alllist });
}

module.exports.renderform=(req,res)=>
{
    res.render("./listings/new.ejs");
}

module.exports.show=async (req, res, next) => {
    let { id } = req.params;
    const list = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");

    if (!list) {
     req.flash("error","Listing you requested does not exist");
     return res.redirect("/listings");
    }

     res.render("./listings/show.ejs", { list });
}

module.exports.newlist=async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let newlist=new Listing(req.body.listing);
    newlist.owner=req.user._id;
    newlist.image={ url,filename };
    await newlist.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
}
module.exports.editlist=async (req, res, next) => {
    let { id } = req.params;
    let getlist = await Listing.findById(id);
    

    if (!getlist) {
        req.flash("error","Listing you requested does not exist");
        return res.redirect("/listings")
    }
    let originalurl=getlist.image.url;
    originalurl=originalurl.replace("/upload","/upload/h_200,w_250");
     res.render("./listings/edit.ejs", { getlist ,originalurl });
}
module.exports.updatelist=async(req,res)=>{
    let { id }=req.params;

   let updatedlist= await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
    new: true

   })
   if( typeof req.file !== "undefined"){
         let url=req.file.path;
         let filename=req.file.filename;
         updatedlist.image={ url,filename };
         await updatedlist.save();
    }
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
}
module.exports.deletelist=async(req,res)=>{
   let{ id }=req.params;
   await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
   res.redirect("/listings");
}
