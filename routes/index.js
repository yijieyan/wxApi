const router = require('koa-router')()
const {prefix} = require('../config')
const {requestApi} = require('../libs/ajax')
const User = require('../models/user')
router.prefix('/aaa')

/**
 * 网页授权
 * @type {Object}
 */
router.get('/', async (ctx, next) => {
  let {code} = ctx.query
  let options = {
    url: `${prefix}user/getuserinfo?access_token=${ctx.test1Token}&code=${code}`,
    method: 'GET',
    json: true
  }

  let user = await requestApi(options) // todo code 换取 user_ticket
  if (user.errcode === 0) {
    if (user.UserId) {
      let u = await User.findOne({userId: user.UserId})
      if (!u) {
        let obj = {
          uri: `${prefix}user/getuserdetail?access_token=${ctx.test1Token}`,
          method: 'POST',
          body: {
            user_ticket: user.user_ticket
          },
          json: true
        }
        let userDetail = await requestApi(obj) // todo user_ticket换取user信息
        if (userDetail.errcode === 0) {
          u = await User.create({
            userId: user.UserId,
            deviceId: user.DeviceId,
            name: userDetail.name,
            department: userDetail.department,
            position: userDetail.position,
            mobile: userDetail.mobile,
            gender: userDetail.gender,
            email: userDetail.email,
            avatar: userDetail.avatar
          })
        }
        await ctx.render('index', {title: 'Hello Koa 2!'})
      }
    }
  }
})


/**
 * 生层二维码页面
 * @type {[type]}
 */
router.get('/code', async (ctx, next) => {
  await ctx.render('login')
})

/**
 * 扫码成功跳转的页面
 * @type {[type]}
 */
router.get('/success', async (ctx, next) => {
  await ctx.render('sucess')
})


/**
 * 扫码获得的code 去获取userid,验证登录
 * @type {Object}
 */
router.get('/getCode', async (ctx, next) => {
  let {code} = ctx.query
  let options = {
    url: `${prefix}user/getuserinfo?access_token=${ctx.test1Token}&code=${code}`,
    method: 'GET',
    json: true
  }
  let res = await requestApi(options)
  if (res.errcode === 0) {
    let u = await User.findOne({userId: res.UserId})
    if (!u) {
      ctx.success('' ,-1 ,'用户不存在')
    }else {
      ctx.success(`登录成功!`)
    }
  }else {
    ctx.success('', -1 , '登录失败')
  }
})




module.exports = router
