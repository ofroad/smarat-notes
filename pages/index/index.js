//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  createNote: function() {
    wx.navigateTo({
      url: '../edit/edit?type=create'
    })
  },
  onLoad:function(){//一个页面只会调用一次。
	  console.log('onLoad');
  },
  onReady:function(){//一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
	  console.log('onReady');
  },
  onShow: function () {//每次打开页面都会调用一次，这样从别的页面到达这个页面都可以看到最新的数据
    console.log('onShow');
    this.ref = app.getTodoRef()
    this.ref.child("notes-list").orderByKey().on('value',function(snapshot,prKey){
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
	 var kt=["历史","文学","油画","工作"],acrs=[],zn=0;
	 
	 
	 for(var i=0;i<kt.length;i++){
		 snapshot.forEach(function(data){
			
			 if(data.val().type===kt[i]){
				 console.log(data.val());
				 zn++;
			 }
	     });
		 acrs.push(kt[i]+"-"+zn);
		 //acrs.push({kt[i]:zn});
	     zn=0
	 }
	 console.log(acrs);//将所有数据按分类进行统计
	 
    },this);
    this.ref.on('child_removed',function(snapshot){
      //var key = snapshot.key()
	  /*
      var index = this.data.todos.findIndex(function(item,index){
        if(item.key == key ){
          return true
        }
        return false
      })
      if(index>=0){
        this.data.todos.splice(index,1)
        this.setData({
          todos:this.data.todos
        })
      }
	  */
	  
    },this);
	
  }
})
