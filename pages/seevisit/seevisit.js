// pages/seevisit/seevisit.jsconst $common = require('../../../utils/common.js');
const $api = require('../../utils/api.js')
const $common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: $api.video,//视频拼接
    Images: $api.Images,//图片拼接
    id:'',
    VrId: '',
    Use: false,
    focus: {},
    Name: '', //客户名称
    Contacts: '', //联系人
    phonenumber: '', //联系电话
    TalksTime: '', //会谈时间
    WayTime: '', //路途时间
    content: '', //具体内容
    Compressorxing: '', //压缩机型号
    Compressorpin: '', //压缩机品牌
    Compressornum: '', //压缩机数量
    Accessoryxing: '', //附属设备型号
    Accessorypin: '', //附属设备品牌
    Accessorynum: '', //附属设备数量
    Situationyun: '', //空压机运行时间
    Situationjia: '', //空压机加载时间
    Situationping: '', //空压机客户评价
    Situationcai: '', //空压机采购时间
    start: '1970-01-01',
    end: '',
    InnerTime: '', //拜访日期
    Division: ['OIS Visit', 'CTS Visit'], //Division
    division: '',
    visits: ['直销客户', 'OEM客户', '拜访代理商/经销商', '代理商的客户'], //拜访类型
    visit: '',
    objectives: [
      '直销\零件合约',
      '直销\FP定价工程项目',
      '直销\8000或16000小时保养',
      '直销\转子大修',
      '直销\SP年度保养',
      '直销\节能及管道',
      '间销\零件合约',
      '间销\转子大修',
      '间修\节能及管道',
      'OIS Machine',
    ], //目的
    objective: '',
    plans: [
      '直销：初次拜访,了解客户需求',
      '直销：提交报价,报价协商',
      '直销：商务谈判',
      '直销：签订合同',
      '直销：合同执行',
      '直销：应收款',
      '直销：投诉处理',
      '间销：发展潜在代理商',
      '间销：代理商沟通',
      '间销：代理商客户客户拜访',
      '间销：代理商培训',
      '例行拜访',
    ], //拜访计划
    plan: '',
    Results: [
      '直销：已拜访，了解需求',
      '直销：已拜访，提供了报价',
      '直销：已拜访，未提供报价',
      '直销：已拜访，有签单',
      '直销：已拜访，未签单',
      '直销：合同执行中',
      '直销：收款有进展',
      '直销：收款无进展',
      '直销：收款成功',
      '直销：投诉解决中',
      '直销：投诉已解决',
      '间销：该代理商有潜力，可发展',
      '间销：代理商沟通无进展',
      '间销：代理商客户客户拜访已完成',
      '间销：代理商培训已完成',
      '间销：代理商培训未完成',
    ], //拜访结果
    Result: '',
    imageList: [], //图片列表
    imageMaxNum: 5, //图片最大数量
    VideoList: [], //视频列表
    VideoMaxnum: 5,
    Location: '', //定位地址
    listData: '',
    VrCreateTime: '', //拜访日期
    VrVisitingDate: '',
    VrAirCompressorUsePurchase: '', //采购时间
    CompressorUsePurchase: '', //采购时间
    play:1,//视频播放
    videosrc:'',
  },
  //日期选择
  bindDateChange: function(e) {
    this.setData({
      InnerTime: e.detail.value
    })
  },
  //采购时间
  CompressorUsePurchase: function(e) {
    this.setData({
      CompressorUsePurchase: e.detail.value
    })
  },
  //Division
  division(e) {
    this.setData({
      division: e.detail.value,
    })
  },
  //拜访类型
  visit(e) {
    this.setData({
      visit: e.detail.value,
    })
  },
  //目的
  objective(e) {
    this.setData({
      objective: e.detail.value
    })
  },
  //拜访计划
  plan(e) {
    this.setData({
      plan: e.detail.value
    })
  },
  //拜访结果
  Result(e) {
    this.setData({
      Result: e.detail.value
    })
  },
  addImage() { //选择添加图片
    let {imageMaxNum,imageList} = this.data
    $common.chooseImage(imageMaxNum - imageList.length)
      .then(res => {
        $common.loading('上传中...')
        let imageList = this.data.imageList
        let tempFilePaths = res.tempFilePaths
        return Promise.all(tempFilePaths.map(item => $common.uploadImage(item))).then(res=>{
          // let img=[]
          for(let i=0;i<res.length;i++){
            imageList.push(JSON.parse(res[i].data).msg)
          }
          this.setData({
            imageList
          })
        })
      })
      .then(res => {
        $common.hide()
      })
  },
  deleteImage(e){
    let img=[];
    for (let i = 0; i < this.data.imageList.length;i++){
      img.push(this.data.Images+this.data.imageList[i])
    }
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: img // 需要预览的图片http链接列表
    })
  },
  addvalue() { //选择添加视频
    let {
      VideoMaxnum,
      VideoList
    } = this.data
    $common.chooseVideo(VideoMaxnum - VideoList.length)
      .then(res => {
        $common.loading('上传中...')
        let VideoList = this.data.VideoList
        let tempFilePath = res.tempFilePath
        // VideoList.push(tempFilePath)
        // this.setData({
        //   VideoList
        // })
        return $common.uploadVideo(res.tempFilePath).then(res=>{
          VideoList.push(JSON.parse(res.data).msg)
          this.setData({
            VideoList
          })
        })
      })
      .then(res => {
        $common.hide()
      })
  }, 
  end() {
    this.setData({
      play: 1
    })
  },
  play(e){
    this.setData({
      videosrc:e.target.dataset.src,
      play:2
    })
  },
  toast(str) {
    $common.showToast(str)
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
  test(num){
    return (num) =>(!(/(^[1-9]\d*$)/.test(num)))
  },
  Submission(data) { //判断所填信息是否完善
    let t = $common.trim(data)
    switch (false) {
      case t('Name'):
        return (this.getFocus('Name'), this.toast('请完善客户名称'));
        break
      case t('Contacts'):
        return (this.getFocus('Contacts'), this.toast('请输入联系人'));
        break
      case t('phonenumber'):
        return (this.getFocus('phonenumber'), this.toast('请输入联系电话'));
        break
      case t('InnerTime'):
        return this.toast('请完善拜访日期');
        break
      case t('division'):
        return this.toast('请完善Division');
        break
      case t('visit'):
        return this.toast('请完善拜访类型');
        break
      case t('objective'):
        return this.toast('请完善目的');
        break
      case t('plan'):
        return this.toast('请完善拜访计划');
        break
      case t('Result'):
        return this.toast('请完善拜访结果');
        break
      case t('TalksTime'):
        return (this.getFocus('TalksTime'),this.toast('请完善会谈时间'));
        break
      case t('WayTime'):
        return (this.getFocus('WayTime'),this.toast('请完善路途时间'));
        break
      case t('content'):
        return (this.getFocus('content'),this.toast('请完善具体内容'));
        break
      default:
        return true
    }
    
  },
  //提交
  submit(e) {
    console.log(e)
    let data = e.detail.value
    let { id, Name, Contacts, phonenumber, InnerTime, Division, division, visits, visit, objectives, objective, plans, plan, Results, Result, TalksTime, WayTime, content, imageList, VideoList, Location, Compressorxing, Compressorpin, Compressornum, Accessoryxing, Accessorypin, Accessorynum, Situationyun, Situationjia, Situationping, CompressorUsePurchase} = this.data
    data.visit = visits[visit] || ''
    data.division = Division[division] || ''
    data.InnerTime = InnerTime || ''
    data.objective = objectives[objective] || ''
    data.Result = Results[Result] || ''
    data.plan = plans[plan] || ''
    if (!this.Submission(data)) return
    if (data.Compressornum != '') {
      if (!(/^[1-9]+[0-9]*]*$/ .test(data.Compressornum))) return this.toast('压缩机产品数量只能是正整数字')
    } 
    if(data.Accessorynum!=''){
      if (!(/^[1-9]+[0-9]*]*$/.test(data.Accessorynum))) return this.toast('附属设备数量只能是正整数字')
    }
    $common.loading('正在提交')
    // let imageList = imageList.join('|')
    // console.log(imageList.join('|'))
    // let VideoList = VideoList.join('|')
    let VisiEntity = {
      VrCustId: id,
      VrCustName: data.Name,
      VrContacts: data.Contacts,
      VrContactNumber: data.phonenumber,
      VrVisitingDate: InnerTime,
      VrDivision: Division[division],
      VrCategory: visits[visit],
      VrObjective: objectives[objective],
      VrVisitPlan: plans[plan],
      VrVisitingResults: Results[Result],
      VrMeetingTime: data.TalksTime,
      VrJourneyTime: data.WayTime,
      VrContent: data.content,
      VrPhoto: imageList.join('|'),
      VrVideo: VideoList.join('|'),
      VrLocation: Location,
      VrCompressorModel: data.Compressorxing,
      VrCompressorBrand: data.Compressorpin,
      VrCompressorNum: data.Compressornum,
      VrEquipmentModel: data.Accessoryxing,
      VrEquipmentBrand: data.Accessorypin,
      VrEquipmentNum: data.Accessorynum,
      VrAirCompressorUseRun: data.Situationyun,
      VrAirCompressorUseLoad: data.Situationjia,
      VrAirCompressorUseEvaluate: data.Situationping,
      VrAirCompressorUsePurchase: CompressorUsePurchase,
    }
    let openid =wx.getStorageSync('openid')
    $common.request($api.PutVisitingRecordInfo, {
      OpenId: openid,
      VisiEntity: VisiEntity,
    }).then(res => {
      $common.hide()
      if(res.data.res){
        $common.showToast('提交成功')
        let { id, Name}=this.data
        wx.navigateBack({
          delta: 1
        })
      }else{
        if (res.data.errType == 4) {
          $common.showToast('上传至crm失败')
        } else if (res.data.errType == 1){
          $common.showToast('参数错误')
        } else if (res.data.errType == -1){
          $common.showToast('用户不存在')
        } else {
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
  },
  //返回
  return () {
    wx.navigateBack({
      delta: 1,
    })
  },
  //查看拜访
  details() {
    $common.loading()
    $common.request($api.GetVisitingRecordInfo, {
      VrId: this.data.VrId
    }).then(res => {
      if (res.data.res) {
        let data = res.data.Entity
        let VrCreateTime = $common.timeStamp(data.VrCreateTime).showTime;
        let VrVisitingDate = $common.timeStamp(data.VrVisitingDate).showTime;
        // console.log()
        let VrAirCompressorUsePurchase=''
        if (data.VrAirCompressorUsePurchase!="unll"){
          let VrAirCompressorUsePurchase = $common.timeStamp(data.VrAirCompressorUsePurchase).showTime;
        }else{
          let VrAirCompressorUsePurchase=''
        }
        let imageList = data.VrPhoto.split('|')
        let VideoList = data.VrVideo.split('|')
        if (VideoList[0] == "") {
          VideoList = ''
        }
        if (imageList[0] == "") {
          imageList = ''
        }
        this.setData({
          listData: res.data.Entity,
          VrCreateTime,
          VrVisitingDate,
          imageList,
          VideoList,
          VrAirCompressorUsePurchase
        })
      }
    }).then($common.hide())
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let Use = JSON.parse(options.Use)
    this.setData({
      Use: Use,
      VrId: Use ? options.VrId : '',
      id: options.id,
      Name: options.name,
    })
    if (Use) {
      this.details()
      wx.setNavigationBarTitle({
        title: '查看拜访'
      })
    }
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