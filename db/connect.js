const mongoose = require("mongoose");

mongoose
.connect('mongodb://localhost:27017/AFRA',).then(() => {

    console.log("DB connected and server us running.");
  })
  .catch((err) => {
    console.log(err);
  });

const session=require("express-session")
const Time=1000*60*60 //1hr
const MongoStore=require("connect-mongodb-session")(session)


const sessionConnection=session({
    secret:process.env.SECRET || "hello world",
    resave: false,
    saveUninitialized: false,
    cookie:{
    //   sameSite:"none",
      maxAge:Time,
      httpOnly:true,
    //   secure:true
    },
    store:new MongoStore({uri:process.env.CONNECT_DB_URL||'mongodb://localhost:27017/AFRA',collection:"mySessions"})
})


module.exports=sessionConnection