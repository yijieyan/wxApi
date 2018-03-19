const router = require('koa-router')()
let {requestApi} = require('../libs/ajax')
let {prefix} = require('../config')
router.prefix('/dept')


/**
 * 创建部门
 * @type {String}
 */
router.post('/create', async (ctx, next) => {
  let {name= '', parentid= '', order = 1} = ctx.request.body;
  if (!name || !parentid) {
    throw new Error('lack of parameters');
  }else {
    let options = {
      url: `${prefix}department/create?access_token=${ctx.userToken}`,
      method: 'POST',
      body: {
        name,
        parentid,
        order
      },
      json: true
    };

   let res = await requestApi(options);
   if (res.errcode === 0) {
     ctx.success('create successful!');
   }else {
     ctx.success('', res.errcode, res.errmsg);
   }
  }
})

/**
 * 更新部门
 * @type {[type]}
 */
router.post('/update', async (ctx, next) => {
  let obj = ctx.request.body;

  if (!obj.id) {
    throw new Error('lack of parameters');
  }else {
    let options = {
      uri: `${prefix}department/update?access_token=${ctx.userToken}`,
      method: 'POST',
      body: obj,
      json: true
    }

    let res = await requestApi(options);

    if (res.errcode === 0) {
      ctx.success(`update successful!`);
    }else {
      ctx.success('', res.errcode, res.errmsg);
    }
  }
})

/**
 * 删除部门
 * @type {Object}
 */
router.post('/delete', async (ctx, next) => {
  let {id} = ctx.request.body;
  let options = {
    uri: `${prefix}department/delete?access_token=${ctx.userToken}`,
    method: 'GET',
    qs: {
      id
    },
    json: true
  };

  let res = await requestApi(options);
  if (res.errcode === 0) {
    ctx.success(`delete successful!`);
  }else {
    ctx.success('', res.errcode, res.errmsg);
  }
})

/**
 * 获取部门列表
 * @type {Object}
 */
router.get('/deptList', async (ctx, next) => {
  let {id} = ctx.query;
  let options = {
    uri: `${prefix}department/list?access_token=${ctx.userToken}`,
    method: 'GET',
    json: true
  }

  let res = await requestApi(options);
  if (res.errcode === 0) {
    ctx.success(res.department);
  } else {
    ctx.success('', res.errcode, res.errmsg);
  }
})


module.exports = router
