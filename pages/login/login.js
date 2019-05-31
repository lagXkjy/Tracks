const $common = require('../../utils/common.js');
const $api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Address: '', //地址
    phone: '',
    openid: '',
    code:''
  },
  logins() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  inputPhone(e) {
    this.data.phone = e.detail.value
  },
  submit() {
    // 参数：【OpenId】【Phone：手机号码】【NickName：昵称】【AvaUrl：头像】
    let {phone} = this.data
    if (!$api.phoneReg.test(phone)) return $common.showToast('手机号不正确')
    this.getopenid()
  },
  //获取openid
  getopenid() {
    $common.loading()
    let openid = wx.getStorageSync('openid')
    let userinfo = wx.getStorageSync('userinfo')
    $common.getOpenId().then(() => $common.request($api.BandingSaleUser, {
        OpenId: openid,
        Phone: this.data.phone,
        NickName: userinfo.nickName,
        AvaUrl: userinfo.avatarUrl
      })).then(res => {
        console.log(res)
        $common.hide()
        if (res.data.res) {
          this.logins()
          if(res.data.errtype==2){
            $common.showToast('用户已绑定')
          }
        } else {
          $common.showToast('绑定失败')
        }
      }).then($common.hide())
  },
  //获取基本信息
  info() {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              wx.setStorageSync('userinfo', res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    let that=this
    let info = e.detail.userInfo
    wx.setStorageSync('userinfo', info)
    //信息缓存
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      if (wx.getStorageSync('userinfo')){
        that.submit()
      }else{
        wx.showModal({
          content: "授权成功",
          showCancel: false,
          confirmText: '知道了',
          success: function (res) {
            that.submit()
          }
        })
      }
    } else {
      wx.showModal({
        content: "您已拒绝授权",
        showCancel: false,
        confirmText: '知道了',
        success: function(res) {
          that.setData({
            showModal2: false
          });
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(123)
    // $common.getOpenId().then((res) => {
    //   if (wx.getStorageSync('userId')>0) this.logins()
    // })
    this.info()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})