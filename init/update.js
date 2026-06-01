const mongoose = require("mongoose");
const Listing = require("../models/listing");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

    const listings = await Listing.find().sort({ _id: 1 });

    const n = listings.length;

    // First listings -> Trending
    for(let i = 0; i < n - 5; i++){
        listings[i].category = "Trending";
        await listings[i].save();
    }

    // Last 5 listings -> Iconic Cities
    for(let i = n - 5; i < n; i++){
        listings[i].category = "Iconic Cities";
        await listings[i].save();
    }

    console.log("Updated Successfully");
    process.exit();
}

main();