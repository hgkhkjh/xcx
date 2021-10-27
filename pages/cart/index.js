// pages/cart/index.js
import { chooseAddress ,showModal} from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useraddress: {},
    shopgoods: {},
    allchecked: true,
    totalprice: 0,
    totalnum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    // 获取缓存中的收获地址
    const address = wx.getStorageSync("address")
    // 获取缓存中的购物车数据
    const shopgoods = wx.getStorageSync("shopgoods") || []
    // console.log(cart);
    this.setshopgoods(shopgoods)
    // shopgoods.forEach((a)=>{
    //   if(a.checked===true){
    //     totalprice+=a.goods_price*a.num
    //     totalnum+=a.num
    //   }else{
    //     allchecked=false
    //   }
    // })
    this.setData({
      useraddress: address,
    })
  },
  async handleChooseAddress() {
    let address = await chooseAddress()
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    wx.setStorageSync("address", address)

  },
  //改变缓存data中的数据
  setshopgoods(shopgoods) {
    let totalprice = 0
    let totalnum = 0
    let allchecked = true
    shopgoods.forEach(a => {
      if (a.checked === true) {
        totalprice += a.goods_price * a.num
        totalnum += a.num
      } else {
        allchecked = false
      }
    });
    // 判断数组是否为空
    allchecked = shopgoods.length != 0 ? allchecked : false;
    this.setData({
      shopgoods,
      totalprice,
      totalnum,
      allchecked
    })
    //处理好数据后存入缓存
    wx.setStorageSync("shopgoods", shopgoods)
  },
  //单选按钮
  checktap(e) {
    const { id } = e.currentTarget.dataset;
    const shopgoods = wx.getStorageSync("shopgoods") || []
    //利用findindex返回当前点击的索引值
    let index = shopgoods.findIndex((a) => {
      return a.goods_id === id
    })
    shopgoods[index].checked = !shopgoods[index].checked
    this.setshopgoods(shopgoods)
  },
  //全选按钮
  allchecktap() {
    let { shopgoods, allchecked } = this.data
    allchecked = !allchecked
    
   shopgoods.forEach((a)=>{
       a.checked=allchecked
    })
  this.setshopgoods(shopgoods)
  },
  //增加减少按钮
  async addbtn(e){
    let { key, id } = e.currentTarget.dataset;
    let { shopgoods} = this.data
    let index=shopgoods.findIndex((a)=>{
      return a.goods_id===id
    })
    if (shopgoods[index].num === 1 && key === -1){
      const res = await showModal({ content: "您是否要删除？" });
      if (res.confirm) {
        shopgoods.splice(index, 1);
        this.setshopgoods(shopgoods);
      }
   
    }else{
       // console.log(e.currentTarget.dataset);
          // 4  进行修改数量
          shopgoods[index].num += key;
          // 5 设置回缓存和data中
          this.setshopgoods(shopgoods);
    }
   
  }
})