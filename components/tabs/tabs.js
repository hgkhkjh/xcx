// components/tas/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    changetabs(e){
      const {index}=e.currentTarget.dataset;
      // console.log(index);
      //数据通信子组件给父组件 前面是穿出去的方法名字后面是传出去的值
      this.triggerEvent("changetabscf",{index:index});
    }
  }
})
