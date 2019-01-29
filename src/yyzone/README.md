# YYZone

> yyzone vue components and utils

### 工程目录
- **md**
    - 组件对应文档
- **src**
    - assets  静态资源文件夹
    - component  组件库
    - demo  
    - directives 指令
    - locale 多语
    - utils  插件
- **webpack**
- **命名规范**
    - 文件夹 统一全部小写
    - 文件 统一全部小写

### 样式规范
- **命名规范**
    - Class请使用中划线分割并且小写
    - ID请使用下划线分割
    - 变量请放到vars.less内
    - 公用class请分别创建对应的less文件在common.less内引入
    - 每个组件请单独创建样式表然后在common.less中引入或在组件内引入

### JavaScript规范
- **命名规范**
    - 整个项目采用驼峰命名

### 开发流程
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8090
npm run start

# build for production with minification
npm run build
```

### npm发布流程
```bash
# 打包
npm run build
npm pack

# 查看当前npm环境，如果为taobao镜像需要切换
npm config get registry
npm config set registry=http://registry.npmjs.org

# 登录npm
npm login

# 发布项目
npm version patch
npm publish
```

