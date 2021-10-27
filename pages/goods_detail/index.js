import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsdetail: {},
    iscollect: true
  },
  //定义一个全局变量用于保存方法打图片的数组
  //后面实现添加购物车也用到这个数组
  bigimgs: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取goods_list页面传过来的url参数
    const { goods_id } = options
    this.getgoodsdetail(goods_id)
    //  console.log(this.goodsdetail[2].goods_id);
  },
  onShow: function (options) {
    //拿到id然后传给getgoodsdetail发送请求
    let page = getCurrentPages()
    // console.log(page[page.length-1].options);
    const goods_id = page[page.length - 1].options.goods_id
    console.log(goods_id);
    this.getgoodsdetail(goods_id)
  },
  //获取商品详情页面的数据
  async getgoodsdetail(goods_id) {
    //接口文档告诉需要传一个goodsid过去来获取每个商品
    const goodsdetail = await request({ url: "/goods/detail", data: { goods_id: goods_id } })  // console.log(res);
    //给用于保存放大图片的数组赋值、
    this.bigimgs = goodsdetail
    let collect = wx.getStorageSync("collect") || [];
    // 判断当前商品是否被收藏 some只有有一个就返回true
    //来改变iscollect的值
    //如果从clooect里面获取到此商品的id就证明他被收藏了
    let iscollect = collect.some((a)=>{
      return a.goods_id === this.bigimgs.goods_id
    });
    this.setData({
      goodsdetail: {
        goods_name: goodsdetail.goods_name,
        goods_price: goodsdetail.goods_price,
        // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        goods_introduce: goodsdetail.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsdetail.pics
      },
      iscollect
    })
  },
  //收藏商品
  collecttap(){
       //定义一个iscollect用来代表iscollect
       let iscollect=false
       let collect=wx.getStorageSync("collect")||[];
       let index=collect.findIndex(v=>v.goods_id===this.bigimgs.goods_id);
       if(index!==-1){
         collect.splice(index,1);
         iscollect=false;
         wx.showToast({
           title: '取消成功',
           icon: 'success',
           mask: true
         });
           
       }else{
         // 没有收藏过
         //把collect
         collect.push(this.bigimgs);
         iscollect=true;
         wx.showToast({
           title: '收藏成功',
           icon: 'success',
           mask: true
         });
       }
       // 把collect添加到缓存中
       wx.setStorageSync("collect", collect);
       this.setData({
         iscollect
       })
  },
  //放大图片函数
  bigimg(e) {
    let url = e.currentTarget.dataset.url
    console.log(this.bigimgs.pics);
    let urls = this.bigimgs.pics.map((a) => {
      return a.pics_mid
    })
    // console.log(e.currentTarget.dataset.url);
    wx.previewImage({
      current: url,
      urls: urls,
    });

  },

  //添加到购物车
  addshop() {
    //第一次添加时是没有数据的
    let shopgoods = wx.getStorageSync("shopgoods") || [];
    //.findIndex方法用于赛选符合条件的数组如果有返回对应的索引，没有返回-1
    let index = shopgoods.findIndex((a) => {
      return a.goods_id === this.bigimgs.goods_id
    })
    // console.log(index);
    if (index === -1) {
      //3  不存在 第一次添加
      this.bigimgs.num = 1;
      this.bigimgs.checked = true
      // this.bigimgs.checked = true;
      shopgoods.push(this.bigimgs);

    } else {
      // 4 已经存在购物车数据 执行 num++
      shopgoods[index].num++;
    }
    //处理好之后重新添加到缓存中
    wx.setStorageSync("shopgoods", shopgoods);
    console.log(this.bigimgs.num);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });

  }
})