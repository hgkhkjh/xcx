// pages/search/index.js
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   goodssearch:[],
   ishiddden:false,
   inpvalue:""
  //  err:""
  },
  timeout:-1,
  changeinout(e) {
    console.log(e.detail.value);
    let { value } = e.detail
    //合法检验
    if (!value.trim()) {
      // this.setData({
      //   // err:"不要输入空格哦"                                 
      // })
      // 值不合法
      return;
    }else if(value===null){
       this.setData({
        goodssearch:[]
       })
    }
    this.setData({
      ishiddden:true
    })
    clearTimeout(this.timeout)
    //防抖 当输入的间隔大于一秒的时候发送请求，小于一秒的时候清除定时器
    this.timeout= setTimeout(() => {
      this.goodsearch(value)
    }, 500);
    

  },
  cancelbtn(){
    this.setData({
      inpvalue:"",
      ishiddden:false,
      goodssearch:[],
      nofound:""
    })
  },
  //发送请求
  async goodsearch(query) {
    let res = await request({ url: "/goods/qsearch", data: { query } })
    console.log(res);
    if(res.length===0){
      this.setData({
        goodssearch:res,
        nofound:"没有找到您输入的商品哦~/(ㄒoㄒ)/~~"
      })
      // console.log("asdadasd");
    }else{
       this.setData({
     goodssearch:res,
     nofound:""
   })
  
    } 
  }

})