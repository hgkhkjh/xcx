import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftgoodslist: [],
    rightgoodslist: [],
    currentIndex: 0,
    scrolltop:0
  },

  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地的接口数据
    const minedata = wx.getStorageSync("minedata");
    //如果本地数据不存在
    if (!minedata) {
      //调用方法调用数据
      this.getgoodslist()
    } else {
      if (Date.now() - minedata.time > 1000 * 300) {
        //如果数据过了
        //调用方法调用数据
        this.getgoodslist()
      } else {
        //本地数据存在
        //把本地数据赋值给cates
        this.cates = minedata.data
        //当cates有值时在调用下面的方法
        let left = this.cates.map((a) => {
          return a.cat_name
        })
        let rightgoodslist = this.cates[0].children;
        this.setData({
          leftgoodslist: left,
          rightgoodslist
        })
      }
    }
  },

  async getgoodslist() {
    // request({ url: "/categories" })
    //   .then(result => {
    //     this.cates = result.data.message
    //     //缓存 把接口数据存储到本地数据库中
    //     wx.setStorageSync("minedata", { time: Date.now(), data: this.cates });
    //     let left = this.cates.map((a) => {
    //       return a.cat_name
    //     })

    //     //  console.log(result.data.message);
    //     this.setData({
    //       leftgoodslist: left,
    //     })
    //   })
    const res=await request({ url: "/categories" })
    this.cates =res
        //缓存 把接口数据存储到本地数据库中
        wx.setStorageSync("minedata", { time: Date.now(), data: this.cates });
        let left = this.cates.map((a) => {
          return a.cat_name
        })
        this.setData({
                leftgoodslist: left,
              })
  },
  changetap(e) {

    const { index } = e.currentTarget.dataset
    // console.log(index);
    let right = this.cates[index].children
    this.setData({
      currentIndex: index,
      rightgoodslist: right,
      scrolltop:0
    })
  },

})