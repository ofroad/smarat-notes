
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
	key:"",
	notes_detail:{}
  },
  onLoad: function (options) {
    console.log('onLoad');
	console.log(options);
	this.data.key=options.key;
	this.setData({
       key:this.data.key
    });
    //var that = this
  },
  onShow:function(){
	 console.log('onShow');
	 var that = this;
	 this.ref = app.getTodoRef();
	 this.ref.child("notes-list"+"/"+that.data.key).on('value',function(snapshot,prKey){
		 console.log(snapshot.key());
		 console.log(snapshot.val());
		 console.log(snapshot.exists());
		 if(snapshot.exists()){
			  console.log(snapshot.val().timeUpdate);
			 this.data.notes_detail=snapshot.val();
			 this.setData({
			   notes_detail:this.data.notes_detail
			 });
		 }else{
			 wx.showToast({
			  title: '删除成功',
			  icon: 'success',
			  duration: 2000,
			  success:function(){
				  setTimeout(function(){
					  wx.navigateTo({
						  url: '../../my'
					  });
				  },5000);
				  
			  }
			 })
		 }
		
		 
		// console.log(this.data.notes_detail.time-update);
	 },this);
  },
  onReady:function(){
	 console.log('onReady'); 
  },
  modifyNote:function(){
	  console.log("修改");
	  wx.navigateTo({
		  url: '../../../edit/edit?type=edit'+"&key="+this.data.key+"&title="+this.data.notes_detail.title+"&contents="+this.data.notes_detail.contents+"&notetype="+this.data.notes_detail.type
	  })
  },
  deleteNote:function(){
	  console.log("删除");
	  var that=this;
	  this.ref = app.getTodoRef()
	  //this.ref.child("/notes-list"+"/"+this.data.key).remove();
	  wx.showModal({
		  title: '提示',
		  content: '确定删除这条笔记吗？',
		  success: function(res) {
			if (res.confirm) {
			  console.log('用户点击确定');
			  that.ref.child("/notes-list"+"/"+that.data.key).remove();
			}
		  }
	  });
	  
  }
})
