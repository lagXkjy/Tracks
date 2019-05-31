// pages/mypage/ranking/ranking.js
const $common = require('../../../utils/common.js');
const $api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    pageSize: 10,
    listData:[],//排名
    NowUserRanking:[],//当前用户排名
  },
  GetSaleVisiRanking(){
    $common.loading()
    this.data.pageIndex++;
    $common.request($api.GetSaleVisiRanking,{
      OpenId:wx.getStorageSync('openid'),
      page: this.data.pageIndex,
      pagesize: this.data.pageSize
    }).then(res=>{
      if(res.data.res){
        let data = res.data;
        let listData = this.data.listData;
        listData = listData.concat(data.RankInfos);
        this.setData({
          listData: $common.unique(listData, 'SuId'),
          NowUserRanking: data.NowUserRanking
        });
      }
      }).then($common.hide()).then(wx.stopPullDownRefresh())
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetSaleVisiRanking()
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
    this.GetSaleVisiRanking()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.GetSaleVisiRanking()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})