const express = require("express");
const router=express.Router();

const { isSignedIn, isAuthenticated, isAdmin } =require('../controllers/auth');
const { getToken, processMoney } =require('../controllers/payment');
const { getUserById } =require('../controllers/user');


router.param("userId", getUserById)

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken)


router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processMoney)

module.exports =router;


