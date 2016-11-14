//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
	type:"",
	type_lsit:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    console.log('onLoad');
	console.log(option);
    var that = this;
    this.data.type=option.type;
	this.setData({
		type:this.data.type
	});
  },
  onShow:function(){
	 console.log('onShow'); 
	 console.log(this.data.type);
	 var that = this;
	 this.ref = app.getTodoRef();
		 this.ref.child("notes-list").on('value',function(snapshot,prKey){
		  var key = snapshot.key();
		  var text = snapshot.val();
		  console.log(snapshot.exists());//判断此节点下有无数据
		  //console.log(prKey);
		  console.log(key);
		  console.log(text);
		  that.data.type_lsit=[];
		  snapshot.forEach(function(data){
			console.log(data.key());
			console.log(data.val());
			var key_in = data.key();
			var text_in = data.val();
			//获取此分类下的所有笔记
			if(text_in.type===that.data.type){
				that.data.type_lsit.push({
					key:key_in,text:text_in
				});
			}

		 });

		 this.setData({
		   type_lsit:this.data.type_lsit
		 });
		 
		 
	 },this);
  },
  viewDetail:function(e){
	  console.log(e.target.dataset.key);
	  wx.navigateTo({
		  url:"view/view?key="+e.target.dataset.key
	  })
  }
})
