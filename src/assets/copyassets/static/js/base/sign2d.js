//  获取接口需要的参数
let sign2d_params = getRequest(location.search);
let activityId = sign2d_params.activityId;
let amount = sign2d_params.amount;
let prizeId = sign2d_params.prizeId;
let token = sign2d_params.token;
let bgHD = sign2d_params.bg;
// let bgZip = sign2d_params.bg + '.thumb.jpg';

// 多语
let sign2d_language = sign2d_params.lang;

if(sign2d_language === 'zht') {
  sign2d_language = language.cht;
} else if(sign2d_language === 'en') {
  sign2d_language = language.en;
  $('.container-left-title').css('line-height','20px');
} else {
  sign2d_language = language.chs;
}
document.title = sign2d_language.sign2d_title;
$('.container-left-title').text(sign2d_language.sign_code);
$('.container-left-prompt').text(sign2d_language.sign2d_prompt);
$('.container-left-num-title').text(sign2d_language.sign_already);
$('.container-right-title').text(sign2d_language.sign2d_list);
//  设置背景图片
$('#container').css("background", 'url(' + bgHD + ')');

let offsetLeft = $('.container-right').offset().left + 110
let offsetTop = $('.container-right').offset().top + 142

//  获取展示列表的父节点
let luckyList = document.getElementById('luckyList');

//  生成二维码的Url
let shortUrl = '';

//  生成二维码
getJSON(`${interface.activityLottery}/${activityId}/signin/setting/qrcode?token=${token}&language=${sign2d_params.lang}`).then(
  (resolve) => {
    let data = JSON.parse(resolve)
    shortUrl = data.shortUrl;
    let qrcode = new QRCode(document.getElementById('qrcode'), {
      text: shortUrl,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.Q
    });
  })

//  时间戳
let timestamp = -1;

//  签到总人数
let signData = 0;

let animateLine = [];

getMember(timestamp, function (data) {
  if (data && data.length) {
    let nameLen = data.length - 1
    let i = 0
    let nameTimer = setInterval(function () {
      if (i >= nameLen) clearInterval(nameTimer)
      data[i].color = getColor(data[i].user.name)
      animateLine.push(data[i].user)
      i++
    }, 500)
  }
  setInterval(function () {
    getMember(timestamp, function (data) {
      if (data && data.length) {
        let nameLen = data.length - 1
        for (let i = 0; i <= nameLen; i++) {
          data[i].color = getColor(data[i].user.name)
          animateLine.push(data[i].user)
        }
      }
    })
  }, 2000)
})

function getMember(ts, call) {
  getJSON(`${interface.activityLottery}/${activityId}/signin/record/incremental/${timestamp}?token=${token}&language=${sign2d_params.lang}`).then(
    (
      resolve) => {
      let data = JSON.parse(resolve)
      timestamp = data.nextTs;
      signData = data.count;
      call && call(data.data);
    })
}

//  匹配英文名字
let regLanguage = /[a-zA-Z]/;
//  用来匹配默认图片
let regAvatar = /default_avatar/;
//  抽奖定时器
let avatorTimer = null;
let signListStr = '';
let signListArr = [];

let shortName = '';

setInterval(function () {
  if (animateLine.length) {
    if (signListArr.length > 20) {
      signListArr.pop();
    }
    if (animateLine[0]['avatar'] && !regAvatar.test(animateLine[0]['avatar'])) {
      signListStr = `<div class="sign-people"><img src="${animateLine[0]['avatar']}"><div class="sign-name">${animateLine[0]['name']}</div></div>`
      signListArr.unshift(signListStr);
      $('#signInDom').css('background-image', 'url('+animateLine[0]['avatar']+')');
      $('#signInDom').css('background-size', 'cover');
      $('#signInDom').text('');
    } else {
      if (regLanguage.test(animateLine[0]['name'])) {
        //  英文名截取前两位
        shortName = animateLine[0]['name'].slice(0, 2)
      } else {
        //  中文名截取后两位
        shortName = animateLine[0]['name'].slice(-2)
      }
      signListStr = `<div class="sign-people"><div class="sign-img" style="background:${getColor(animateLine[0]['name'])}">${shortName}</div><div class="sign-name"> ${animateLine[0]['name'] }</div></div>`
      signListArr.unshift(signListStr);
      $('#signInDom').css('background', getColor(animateLine[0]['name']));
      $('#signInDom').text(shortName);
    }

    $('.container-mask').show();
    $('#signInDom').animate({
      height: '200px',
      width: '200px',
      lineHeight: '200px'
    }, 500, function () {
      $('#signInDom').animate({
        height: '80px',
        width: '80px',
        lineHeight: '80px',
        top: offsetTop,
        left: offsetLeft,
        fontSize: '28px'
      }, 500, function () {
        $('.container-mask').hide();
        $('#signInDom').css('top', '50%');
        $('#signInDom').css('left', '50%');
        $('#signInDom').css('width', '50px');
        $('#signInDom').css('height', '50px');
        let renderStr = '';

        for (let i = 0; i < signListArr.length; i++) {
          renderStr += signListArr[i];
        }
        $('#luckyList').html(renderStr);
      })
    })
  }
  animateLine.shift();
}, 2000)