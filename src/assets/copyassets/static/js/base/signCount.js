var height = $('#swiper_one').find('li').eq(0).height();

var str = '';
var sign_total = null;
let str_one = str[0];
let str_two = str[1];
let str_three = str[2];
let str_four = str[3];
let str_five = str[4];
init();
sign_total = setInterval(function () {
  str = signData.toString();
  if (str.length === 5) {
    str_one = str[0];
    str_two = str[1];
    str_three = str[2];
    str_four = str[3];
    str_five = str[4];
  } else if (str.length === 4) {
    str_one = 0;
    str_two = str[0];
    str_three = str[1];
    str_four = str[2];
    str_five = str[3];
  } else if (str.length === 3) {
    str_one = 0;
    str_two = 0;
    str_three = str[0];
    str_four = str[1];
    str_five = str[2];
  } else if (str.length === 2) {
    str_one = 0;
    str_two = 0;
    str_three = 0;
    str_four = str[0];
    str_five = str[1];
  } else {
    str_one = 0;
    str_two = 0;
    str_three = 0;
    str_four = 0;
    str_five = str[0];
  }

  init();
}, 2000)

function init() {
  var top_one = -str_one * height + 'px'
  $('#swiper_one').animate({
    'top': top_one
  }, 1000);

  var top_two = -str_two * height + 'px'
  $('#swiper_two').animate({
    'top': top_two
  }, 1000);

  var top_three = -str_three * height + 'px'
  $('#swiper_three').animate({
    'top': top_three
  }, 1000);

  var top_four = -str_four * height + 'px'
  $('#swiper_four').animate({
    'top': top_four
  }, 1000);

  var top_five = -str_five * height + 'px'
  $('#swiper_five').animate({
    'top': top_five
  }, 1000);
}