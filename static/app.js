const express = require('express');
var router = express.Router()
const path  =require('path');
const assert  =require('assert');
const app = express();
var mongo = require('mongodb');
var url = 'mongodb://127.0.0.1:27017/'
// app.use('/',express.static(path.join(__dirname,'static')));
// app.get('/',(req,res)=>{
// 	res.sendFile(path.join(__dirname,'static','index.html'));
	
// });
var txt = "";
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
router.get('/recomm',function(req,res){
  res.sendFile(path.join(__dirname+'/recomm.html'));
});
// router.get('/',function(req,res,next){
// 	res.sendFile('index.html');
// });
var len = 0;
router.get('/get-data',function(req,res,next){
	var resultArray= [];
mongo.connect(url,function(err,client){
	assert.equal(null, err);
	var db = client.db('csvtomongo');
	var cursor = db.collection('sample').find();
	cursor.forEach(function(doc,err){
			assert.equal(null,err);
			resultArray.push(doc);
			len ++;
	},function(){
		client.close(txt)
		txt += "<style type='text/css'>"+


"*{"+
 "margin: 0px;"+
 "padding: 0px;"+
"}"+
"body{"+
 "font-family: arial;"+
"}"+
".main{"+
" margin: 2%;"+
"}"+

".card{"+
     "width: 20%;"+	
     "display: inline-block;"+
     "box-shadow: 2px 2px 20px black;"+
    " border-radius: 5px; "+
    " margin: 2%;"+
   " }"+

 ".image img{"+
  " width: 100%;"+
   "border-top-right-radius: 5px;"+
  " border-top-left-radius: 5px;"+
  

 
  "}"+

 ".title{"+
 
   "text-align: center;"+
  " padding: 10px;"+
  
 " }"+

 "h1{"+
  " font-size: 20px;"+
  "}"+

 ".des{"+
  " padding: 3px;"+
  " text-align: center;"+
 
   "padding-top: 10px;"+
    "     border-bottom-right-radius: 5px;"+
   "border-bottom-left-radius: 5px;"+
 "}"+
 "button{"+
  " margin-top: 40px;"+
  " margin-bottom: 10px;"+
  " background-color: white;"+
  " border: 1px solid black;"+
  " border-radius: 5px;"+
  " padding:10px;"+
 "}"+
 "button:hover{"+
  "background-color: black;"+
  " color: white;"+
  " transition: .5s;"+
   "cursor: pointer;"+
 "}"+
"+"+
"</style>";
		for (var i = 0; i < len; i++) {
			
			
			txt += "<div class='card'>" + "<div class='image'>"+
   "<img src="+resultArray[i].thumbnaillink+">"+
"</div>"+
"<div class='title'>"+
 "<h1>"+resultArray[i].title+"</h1>"+
"</div>"+
"<div class='des'>"+
"<a href = https://www.youtube.com/watch?v="+resultArray[i].videoId+">"+"WATCH VIDEO"+"</a>"+
"</div>"+
"</div>";
			//txt += resultArray[i]._id;
		}
		 
		// console.log(resultArray);
		
		res.send(txt);

	});
});
});
app.use(express.static(__dirname + '/View'));
app.use('/', router);
app.listen(4000);