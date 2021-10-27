// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    collectnum:0
  },
  userInfoHandler(e){
    // console.log(e.detail.userInfo);
    const {userInfo}=e.detail;
    wx.setStorageSync("userinfo", userInfo);
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({
      userinfo
    })
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    let collectnum=wx.getStorageSync("collect").length
    console.log(collectnum);
    this.setData({
      userinfo,
      collectnum
    })
  }
})