// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ]
  },
  onLoad: function (options) {
    let index=options.type-1
    this.tabtitlechange(index)
  },
  //根据传过来的不同索引来改变isactive
  tabtitlechange(index){
    this.data.tabs.map((a) => {
      if (a.id === index) {
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
  //顶部导航栏
  changetabscfs(e) {
    // console.log();
    let {index}=e.detail
    // console.log(index);
    //传入点击事件的索引给tabtitlechange
    this.tabtitlechange(index)
  },
  
})