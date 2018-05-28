# vue-datepicker 使用出错
> 记录时间：2017-10-16

> 控制台打印错误信息`exports is not defined`
```bash
vue-datepicker.vue?268e:436 Uncaught ReferenceError: exports is not defined
at eval (eval at <anonymous> (app.js:1778), <anonymous>:12:23)
at Object.<anonymous> (app.js:1778)
at webpack_require (app.js:660)
at fn (app.js:84)
at eval (eval at <anonymous> (app.js:2211), <anonymous>:7:3)
at Object.<anonymous> (app.js:2211)
at webpack_require (app.js:660)
at fn (app.js:84)
at eval (eval at <anonymous> (app.js:1904), <anonymous>:4:94)
at Object.<anonymous> (app.js:1904)
```

## 解决方案：修改`.babelrc`文件，将`{ "modules": false }`注释掉

```bash
# .babelrc文件内容
{
    "presets": [
        ["env", {
            "modules": false,
            "targets": {
                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
            }
        }],
        "stage-2"
    ],
    "plugins": ["transform-runtime"],
    "env": {
        "test": {
            "presets": ["env", "stage-2"],
            "plugins": ["istanbul"]
        }
    }
}

# vue-datepicker.vue中以下代码使用CommonJs写法，在应用中并没有做相应的模块转换使得浏览器能够识别。
# 原因：{ "modules": false }阻止了babel进行模块转换
Object.defineProperty(exports, "__esModule", {
  value: true
});


```