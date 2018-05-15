var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongo_url = "mongodb://localhost:27017/ShareAlist";
mongoose.connect(mongo_url);
server.use(bodyParser.json());


server.listen(3000, () => {
    console.log("Listening to server");
});

mongoose.connection.on("connected", () => {
    console.log("dB Connection successful to " + mongo_url)
});

mongoose.connection.on("disconnected", (err) => {
    console.log(err);
});

var dbSchema1 = new mongoose.Schema(
    {
        "userName": mongoose.Schema.Types.String,
        "userEmail": mongoose.Schema.Types.String,
        "createDateTime": mongoose.Schema.Types.String,
        "encryptedPassword": mongoose.Schema.Types.String
    },
    { "collection": "userDetails" });

var dbSchema2 = new mongoose.Schema(
    {
        "createdDateTime": mongoose.Schema.Types.String,
        "createBy": mongoose.Schema.Types.String,
        "taskMessage": mongoose.Schema.Types.String
    },
        { "collection": "taskDetails" });

var user = mongoose.model('user', dbSchema1);

server.get("/", (request, response) => {
    response.status(200).send("Welcome to share a list api, the REST api supporting share a list web application");
});
server.post("/adduser", (request, response) => {
    var userName = request.body.username;
    var userEmail = request.body.emailAddress;
    var createDateTime = request.body.createDateTime;
    var encryptedPassword = request.body.encryptedPassword;


    var userData = new user({
        "userName": userName,
        "userEmail": userEmail,
        "createDateTime": createDateTime,
        "encryptedPassword": encryptedPassword
    });
    
   userData.save((error, savedObject)=>{
       if (error != null){
           response.status(200).send("data saved in mongodb");
       }
       else{
       console.log(error)
       }
   })

});