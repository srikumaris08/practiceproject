const mongoose=require("mongoose");
const Listing=require("../models/listing");
const intidata=require("./data");
main().then(()=>{
    console.log('connection successful');
}).catch((err)=>{console.log(err)});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}

const instdb= async()=>{
    await Listing.deleteMany({});
    intidata.data=intidata.data.map((obj)=>({...obj,owner:'6a13e7d98acc48434fd5b17c'}))
    await Listing.insertMany(intidata.data);
    console.log("success");
}

instdb();