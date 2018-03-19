const router = require('koa-router')()
let {requestApi} = require('../libs/ajax')
let {prefix} = require('../config')
router.prefix('/users')
// todo 通讯录管理   打开企业微信的编辑通讯录的权限才可以调通下面的接口

/**
 * 成员管理-> 创建成员
 * @type {Object}
 */
router.post('/create', async (ctx, next) => {
  let obj = ctx.request.body;
  let o = {};
  for (let i in obj) {
    if (!obj.userid || !obj.name || !obj.department ) {
      throw new Error('lack of parameters');
    }else {
      o[i] = obj[i];
    }
  }

  let options = {
    uri: `${prefix}user/create?access_token=${ctx.userToken}`,
    method: 'POST',
    body: o,
    json: true
  }

  let res = await requestApi(options);
  console.log(res)
  if (res.errcode === 0) {
    ctx.success('create successful!');
  } else {
    ctx.success('', res.errcode, res.errmsg);
  }
})

/**
 * 读取成员
 * @type {Object}
 */
router.get('/', async (ctx, next) => {
  let {userid} = ctx.query;
  if (!userid) {
    throw new Error('lack of parameters');
  }
  let options = {
    uri: `${prefix}user/get?access_token=${ctx.userToken}&userid=${userid}`,
    method: 'GET'
  };

  let res = await requestApi(options);
  if (res.errcode === 0) {
    ctx.success(res);
  }else {
    ctx.success('', ctx.errcode, ctx.errmsg);
  }
})


/**
 * 更新成员
 * @type {[type]}
 */
router.post('/update', async (ctx, next) => {
  let obj = ctx.request.body;
  let o = {};
 for (let i in obj) {
   let item = obj[i];
   if (!obj.userid) {
     throw new Error('lack of parameters');
   }else {
     o[i] = item;
   }
 }

  let options = {
    uri: `${prefix}user/update?access_token=${ctx.userToken}`,
    body: o,
    method: 'POST',
    json: true
  }
  console.log(options);
  let res = await requestApi(options);

  if (res.errcode === 0) {
    ctx.success('update successful!');
  }else {
    ctx.success('', res.errcode, res.errmsg);
  }
})


/**
 * 删除成员
 * @type {Object}
 */
router.post('/delete', async (ctx, next) => {
  let {userid} = ctx.request.body;
  if (!userid) {
    throw new Error('lack of parameters');
  }else {
    let options = {
      uri: `${prefix}user/delete?access_token=${ctx.userToken}&userid=${userid}`,
      method: 'POST',
      json: true
    }

    let res = await requestApi(options);
    console.log(res)
    if (res.errcode === 0) {
        ctx.success('delete successful!');
    }else {
        ctx.success('', res.errcode, res.errmsg);
    }
  }
})

/**
 * 批量删除成员
 * @type {Array}
 */
router.post('/batchdelete', async (ctx, next) => {
    let {useridlist=[]} = ctx.request.body;

    if (useridlist.length === 0) {
      throw new Error('lack of parameters');
    }else {
      let options = {
        uri: `${prefix}user/batchdelete?access_token=${ctx.userToken}`,
        method: 'POST',
        body: {
          useridlist
        },
        json: true
      };
  
      let res = await requestApi(options);
      if (res.errcode === 0) {
        ctx.success('batchdelete successful!');
      }else {
        ctx.success('', res.errcode, res.errmsg);
      }
    }
})

/**
 * 获取部门成员
 * @type {String}
 */
router.get('/simplelist', async (ctx, next) => {
    let {department_id, fetch_child =''} = ctx.query;
    if (!department_id) {
      throw new Error('lack of parameters');
    }else {
      let options = {
        method: 'GET',
        json: true
      };
      if (fetch_child) {
        options.uri = `${prefix}user/simplelist?access_token=${ctx.userToken}&department_id=${department_id}&fetch_child=${fetch_child}`;
      }else {
        options.uri = `${prefix}user/simplelist?access_token=${ctx.userToken}&department_id=${department_id}`;
      }
      let res = await requestApi(options);
      if (res.errcode === 0) {
        ctx.success(res.userlist);
      }else {
        ctx.success('', res.errcode, res.errmsg);
      }
    }
})

/**
 * 获取部门成员详情
 * @type {String}
 */
router.get('/userListDetail', async (ctx, next) => {
  let {department_id, fetch_child=''} = ctx.query;
  if (!department_id) {
    throw new Error('lack of parameters');
  }else {
    let options = {
      method: 'GET',
      json: true
    }
    if (options.fetch_child) {
      options.uri = `${prefix}user/list?access_token=${ctx.userToken}&department_id=${department_id}&fetch_child=${fetch_child}`;
    }else {
      options.uri = `${prefix}user/list?access_token=${ctx.userToken}&department_id=${department_id}`;
    }

    let res = await requestApi(options);
    if (res.errcode === 0) {
        ctx.success(res.userlist);
    }else {
        ctx.success('',res.errcode, res.errmsg);
    }
  }
})


/**
 * userid转openid
 * @type {String}
 */
router.post('/convertToOpenid', async (ctx, next) => {
  let {userid='', agentid=''} = ctx.request.body;
  if (!userid) {
    throw new Error('lack of parameters');
  }else {
    let body = {};
    let options = {
      uri: `${prefix}user/convert_to_openid?access_token=${ctx.userToken}`,
      method: 'POST',
      body,
      json: true
    };

    if (agentid) {
      body.userid = userid;
      body.agentid = agentid;
    }else {
       body.userid = userid;
    }


    let res = await requestApi(options);
    if (res.errcode === 0) {
      ctx.success(res.openid);
    }else {
      ctx.success('', res.errcode, res.errmsg);
    }
  }
})

/**
 * openid转userid
 * @type {Object}
 */
router.post('/convertToUserid', async (ctx, next) => {
  let {openid=''} = ctx.request.body;
  if (!openid) {
    throw new Error('lack of parameters');
  }else {
    let options = {
      uri: `${prefix}user/convert_to_userid?access_token=${ctx.userToken}`,
      method: 'POST',
      body: {
        openid
      },
      json: true
    };

    let res = await requestApi(options);
    if (res.errcode === 0) {
      ctx.success(res.userid);
    }else {
      ctx.success('', res.errcode, res.errmsg);
    }
  }
})

module.exports = router
