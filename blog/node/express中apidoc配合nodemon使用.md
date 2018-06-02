# express中配合apidoc配合nodemon使用
> 记录时间：2018-06-02


## 需求
在项目中，使用了apidoc自动生成api文档，同时也使用了nodemon，于是就产生一个简单的需求：    
**在nodemon重启项目的同时，自动更新api的文档**

`apidoc`生成api的命令如下：
```bash
  apidoc -i myapp/ -o apidoc/ -t mytemplate/
```

由于是在express中使用，为了简化命令，直接在`package.json`中进行`npm scripts`的配置：
```json
{
  "scripts": {
    "start": "node ./bin/www",
    "apidoc": "apidoc -i ./routes -o ./public/apidoc"
  }
}
```

所以，整理一下需求，其实质就是，在nodemon重启项目的过程中，执行`npm run apidoc`命令。   
*此处可以推广到其他各种命令，如eslint*

## 可实现途径

* 使用nodemon配置中的`events`选项
  参考nodemon的文档，发现可以在`nodemon.json`中根据nodemon的状态改变触发不同的动作，此处也就是：
  ```json
    {
      "events": {
        "restart": "npm run apidoc"
      }
    }
  ```
  但是，在我的项目中，使用该配置，在项目重启的时候报错，报错信息如下：
  ```bash
    > apidoc -i ./routes -o ./public/apidoc

    npm ERR! file undefined
    npm ERR! path undefined
    npm ERR! code ELIFECYCLE
    npm ERR! errno ENOENT
    npm ERR! syscall spawn undefined
    npm ERR! emrs-api@0.0.0 apidoc: `apidoc -i ./routes -o ./public/apidoc`
    npm ERR! spawn undefined ENOENT
    npm ERR!
    npm ERR! Failed at the emrs-api@0.0.0 apidoc script.
    npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
  ```
  没有找到问题原因及解决方案，所以考虑了使用第二种方法

* 使用`npm script`的钩子
  在`package.json`中定义脚本执行时，可以添加`pre`和`post`钩子，比如此处，想要在执行`node ./bin/www`之前执行`apidoc -i ./routes -o ./public/apidoc`，可以在`package.json`中进行配置：
  ```json
    {
      "scripts": {
        "start": "node ./bin/www",
        "apidoc": "apidoc -i ./routes -o ./public/apidoc",
        "prestart": "npm run apidoc",
      }
    }
  ```
  此时，在执行`npm start`之前，会先执行`npm run prestart`，也就达到了我们的目的。 

  同时，为了配合`nodemon`使用，我们对以上配置做简单修改：
  ```json
    {
      "scripts": {
        "start": "node ./bin/www",
        "apidoc": "apidoc -i ./routes -o ./public/apidoc",
        "prestart": "npm run apidoc",
        "nodemon": "nodemon --exec npm start"
      }
    }
  ```
以上操作也就满足了我们的需求。

此处非常感谢几篇文档：
* [npm-scripts官方文档](https://docs.npmjs.com/misc/scripts)
* [npm scripts 使用指南 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
* [nodemon events — run tasks at server start, restart, crash, exit](https://medium.com/netscape/nodemon-events-run-tasks-at-server-start-restart-crash-exit-93a34c54dfd8)
