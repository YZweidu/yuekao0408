var express = require('express');
var router = express.Router();

const mongo=require('mongodb-curd');
const db="Project";
const col="yuekao"; 

/* GET home page. */
router.post('/getAddress', function(req, res, next) {
  mongo.find(db,col,(result)=>{
    if(result.length==0){
      res.json({code:0,msg:"未找到数据！"})
    }else{
      res.json(result);
    }
  })
});

router.post('/getDetail', function(req, res, next) {
  var id=req.body.id;
  mongo.find(db,col,{_id:id},(result)=>{
    if(result.length==0){
      res.json({code:0,msg:"未找到数据！"})
    }else{
      res.json(result);
    }
  })
});

router.post('/changeAddress', function(req, res, next) {
  var id=req.body.id;
  var obj={
    name:req.body.name,
    phone:req.body.phone,
    detail:req.body.detail,
    province:req.body.province
  }
  mongo.update(db,col,[{_id:id},obj],(result)=>{
    
      res.json({code:1,msg:"修改成功"});
    
  })
});

router.post('/removeAddress', function(req, res, next) {
  var id=req.body.id;
  console.log(id);
  mongo.remove(db,col,{_id:id},(result)=>{
    res.json({code:1,msg:"删除成功"});
  })
});

router.post('/addAddress', function(req, res, next) {
  mongo.insert(db,col,req.body,(result)=>{
    res.json({code:1,msg:"添加成功"});
  })
});

module.exports = router;
