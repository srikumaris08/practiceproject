if(process.env.NODE_ENV!=="production")
{
    require("dotenv").config();
}
const express=require("express");
const mongoose=require("mongoose");
const session=require("express-session");
const MongoStore = require("connect-mongo").default;
const flash=require("connect-flash");
const app=express();
const Listing=require("./models/listing");
const Review=require("./models/review");
const path=require("path");
const method=require("method-override");
const ejsmate=require("ejs-mate");
const wrapasync=require("./utils/wrapasync");
const ExpressError=require("./utils/expresserror");
const{ listingschema,reviewschema }=require("./schema");
const listingrouter=require("./routes/listing");
const reviewrouter=require("./routes/reviews");
const userrouter=require("./routes/user");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user");
const dburl=process.env.ATLASDB_URL;

main().then(()=>{
    console.log('connection successful');
}).catch((err)=>{console.log(err)});
async function main() {
    // console.log(dburl);
    await mongoose.connect(dburl)
}
app.engine('ejs',ejsmate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(method("_method"));

const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*60*60,
 })

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    }
}


app.use(express.static(path.join(__dirname,"/public")));
app.use(session(sessionOptions));
app.use(flash());
app.get("/",(req,res)=>
{
    res.redirect("/listings");
})

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
      res.locals.success=req.flash("success");
      res.locals.error=req.flash("error");
      res.locals.currentuser=req.user;
      next();
}
)

app.use("/listings",listingrouter);
app.use("/listings/:id/reviews",reviewrouter);
app.use("/",userrouter);



app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})
app.use((err,req,res,next)=>{
   
    let {status=500,message="something is wrong"} = err;
    res.render("error.ejs",{ err });
})

app.listen(8080,()=>
{
    console.log('Listening to port 8080');
})