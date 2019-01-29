$(function () {
    var members = []
    // 微笑墙动画
    function moveSmileAvatar() {
        var avatar = $('#js_wall .avatar-wrapper')
        members.forEach((val, i) => {
            var person = document.createElement('div')
            person.className = 'person'
            person.innerHTML = '<span class="img"><img src="' + val.avatar + '"/></span><span class="score">' + val.score + '</span>'
            if ($(avatar[i]).find('.person')) { // 存在
                // 移除已存在的人员
                $(avatar[i]).find('.person').addClass('leave').animate({
                    left: '61px'
                }, 200)
                setTimeout(() => {
                    $(avatar[i]).find('.leave').remove()
                }, 200);
            }
            // 新增已存在的人员
            $(avatar[i]).prepend(person)
            $(person).animate({
                left: 0
            }, 200)
        })
    }

    // 奖品动画强
    var podiumMembers = []

    function movePodium() {
        var avatar = $('#js_podium .avatar')
        podiumMembers.forEach((val, i) => {
            $(avatar[i]).fadeOut(100)
            var person = document.createElement('div')
            person.className = 'person'
            person.innerHTML = '<span class="img"><img src="' + val.avatar + '"/></span><span class="icon"></span><span class="name">'+ val.name +'</span>'

            // 新增已存在的人员
            $(avatar[i]).fadeIn(10).html(person).addClass('zoomInDown')
            $(avatar[i]).find('.icon').delay(800).fadeIn();
            setTimeout(() => {
                $(avatar[i]).removeClass('zoomInDown')
            }, 600);
        })
    }

    // 跳动轨道
    var animationTimer = null
    var count = 0
    function track(member) {
        var animation = document.createElement('div')
        animation.className = 'animate'
        animation.innerHTML = '<img src="' + member.avatar + '" class="animate-avatar" alt="">\
                                    <div class = "shadow"></div>'
        var trackDom = $('#js_track')
        count++
        count = count > 3 ? 1 : count
        animation.className += ' start start'+count
        $(animation).fadeIn(200).delay(4000).fadeOut(200)
        trackDom.append(animation)
        setTimeout(() => {
            $(animation).remove()
            var repeatIndex = null
            members.forEach((val, i) => {
                if (member.yhtUserId == val.yhtUserId) {
                    repeatIndex = i
                }
            })
            if (repeatIndex != null) {
                members.splice(repeatIndex, 1)
            }
            members.unshift(member)
            if (members.length > 20) {
                members.length = 20
            }
            // 防止人员进入过快动画闪动
            moveSmileAvatar()
        }, 4500);
    }

    var api = {
        dev: {
            rank: 'http://172.20.1.177:6058/award/score/rank?size=5',
            all: 'http://172.20.1.177:6058/award/score/all',
            avatar: 'http://172.20.1.177:6058/conference/rest/v1/temp/818/smile/rank/list'
        },
        prev: {
            rank: 'https://ezone.yonyoucloud.com/award/score/rank?size=5',
            all: 'https://ezone.yonyoucloud.com/award/score/all',
            avatar: 'https://ezone.esn.ren/conference//rest/v1/temp/818/smile/rank/list'
        },
        build: {
            rank: 'https://ezone.yonyoucloud.com/award/score/rank?size=5',
            all: 'https://ezone.yonyoucloud.com/award/score/all',
            avatar: 'https://ezone.yonyoucloud.com/conference/rest/v1/temp/818/smile/rank/list'
        }
    }

    var __env__ = getQuery('env') || 'dev'
    function getAvatar(member, call) {
        return new Promise(resolve=>{
            $.ajax({
                type: 'get',
                url: api[__env__].avatar,
                data: {
                    qzId: __env__ === 'dev' ? 917 : 117345,
                    logId: member.logId,
                    accessToken: member.token,
                    yhtUserId: member.yhtUserId
                },
                success: function (res) {
                    member.avatar = res.url
                    member.name = res.name
                    resolve(member)
                },
                error: function (res) {
                    resolve(null)
                }
            })
        })
    }

    function getRank() { // 获取排行榜
        return new Promise(resolve=>{
            $.ajax({
                type: 'get',
                url: api[__env__].rank,
                success: function (res) {
                    resolve(res)
                }
            })
        }).then((res)=>{
            var promiseMember = []
            res.data.forEach((member) => {
                promiseMember.push(getAvatar(member))
            })
            Promise.all(promiseMember).then(res => {
                podiumMembers = []
                res.forEach(member=>{
                    if(member) {
                        podiumMembers.push(member)
                    }
                })
                movePodium()
            })
        })
    }

    getRank()
    setInterval(function () {
        getRank()
    }, 10000)

    var ts = 0
    function getRecent() {
        return new Promise(resolve => {
            $.ajax({
                type: 'get',
                url: api[__env__].all + '?ts=' + ts,
                success: function (res) {
                    if(res && res.data && res.data.length) {
                        ts = (new Date()).valueOf() - 1000
                    }
                    resolve(res)
                }
            })
        }).then((res) => {
            var promiseMember = []
            res.data.forEach((member) => {
                promiseMember.push(getAvatar(member))
            })
            Promise.all(promiseMember).then(res => {
                podiumMembers = []
                res.forEach((member, i) => {
                    if(member) {
                        setTimeout(() => {
                            track(member)
                        }, 1000 * i);
                    }
                })
            })
        })
    }
    getRecent()
    setInterval(() => {
        getRecent()
    }, 1000);
})
