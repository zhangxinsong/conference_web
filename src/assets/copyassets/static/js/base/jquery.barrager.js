/*!
 *@name     jquery.barrager.js
 *@author   yaseng@uauc.net
 *@url      https://github.com/yaseng/jquery.barrager.js
 */
(function ($) {
  $.fn.barrager = function (barrage) {
    //  匹配英文名字
    let regLanguage = /[a-zA-Z]/;
    //  用来匹配默认图片
    let regAvatar = /default_avatar/;
    let shortName = '';
    var time = new Date().getTime();
    var barrager_id = 'barrage_' + time;
    var id = '#' + barrager_id;
    var div_barrager = $(`<div class='barrage ${size}' id='${barrager_id}'></div>`).appendTo($(this));
    var window_height = $(window).height() - 100;
    console.log(barrage.top)
    var top = (barrage.top == 0) ? Math.floor(Math.random() * (window_height - 40)) : Math.floor(Math.random() * barrage.top);
    div_barrager.css("top", top + "px");
    div_barrager_box = $("<div class='barrage_box barrage_font'></div>").appendTo(div_barrager);
    if (barrage.img && !regAvatar.test(barrage.img)) {
      div_barrager_box.append(`<div style="background: url(${barrage.img});background-size:cover" class='portrait'></div>`);
    } else {
      if (regLanguage.test(barrage.name)) {
        //  英文名截取前两位
        shortName = barrage.name.slice(0, 2)
      } else {
        //  中文名截取后两位
        shortName = barrage.name.slice(-2)
      }
      div_barrager_box.append(`<div style="background:${getColor(barrage.name)}" class='portrait'>${shortName}</div>`);
    }

    // div_barrager_box.append(" <div class='z p'></div>");
    // if(barrage.close){

    // 	div_barrager_box.append(" <div class='close z'></div>");

    // }
    var right = $(`<div class='right'></div>`).appendTo(id + " .barrage_box");
    var name = $(`<div class='name'>${barrage.name}</div>`).appendTo(right);
    var content = $("<div class='content'></div>").appendTo(right);
    content.attr({
      'id': barrage.id
    }).empty().append(barrage.info);
    if (navigator.userAgent.indexOf("MSIE 6.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 8.0") > 0) {

      content.css('color', barrage.old_ie_color);

    } else {

      content.css('color', barrage.color);

    }

    var i = 0;
    $(id).css("margin-right", i);

    var looper = setInterval(barrager, barrage.speed);

    function barrager() {


      var window_width = $(window).width() + 500;
      if (i < window_width) {
        i += 1;

        $(id).css("margin-right", i);
      } else {

        $(id).remove();
        return false;
      }

    }
  }

  $.fn.barrager.removeAll = function () {

    $('.barrage').remove();

  }

})(jQuery);