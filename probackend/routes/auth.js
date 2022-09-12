const express = require("express")
const { check } = require('express-validator');
const router =express.Router();
const { signout, signup, signin, isSignedIn} = require("../controllers/auth")

//SIGNUP
router.post("/signup",
 [
    check("name","name should be atleat three charachter").isLength({ min :3}),
    check("email","email is required").isEmail(),
    check("password","password should be atleat three charachter").isLength({ min :3}),
],
  signup
);

//SIGNIN
router.post("/signin",
[
    
     check("email","email is required").isEmail(),
     check("password","password is r ").isLength({ min :1}),
 ],
   signin
);
 

router.get("/signout", signout)

router.get("/test", isSignedIn,(req,res) =>{
    res.json(req.auth)
})

module.exports = router;
 