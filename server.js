var express = require("express");
var server = express();
var bodyParser = require("body-parser");

server.use(bodyParser.json());

server .listen(3000, () =>{
    console.log("Listening to server");
});
server.get("/" ,(request,response)=>{
    response.status(200).send("Welcome to share a list api, the REST api supporting share a list web application");
});