let heredoc = require('heredoc')
let path = require('path')
let ejs = require('ejs')
let {formatData} = require('./util')


let reply = async (message) => {
  console.log(message)
  let res= ''

  if (message.MsgType === 'text') {
      if (message.Content === '1') {
        let content = '天下第一'
        let info = await formatData(content, message)
        res = compiled(info)
      }else {
        let content = '你说的什么,我根本机会不明白,--.'
        let info = await formatData(content, message)
        res = compiled(info)
      }
  }else if (message.MsgType === 'event') {
      if (message.Event === 'Event') {
        console.log(`${message.FromUserName} 订阅了`)
        let content = '欢迎订阅'
        let info = await formatData(content, message)
        res = compiled(info)
      }else if (message.Event === 'unsubscribe') {
        console.log(`${message.FromUserName} 取消了订阅`)
      }else if (message.Event === 'enter_agent') {
        console.log(`${message.FromUserName}  进去应用`)
      }else if (message.Event === 'LOCATION') {
        console.log(`${message.FromUserName}的纬度:${message.Latitude},经度:${message.Longitude}`)
        let content = `${message.FromUserName}的纬度:${message.Latitude},经度:${message.Longitude}`
        let info = await formatData(content, message)
        res = compiled(info)
      }else if (message.Event === 'batch_job_result') {
        console.log(`异步任务的${message.JobId}, ${message.JobType},返回码:${message.ErrCode},返回码的描述:${message.ErrMsg}`)
      }else if (message.Event === 'change_contact') {
        if (message.ChangeType === 'create_user') {
            console.log(`新增成员:姓名:${message.Name},部门:${message.Department},手机:${message.Mobile},职位:${message.Position},性别:${message.Gender}`)
        }else if (message.ChangeType === 'update_user') {
            console.log(`更新成员:姓名:${message.Name},部门:${message.Department},手机:${message.Mobile},职位:${message.Position},性别:${message.Gender}`)
        }else if (message.ChangeType === 'delete_user') {
          console.log(`删除成员:${message.UserID}`)
        }else if (message.ChangeType === 'create_party') {
          console.log(`新增部门,部门名称:${message.Name},部门id:${message.Id},父部门id:${message.ParentId}`)
        }else if (message.ChangeType === 'update_party') {
            console.log(`更新部门,部门名称:${message.Name},部门id:${message.Id},父部门id:${message.ParentId}`)
        }else if (message.ChangeType === 'delete_party') {
            console.log(`删除部门,部门id:${message.Id}`)
        }else if (message.ChangeType === 'update_tag') {
          console.log(`标签id:${message.TagId},新增成员列表:${message.AddUserItems},删除成员列表:${message.DelUserItems},新增部门列表:${message.AddPartyItems},删除部门列表:${message.DelPartyItems}}`)
        }
      }else if (message.Event === 'click') {
          console.log(`${message.FromUserName} 触发了自定义菜单click事件`)
      }else if (message.Event === 'view') {
          console.log(`${message.FromUserName} 触发了自定义菜单view事件,跳转的url:${message.EventKey}`)
      }else if (message.Event === 'scancode_push') {
          console.log(`${message.FromUserName}触发了自定义菜单的扫码事件,扫描结果:${message.ScanResult}`)
      }else if (message.Event === 'scancode_waitmsg') {
          console.log(`${message.FromUserName}触发了自定义菜单的扫码推事件,扫描结果:${message.ScanResult}`)
      }else if (message.Event === 'pic_sysphoto') {
          consoel.log(`${message.FromUserName}触发了自定义菜单的系统拍照发图的事,发图的数量:${message.Count}`)
      }else if (message.Event === 'pic_photo_or_album') {
          console.log(`${message.FromUserName}触发了自定义菜单的弹出拍照或者相册发图,发图的数量:${message.Count}`)
      }else if (message.Event === 'pic_weixin') {
          console.log(`${message.FromUserName}触发了自定义菜单的微信相册发图器,发图的数量:${message.Count}`)
      }else if (message.Event === 'location_select') {
          console.log(`${message.FromUserName}触发了自定义菜单的弹出地理位置选择器,具体信息:${message.Label}`)
      }
  }

  return res
}



let tpl = heredoc(() => {/*
    <xml>
      <ToUserName><![CDATA[<%=toUser%>]]></ToUserName>
      <FromUserName><![CDATA[<%=fromUser%>]]></FromUserName>
      <CreateTime><%=timestamp%></CreateTime>
      <MsgType><![CDATA[<%=MsgType%>]]></MsgType>
      <% if (MsgType === 'text') {%>
        <Content><![CDATA[<%=content%>]]></Content>
      <%} else if (MsgType === 'image') {%>
          <Image>
            <MediaId><![CDATA[<%=content.media_id%>]]></MediaId>
          </Image>
      <%} else if (MsgType === 'video') {%>
          <Video>
            <MediaId><![CDATA[<%=content.media_id%>]]></MediaId>
            <Title><![CDATA[<%=content.title%>]]></Title>
            <Description><![CDATA[<%=content.description%>]]></Description>
          </Video>
      <%} else if (MsgType === 'news') {%>
          <ArticleCount><%=content.length%></ArticleCount>
          <Articles>
            <% content.forEach(item =>{%>
              <item>
                 <Title><![CDATA[<%=item.title%>]]></Title>
                 <Description><![CDATA[<%=item.description%>]]></Description>
                 <PicUrl><![CDATA[<%=item.picurl%>]]></PicUrl>
                 <Url><![CDATA[<%=item.url%>]]></Url>
              </item>
            <%})%>
          </Articles>
      <%}%>
    </xml>
*/
})





let compiled = ejs.compile(tpl)

module.exports = {
  reply
}
