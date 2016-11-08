//app.js
App({
  onLaunch: function () {
    var config = {
      syncURL: 'https://vue-001.wilddogio.com/'
    };
    wilddog.initializeApp(config);
    this.ref = wilddog.sync().ref();
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
  getTodoRef:function(path){
    return this.ref(path);
  },
  globalData:{
    userInfo:null
  }
})