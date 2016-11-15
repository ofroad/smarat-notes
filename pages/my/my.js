//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
	types: [],
	types_total:[],
	submit_disabled:false
  },
  //事件处理函数
  viewList:function(e){
	  console.log(e);
	  wx.navigateTo({
		  url: 'list/list?type='+e.target.dataset.type
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
		
		
		
		//分类管理相关
		this.ref.child("notes-type").on('value',function(snapshot,prKey){console.log("k2");
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
		
		
		//分类统计相关
		this.ref.child("notes-list").orderByKey().on('value',function(snapshot,prKey){console.log("k1");
		  var key = snapshot.key()
		  var text = snapshot.val()
		  //var newItem = {key:key,text:text}
		  //this.data.todos.push(newItem)
		 // this.setData({
		  //  todos:this.data.todos
		 // })
		 console.log(snapshot.exists());//判断此节点下有无数据
		 //console.log(prKey);
		 console.log(key);
		 console.log(text);
		 console.log(this.data.types);
		 var kt=this.data.types,acrs=[],zn=0;
		 
		 this.data.types_total=[];
		 for(var i=0;i<kt.length;i++){
			 snapshot.forEach(function(data){
				
				 if(data.val().type===kt[i]){
					 console.log(data.val());
					 zn++;
				 }
			 });
			 this.data.types_total.push({
				 key:kt[i],
				 val:zn
			 });
			 //acrs.push({kt[i]:zn});
			 zn=0;
		 }
		 console.log(this.data.types_total);//将所有数据按分类进行统计
		 this.setData({
			types_total: this.data.types_total
		 });
		 
		 
		},this);
	    
		//初始化提交标记
	    this.setData({
			submit_disabled:!this.data.submit_disabled
		});
	 
  },
  onReady:function(){
	  console.log('onReady');	
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
	console.log(this.data.submit_disabled);
	//阻止多次快速重复点击提交
	if(this.data.submit_disabled){
		console.log("多次快速重复点击提交");
		return;
	}
	this.setData({
		submit_disabled:!this.data.submit_disabled
	});
	
	var notes_type=e.detail.value.type;
	//that.data.types.push(notes_type);
	console.log(notes_type.trim());
	console.log(notes_type.trim().length);
	if(notes_type.trim().length<=0){
		wx.showToast({
		  title: '请输入分类',
		  icon: 'success',
		  duration: 2000,
		  success:function(){
			 
		  }
		});
		this.setData({
			submit_disabled:!this.data.submit_disabled
		});
		return;
	}
	this.ref.child("notes-type").push(notes_type.trim())
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
