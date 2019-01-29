//  要在屏幕显示的人数
let showNum = 18;
//  保存初始化时抽奖人的信息
let showPeople = [];
//  所有人的信息
let allPeople = [];
//  保存抽奖结果
let luckyResult = [];
//  展示的签到列表
let signListArr = [];
//  实时获取的签到列表
let animateLine = [];
//  抽奖开始结束的状态
let status = 'init';

//  获取展示列表的父节点
let luckyList = document.getElementById('luckyList');

//  生成二维码的Url
let shortUrl = '';

//  时间戳
let timestamp = new Date().getTime();
//  签到总人数
let signData = 0;
//  处理后的名字
let shortName = '';

//  匹配英文名字
let regLanguage = /[a-zA-Z]/;
//  用来匹配默认图片
let regAvatar = /default_avatar/;
//  抽奖定时器
let avatorTimer = null;

let offsetLeft = $('.container-right').offset().left + 110
let offsetTop = $('.container-right').offset().top + 142


//  获取接口需要的参数
let lucky2d_params = getRequest(location.search);
let activityId = lucky2d_params.activityId;
let amount = lucky2d_params.amount;
let prizeId = lucky2d_params.prizeId;
let token = lucky2d_params.token;
let bgHD = lucky2d_params.bg;
let bgZip = lucky2d_params.bg + '.thumb.jpg';
let lucky2d_language = lucky2d_params.lang;

//  多语
if (lucky2d_language === 'zht') {
  lucky2d_language = language.cht;
} else if (lucky2d_language === 'en') {
  lucky2d_language = language.en;
} else {
  lucky2d_language = language.chs;
}
document.title = lucky2d_language.lucky2d_title;

$('.container-left-num-title').text(lucky2d_language.sign_already);
$('.container-left-title').text(lucky2d_language.lucky2d_draw);
$('#startButton').text(lucky2d_language.lucky_start);
$('#btnLotteryStart').text(lucky2d_language.lucky_start);
$('#btnLotteryEnd').text(lucky2d_language.lucky_stop);
$('#title').text(lucky2d_language.Congratulations);
//  设置背景图片
$('#container').css("background", 'url(' + bgHD + ')');

//  生成二维码
getJSON(`${interface.activityLottery}/${activityId}/signin/setting/qrcode`).then(
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

//  获取抽奖名单里的数据
getJSON(`/activity/${activityId}/lottery/candidates?size=1000`).then(function (resolve) {
  allPeople = JSON.parse(resolve).data;
  showPeople = allPeople.slice(0, showNum);
  let resultStr = '';
  let renderStr = '';
  for (let i = 0; i < showPeople.length; i++) {
    if (showPeople[i]['avatar'] && !regAvatar.test(showPeople[i]['avatar'])) {
      resultStr = `<div class="sign-people"><img src="${showPeople[i]['avatar']}"><div class="sign-name">${showPeople[i].name}</div></div>`
      signListArr.unshift(resultStr)
    } else {
      if (regLanguage.test(showPeople[i]['name'])) {
        //  英文名截取前两位
        shortName = showPeople[i]['name'].slice(0, 2)
      } else {
        //  中文名截取后两位
        shortName = showPeople[i]['name'].slice(-2)
      }
      resultStr = `<div class="sign-people"><div class="sign-img" style="background:${getColor(showPeople[i]['name'])}">${shortName}</div><div class="sign-name"> ${showPeople[i].name }</div></div>`
      signListArr.unshift(resultStr)
    }
  }
  for (let i = 0; i < signListArr.length; i++) {
    renderStr += signListArr[i];
  }
  $('#luckyList').html(renderStr)
})


$('#startButton').click(function () {
  getJSON(`/activity/${activityId}/lottery/candidates?token=${token}&size=1000&language=${lucky2d_params.lang}`).then(function (resolve) {
    allPeople = JSON.parse(resolve).data;
    clearInterval(getSignTimer)
    status = 'start';
    $('.lucky-dialog').show();
  })
})

//  点击开始抽奖
$('#btnLotteryStart').click(function () {
  $('.hand-bg').addClass('hand-bg-rotate');
  $('#btnLotteryStart').hide();
  $('#btnLotteryEnd').show();
  status = 'end';
  setTimeout(function () {
    lotteryAvatorLoop(100);
  }, 1000);
})

//  点击停止抽奖
$('#btnLotteryEnd').click(function () {
  status = 'over';
  randomLuckyArr();
  $('.hand-bg').removeClass('hand-bg-rotate');
  clearInterval(avatorTimer);
  clearInterval(sign_total);
  $('#btnLotteryStart').hide();
  $('#btnLotteryEnd').hide();
  $('.lucky-dialog-turn').hide();
  $('.avator-img').html('<img src="../img/lucky2d/avator-defalut.png" />');
  $('.award-dialog-two').show();
})

let index = 0;

//  转盘运动
function lotteryAvatorLoop(speed) {
  if (allPeople.length > 0) {
    avatorTimer = setTimeout(function () {
      if (allPeople[index]['avatar'] && !regAvatar.test(allPeople[index]['avatar'])) {
        $('.avator-img').html('<img src="' + allPeople[index]['avatar'] + '" />');
      } else {
        if (regLanguage.test(allPeople[index]['name'])) {
          //  英文名截取前两位
          shortName = allPeople[index]['name'].slice(0, 2)
        } else {
          //  中文名截取后两位
          shortName = allPeople[index]['name'].slice(-2)
        }
        $('.avator-img').html('<span style="background: ' + getColor(allPeople[index]['name']) + '">' + shortName + '</span>');
      }
      index++;
      lotteryAvatorLoop(speed);
      if (index == allPeople.length || index >= 150) {
        index = 0;
      }
    }, speed);
  } else {
    alert('没有可匹配的抽奖用户！');
  }

}

//  获取中奖名单接口URL
let getLuckyUrl = `${interface.activityLottery}/${activityId}/lottery/${prizeId}?token=${token}&amount=${amount}&language=${lucky2d_params.lang}`;

//  获得抽奖结果
function randomLuckyArr() {
  postJSON(getLuckyUrl).then(function (resolve) {
    luckyResult = JSON.parse(resolve);
    let memberIds = [];
    let resultStr = '';
    for (let i = 0; i < luckyResult.length; i++) {
      memberIds.push(luckyResult[i]['user']['memberId']);
      if (luckyResult[i]['user']['avatar'] && !regAvatar.test(luckyResult[i]['user']['avatar'])) {
        resultStr += '<div><div class="pic"><img class="luckyPic" src="' + luckyResult[i]['user']['avatar'] + '" /></div><div class="txt">' + luckyResult[i]['user']['name'] + '</div></div>';
      } else {
        if (regLanguage.test(luckyResult[i]['user']['name'])) {
          //  英文名截取前两位
          shortName = luckyResult[i]['user']['name'].slice(0, 2)
        } else {
          //  中文名截取后两位
          shortName = luckyResult[i]['user']['name'].slice(-2)
        }
        resultStr += '<div><div class="pic"><span class="luckyPic" style="background:' + getColor(luckyResult[i]['user']['name']) + '">' + shortName + '</span></div><div class="txt">' + luckyResult[i]['user']['name'] + '</div></div>';
      }
    }

    let params = {
      memberIds
    }
    //  中奖人员显示后,调核对抽奖人员接口
    patchJSON(`${interface.confirmResult}/${activityId}/lottery/${prizeId}/confirm?token=${token}&language=${lucky2d_params.lang}`, params).then(function (resolve) {});
    $('#resultList').html(resultStr);

    if (luckyResult.length <= 3) {
      $('#resultList').addClass('manyList');
      $('.luckyPic').addClass('lessPic');
      $('.award-dialog-two .txt').addClass('lessTxt');
    } else if (luckyResult.length === 4) {
      $('#title').css('margin-bottom', '70px');
      $('#resultList').removeClass('manyList');
      $('.luckyPic').addClass('morePic');
      $('.award-dialog-two .txt').addClass('moreTxt');
    } else {
      $('#resultList').removeClass('manyList');
      $('.luckyPic').addClass('morePic');
      $('.award-dialog-two .txt').addClass('moreTxt');
    }
  });
}

//  设置抽奖快捷键
window.addEventListener('keydown', function (e) {
  if (e.shiftKey === true && e.keyCode === 13 && status === 'start') {
    status = 'end';
    $('.hand-bg').addClass('hand-bg-rotate');
    $('#btnLotteryStart').hide();
    $('#btnLotteryEnd').show();
    setTimeout(function () {
      lotteryAvatorLoop(100);
    }, 1000);
  } else if (e.shiftKey === true && e.keyCode === 13 && status === 'end') {
    status = 'over'
    $('.hand-bg').removeClass('hand-bg-rotate');
    clearInterval(avatorTimer);
    clearInterval(sign_total);
    $('#btnLotteryStart').hide();
    $('#btnLotteryEnd').hide();
    $('.lucky-dialog-turn').hide();
    $('.avator-img').html('<img src="../img/lucky2d/avator-defalut.png" />');
    $('.award-dialog-two').show();
  } else if (e.shiftKey === true && e.keyCode === 13 && status === 'init') {
    status = 'start';
    $('.lucky-dialog').show();
    randomLuckyArr();
  } else {
    return;
  }
})

//  轮询获取实时签到人员
function getMember(call) {
  getJSON(`${interface.activityLottery}/${activityId}/signin/record/incremental/${timestamp}?token=${token}&language=${lucky2d_params.lang}`).then(
    (
      resolve) => {
      let data = JSON.parse(resolve)
      timestamp = data.nextTs;
      signData = data.count;
      call && call(data.data);
    })
}

getMember(function (data) {
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
    getMember(function (data) {
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

//  展示新签到人员的动画效果
let getSignTimer = setInterval(function () {
  if (animateLine.length) {
    let resultStr = '';
    if (signListArr.length >= 18) {
      signListArr.pop();
    }
    if (animateLine[0]['avatar'] && !regAvatar.test(animateLine[0]['avatar'])) {
      resultStr = `<div class="sign-people"><img src="${animateLine[0]['avatar']}"><div class="sign-name">${animateLine[0]['name']}</div></div>`
      signListArr.unshift(resultStr);
      $('#signInDom').css('background-image', 'url(' + animateLine[0]['avatar'] + ')');
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
      resultStr = `<div class="sign-people"><div class="sign-img" style="background:${getColor(animateLine[0]['name'])}">${shortName}</div><div class="sign-name"> ${animateLine[0]['name'] }</div></div>`
      signListArr.unshift(resultStr);
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
        let renderStr = ''
        for (let i = 0; i < signListArr.length; i++) {
          renderStr += signListArr[i];
        }
        $('#luckyList').html(renderStr);
      })
    })
  }
  animateLine.shift();
}, 2000)