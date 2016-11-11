//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
	types: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的属性获取全局数据
	 that.setData({
        userInfo:app.globalData.userInfo
     });
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
				types:this.data.types
			  })
		 }
		 
		},this);
	
	 
  },
  onReady:function(){
	  console.log('onReady');	
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
	var notes_type=e.detail.value.type;
	//that.data.types.push(notes_type);
	this.ref.child("notes-type").push(notes_type)
	.then(function(){
		wx.showToast({
		  title: '提交成功',
		  icon: 'success',
		  duration: 2000,
		  success:function(){
			  wx.navigateTo({
				  url: '../index/index'
			  })
		  }
		});
	})
	.catch(function(err){
        console.info('set data failed', err.code, err);
    });
	
	
	
  }
})
