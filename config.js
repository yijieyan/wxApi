module.exports = {
  port: 3000,
  dbUrl: 'mongodb://localhost:27017/wxApi',
  prefix: 'https://qyapi.weixin.qq.com/cgi-bin/',
  corpid: '',
  corpsecret: [
    {
      userToken: '', //通讯录
    },
    {
      clockToken: ''
    },
    {
      approveToken: ''
    },
    {
      test1Token: ''
    }
  ],
  clockAgentid: '',
  approvalAgentid: '',
  test1Agentid:'',
  test1Token: 'test1',
  test1AESKey: '',
  domain: 'http://yijie123.free.ngrok.cc'
}
