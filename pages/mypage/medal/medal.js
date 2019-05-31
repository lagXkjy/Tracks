// pages/mypage/medal/medal.js
const $common = require('../../../utils/common.js');
const $api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    MedalLevel: $api.MedalLevel,
  },
  GetSaleUser() {
    $common.loading()
    $common.request($api.GetSaleUser, {
      OpenId: wx.getStorageSync('openid')
    }).then(res => {
      if (res.data.res) {
        this.setData({
          listData: res.data.Data
        });
      }
    }).then($common.hide).then(wx.stopPullDownRefresh())
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetSaleUser()
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})