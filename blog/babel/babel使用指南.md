# Babel使用指南
> 记录时间：2018-10-30

## 在CLI中的基本用法

Babel的模块都是作为独立的npm包发布的，在`@babel`作用域之下（从第7版开始）。

这种模块化设计允许为特定用例设计各种工具。

### 核心库

Babel的核心功能放在`@babel/core`模块中，安装之后：
```sh
npm install --save-dev @babel/core
```

就可以使用`require`直接在JavaScript程序中使用了：
```js
const babel = require("@babel/core");

babel.transform("code", optionsObject);
```

### CLI工具

`@babel/cli`包含的工具，可以让你在终端使用Babel。

安装和使用的命令：
```sh
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```
以上命令会解析`src`目录下的所有JavaScript文件，应用指定的转换，将每个文件输出到`lib`目录。因为这里没有指定做什么转换，输出代码仍和输入代码相同。

## plugins和presets

转换以插件的形式出现，插件是一些小的JavaScript程序，用来指导Babel如何对代码进行转换。你也可以写自己的插件对你的代码进行转换。

如：
```sh
npm install --save-dev @babel/plugin-transform-arrow-functions

./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

这样，代码中的所有箭头函数都会被转换成ES5兼容的函数表达式：
```js
const fn = () => 1;

// converted to

var fn = function fn() {
  return 1;
};
```

当然，我们在转换代码时，可能会用到很多其他的ES2015+ 的特性，此时，为了避免一个一个的添加插件，我们可以使用`preset`，这是一个预先确定的插件集。

就像使用插件一样，你也可以创建自己的preset来共享你需要的任何插件组合。

对于我们这里的用例，有一个非常好的preset名为`env`。

```sh
npm install --save-dev @babel/preset-env

./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

没有任何配置的情况下，该`preset`会包含所有的插件来会贺词现代化JavaScript（ES2016，ES2016，...）。当然，preset也可以配置选项。除了从命令行同时传递`cli`和`preset`选项，我们可以使用配置文件传递配置选项。

## 配置

创建一个包含以下内容的`babel.config.js`文件：
```js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
    },
  ],
];

module.exports = { presets };
```

现在，`env`preset只会加载我们指定的浏览器不包含的一些特性的转换插件。

以上都是关于语法的设置，下面看一下polyfill。

## Polyfill

`@babel/polyfill`模块包含`core-js`和一个自定义的[regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js)来模拟完整的ES2015+环境。

这意味着，你可以使用新的内置函数，如`Promise`或`WeakMap`，静态方法，如`Array.from`或`Object.assign`，实例方法，如`Array.prototye.includes`和生成函数(如果你用[`regenerator`](https://babeljs.io/docs/en/babel-plugin-transform-regenerator)插件)。

为了做到这一点，polyfill添加了全局作用域以及本地原型(如String)。

如果你不需要一些实例方法，如`Array.prototype.includes`，你可以使用[transform runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)插件替代`@babel/polyfill`，这样就不会污染全局作用域。

如果你明确知道你需要填充的特性，可以直接从[`core-js`](https://github.com/zloirock/core-js#commonjs)中引入。

构建应用程序时，我们可以直接安装`@babel/polyfill`：
```sh
npm install --save @babel/polyfill
```

> **注意：** 这里使用`--save`选项而不是`--save-dev`选项，因为polyfill需要在源码之前运行。

现在，我们使用`env`preset时，可以将其`useBuiltIns`选项值设置为`usage`，将实际应用上面提到的最后一个优化，其中只包含您需要的填充。
```js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };
```

现在，Babel将检查所有代码，查看目标环境中缺少的特性，只包含所需的填充。例如：
```js
Promise.resolve().finally();
```

将会转换成：
```js
require("core-js/modules/es.promise.finally");

Promise.resolve().finally();
```

如果我们没有使用将`useBuiltIns`选项设置为`usage`的`env`preset，我们就必须在所有其他代码之前引入完整的填充（只有一次）。

## 总结

我们在终端使用`@babel/cli`运行Babel，使用`@babel/polyfill`填充所有的新JavaScript特性，使用`env`preset来只包含转换和填充，用于我们使用的和目标浏览器中缺失的特性。
