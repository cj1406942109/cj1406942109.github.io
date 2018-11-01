# 配置Babel
> 记录时间：2018-10-31

Babel是可以配置的。很多其他的工具都有着类似地配置：ESLint（`.eslintrc`），Prettier（`.prettierrc`）。

查看所有的Babel API [选项](https://babeljs.io/docs/en/options)。

## 你的应用场景是什么？

- 你希望以编程方式创建配置?
- 你想编译`node_modules`?

那么使用[`babel.config.js`](https://babeljs.io/docs/en/configuration#babelconfigjs)吧。

- 你的静态配置只应用于简单的单个包?

那么使用[`.babelrc`](https://babeljs.io/docs/en/configuration#babelrc)吧。

## `babel.config.js`

子你的项目根目录下创建一个名为`babel.config.js`的文件，包含以下内容：
```js
module.exports = function () {
  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

查看[babel.config.js 文档](https://babeljs.io/docs/en/config-files#project-wide-configuration)浏览更多配置选项。

## `.babelrc`

在项目中创建一个名为`.babelrc`的文件，包含以下内容：
```json
{
  "presets": [...],
  "plugins": [...]
}
```
查看[.babelrc 文档](https://babeljs.io/docs/en/config-files#file-relative-configuration)浏览更多配置选项。

## `package.json`

你也可以在`package.json`文件中指定`.babelrc`配置：
```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```

## `.babelrc.js`

除了你可以使用JavaScript编写之外，其他配置和`.babelrc`一样：
```js
const presets = [ ... ];
const plugins = [ ... ];

module.exports = { presets, plugins };
```

你可以访问任何Node.js的API，例如基于进程的环境进行动态配置：
```js
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
```

## 使用CLI（`@babel/cli`）

```sh
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

查看[babel-cli 文档](https://babeljs.io/docs/en/babel-cli)浏览更多配置选项。

## 使用API（`@babel/core`）

```js
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```

查看[babel-core 文档](https://babeljs.io/docs/en/babel-core)浏览更多配置选项。
