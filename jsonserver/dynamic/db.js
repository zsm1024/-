//引入mockjs文件
let Mock  = require('mockjs');
let Random = Mock.Random;
module.exports = function() {
  var data = { 
      news: [],//定义接口名称为news
      nes:[],
      cs:[],
      cc:[],
      type:{
        a:"a",
        b:"b"
      }
  };
  var images = [1,2,3].map(x=>Random.image('200x100', Random.color(), Random.word(2,6)));
//动态生成10条新闻数据
  for (var i = 0; i < 10; i++) {
    var content = Random.cparagraph(0,10);
    data.news.push({
         "id": i,
        "title": Random.cword(8,20),
        "desc": content.substr(0,40),
        "tag": Random.cword(2,6),
        "views": Random.integer(100,5000),
        "images": images.slice(0,Random.integer(1,3))
    })
  };
  for(var i = 0; i < 10; i++){
  	data.nes.push({
  		"id":i,
  		"title":Random.cword(0,10),
  		"code":Random.string('number',5)
  	})
  };
//var template ={
// 	"list:1-10":@EMAIL
// }
  
 for(var i=0;i<10;i++){
 	data.cs.push({
 		"id":i,
 		"label":Random.cword(2,6),
 		"children":[{
 			"label":Random.cword(2,8),
 			"children":[{
 				"label":Random.cword(2,8),				
 			}]
 			
 		}]
 	}) 	
 };
   
//data.cc.push({
//	Mock.toJSONShema(template)
//})

  return data
}
