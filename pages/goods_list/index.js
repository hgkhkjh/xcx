// pages/goods_list/index.js
import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    //商品数据
    goodlist: []
  },
  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //cid'被寄存到options里面了
    //把cid赋值给上面然后在用下面的动态获取
    //为空的不影响
    console.log(options);
    this.QueryParams.cid=options.cid||"";
    this.QueryParams.query=options.query||"";
    this.getgoodlist()
  },
  //发送商品数据
  async getgoodlist() {
    const res = await request({ url: "/goods/search", data: this.QueryParams })
     console.log(res);
    // 计算总页数
    this.totalPages = Math.ceil(res.total / this.QueryParams.pagesize);
    this.setData({
      //拼接数据，原来的数据+下拉请求的数据
      goodlist: [...this.data.goodlist, ...res.goods]
    })
    //当借口数据处理完成之后在关闭下拉刷新窗口
    //没有下拉刷新窗口也不会报错
    wx.stopPullDownRefresh();
  },
  //导航栏逻辑
  changetabscfs(e) {
    // console.log(e.detail.index);
    this.data.tabs.map((a) => {
      if (a.id === e.detail.index) {
        a.isActive = true
        return a
      } else {
        a.isActive = false
        return a
      }

    })
    this.setData({
      tabs: this.data.tabs
    })
  },
  onReachBottom() {
    console.log("sadasd");
    //如果现在的页数小于总页数
    if (this.QueryParams.pagenum < this.totalPages) {
      this.QueryParams.pagenum++
      this.getgoodlist()
    }
    //如果现在的页数大于总页数
    else {
      wx.showToast({ title: '没有更多商品了哦~' });
    }

  },
  onPullDownRefresh() {
    // 1 重置数组
    this.setData({
      goodlist: []
    })
    // 2 重置页码
    this.QueryParams.pagenum = 1;
    this.getgoodlist()
  }
})