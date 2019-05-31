// pages/index/index.js
const $common = require('../../utils/common.js');
const $api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    pageSize: 10,
    value: '', //搜索内容
    listData: [],
    hover: false, //搜索下拉框显示隐藏
    title: '所有客户',
    titlelist: [{
        name: '所有客户'
      },
      {
        name: '商机客户'
      },
      {
        name: '非商机客户'
      },
    ]
  },
  // 小董先森:
  //   SaleCustomer / GetCustVisitingRecordList  获取某销售拜访某客户的记录【OpenId】【CustId：客户ID】【PageSize】【page】

  // 小董先森:
  //   SaleCustomer / GetVisitingRecordInfo      获取拜访记录详情【VrId：记录ID】
  inputTyping(e) {
    this.data.value = e.detail.value
  },
  title() {
    this.setData({
      hover: true
    })
  },
  hover(e) {
    this.setData({
      title: e.currentTarget.dataset.name,
      hover: false
    })
  },
  //搜索
  search() {
    this.data.listData = []
    this.data.pageIndex = 1;
    // this.CustomerList() 
    $common.loading();
    let openid = wx.getStorageSync('openid')
    let {
      pageSize,
      pageIndex,
      value,
      title
    } = this.data
    if (title=='所有客户'){
      title=''
    }
    this.data.pageIndex++;
    $common.request($api.GetSaleCustomerList, {
      OpenId: openid,
      PageSize: pageSize,
      page: pageIndex,
      CustName: value,
      CustSource:title
    }).then(res => {
      if (res.data.res) {
        let data = res.data;
        let listData = this.data.listData;
        listData = listData.concat(data.custInfos);
        this.setData({
          listData: $common.unique(listData, 'CustId')
        });
      } else if (res.data.errType == 6) {
        this.setData({
          listData: []
        });
      }
    }).then($common.hide()).then(wx.stopPullDownRefresh())
  },
  //获取页面数据
  CustomerList() {
    $common.loading();
    let openid = wx.getStorageSync('openid')
    let {
      pageSize,
      pageIndex,
      value
    } = this.data
    this.data.pageIndex++;
    $common.request($api.GetSaleCustomerList, {
      OpenId: openid,
      PageSize: pageSize,
      page: pageIndex,
      CustName: value,
      CustSource:''
    }).then(res => {
      if (res.data.res) {
        let data = res.data;
        let listData = this.data.listData;
        listData = listData.concat(data.custInfos);
        this.setData({
          listData: $common.unique(listData, 'CustId')
        });
      }
    }).then($common.hide()).then(wx.stopPullDownRefresh())
  },
  //跳转拜访记录页面
  Record(e) {
    let id = e.target.dataset.id
    let name = e.target.dataset.name
    wx.navigateTo({
      url: `../Record/Record?id=${id}&name=${name}`,
    })
  },
  //跳转新增拜访
  Newvisits(e) {
    let id = e.target.dataset.id
    let name = e.target.dataset.name
    wx.navigateTo({
      url: `../seevisit/seevisit?Use=false&id=${id}&name=${name}`,
    })
  },
  //跳转查看详情页面
  information(e) {
    let SuId = e.currentTarget.dataset.suid
    console.log(e)
    wx.navigateTo({
      url: `../information/information?SuId=${SuId}`
    })
  },
  logins() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $common.getOpenId().then((res) => {
      if (wx.getStorageSync('userId')<1) this.logins()
    }).then(res=>{
      this.data.pageIndex = 1;
      this.CustomerList()
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.data.listData = []
    this.data.pageIndex = 1;
    this.CustomerList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.listData = []
    this.data.pageIndex = 1;
    this.CustomerList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.CustomerList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})