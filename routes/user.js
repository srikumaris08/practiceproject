const express=require("express");
const router=express.Router();
const User=require("../models/user");
const wrapasync=require("../utils/wrapasync");
const passport=require("passport");
const { savedurl }=require("../middleware");
const usercontroller=require("../controllers/user");

router.get("/signup",usercontroller.signupform)

router.post("/signup",wrapasync(usercontroller.signup))

router.get("/login",usercontroller.loginform)

router.post("/login",savedurl,passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),usercontroller.login)

router.get("/logout",usercontroller.logout)
module.exports=router;