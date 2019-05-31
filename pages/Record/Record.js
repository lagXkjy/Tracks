// pages/Record/Record.js
const $common = require('../../utils/common.js');
const $api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    pageSize: 10,
    id:'',
    name:'',//公司名称
    listData:[]
  },
  see(e){
    let VrId=e.target.dataset.id
    wx.navigateTo({
      url: `../seevisit/seevisit?Use=true&VrId=${VrId}&id=${this.data.id}&name=${this.data.name}`,
    })
  },
  list(){
    // 【OpenId】【CustId：客户ID】【PageSize】【page】
    $common.loading();
    let openid = wx.getStorageSync('openid')
    let { pageSize, pageIndex, id } = this.data
    this.data.pageIndex++;
    $common.request($api.GetCustVisitingRecordList, {
      OpenId:openid,
      CustId:id,
      PageSize: pageSize,
      page: pageIndex
    }).then(res => {
        if (res.data.res) {
          let data = res.data;
          let listData = this.data.listData;
          listData = this.data.listData.concat(data.custInfos);
          for (let i = 0, len = listData.length; i < len; i++) {
            let data=listData[i].VrVisitingDate
            let date = $common.timeStamp(data).showTime;
            listData[i].VisitingDate = date
          }
          this.setData({
            listData: $common.unique(listData, 'VrId')
          });
        }
      }).then($common.hide()).then(wx.stopPullDownRefresh())
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      name: options.name
    })   
     this.list();
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
    this.data.listData = []
    this.data.pageIndex = 1;
    this.list();
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
    this.data.listData = []
    this.data.pageIndex = 1;
    this.list();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.list()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})