# express中使用nodemon
> 记录时间：2018-06-02

## nodemon
[nodemon](http://nodemon.io/)可以用于监控源码的改变，并自动重启服务器。   
特性：
* 自动重启应用程序
* 自动检测要监视的默认文件扩展名
* 默认支持`node`和`coffeescript`，运行其他可执行文件（如：`python`、`make`等）也非常简单
* 可以忽略指定的文件或目录
* 可以监视指定的目录
* 可以在服务器应用、一次运行工具和REPLs中使用
* 可以在`node`项目中进行`require`
* 开源，[github](https://github.com/remy/nodemon)可访问

## 安装
可以全局安装或者本地安装
```bash
  # 全局安装
  npm install -g nodemon

  # 本地安装
  npm install --save-dev nodemon
```

## 使用方法
```bash
  nodemon [your node app]
```

如在express项目中，原本使用`npm start`打开项目，最简单的配置，只需要修改`package.json`文件：

原代码
```json
  {
    "scripts": {
      "start": "node ./bin/www",
    }
  }
```
修改后的代码
```json
  {
    "scripts": {
      "start": "nodemon ./bin/www",
    }
  }
```
非常简单，如果没有其他需求，使用以上配置，就可以轻松编辑项目中的源代码，nodemon会在保存文件时自动重启服务器。

## 使用配置文件
nodemon支持本地和全局配置文件，通常命名为`nodemon.json`，可以放在当前项目的根目录，或者其他位置。执行的时候，只需要加上`--config <file>`选项即可，如：
```bash
  nodemon --config nodemon.json
```
配置文件如：
```json
  {
    "verbose": true,
    "ignore": ["*.test.js", "fixtures/*"],
    "execMap": {
      "rb": "ruby",
      "pde": "processing --sketch={{pwd}} --run"
    }
  }
```
实例文件可以参考[sample-nodemon.md](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md)

配置文件的优先级如下：
1. 命令行参数
2. 本地配置
3. 全局配置

所以，命令行参数总是会覆盖配置文件中的设置。    
*如果使用本地配置文件，在执行nodemon时就不需要添加`--config <file>`选项，只需要确保项目根目录下有`nodemon.json`文件即可*。

如果不想单独创建一个`nodemon.json`文件，也可以在package.json中进行配置，只需要将`nodemon.json`文件中的配置，放到`package.json`文件中的`nodemonConfig`下，如：
```json
  {
    "name": "nodemon",
    "homepage": "http://nodemon.io",
    "...": "... other standard package.json values",
    "nodemonConfig": {
      "ignore": ["test/*", "docs/*"],
      "delay": "2500"
    }
  }
```
## 执行非node脚本
nodemon也可以用来监视其他程序。
```bash
  nodemon --exec "python -v" ./app.py
```

默认可执行文件，可以使用`nodemon.json`文件的`execMap`属性来定义你自己的默认可执行文件。当你使用的语言不被nodemon默认支持时尤其有用。如添加nodemon对`.pl`文件（Perl）的支持：
```json
  {
    "execMap": {
      "pl": "perl"
    }
  }
```
然后只需如下执行，nodemon就会自动使用`perl`作为可执行文件了
```bash
  nodemon script.pl
```

## 监视多个目录
默认nodemon监视当前工作目录，可以使用`--watch`选项进行控制：
```
  nodemon --watch app --watch libs app/server.js
```
此时，只有在`./app`和`./libs`目录中发生改变时，nodemon才会重新启动项目。    
*默认nodemon会自动遍历子目录，所以不需要在配置的时候指定子目录*


## 忽略文件
如果在某些文件、目录发生改变时，你不希望nodemon重启应用，可以通过以下命令实现：
```bash
  # 指定目录
  nodemon --ignore lib/ --ignore tests/

  # 指定文件
  nodemon --ignore lib/app.js

  # 指定模式（确保要添加引号）
  nodemon --ignore 'lib/*.js'
```
*默认情况下：nodemon会忽略`.git`，`node_modules`，`bower_components`，`.nyc_output`,`coverage`和`.sass-cache`目录*

## 当nodemon状态改变时，触发事件
如果在nodemon的状态发生改变时，你想要发送一些通知或者触发一些动作，可以在`nodemon.json`文件中添加事件动作，或者`require`nodemon模块。   
如Mac电脑，重启时触发通知：
```json
  {
    "events": {
      "restart": "osascript -e 'display notification \"app restarted\" with title \"nodemon\"'"
    }
  }
```
详细事件列表参见：[events state wiki](https://github.com/remy/nodemon/wiki/Events#states)


以上只记录常用的一些功能，其他具体信息请参考[官方文档](https://github.com/remy/nodemon#nodemon)
