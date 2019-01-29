/**
 * @objectLen 签到墙显示数量 默认200
 * @duration 变换形状的时间 默认8s
 * shift + f 全屏
 * shift + enter 开始倒计时
 */

var Sign3D = function (params) {
    const self = this

    // 约定需要生成的元素数量
    self.objectLen = params && params.objectLen || 200

    // 相关签到人员
    self.members = []
    self.memberIds = [] // 用于去重的数据

    // 保存场景相关的对象
    self.scene = undefined
    self.camera = undefined
    self.renderer = undefined

    // 保存元素数据
    self.table = [] // 保存所有数据
    self.objects = [] // 初始化场景元素数量
    self.targets = {
        table: [],
        sphere: [],
        helix: [],
        grid: []
    }

    // 当前场景
    self.shape = 'table'

    self.count = 0

    // 屏幕宽高
    self.width = window.innerWidth
    self.height = window.innerHeight

    self.init(params && params.duration || 8000)
    self.initInterval()
    self.animate()
}
Sign3D.prototype = {
    constructor: Sign3D,
    initInterval() { // 当人员超过当前长度时候 2s一个动画
        const self = this
        setInterval(function () {
      
            if(self.members.length > self.objectLen) {
                if (self.count == self.members.length) {
                    self.count = 0
                }
                self.makeAddObject(self.members[self.count])
                self.count++
            }
        }, 2000)
    },
    init(duration) {
        // 初始化场景镜头
        const self = this
        self.camera = new THREE.PerspectiveCamera(40, self.width / self.height, 1, 10000)
        self.camera.position.z = 3000

        self.scene = new THREE.Scene()
        self.makeObjects()
        //渲染
        self.renderer = new THREE.CSS3DRenderer();
        self.renderer.setSize(self.width, self.height);
        self.renderer.domElement.style.position = 'absolute';
        document.getElementById('container').appendChild(self.renderer.domElement);

        // 自动更换
        var ini = 0;
        setInterval(function () {
            ini = ini >= 4 ? 0 : ini;
            ++ini;
            switch (ini) {
                case 1: 
                    self.transform(self.targets.sphere, 1000, 'sphere')
                    break;
                case 2:
                    self.transform(self.targets.helix, 1000, 'helix')
                    break;
                case 3:
                    self.transform(self.targets.grid, 1000, 'grid')
                    break;
                case 4:
                    self.transform(self.targets.table, 1000, 'table')
                    break;
            }
        }, duration);
        self.transform(self.targets.table, 1000, 'table')
        window.addEventListener('resize', self.onWindowResize.bind(self), false);
    },
    addObject(member) { // 新增dom object
        member.p_x = this.members.length % 20 + 1;
        member.p_y = Math.floor(this.members.length / 20) + 1;
        if(this.members.length > 2000) { // 大于2000人的时候只显示动画不存储人员数据
            this.makeAddObject(member)
        } else {
            var memberIndx = this.memberIds.indexOf(member.memberId)
            
            if (memberIndx < 0) {
                this.members.push(member) // 需要去重
                this.memberIds.push(member.memberId) // 需要去重
                this.makeAddObject(member)
            } 
            memberIndx = null
        }
        member = null
    },
    makeAddObject(data) { // 生成随机排列的图片
        var element = document.createElement('div')
        element.className = 'element'
        var defaultStr = 'default_avatar';
        var regEn = /^[a-zA-Z]$/;
        var reg

        if (regEn.test(data.name)) {
          //  英文名截取前两位
          data.name = data.name.slice(0, 2)
        } else {
          //  中文名截取后两位
          data.name = data.name.slice(-2)
        }

        if(data.avatar) {
          reg = RegExp(/default_avatar/)
        }
        if(data.avatar && !reg.test(data.avatar)) {
            var img = document.createElement('img')
            img.src = data.avatar
            element.appendChild(img)
        } else {
            var div = document.createElement('div')
            div.style.backgroundColor = getColor(data.name)
            div.innerHTML = data.name
            element.appendChild(div)
        }
        
        var object = new THREE.CSS3DObject(element);
        object.position.x = Math.random() * 4000 - 2000
        object.position.y = Math.random() * 4000 - 2000
        object.position.z = Math.random() * 4000 - 2000

        var duration = 1000
        
        // 新增
        if (this.members.length <= this.objectLen) {
            this.scene.add(object)
            this.objects.push(object)
            this.makeAddTransform(object, this.targets[this.shape][this.members.length-1], duration)
        } else {
            this.scene.add(object) // 添加一个元素
            var random = Math.floor(Math.random() * this.objectLen)
            
            this.makeAddTransform(object, this.targets[this.shape][random], duration)
            
            if(data.avatar) {
                this.scene.children[random].element.innerHTML = `<div class="avatar">
                    <img src="${data.avatar}"/></div>`
            } else {
                this.scene.children[random].element.innerHTML = `<div class="name" style="background: ${data.color || ''};">
                ${data.name || ''}</div>`
            }
            setTimeout(() => {
                this.scene.remove(object)
                element = null
                object = null
                data = null
            }, duration);
        }
        
    },
    makeAddTransform(target, object, duration) { // 新增的变换
        const self = this
        new TWEEN.Tween(target.position)
            .to({
                x: object.position.x,
                y: object.position.y,
                z: object.position.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()

        new TWEEN.Tween(target.rotation)
            .to({
                x: object.rotation.x,
                y: object.rotation.y,
                z: object.rotation.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(self.render)
            .start()
    },
    makeObjects() { // 提前创建好场景
        this.makeTableObjects()
        this.makeSphereObjects()
        this.makeHelixObjects()
        this.makeGridObjects()
    },
    makeTableObjects() {
        for (var i = 0; i < this.objectLen; i++) {
            // 表格需要坐标进行排序的
            var object = new THREE.Object3D();
            // object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
            // object.position.y = - ( table[ i + 4 ] * 180 ) + 990;
            object.position.x = (i % 20 + 1) * 140 - 1330;
            object.position.y = -(Math.floor(i / 20) + 1) * 180 + 990;
    
            this.targets.table.push(object);
        }
    },
    makeSphereObjects() { // 球体
        // sphere
        var vector = new THREE.Vector3();
        var spherical = new THREE.Spherical();

        for (var i = 0, l = this.objectLen; i < l; i++) {

            var phi = Math.acos(-1 + (2 * i) / l);
            var theta = Math.sqrt(l * Math.PI) * phi;

            var object = new THREE.Object3D();

            spherical.set(800, phi, theta);

            object.position.setFromSpherical(spherical);

            vector.copy(object.position).multiplyScalar(2);

            object.lookAt(vector);

            this.targets.sphere.push(object);
        }
    },
    makeHelixObjects() { // 圆柱体
        var vector = new THREE.Vector3();
        var cylindrical = new THREE.Cylindrical();

        for (var i = 0; i < this.objectLen; i++) {

            var theta = i * 0.175 + Math.PI;
            var y = -(i * 5) + 450;

            var object = new THREE.Object3D();

            // 参数一 圈的大小 参数二 左右间距 参数三 上下间距
            cylindrical.set(900, theta, y);

            object.position.setFromCylindrical(cylindrical);

            vector.x = object.position.x * 2;
            vector.y = object.position.y;
            vector.z = object.position.z * 2;

            object.lookAt(vector);

            this.targets.helix.push(object);
        }
    },
    makeGridObjects() { // 立方体
        for (var i = 0; i < this.objectLen; i++) {
            var object = new THREE.Object3D();

            object.position.x = ((i % 5) * 400) - 800; // 400 图片的左右间距  800 x轴中心店
            object.position.y = (-(Math.floor(i / 5) % 5) * 300) + 500; // 500 y轴中心店
            object.position.z = (Math.floor(i / 25)) * 200 - 800; // 300调整 片间距 800z轴中心店

            this.targets.grid.push(object);
        }
    },
    transform(targets, duration, shape) { // 移动
        const self = this
        self.shape = shape
        
        for (var i = 0; i < self.objects.length; i++) {

            var object = self.objects[i]
            var target = targets[i]

            new TWEEN.Tween(object.position)
                .to({
                    x: target.position.x,
                    y: target.position.y,
                    z: target.position.z
                }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start()

            new TWEEN.Tween(object.rotation)
                .to({
                    x: target.rotation.x,
                    y: target.rotation.y,
                    z: target.rotation.z
                }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start()
            object = null
            target = null
        }
        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(self.render)
            .start()
    },
    animate() { // 动画效果
        const self = this
        var time = -performance.now() * 0.0006
        switch (self.shape) {
            case 'table': // 表格形式动画
                self.scene.rotation.y += 0.008;
                self.camera.position.x = 0;
                self.camera.position.y = 0;
                self.camera.position.z = 3000;
                self.camera.lookAt(self.scene.position);
                break;
            case 'sphere': // 球体动画
                self.camera.position.x = 3000 * Math.cos(time)
                self.camera.position.y = 3000 * Math.cos(time) / 2
                self.camera.position.z = 3000 * Math.sin(time)
                self.camera.lookAt(self.scene.position);
                break;
            case 'helix':
                self.scene.rotation.y += 0.008;
                self.camera.position.x = 0
                self.camera.position.y = 0
                self.camera.position.z = 3000
                self.camera.lookAt(self.scene.position);
                break;
            case 'grid':
                self.scene.rotation.y += 0.008;
                self.camera.position.x = 0
                self.camera.position.y = 0
                self.camera.position.z = 3000
                break;
        }

        requestAnimationFrame(self.animate.bind(self));

        TWEEN.update();

        time = null

        // 渲染循环
        self.render();
    },
    render() {
        const self = this
        self.renderer.render(self.scene, self.camera);
    },
    onWindowResize() {
        const self = this

        self.width = window.innerWidth
        self.height = window.innerHeight

        self.camera.aspect = self.width / self.height
        self.camera.updateProjectionMatrix()

        self.renderer.setSize(self.width, self.height)
        self.render();
    }
}


