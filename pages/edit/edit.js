var util = require('../../utils/util.js');
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
	type:"create",
	types: [],
    index: 0,
	hastypes:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (data) {
    console.log('onLoad');
	console.log(data);
	
    var that = this
    //调用应用实例的属性获取全局数据
	 that.setData({
        userInfo:app.globalData.userInfo,
		type:data.type
     });
	  
	console.log(this.data.type);
  },
  onShow:function(){
	  console.log('onShow');
	  console.log(new Date());
	    var that=this;
	    this.ref = app.getTodoRef();
		this.ref.child("notes-type").on('value',function(snapshot,prKey){
		  var key = snapshot.key()
		  var text = snapshot.val()

		 console.log(snapshot.exists());//判断此节点下有无数据
		 //console.log(prKey);
		 console.log(key);
		 console.log(text);
		 //因为每次显示页面都要拉取数据，不清空数据会重复累积
		 that.data.types=[];
		 
		 snapshot.forEach(function(data){
			 console.log(data.key());
			 console.log(data.val());
			 that.data.types.push(data.val());
		 });
		 if(!snapshot.exists()){
			 //没有分类，开始创建分类
			 console.log("没有分类数据");
		 }else{
			 //有分类，写入data
			 console.log("有分类数据");
			  
			  this.setData({
				types:this.data.types,
				hastypes:true
			  })
		 }
		 
		},this);
	
	  var type=this.data.type;
	  if(type==="create"){
		  console.log("准备新建一个笔记--create");
	  }else if(type===undefined){
		  console.log("准备新建一个笔记--undefined");
	  }else if(type==="edit"){
		  console.log("准备编辑已有的笔记");
		  this.getNoteInfo();
	  }
  },
  onReady:function(){
	  console.log('onReady');
	  /*
	  wx.showActionSheet({
		  itemList: ['A', 'B', 'C',"d","e","f","g","h"],
		  success: function(res) {
			if (!res.cancel) {
			  console.log(res.tapIndex)
			}
		  }
		})
	  */
		
  },
  getNoteInfo:function(){
	  console.log("获取需要编辑的笔记的信息");
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
	var time_now=Date.now(),key=time_now+"",time_update,notes_type;
	if(this.data.hastypes){
		//有分类数据，从data中读取
		notes_type=this.data.types[e.detail.value.type];
	}else{
		//没有分类，从输入框中读取并push到后台
		notes_type=e.detail.value.type;
		this.ref.child("notes-type").push(e.detail.value.type);
	}
	//提交数据
	this.ref.child("notes-list").child(key).set({
		"type":notes_type,
		"author":app.globalData.userInfo.nickName,
		"time-update":util.formatTime(new Date(time_now)),
		"title":e.detail.value.title,
		"contents":e.detail.value.contents
	}).then(function(){
		wx.showToast({
		  title: '提交成功',
		  icon: 'success',
		  duration: 2000,
		  success:function(){
			  wx.navigateTo({
				  url: '../index/index'
			  })
		  }
		})
	})
	.catch(function(err){
        console.info('set data failed', err.code, err);
    });
  }
})
