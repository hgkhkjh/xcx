let requestnum=0;
export const request=(params)=>{
  //没调用一次request就让ruquestnum数目加1
  requestnum++
    // 显示加载中 效果
    wx.showLoading({
      title: "加载中",
      mask: true
    });
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
      wx.request({
        ...params,
        url:baseUrl+params.url,
        success:(result)=>{
            resolve(result.data.message)
        },
        fail:(err)=>{
            reject(err)
        },
        complete:()=>{
          requestnum--;
          if(requestnum===0){
            //  关闭正在等待的图标
            wx.hideLoading();
          }
         }
      });
  })
}


