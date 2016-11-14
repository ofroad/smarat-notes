var wilddog = require('wilddog-weapp-all');
//app.js
App({
  onLaunch: function () {
	var that = this;
	this.getUserInfo(
		function(userInfo){
			var config = {
			  syncURL: 'https://vue-001.wilddogio.com'
			}
			that.wilddog=wilddog.initializeApp(config)
			that.ref = wilddog.sync().ref("/users/"+userInfo.nickName) 
		}
	); 

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  addItem:function(text){
    this.ref.push(text)
  },
  getTodoRef:function(){
	console.log("414123");
    return this.ref
  },
  getwilddog:function(){
	//console.log("414123");
    return this.wilddog
  },
  globalData:{
    userInfo:null
  }
})