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
router.get('/get-data',function(req,res,next){
	var resultArray= [];
mongo.connect(url,function(err,client){
	assert.equal(null, err);
	var db = client.db('csvtomongo');
	var cursor = db.collection('sample').find();
	cursor.forEach(function(doc,err){
			assert.equal(null,err);
			resultArray.push(doc);
	},function(){
		client.close()
		
		 // res.sendFile('index.html',{items: resultArray});
		//document.getElementById("tit").innerHTML = resultArray[2].title;
		console.log(resultArray[1]);
		res.send(resultArray);

	});
});
});
app.use(express.static(__dirname + '/View'));
app.use('/', router);
app.listen(4000);