let barrager_params = getRequest(location.search);
let token = barrager_params.token;
let conferenceId = barrager_params.id;
let bg = barrager_params.bg;
let size = barrager_params.size;
let speed = barrager_params.speed;
let circulation = barrager_params.circulation;
let fullScreen = barrager_params.fullScreen;
let lang = barrager_params.lang;

if (lang === 'zht') {
	lang = language.cht;
} else if (lang === 'en') {
	lang = language.en;
} else {
	lang = language.chs;
}
document.title = lang.barrage_screen_mirroring;

$('#container').css('background', 'url(' + bg + ')');

let partition = [0, 1, 2, 3, 4, 5, 6, 7];
let timestamp = -1;

// 获取字号
if (size === 'LARGE') {
	size = 'large';
} else if (size === 'MEDIUM') {
	size = 'medium';
} else if (size === 'SMALL') {
	size = 'small';
}

// 计算弹幕运动距离顶部的高度
var height = 0;
if (fullScreen === '0') {
	$('#container').css("height", "300px");
	if (size === 'large') {
		height = 230;
	} else if (size === 'medium') {
		height = 250;
	} else if (size === 'small') {
		height = 260;
	}
}

// 获取接口时间
let looper_get_time = 3 * 1000;
let looper_do_time = 0;

//是否首次执行
let run_get_once = true;
let run_do_once = true;

// 循环的弹幕数组
let loopQueue = [];
// 展示的弹幕数组
let newLoopQueue = [];
let count = 0;

// 计时器
let looper_get_timer = null;
let looper_do_timer = null;

let enterFrequency = 0;

get_barrager();
let flag = 0;

// 拉取数据
function get_barrager() {
	getJSON(`/conference/${conferenceId}/barrage/record/incremental/${timestamp}?token=${token}&partition[]=${partition}&language=${barrager_params.lang}`).then((resolve) => {
		let data = JSON.parse(resolve)
    speed = data.barrageSpeed;
    // enterFrequency = data.enterFrequency;
    // if(enterFrequency !== data.enterFrequency) {
    //   enterFrequency = data.enterFrequency;
    //   clearInterval(looper_do_timer);
		//   run_do_once = true;
    //   do_barrager();
    // }

    if(data.clearBarrage === true) {
      loopQueue = [];
      newLoopQueue = [];
    }

		timestamp = data.nextTs;
		if (data.data.length) {
			loopQueue = loopQueue.concat(data.data)
			for (let i = 0; i < data.data.length; i++) {
				loopQueue.push(data.data[i]);
			}
		}
		if (run_get_once) {
			//如果是首次执行,则设置一个定时器,并且把首次执行置为false
			looper_get_timer = setInterval(get_barrager, 3000);
			run_get_once = false;
			// 执行推送弹幕
			split_screen()
			do_barrager();
		}
	})
}

function split_screen() {
	let container = document.createElement('div')
	container.id = 'container_1'
	$('body').append(container)
}

// 推送弹幕
function do_barrager() {
	if (run_do_once) {
		//如果是首次执行,则设置一个定时器,并且把首次执行置为false
		looper_do_timer = setInterval(do_barrager, 1000);
		run_do_once = false;
	}
	if (loopQueue.length) {
		// for(var i = 0;  i< 5; i++) {
			let item = {
				img: loopQueue[0]['user']['avatar'], //图片 
				info: loopQueue[0]['content'], //文字 
				speed: Math.random() * 8, //延迟, 单位秒,默认8
				size: size,
				top: height, //距离底部高度,单位px,默认随机 
				color: '#fff', //颜色,默认白色 
				old_ie_color: '#000000', //ie低版兼容色,不能与网页背景相同,默认黑色,
				name: loopQueue[0]['user']['name']
			}
	
			$('#container').barrager(item);
			newLoopQueue.push(loopQueue[0]);
			loopQueue.shift();
		// }
	} else if (!loopQueue.length && flag != 3) {
		flag++;
	} else if (flag === 3 && circulation === '1' && newLoopQueue.length) {
		flag = 0;
		if (count === newLoopQueue.length) {
			count = 0;
		}
		var item = {
			img: newLoopQueue[count]['user']['avatar'], //图片 
			info: newLoopQueue[count]['content'], //文字 
			speed: speed, //延迟,单位秒,默认8
			size: size,
			top: height, //距离底部高度,单位px,默认随机
			color: '#fff', //颜色,默认白色 
			old_ie_color: '#000000', //ie低版兼容色,不能与网页背景相同,默认黑色,
			name: newLoopQueue[count]['user']['name']
		}
		$('#container').barrager(item);
		count++;
	}
}

// 监听浏览器切换tab事件
var hiddenProperty = 'hidden' in document ? 'hidden' :
	'webkitHidden' in document ? 'webkitHidden' :
	'mozHidden' in document ? 'mozHidden' :
	null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function () {
	if (!document[hiddenProperty]) {
		//  timestamp = -1;
		//  loopQueue = [];
		//  newLoopQueue = [];
		run_once = true;
		flag = 0;
		do_barrager();
		console.log('页面切回')
	} else {
		console.log('页面切走')
		//  $('.barrage').remove();
		clearInterval(looper_get_timer);
		clearInterval(looper_do_timer);
	}
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);
