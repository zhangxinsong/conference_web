$(function () {

  var getLuckyUrl = `${interface.activityLottery}/${activityId}/lottery/${prizeId}?token=${token}&amount=${amount}`;
  var defaultImg = 'http://ykj-esn-test.oss-cn-beijing.aliyuncs.com/default_avatar.thumb.jpg';
//  匹配英文名字
let regLanguage = /[a-zA-Z]/;
//  用来匹配默认图片
let regAvatar = /default_avatar/;

  var luckyResult = [];
  var memberIds = [];

  var luckyPrize = '';

  // 抽奖动效是否结束标识
  var keydownStatus = true;

  // 获取中奖名单
  randomLuckyArr();
  $(".container").show();
  /*
   中奖人员展示效果
   传入当前中奖数组中单个的key
   */

  function randomLuckyArr() {
    postJSON(getLuckyUrl).then(function (resolve) {
      luckyResult = JSON.parse(resolve);
      let memberIds = [];
      var resultStr = ''
  
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
      patchJSON(`${interface.confirmResult}/${activityId}/lottery/${prizeId}/confirm?token=${token}`, params).then(function (resolve) {});
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

  /*
   切换奖品代码块
   */
  // function tabPrize() {
  //   var luckyDefalut = $(".lucky_prize_picture").attr('data-default');
  //   var index = luckyDefalut ? luckyDefalut : 1;
  //   tabSport(index);
  //   var lucky_prize_number = $('.lucky_prize_show').length;
  // }

  // function tabSport(i, lucky_prize_number) {
  //   if (i >= lucky_prize_number) {
  //     $('.lucky_prize_right').removeClass('active');
  //   }
  //   if (i <= 1) {
  //     $('.lucky_prize_left').removeClass('active');
  //   }
  //   luckyPrizeluckyPrize = i;
  //   $('.lucky_prize_show').hide().eq(i - 1).show();
  //   $(".lucky_prize_title").html($('.lucky_prize_show').eq(i - 1).attr('alt'));
  //   $('.lpl_list').removeClass('active').hide().eq(i - 1).show().addClass('active');
  // }
  // tabPrize();

  // 回车+shift结束
  window.addEventListener('keydown', function (e) {
    if (e.shiftKey === true && e.keyCode === 13 && keydownStatus && isEnd) {
      isEnd = false;
      keydownStatus = false;
      $(".container").hide();
      $('.award-dialog-two').show();
      resetInit();
      let params = {
        memberIds
      }
      // 中奖人员显示后,调核对抽奖人员接口
      patchJSON(`${interface.confirmResult}/${activityId}/lottery/${prizeId}/confirm?token=${token}`, params).then(function (resolve) {});
    }
  })
})