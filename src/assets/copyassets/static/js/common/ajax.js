var env = getRequest(location.search).env;
// var env = 'dev'

function getJSON(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    url = hostUrl[env] + url;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.response, this);
        } else {
          var resJson = {
            code: this.status,
            response: this.response
          };
          reject(resJson, this);
        }
      }
    }
    xhr.send();
  })
}

function postJSON(url, params) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    url = hostUrl[env] + url;
    var paramsStr = ''
    for (var key in params) {
      paramsStr += `${key}=${params[key]}&`
    }
    paramsStr = paramsStr.slice(0, -1)
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.response, this);
        } else {
          var resJson = {
            code: this.status,
            response: this.response
          }
          reject(resJson, this);
        }
      }
    }
    xhr.send(paramsStr);
  })
}

function patchJSON(url, params) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    url = hostUrl[env] + url;
    xhr.open("PATCH", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.response, this);
        } else {
          var resJson = {
            code: this.status,
            response: this.response
          }
          reject(resJson, this);
        }
      }
    }
    xhr.send(JSON.stringify(params));
  })
}

var hostUrl = {
  dev: 'http://140.143.133.139:8080/rest/v1',
  build: 'http://140.143.133.139:8080/rest/v1',
  prev: 'http://140.143.133.139:8080/rest/v1',
  test: 'http://140.143.133.139:8080/rest/v1',
  daily: 'http://140.143.133.139:8080/rest/v1'
};

var interface = {
  // 字体坐标计算
  fontCoordinate: '/font/bitmap',
    // 活动抽奖
    activityLottery: '/activity',
    // 确认抽奖结果
    confirmResult: '/activity'
}

function getRequest(url) {
  //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}