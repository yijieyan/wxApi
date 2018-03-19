const router = require('koa-router')()
let {requestApi} = require('../libs/ajax')
let {prefix} = require('../config')
router.prefix('/address')
// todo 通讯录管理   打开企业微信的编辑通讯录的权限才可以调通下面的接口

/**
 * 成员管理-> 创建成员
 * @type {Object}
 */
router.get('/create', async (ctx, next) => {
  console.log(ctx.address)
  let options = {
    uri: `${prefix}user/create?access_token=${ctx.address}`,
    method: 'POST',
    body: {
      userid: 'zhangsan',
      name: '张三',
      english_name: 'jackzhang',
      mobile: '',
      department: [2],
      order: [],
      position: '产品经理',
      gender: '1',
      email: '2978763071@qq.com',
      enable: '1',
      avatar_mediaid: '',
      telephone: '',
      extattr: {
        "attrs": [
          {
            "name": "爱好",
            "value": "旅游"
          }, {
            "name": "卡号",
            "value": "1234567234"
          }
        ]
      },
      to_invite: true
    },
    json: true
  }

  let res = await requestApi(options);
  console.log(res)
  if (res.errcode === 0) {
    ctx.success('create successful!');
  } else {
    ctx.success('', res.errmsg, res.errcode);
  }
})

router.get('/', async (ctx, next) => {
  let {userid} = ctx.query;

  let options = {
    uri: `${prefix}user/get?access_token=${ctx.address}&userid=${userid}`,
    method: 'GET'
  };

  let res = await requestApi(options);

  if (res.errcode === 0) {
    ctx.success(res);
  }else {
    ctx.success('', ctx.errcode, ctx.errmsg);
  }
})

module.exports = router
