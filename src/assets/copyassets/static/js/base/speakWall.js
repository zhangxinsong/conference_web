 let speak_params = getRequest(location.search);
 let activityId = speak_params.activityId;
 let lang = speak_params.lang;
 let bg = speak_params.bg;
$('.page-sign').css('background-image','url('+bg+')');

if(lang === 'zht') {
  lang = language.cht;
} else if(lang === 'en') {
  lang = language.en;
} else {
  lang = language.chs;
}
document.title = lang.post_on_wall;
$('.meeting-name').text(lang.interact_with_others);
$('.bottom-fixed').text(lang.win_present_posts);
 //  匹配英文名字
 let regLanguage = /[a-zA-Z]/;
 //  匹配默认图片
 let regAvatar = /default_avatar/;

 //  初始时间戳
 let timestamp = -1;
 renderFlow();

 //  重新渲染页面
 function renderFlow() {
   let elem = document.querySelector('.grid');
   let msnry = new Masonry(elem, {
     // options
     itemSelector: '.grid-item',
     columnWidth: '.grid-sizer',
     percentPosition: true,
     transitionDuration: 0,
     gutter: '.gutter-sizer',
   });
 }

 let speakQueue = [];
 let domList = '';
 //  轮询接收发言
 let timer = setInterval(function () {
   getJSON(`${interface.activityLottery}/${activityId}/feed/record/incremental/${timestamp}?language=${speak_params.lang}`).then(
     (
       resolve) => {
       let data = JSON.parse(resolve);
       if (data.data.length) {
         for (let i = 0; i < data.data.length; i++) {
           // 判断是否有驳回的发言
           if (data.data[i]['auditStatus'] === 'PASS') {
             speakQueue.push(data.data[i]);
           } else {
             $("#grid-" + data.data[i]['feed']['id']).remove();
           }
         }
       }
       timestamp = data.nextTs;
       if (speakQueue.length) {
         let imageArr = speakQueue[0]['feed']['files']['image'];
         let imageStr = '';

         let avator = speakQueue[0]['feed']['memberInfo']['avatar'];
         let avatorStr = '';

         let allName = speakQueue[0]['feed']['memberInfo']['name'];
         let shortName = '';

         //  判断是否发布图片
         if (imageArr.length < 4 && imageArr.length > 0) {
           for (let i = 0; i < imageArr.length; i++) {
             imageStr += `<img src="${imageArr[i]['filePath']}" class="img-top">`;
           }
         } else if (imageArr.length === 4) {
           for (let i = 0; i < imageArr.length; i++) {
             imageStr += `<img src="${imageArr[i]['filePath']}" class="img-second">`;
           }
         } else if (imageArr.length === 5) {
           for (let i = 0; i < imageArr.length; i++) {
             imageStr += `<img src="${imageArr[i]['filePath']}" class="img-third">`;
           }
         } else if (imageArr.length > 5) {
           for (let i = 0; i < imageArr.length; i++) {
             imageStr += `<img src="${imageArr[i]['filePath']}" class="img-last">`;
           }
         }

         //  判断是否是默认头像
         if (avator && !regAvatar.test(avator)) {
           avatorStr = `
            <div class="name-img" style="background:url('${speakQueue[0]['feed']['memberInfo']['avatar']}')">
            </div>
          `
         } else {
           if (regLanguage.test(allName)) {
             //  英文名截取前两位
             shortName = allName.slice(0, 2)
           } else {
             //  中文名截取后两位
             shortName = allName.slice(-2)
           }
           avatorStr = `
          <div class="name-img" style="background:${getColor(allName)}">
          ${shortName}
          </div>
          `
         }

         domList =
           `<div id="grid-${speakQueue[0]['feed']['id']}" class="grid-item">
         ${avatorStr}
          <div class="voice-box">
            <h3 class="voice-name">${speakQueue[0]['feed']['memberInfo']['name']}</h3>
            <p class="voice-content">${speakQueue[0]['feed']['content']}</p>
            <div class="voice-img">
              ${imageStr}
            </div>  
          </div>
        </div>`;
         $('#speakList').prepend(domList);
         $('.grid-item').css({
           'transform': 'scale(0.2)'
         })
         $('.grid-item').animate({}, 1000, function () {
           $('.grid-item').css({
             'transform': 'scale(1)'
           })
         })
         renderFlow();
         speakQueue.shift();
       }
     })
 }, 2000)