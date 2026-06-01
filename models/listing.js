const mongoose=require("mongoose");
const Review=require("./review");
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename:String,
            // default: "listingimage"
        
        url:String,
            // default: "https://www.shutterstock.com/search/beachs-scene"
        
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    },
     ],
     owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
     },

     category:{
    type:String,
    enum:[
        "Trending",
        "Rooms",
        "Iconic Cities",
        "Mountains",
        "Castles",
        "Amazing Pools",
        "Camping",
        "Farms",
        "Arctic"
    ],
    default:"Trending"
},
});

listingSchema.post("findOneAndDelete",async(listing)=>{
      if(listing){
        await Review.deleteMany({ _id:{$in:listing.reviews }})
      }
})

const Listing=mongoose.model("Listing",listingSchema);
module. exports=Listing;