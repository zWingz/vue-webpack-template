# webpack模板

****

## 目录

- [运行环境](#运行环境)
- [BuildSetup](#BuildSetup)
- [初始化选择说明](#初始化选择说明)
- [初始化流程](#初始化流程)
- [项目具体配置说明](#项目具体配置说明)
- [文件介绍](#文件介绍)
  - config.js
  - base.conf.js
  - dev.conf.js
  - prod.conf.js
  - dll.conf.js
  - utils.js

## 运行环境

    node>=8.0.0
    npm>=5.0
    webpack>=3.3.0

## Build Setup

- 安装 [cli](https://github.com/zWingz/create-app-cli) / 使用vue-cli亦可

- 执行
    ```bash
    create-app init zWingz/webpack-template <project-name>
    cd project-name
    npm run dev
    ```

## 初始化选择说明

- name 项目名称
- description 项目描述
- author 作者
- host 开发所使用的host
- port 开发所使用的端口
- sass 是否使用sass
- multipage 是否为多页应用
- frame 框架选择(vue or none)
- indent 缩进空格(2/4)

## 初始化流程

- name install 自动安装依赖
- npm run lint-fix 执行eslint检查并自动修复
- git init 初始化git仓库并加入githook pre-commit

**Tips: 请自行在编辑器中安装对应的 [editorconfig](http://editorconfig.org/)**

## 项目具体配置说明

- Loaders
  - Babel-loader
  - Eslint-loader
  - Pug-loader
  - Vue-loader
  - Style-loader
  - Sass-loader
  - Postcss-loader

- 框架选择
    - Vue(`Vue`+`VueRouter`+`Vuex`+`Axios`)

- 样式(`Sass/Css`+`postcss`)

- babel(`preset2015`+`stage-3`+`transform-runtime`+`transform-object-rest-spread`)

## 文件介绍

- config.js

    项目配置文件,包括entry,开发环境,生产环境的配置.
    包括
  - entry 项目入口
  - productionSourceMap 是否开启sourceMap
  - extract 是否独立打包css
  - assetsRoot 静态资源路径
  - assetsPublicPath 打包输出路径
  - publicPath修改
  - useDll 是否独立打包Dll
  - bundleAnalyzerReport 是否进行打包分析
  - devtool 配置
  - autoOpenBrowser 是否自动打开浏览器

- base.conf.js

    webpack基础配置文件
    会自动读取`config.js`下的entry来作为webpack入口

    在这里可以配置信息包括:
    - extensions(自动识别文件名后缀)
    - alias(文件别名或者指定引入文件,可以提升webpack打包速度)
    - loaders 在此按需添加loaders(Vue会自动添加vueLoader, 除此之外包括babelLoader,pugLoader, htmlLoader, urlLoader)

- dev.conf.js

    开发环境配置文件

    在此会添加`eslint-loader`并且使用`eslint-friendly-formatter`格式化输出

    可配置信息包括:
    - devServer
      - historyApiFallback (除了自动注入entry对应的路由外.可以自行添加或者完全修改)
      - proxy (跨域代理,请自行配置)
    - overlay 是否将errors显示在页面上

- prod.conf.js

    生产环境配置文件

    在此会添加`uglifyPlugin`来压缩es6代码.压缩优化分割css文件,生成最终的html文件,提取各个entry的公共部分以及提取`nodeModules`中的第三方模块到`vendors`中

    可配置信息包括:
    - htmlPlugin (除了根据entry来生成的html外,需要自行添加额外的html任务, 如果需要定制html模板请修改utils.js下的`HtmlCreator`, 相信都看得懂)

- dll.conf.js

    打包dll配置文件

    在此会将制定的库打包成独立的dll文件.以供上述`prod.conf.js`中引入,请务必注意配置说明.

    可配置信息:
    - 需要打包的entry(添加需要打包成dll的入口)

- utils.js

    辅助工具

    用来生成cssLoader, 根据entry来生成htmlPlugin任务

    可配置信息:
    - 可以添加`less`/`stylus`, 或者修改`sass` 的配置
    - 可以修改htmlPLugin对应的信息(详情请参考[github](https://github.com/jantimon/html-webpack-plugin))

## Npm Script 介绍

- `build` 打包命令, 将NODE_ENV设为production,并执行webpack打包
- `dev` 运行开发环境, 将NODE_ENV设为development,并执行webpack-dev-server
- `test-build` 以生成环境配置打包,但保留sourceMap,用于测试环境
- `dll` 打包dll文件
- `profile` 生成webpack分析文件stat.json
- `lint` 针对js/vue/jsx文件进行eslint检查
- `lint-fix` 针对js/vue/js文件检查eslint并启用--fix选项自动修复,用于初始化阶段
- `eslint` 暴露eslint接口,供pre-commit使用
- `git-hook` 将hooks/pre-commit软连接到.git/hooks/pre-commit中

</br>
</br>
</br>

****

有问题或者需求欢迎提issus :blush:
