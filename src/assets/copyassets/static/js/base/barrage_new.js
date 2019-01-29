let barrager_params = getRequest(location.search)
let token = barrager_params.token
let conferenceId = barrager_params.id
let bg = barrager_params.bg
let size = barrager_params.size
let speed = barrager_params.speed || 10
let circulation = barrager_params.circulation
let fullScreen = barrager_params.fullScreen
let lang = barrager_params.lang
console.log(size)
if (lang === 'zht') {
    lang = language.cht
} else if (lang === 'en') {
    lang = language.en
} else {
    lang = language.chs
}
document.title = lang.barrage_screen_mirroring
$('#container').css('background', 'url(' + bg + ')')
$('#container').css('background-size', 'cover')

if (fullScreen === '0') {
    $('#container').css("height", "300px")
}

let partition = [0, 1, 2, 3, 4, 5, 6, 7]
let timestamp = new Date().getTime()
// let timestamp = -1

// 获取速度
if (speed === 'FAST') {
    speed = 8
} else if (speed === 'SLOW') {
    speed = 14
} else {
    speed = 14
}

// 循环的弹幕数组
let loopQueue = []
// 展示的弹幕数组
let newLoopQueue = []
let count = 0
let flag = 0

get_barrager()

// 频率
let enterFrequency = 1000
// 计时器
let looper_get_timer = null
// 获取接口时间
let looper_get_time = 3 * 1000
//是否首次执行
let run_once = true

// 分泳道
let screen_arr = []
function split_screen() {
    let windowHeight = $(window).height()
    let barrageHeight = 70
    let distance = 52
    if(size === 'SAMLL') {
        barrageHeight = 44
    } else if(size === 'MEDIUM') {
        barrageHeight = 50
    } else {
        barrageHeight = 70
    }
    let barrageLen = Math.floor(windowHeight / (barrageHeight + distance))
    for(var i = 0; i < barrageLen; i++) {
        screen_arr.push(distance * (i + 1) + barrageHeight * i)
    }
}
split_screen()

// 拉取数据
function get_barrager() {
    getJSON(`/conference/${conferenceId}/barrage/record/incremental/${timestamp}?token=${token}&partition[]=${partition}&language=${barrager_params.lang}`).then((resolve) => {
        let data = JSON.parse(resolve)
        timestamp = data.nextTs
        speed = data.barrageSpeed

        if(data.clearBarrage) { // 清空弹幕
            loopQueue = []
            newLoopQueue = []
        }

        if (data.data.length) {
            loopQueue = data.data.concat(loopQueue)
        }

        if (run_once) {
            //如果是首次执行,则设置一个定时器,并且把首次执行置为false
            looper_get_timer = setInterval(get_barrager, looper_get_time)
            run_once = false
        }

        // 执行推送弹幕
        if(run_send_once) {
            send_barrager()
        }

        // 重置频率
        if(enterFrequency != data.enterFrequency) {
            init_send_barrager()
            enterFrequency = data.enterFrequency
            send_barrager()
        }
    })
}

// 获取接口时间
let looper_send_timer = 3 * 1000
//是否首次执行
let run_send_once = true
function init_send_barrager() {
    run_send_once = true
    clearInterval(looper_send_timer)
}
// 推送弹幕
function send_barrager() {
    if (run_send_once) {
        //如果是首次执行,则设置一个定时器,并且把首次执行置为false
        looper_send_timer = setInterval(send_barrager, enterFrequency)
        run_send_once = false
    }
    console.log(circulation, 'circulation')
    if (circulation === '0' && loopQueue.length) {
        add_barrage(loopQueue[0])
        loopQueue.shift()
    }

    if(circulation === '1') {
        if(loopQueue.length) {
            flag = 0;
            add_barrage(loopQueue[0])
            newLoopQueue.push(loopQueue[0])
            loopQueue.shift()
        } else if (!loopQueue.length && newLoopQueue.length && flag < 15) {
            flag ++;
        } else if (!loopQueue.length && newLoopQueue.length && flag >= 15) {
            flag = 0;
            if (count === newLoopQueue.length - 1) {
                count = 0;
            }
            add_barrage(newLoopQueue[count]);
            count ++;
        }
    }
}

function add_barrage(data) {
    let regLanguage = /[a-zA-Z]/
    let regAvatar = /default_avatar/
    let shortName
    try {
        if (regLanguage.test(data.user.name)) {
            //  英文名截取前两位
            shortName = data.user.name.slice(0, 2) || ''
        } else {
            //  中文名截取后两位
            shortName = data.user.name.slice(-2) || ''
        }
    } catch (error) {
        shortName = ''
    }
    console.log(size.toLocaleLowerCase())
    let time = new Date().getTime()
    let barrage_id = 'barrage_' + time
    let barrage = `<div class='barrage ${size.toLocaleLowerCase()}' id='${barrage_id}'>
        ${data.user.avatar && !regAvatar.test(data.user.avatar) ? 
            `<div class="avatar" style="background: url(${data.user.avatar}); background-size:cover"></div>`:
            `<div class="avatar" style="background:${getColor(data.user.name)}">${shortName}</div>`
            }
        <div class="info">
            <div class="name">${data.user.name}</div>
            <div class="content">${data.content}</div>
        </div>
    </div>`
    $("#container").append(barrage)
    do_barrage(barrage_id)
}

function hash(num) {
    console.log(num);
    
    const H = 37;
    var total = 0;
    for (var i = 0; i < num; i++) {
        total += H * total + num
    }
    console.log(total);
    
    total = total % screen_arr.length

    return total;
}

let repeat_arr = []
function get_offset_top() {
    let index = Math.round(Math.random() * (screen_arr.length - 1))

    if(repeat_arr.length === screen_arr.length) {
        repeat_arr = []
    }
    
    while (1) {
        if (repeat_arr.indexOf(index) != -1) {
            index = Math.round(Math.random() * (screen_arr.length - 1))
        } else {
            repeat_arr.push(index)
            break
        }
    }

    let offsetTop = screen_arr[index]
    return offsetTop
}

function do_barrage(barrage_id) {
    const target = $('#' + barrage_id)
    let offsetLeft = $(window).width()

    let window_height = $(window).height()
    // offsetTop = Math.floor(Math.random() * (window_height - 90))
    offsetTop = get_offset_top()

    console.log(offsetTop + (Math.random() * 50 * (target.index()%2 ? -1 : 1)))
    target.css({
        left: offsetLeft + 100,
        top: offsetTop + (Math.random() * 50 * (target.index()%2 ? -1 : 1))
    })
    
    let duration = Math.random() * (speed * 500) + speed * 1000
    target.velocity({
        left: "-" + offsetLeft + "px",
    }, {
        duration: duration,
        spring: [500, 40],
        complete: function () {
            target.remove()
        }
    })
}

// 监听浏览器切换tab事件
var hiddenProperty = 'hidden' in document ? 'hidden' :
    'webkitHidden' in document ? 'webkitHidden' :
    'mozHidden' in document ? 'mozHidden' :
    null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function () {
    if (!document[hiddenProperty]) {
        run_get_once = true
        run_send_once = true
        flag = 0;
        get_barrager()
        console.log('页面切回')
    } else {
        clearInterval(looper_get_timer);
        clearInterval(looper_send_timer);
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);
