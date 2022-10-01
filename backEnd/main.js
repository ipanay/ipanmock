/* eslint-disable no-console */
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const https = require('https');
const iconv = require("iconv-lite");

app.engine('html', require('express-art-template'));

app.use(express.static('./bundle'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.set('views', '../bundle');
app.set('views', './bundle');

module.exports.app = app;
const userDataUrl = './database/user.json';
// const projectlistUrl = './database/projectlist.json';
const projectlistUrl = './database/jtjtxl.apk';
const proitemlistUrl = './database/proitem.json';
// const proitemlistUrl = './database/proitem.json';

const weChatJsonUrl = './database/weChat.json'
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// app.get('/weChat', (req, res) => {
//   // setTimeout(() => {
//     console.log(req.query)
//     res.render('weChat.html');
//   // }, 60000);
// });
app.get('/test', (req, res) => {
  // setTimeout(() => {
    res.render('rtmp.html');
  // }, 60000);
});
app.get('/pdf',(req,res)=>{
  // let { filename,mimeType } = req.body;
  // let { filename,mimeType } = req.query;
  // var path="public/pdf/5ea56710fb5a2fdad7cabcf3.pdf";
  // filename = '02cbc5d9-e10f-4f8d-8fae-304cc609a8f0';  //pdf
  // filename = '6f3db1f9-e247-4aa5-bca7-93bae62a0079' // mp4
  // filename = '6a908990-0c4f-4101-9e9d-4c8b00a8133b' // doc
  // filename='2055c73b-1b37-40bc-ba50-b6b8ef82e63c' // docx
  let mimeType='application/pdf';

  // let type = getType(mimeType);  //获取文件后缀名
  // console.log(filename,mimeType,type);

  // path = path.join(__dirname, '../public/showPdf/'+filename+'.'+type);
  path='./database/jtjtxl.pdf';
  // path="C:\Users\sswc\Desktop\gai2\public\showPdf\02cbc5d9-e10f-4f8d-8fae-304cc609a8f0.pdf"
  console.log(path);


  var fileStream = fs.createReadStream(path);
  var size = fs.statSync(path).size;
  res.setHeader('Content-Type', mimeType);
  // res.setHeader('Content-Disposition', `attachment;filename=${filename}.${type}`);
  res.setHeader('Content-Length', size);
  fileStream.on('data', function (data) {
      res.write(data, 'binary');
  });
  fileStream.on('end', function () {
      res.end();
      console.log('The file has been downloaded successfully!');
  });
   
})

io.on('connection', (socket) => {
  let chatList = []
  socket.on('chat message', (msg,data) => {
    fs.readFile(weChatJsonUrl, (err, data) => {
      if (err) {
      } else {
        chatList = JSON.parse(data)
        chatList.push({id:'',name:'',time:+new Date(socket.handshake.time),msg:msg})
        fs.writeFile(weChatJsonUrl, JSON.stringify(chatList), (err, data) => {
          if (err) {
          } else {
            io.emit('chat message', msg);
          }
        })
      }
    })
  })
});

app.get('/weChat', (req, res) => {
	console.log(req.query)
  res.render('weChat.html');
	// https.get(
	// 	'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxfa9ecb6673fe4740&secret=0b12541f888199373909e27e73376d2e&code='+req.query.code+'&grant_type=authorization_code', (resq_openid) => {
	//    const datas = [];
  //   let size = 0;
  //   resq_openid.on('data', function (data) {
  //       datas.push(data);
  //       size += data.length;
  //   });
  //   resq_openid.on("end", function () {
  //     var buff = Buffer.concat(datas, size);
  //     var result_openid = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
  //     https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxfa9ecb6673fe4740&secret=0b12541f888199373909e27e73376d2e', (res_accesstoken) => {
  //       const datas = []
  //       let size = 0
  //       res_accesstoken.on('data', function (data) {
  //         datas.push(data)
  //         size += data.length
  //       })
  //       res_accesstoken.on('end', function() {
  //         var buff = Buffer.concat(datas, size);
  //         var result_accesstoken = iconv.decode(buff, "utf8");
  //         https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token='+JSON.parse(result_accesstoken).access_token, (res_ticket) => {
  //           const datas = []
  //           let size = 0
  //           res_ticket.on('data', function (data) {
  //             datas.push(data)
  //             size += data.length
  //           })
  //           res_ticket.on('end', function() {
  //             var buff = Buffer.concat(datas, size);
  //             var result_ticket = iconv.decode(buff, "utf8");
  //             res.render('index.html', {
  //               openid: JSON.parse(result_openid).openid,
  //               ticket: JSON.parse(result_ticket).ticket
  //             })
  //           })
  //         })
  //       })
  //     })
  //   })
	// });	
});

 
app.get('/', (req, res) => {
  console.log(9)
  fs.readFile(userDataUrl, (err, data) => {
    if (err) {
      res.render('404');
      return;
    }
    res.render('index.html', { users: JSON.parse(data) });
  });
});
app.post('/register', (req, res) => {
  fs.readFile(userDataUrl, (err, data) => {
    const result = {};
    if (err) {
      result.result = 'error';
      res.send(JSON.stringify(result));
      return;
    }
    const { body: reqBody } = req;
    const userJson = JSON.parse(data);
    const { user: userArr } = userJson;

    const pwdData = userArr.filter((item) => item.name === reqBody.name);
    if (pwdData.length) {
      result.result = 'error';
      result.info = '用户名已存在';
      res.send(JSON.stringify(result));
    } else {
      reqBody.createdate = Date.now();
      // eslint-disable-next-line prefer-template
      reqBody.id = reqBody.name + '-ipanmock';
      userArr.push(reqBody);
      userJson.user = userArr;
      fs.writeFile(userDataUrl, JSON.stringify(userJson), (err, data) => {
        if (err) {
          result.result = 'error';
          result.info = '注册失败 请重试';
          res.send(JSON.stringify(result));
        } else {
          result.result = 'success';
          result.info = reqBody.name + '注册成功';
          res.send(JSON.stringify(result));
        }
      })
    }
  });
});
app.get('/r/web/v1/member/ssoLoginService/logincheck', (req, res) => {
  console.log(req)
})

app.post('/login', (req, res) => {
  fs.readFile(userDataUrl, (err, data) => {
    const result = {};
    const reqBody = req.body;
    if (err || !reqBody.name || !reqBody.pwd) {
      result.result = 'error';
      result.info = '用户名/密码不正确';
      res.send(JSON.stringify(result));
      return;
    }
    const userArr = JSON.parse(data).user;
    const pwdData = userArr.filter((item) => item.name === reqBody.name);
    if (pwdData.length) {
      if (pwdData[0].pwd === reqBody.pwd) {
        result.result = 'success';
        // eslint-disable-next-line prefer-destructuring
        result.user = pwdData[0];
        result.info = '登陆成功';
      } else {
        result.result = 'error';
        result.info = '密码错误';
      }
    } else {
      result.result = 'error';
      result.info = '用户不存在';
    }
    res.send(JSON.stringify(result));
  });
});

app.get('/getprolist', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const userId = req.query.userId;
  const result = {};
  fs.readFile(projectlistUrl, (err, data) => {
    if (err) {
      res.render('读取项目失败');
      return;
    }
    const projectiles = JSON.parse(data).projectlist;
    const porlist = [...projectiles.filter((pro) => pro.userId === userId)];
    result.projectlist = porlist;
    result.result = 'success';
    res.send(JSON.stringify(result));
  //  result.body = data
  //  console.log(result)
  //  res.setHeader('Content-type','application/vnd.android.package-archive')
  //  res.send(data);
  });
});

// app.get('/bundle/main.js', (req, res) => {
//     fs.readFile('./bundle/main.js', (err, data) => {
//         res.send(data.toString())
//     })
// })
// const httpsServer = https.createServer({key:"",cert:""}, app);
app.post('/saveproject', (req, res) => {
  const result = {};
  const { body: { name, userId, projectId, description } } = req;
  fs.readFile(projectlistUrl, 'utf-8', (err, data) => {
    const { projectlist } = JSON.parse(data);
    const prodata = projectlist.filter(item => item.userId === userId)
    let pro = {}
    if (prodata.length) {
      if (projectId) {
        pro = prodata.filter(item => item.id === projectId)[0]
      } else {
        pro.id = `${userId.split('-')[0]}-project-${prodata.length}`
        pro.createdate = Date.now()
        projectlist.push(pro)
      }
    } else {
      pro.id = `${userId.split('-')[0]}-project-0`
      pro.createdate = Date.now()
      projectlist.push(pro)
    }
    pro.name = name
    pro.description = description
    pro.userId = userId
    fs.writeFile(projectlistUrl, JSON.stringify({ projectlist: projectlist}), (err, data) => {
      if (err) {
        result.result = 'error';
        result.info = '保存失败 请重试';
      } else {
        result.result = 'success';
        result.info = name + '保存成功';
        result.project = pro
      }
      res.send(JSON.stringify(result));
    })
  })
})

app.get('/getproItem', (req, res) => {
  const projectId = req.query.projectId
  console.log(projectId)
  fs.readFile(projectlistUrl, 'utf-8', (err, data) => {
    const { projectlist } = JSON.parse(data);
    const prodata = projectlist.filter(item => item.id === projectId)
    res.send(prodata[0])
  })
})


http.listen('3000', (err) => {
  if (err) {
    return;
  }
  console.log('server is running');
});

