// pages/seevisit/seevisit.jsconst $common = require('../../../utils/common.js');
const $api = require('../../utils/api.js')
const $common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [], //省份
    customItem: '',
    division: '',
    visits: ['矿业(不包括石油和天然气) - 2121',
      '天然气输配 - 2212',
      '石油化工和煤化工 - 3241',
      '其他化工(化学原料， 化学制品等) - 3251',
      '钢铁 - 3311',
      '铝和氧化铝冶炼 - 3313',
      '其它金属(如铜， 铅， 锌等)冶炼 - 3314',
      '电厂(不包括核电) - 2211',
      '核电 - 221113',
      '污水处理 - 2213',
      '食品和饮料制造业 - 3121',
      '烟草加工 - 3122',
      '药品和医药制造业 - 3254',
      '纺织化纤 - 3131',
      '造纸业 - 3221',
      '空分 - 32512',
      '玻璃制品制造业 - 3272',
      '水泥 - 3273',
      '机械制造业(工程机械和工业机械) - 3332',
      '电子(电子元器件， 液晶屏，组件等) - 3344',
      '电器和电气设备(电器设备，家用电器等) - 3353 ',
      '塑料和橡胶(包括轮胎) - 3262',
      '汽车 - 3361',
      '火车和飞机 - 3365',
      '造船 - 3366',
      '船用 - 336611',
      '工程 / 总包公司 - 2381',
      '建筑 - 23',
      '住宅建筑 - 2361',
      '非住宅建筑 - 2362',
      '重工业和土木工程建筑 - 237',
      '施工建筑 - 236',
      '农业,林业,渔业和狩猎业 - 11',
      '农具制造业 - 33311',
      '管道输送 - 486',
      '教育机构 - 611',
      '批发贸易 - 42',
      '机械,设备,用品批发商 - 4238',
      '燃料经销商 - 45431',
      '仓储 - 493',
      '房地产 - 531',
      '租用租凭服务 - 532',
      '租凭中心 - 5323',
      '建筑,交通,采矿,林业机械及设备租赁 - 53241',
      '建筑,工程和相关服务业 - 5413',
      '房地产租赁 - 53',
      '油气井钻探 - 213111',
      '公共事业设备 - 221',
      '汽车维修和保养 - 8111',
      '其他专业,科学及技术服务 - 541990',
      '公共管理 - 92'
    ], //行业
    visit: '',
    plans: [
      '终端客户',
      '设计院',
      '工程公司',
      '中间商',
      'OEM',
      '经销商',
      '代理商'
    ], //客户类别
    plan: '',
    Name: '', //公司名称
    address:'',//地址
    area:'',//区域
    focus: {},
  },
  //省份
  bindRegionChange(e) {
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //行业
  visit(e) {
    this.setData({
      visit: e.detail.value,
    })
  },
  //客户类别
  plan(e) {
    this.setData({
      plan: e.detail.value
    })
  },
  toast(str) {
    $common.showToast(`请完善${str}`)
  },
  getFocus(key) { //使其主动获得焦点
    let {
      focus
    } = this.data
    if (!focus[key]) focus[key] = false
    let keys = `focus.${key}`
    this.setData({
      [keys]: true
    })
  },
  Submission(data) { //判断所填信息是否完善
    let t = $common.trim(data)
    console.log(data)
    switch (false) {
      case t('Name'):
        return (this.getFocus('Name'), this.toast('客户名称'));
        break
      case t('address'):
        return (this.getFocus('address'), this.toast('地址'));
        break
      case t('visit'):
        return this.toast('行业');
        break
      case t('plan'):
        return this.toast('客户类别');
        break
      default:
        return true
    }
  },
  submit(e) {
    console.log(e)
    let data = e.detail.value
    let { Name, region, address, area, visits, visit, plans, plan} = this.data
    data.visit = visits[visit] || ''
    data.plan = plans[plan] || ''
    if (region.length<1) return this.toast('城市');
    if (!this.Submission(data)) return
    $common.loading('正在提交')
    // 【CustEntity 实体  CustName：客户名称，CustCode客户代码，CustProvince客户省份 ，CustCity  客户城市   CustAddress客户地址  CustRegion客户区域   CustIndustry行业   CustApplicationArea：应用领域    CustCategory：类别   CustSuId：所属销售ID   CustIsPushCRM：0】 
    let CustEntity={
      CustName:data.Name,
      CustProvince: region[0],
      CustCity:region[1],
      CustAddress: data.address,
      CustRegion: data.area,
      CustIndustry: visits[visit],
      CustCategory: plans[plan],
      CustSuId:0,
      CustIsPushCRM:0
    }
    let openid=wx.getStorageSync('openid')
    $common.request($api.PutCustCustomerInfo,{
      OpenId:openid,
        CustEntity: CustEntity
    }).then(res=>{
      $common.hide()
      if(res.data.res){
       
          $common.showToast('提交成功')
          wx.switchTab({
            url: '../index/index',
          })
          this.setData({
            Name: '', region: '', address: '', area: '', visit: '', plan: ''
          })
     
      } else {
        // 【errType = 1   参数错误】【errType = -1用户不存在】【errType = 2  客户已存在】【errType = 4  上传至CRM失败】【errType = -2  提交失败】
        if (res.data.errType == 4) {
          $common.showToast('上传至crm失败')
        }else if (res.data.errType == 1) {
          $common.showToast('参数错误')
        } else if (res.data.errType == -1) {
          $common.showToast('用户不存在')
        } else if (res.data.errType == 2) {
          $common.showToast('客户已存在')
        } else if (res.data.errType == -2) {
          $common.showToast('提交失败')
        }else{
          $common.showToast('上传失败')
        }
      }
    })
  },
  Location() { //获取当前位置
    $common.getLocation()
      .then(res => $common.reverseGeocoder(res))
      .then(res => this.setData({
        Location: res.result.address
      }))
    console.log(this.data.Location)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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