import{request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据
    swiperlist:[],
    //导航数据
    navlist:[],
    //楼层数据
    floorlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     console.log(result);
    //     this.setData({
    //       swiperlist:result.data.message
    //     })
        
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    this.getswiperlist()
    this.getnavlist()
    this.getfloorlist()
  },
  //获取轮播图数据
  async getswiperlist(){
    // request({url:"/home/swiperdata"})
    // .then(result=>{
    //   // console.log(result);
    //   this.setData({
    //     swiperlist:result.data.message
    //   })
    // })
    const res= await request({url:"/home/swiperdata"})
    console.log(res);
    this.setData({
      swiperlist:res
    })
  },
  //获取导航栏数据
  async getnavlist(){
    // request({url:"/home/catitems"})
    // .then(result=>{
    //   // console.log(result);
    //   this.setData({
    //     navlist:result.data.message
    //   })
    // })
    const res= await request({url:"/home/catitems"})
    this.setData({
      navlist:res
    })
  },
  //获取楼层数据
  async getfloorlist(){
    // request({url:"/home/floordata"})
    // .then(result=>{
    //   console.log(result.data.message[0].product_list[0].image_src);
    //   this.setData({
    //     floorlist:result.data.message
    //   })
    // })
    const res= await request({url:"/home/floordata"})
    this.setData({
          floorlist:res
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})