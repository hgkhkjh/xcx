// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商家/商品投诉",
        isActive: false
      }
    ],
    choiceimgs:[],
    textval:''
  },
  imglist:[],
  choiceimgs:[],
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
  //输入反馈的文本框
  changetext(e) {
    this.setData({
      textval: e.detail.value
    })
  },
  choiceimg(){
    wx.chooseImage({
      //同时选中的图片数量
      count: 5,
      // 图片的格式
      sizeType: ['original', 'compressed'],
      // 图片的来源
      sourceType: ['album', 'camera'],
      //箭头函数改变this指向
      success:(res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
       this.setData({
        choiceimgs:[...this.data.choiceimgs,res.tempFilePaths]
       })
      }
    })
  },
  delete(e){
    const { index } = e.currentTarget.dataset;
    this.choiceimgs=this.data.choiceimgs
   this.choiceimgs.splice(index, 1);
    this.setData({
      choiceimgs:this.choiceimgs
    })
  },
  // 提交
  submit(){

    let {textval,choiceimgs}=this.data
    if(!textval.trim()){
      //如果没有输入内容
      wx.showToast({
        title: '请输入内容哦',
        duration: 1500,
        icon:"none",
        mask: true,
      });
      return
    }
   //上传反馈意见
   //不能批量上传，要遍历数组上传
// choiceimgs.forEach(a => {
//     var upTask = wx.uploadFile({
//      //图片要上传到哪里
//      url: 'https://img.coolcr.cn/api/upload',
//      //被上传的文件路径
//      filePath:a,
//      //上传二年间的名称
//      name:"image" ,
//      //上传文件的文本信息
//      formData: {},
//      success: (result)=>{
//        console.log(result);
//      },
//      fail: ()=>{},
//      complete: ()=>{}
//    });
// });
 
  }

})