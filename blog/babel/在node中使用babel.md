# 在node中使用babel
> 记录时间：2018-05-24

## 使用方法
1. 安装babel依赖    
    ```bash
      npm install babel-core --save-dev
    ```
2. 安装babel-register
    ```bash
      npm install babel-register --save-dev
    ```
3. 配置babel转换选项，在项目根目录添加`.babelrc`文件
    ```json
      {
        "presets": ["es2015"]
      }
    ```
    这时，还需要安装es6转换模块，babel不能直接转换代码，需要转换模块
    ```bash
      npm install babel-preset-es2015 --save-dev
    ```
4. 在项目根目录添加入口文件`index.js`
    ```js
      require('babel-register');
      require('./app.js');
    ```
