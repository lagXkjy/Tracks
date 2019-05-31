const phoneReg = /^(1[3456789]|9[28])\d{9}$/ // 正则手机号码
const http =`footprint.1-zhao.fun`
const host = `https://${http}`
const MedalLevel = `${host}/MedalLevel/`
const Images = `${host}/MultiMedia/Images/`
const video = `${host}/MultiMedia/video/`
module.exports = {
  phoneReg,
  MedalLevel,
  video,
  Images,
  //获取openid
  GetSaveUserOpenId: `${host}/FootprintLtp/UserInfo/GetSaveUserOpenId`,
  //绑定销售用户信息
  BandingSaleUser: `${host}/FootprintLtp/UserInfo/BandingSaleUser`,
  // 获取某销售的客户列表 搜索
  GetSaleCustomerList: `${host}/FootprintLtp/SaleCustomer/GetSaleCustomerList`,
  // 获取某销售拜访某客户的记录
  GetCustVisitingRecordList: `${host}/FootprintLtp/SaleCustomer/GetCustVisitingRecordList`,
  // 获取拜访记录详情
  GetVisitingRecordInfo: `${host}/FootprintLtp/SaleCustomer/GetVisitingRecordInfo`,
  //添加拜访记录
  PutVisitingRecordInfo: `${host}/FootprintLtp/SaleCustomer/PutVisitingRecordInfo`,
  //新增客户信息
  PutCustCustomerInfo: `${host}/FootprintLtp/SaleCustomer/PutCustCustomerInfo`,
  //上传图片
  UpLoadImg: `${host}/FootprintLtp/SaleCustomer/UpLoadImg`,
  //上传视频
  UploadVideo: `${host}/FootprintLtp/SaleCustomer/UploadVideo`,
  // 获取排名信息
  GetSaleVisiRanking: `${host}/FootprintLtp/SaleCustomer/GetSaleVisiRanking`,
  //获取销售用户信息
  GetSaleUser: `${host}/FootprintLtp/UserInfo/GetSaleUser`,
  //查看详情
  GetCustomerInfo: `${host}/FootprintLtp/SaleCustomer/GetCustomerInfo`,
}