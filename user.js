// for user authentication 
    var express = require("express");    
    mongoose = require("mongoose");    
    // passport = require("passport");    
    // bodyParser = require("body-parser");    
    // User = require("./models/user"),    
    // LocalStrategy = require("passport-local",
    // passportLocalMongoose = require("passport-local-mongoose")

    var app = express();
    // app.set('view engine','ejs');
    mongoose.connect("mongodb://localhost/auth_demo_app"); 

