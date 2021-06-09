const server=require('node-http-server');
var fs = require('fs');
const config=new server.Config;

config.verbose=true;
config.port=8000;
config.root=__dirname;



server.deploy(config);



//set listener to process request


console.log("Server Started===========================================")
var datenow=Date(Date.now());
console.log(datenow.toString());
console.log("=========================================================")
server.onRequest=gotRequest;



function gotRequest(request,response,serve){
	//console.log(request.url);
	//console.log("debug1");
   
  
 }



