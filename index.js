const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategies');
const MongoStore =  require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const customMW = require('./config/middleware')

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));



app.use(expressLayouts);
// extract styles and script for the appropriate page
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views')

app.use(session({
    name: "Codeial",
    secret: "123",
    saveUninitialized: false,
    resave: false,
    Cookie :{
        maxAge: (1000*60*100)
    },
    store : new MongoStore({
        uri : "mongodb://0.0.0.0:27017/codial_developement",
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMW.setFlash);

// use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Error in running the server");
        return;
    }
    console.log(`Server is Running on port : ${port}`);
});