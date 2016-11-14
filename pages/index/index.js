//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
	notes_newest:[]
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
	var that=this;
    this.ref = app.getTodoRef()
    this.ref.child("notes-list").on('value',function(snapshot,prKey){
      var key = snapshot.key();
      var text = snapshot.val();

      //var newItem = {key:key,text:text}
      //this.data.todos.push(newItem)
     // this.setData({
      //  todos:this.data.todos
     // })
	 console.log(snapshot.exists());//判断此节点下有无数据
	 //console.log(prKey);
	 console.log(key);
	 console.log(text);
	 that.data.notes_newest=[];
	 snapshot.forEach(function(data){
		//console.log(typeof data.val());
		console.log(data.key());
		console.log(data.val());
		var key_in = data.key();
        var text_in = data.val();
		var newItem = {key:key_in,text:text_in};
		that.data.notes_newest.push(newItem);
	 });
	 that.data.notes_newest=that.data.notes_newest.reverse().slice(0,10);
	 console.log(that.data.notes_newest);
	 this.setData({
       notes_newest:this.data.notes_newest
     });
	 
	 
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
	
  },
  viewDetail:function(e){
	  console.log(e.target.dataset.key);
	  wx.navigateTo({
		  url:"../my/list/view/view?key="+e.target.dataset.key
	  })
  }
})
