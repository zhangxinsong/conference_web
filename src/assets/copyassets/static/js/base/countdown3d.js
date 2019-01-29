/**
 * @members  人员列表 requeired
 * @duration 切换时间
 * @str 进行切换的文字
 * shift + f 全屏
 * shift + enter 开始倒计时
 */

var CountDown = function (params) {
  const self = this
  let promiseStrAll = []

  self.maxLength = 0
  self.minLength = 0
  // 保存初始化文字坐标
  self.pointsArr = []

  // 保存人员数据
  self.members = []

  // 保存初始化文字
  self.transformString = params && params.str || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ]

  // 切换时间
  self.duration = params && params.duration || 1000

  // 保存场景相关的对象
  self.scene = undefined
  self.camera = undefined
  self.renderer = undefined

  // 保存元素数据
  self.objects = [] // 初始化场景元素数量
  self.targets = {} // 切换场景对应数量

  // 屏幕宽高
  self.width = window.innerWidth
  self.height = window.innerHeight

  // 获取对应文字坐标
  self.transformString.forEach(value => {
    var data = {
        fontFamily: params && params.fontFamily || 'Microsoft YaHei', 
        fontSize: params && params.fontSize || 42, 
        source: value
    }
    var uri = interface.fontCoordinate + '?'
    Object.keys(data).forEach(key=>{
        uri += `&${key}=${data[key]}`
    })
    promiseStrAll.push(getJSON(uri))
  })

  // 执行请求
  Promise.all(promiseStrAll).then(function (data) {
    self.pointsArr = data.map(val => {
      let curLen = JSON.parse(val).points.length
      self.maxLength = self.maxLength < curLen ? curLen : self.maxLength

      if (!self.minLength) {
        self.minLength = curLen
      } else {
        self.minLength = self.minLength < curLen ? self.minLength : curLen
      }
      return JSON.parse(val)
    })

    // 初始化人员名单 多就多 少则补位
    if (params && params.members) {
      if (params.members.length > self.maxLength) {
        self.members = params.members
      } else {
        function concatMembers() {
          self.members = self.members.concat(params.members)
          if (self.members.length < self.maxLength) {
            concatMembers()
          } else {
            return self.members = self.members.splice(0, self.maxLength)
          }
        }
        concatMembers()
      }
    }

    if (self.members && self.members.length) {
      self.init()
      self.animate()
    }
  }).catch(function (error) {
    console.log(error)
  })
}

CountDown.prototype = {
  constructor: CountDown,
  init: function () {
    const self = this
    // 倒计时相机缩放
    self.camera = new THREE.PerspectiveCamera(85, self.width / self.height, 1, 10000);
    self.camera.position.set(0, 0, 2900);

    self.scene = new THREE.Scene();

    //渲染
    self.renderer = new THREE.CSS3DRenderer()
    self.renderer.setSize(self.width, self.height)
    self.renderer.domElement.style.position = 'absolute'

    document.getElementById('container').appendChild(self.renderer.domElement)
    document.getElementById('container')
    self.makeObjects()

    // 初始化各个点位
    self.transformString.forEach(function (shape, index) {
      self.shape(self.pointsArr[index].points, shape, self.pointsArr[index].width, self.pointsArr[index].height)
    })

    var ini = self.transformString.length - 1;
    self.transform(self.targets, 500, self.transformString[ini]);
    window.addEventListener('keydown', function (e) {
      if (e.shiftKey === true && e.keyCode === 13 && !self.intervalTimer) {
        // 自动更换
        if (self.transformString.length > 1) {
          self.intervalTimer = setInterval(function () {
            --ini;
            self.transform(self.targets, 500, self.transformString[ini]);
            if (ini <= 0) {
              clearInterval(self.intervalTimer)
              ini = self.transformString.length
              self.intervalTimer = null
            }
          }, self.duration)
        }
      }
    })

    window.addEventListener('resize', self.onWindowResize.bind(self), false);
  },
  shape: function (param, shape, width, height) { // 初始化行装坐标
    let shapeMap = {}
    const self = this
    var x = 120,
      y = 120
    self.targets[shape] = param && param.map(function (val, i) {
      let object = new THREE.Object3D()
      if (shapeMap[val[1]]) {
        shapeMap[val[1]] += 1
      } else {
        shapeMap[val[1]] = 0
      }
      object.position.x = (val[0] * x)
      object.position.y = -(val[1] * y)
      return object
    })
    let shapeLine = Object.keys(shapeMap).length

    self.renderer.domElement.children[0].style.margin = `-${(height-1)*y/2}px 0 0 -${(shapeLine%2 ? width - 1 : width - 2)*x/2}px`
  },
  makeObjects() { // 生成dom
    const self = this
    for (var i = 0; i < self.maxLength; i++) {
      // 创建dom
      var element = document.createElement('div')
      element.className = 'element'
      var div = document.createElement('div')
      div.innerHTML = self.members[i].name
      div.style.background = self.members[i].color

      element.appendChild(div);
      let object = new THREE.CSS3DObject(element);
      object.position.x = Math.random() * 4000 - 2000
      object.position.y = Math.random() * 4000 - 2000
      object.position.z = Math.random() * 4000 - 2000
      self.scene.add(object)

      self.objects.push(object)
    }
  },
  transform: function (targets, duration, shape) { // 变换位置移动
    const self = this
    TWEEN.removeAll()

    function mathRange(min, max, targets) {
      let range = max - min;
      let random = Math.random();
      let num = min + Math.floor(random * range);

      const randomObj = targets[num]
      return {
        posX: randomObj.position.x,
        posY: randomObj.position.y,
        posZ: randomObj.position.z,
        rotX: randomObj.rotation.x,
        rotY: randomObj.rotation.y,
        rotZ: randomObj.rotation.z
      }
    }

    self.objects.forEach(function (object, i) {
      let target = self.targets[shape][i]

      let random = Math.floor(Math.random() * self.members.length)
      object.element.innerHTML = `<div style="background: ${self.members[random].color};">
                                        ${self.members[random].name}</div>`

      let randomTarget = mathRange(0, self.minLength, self.targets[shape])

      new TWEEN.Tween(object.position)
        .to({
          x: target && target.position && target.position.x || randomTarget.posX,
          y: target && target.position && target.position.y || randomTarget.posY,
          z: target && target.position && target.position.z || randomTarget.posZ
        }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

      new TWEEN.Tween(object.rotation)
        .to({
          x: target && target.rotation && target.rotation.x || randomTarget.rotX,
          y: target && target.rotation && target.rotation.y || randomTarget.rotY,
          z: target && target.rotation && target.rotation.z || randomTarget.rotZ
        }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

    })

    new TWEEN.Tween(this)
      .to({}, duration * 2)
      .onUpdate(self.render)
      .start()
  },
  animate: function () { // 动画
    const self = this
    requestAnimationFrame(self.animate.bind(self))

    TWEEN.update()

    // 渲染循环
    self.render()
  },
  render: function () { // 渲染
    const self = this
    self.renderer.render(self.scene, self.camera)
  },
  onWindowResize: function () {
    const self = this

    self.width = window.innerWidth
    self.height = window.innerHeight

    self.camera.aspect = self.width / self.height
    self.camera.updateProjectionMatrix()

    self.renderer.setSize(self.width, self.height)
    self.render();
  }
}

var count = new CountDown({
  // str: ['重新出发', '一路友你', '用友30年'],
  members: newName
})
