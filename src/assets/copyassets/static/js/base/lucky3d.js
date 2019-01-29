//  要在屏幕显示的人数
let showNum = 40;

//  保存初始化时抽奖人的信息
let startPeople = [];
//  所有人的信息
let allPeople = [];

//  获取接口需要的参数
let lucky3d_params = getRequest(location.search);
let activityId = lucky3d_params.activityId;
let amount = lucky3d_params.amount;
let prizeId = lucky3d_params.prizeId;
let token = lucky3d_params.token;
let bgHD = lucky3d_params.bg;
let isEnd = false;

// 多语
let lucky3d_language = lucky3d_params.lang;

if (lucky3d_language === 'zht') {
  lucky3d_language = language.cht;
} else if (lucky3d_language === 'en') {
  lucky3d_language = language.en;
} else {
  lucky3d_language = language.chs;
}
document.title = lucky3d_language.lucky3d_title;
$('.startBtn').text(lucky3d_language.lucky_start);
$('#title').text(lucky3d_language.Congratulations);

// let bgZip = lucky3d_params.bg + '.thumb.jpg';
$('#imgHD').attr("src", bgHD);
getJSON(`/activity/${activityId}/lottery/setting/prize/${prizeId}?token=${token}&language=${lucky3d_params.lang}`).then(function (resolve) {
  let data = JSON.parse(resolve);
  $('.info h1').text(data.prize);
  $('.info .pic img').attr('src', data.image);
  $('.info .txt span').text(data.prizeName);
})


// $('#imgZIP').attr("src", bgZip);
// imgHD.onload = function () {
// $('#imgZIP').hide();
// $('#imgHD').show();
//  获取所有人的信息，并保存
getJSON(`/activity/${activityId}/lottery/candidates?token=${token}&size=1000&language=${lucky3d_params.lang}`).then(function (resolve) {
  allPeople = JSON.parse(resolve).data;
  startPeople = allPeople.slice(0, showNum);
  // init();
  // animate();
})
// }
// document.body.style.background = 'url("' + bg + '")';

$('.startBtn').click(function () {
  $('.lottery-3d-wrap').hide();
  // $('#preStart').hide();
  $('#imgHD').show();
  init();
  animate();
  isEnd = true;
})

let camera, scene, renderer;

let objects = [];

function init() {
  // 倒计时相机缩放
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 2000;

  scene = new THREE.Scene();

  //渲染
  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  document.getElementById('container').appendChild(renderer.domElement);

  transform(startPeople.length, 1000, startPeople);

  window.addEventListener('resize', onWindowResize, false);
}

function makeObject(length, arr) {
  let objects = [];
  // 判断英文名还是中文名
  let regEn = /^[a-zA-Z]$/;

  for (let i = 0; i < length; i++) {
    if (regEn.test(arr[i]['name'])) {
      //  英文名截取前两位
      arr[i]['name'] = arr[i]['name'].slice(0, 2)
    } else {
      //  中文名截取后两位
      arr[i]['name'] = arr[i]['name'].slice(-2)
    }
    // 创建dom
    let element = document.createElement('div');
    element.className = 'element';

    let div = document.createElement('div');
    div.style.backgroundColor = getColor(arr[i]['name']);
    let defaultStr = 'default_avatar';
    let reg
    if (arr[i]['avatar']) {
      reg = RegExp(/default_avatar/)
    }
    if (arr[i]['avatar'] && !reg.test(arr[i]['avatar'])) {
      let img = document.createElement('img');
      img.src = arr[i]['avatar'];

      div.appendChild(img)
      img.onerror = function () {
        div.removeChild(img);
        div.innerHTML = arr[i]['name'];
      }
    } else {
      div.innerHTML = arr[i]['name'];
    }

    element.appendChild(div);

    let object = new THREE.CSS3DObject(element);
    object.position.x = (Math.random() * window.innerWidth * 2 - window.innerWidth) * 2;
    object.position.y = (Math.random() * window.innerHeight * 2 - window.innerHeight) * 1.5;
    object.position.z = Math.random() * 5000 - 20000;
    positionX = object.position.x;
    positionY = object.position.y;
    scene.add(object);
    objects.push(object);
  }

  return objects;
}

function makeTargets(length) {
  let targets = {
    logo: []
  };
  for (let j = 0; j < length; j++) {
    let objectZero = new THREE.Object3D();
    objectZero.position.z = 9000;
    targets.logo.push(objectZero);
  };

  return targets;
}

function transform(length, duration, arr) {

  let objects = makeObject(length, arr);
  let targets = makeTargets(length, arr);

  // TWEEN.removeAll();

  for (let i = 0; i < objects.length; i++) {
    let object = objects[i];
    let target = targets.logo[i];
    let tween = new TWEEN.Tween(object.position)
      .to({
        z: target.position.z
      }, Math.random() * duration + duration / 3)
      // 运动执行完删除当前元素，并重新创建个元素push到数组中
      .onComplete(function () {
        scene.remove(objects[i]);
        let newArr = [];
        let index = Math.floor(Math.random() * allPeople.length);
        newArr.push(allPeople[index]);
        transform(1, duration, newArr);
      })
      .start();

    new TWEEN.Tween(object.rotation)
      .to({
        x: target.rotation.x,
        y: target.rotation.y,
        z: target.rotation.z
      }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Back.In)
      .start()
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start()

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();

}

function animate() {

  requestAnimationFrame(animate);

  TWEEN.update();

  // 渲染循环
  render();

}

function render() {

  renderer.render(scene, camera);

}

//点击“停止”按钮，重新初始化
function resetInit() {
  TWEEN.removeAll();
  objects = [];
  for (let i = 0; i < objects.length; i++) {
    scene.remove(objects[i]);
  }
  $('#container').empty()
}