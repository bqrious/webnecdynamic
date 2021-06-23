var express	=	require("express");
const path = require('path');
var app	=	express();

app.use(express.static(__dirname));
app.use('/img', express.static('img')); 

//with html, without ejs
app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});


app.listen(4000,function(){
    console.log("Working on port 4000");
});
