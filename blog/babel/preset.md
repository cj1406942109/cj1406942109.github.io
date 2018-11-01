# preset
> 记录时间：2018-10-31

不想组装自己的插件集?没问题!preset可以作为一个Babel插件数组，甚至一个可共享的选项配置。

## 官方presets

官方为常见的环境组装了一些：

- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-flow](https://babeljs.io/docs/en/babel-preset-flow)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

许多其他社区维护的preset在npm上可用!

## stage-X (实验性preset)

stage-x presets中的任何转换都是对尚未被批准作为Javascript版本(如ES6/ES2015)的一部分的语言的更改。

这些提议可能会改变，所以使用时要格外小心，尤其是对于任何准备阶段3的项目。我们计划在每次TC39会议后，当提案改变时，更新stage-x预设。

TC39将提议分为以下阶段:

- Stage 0 - Strawman: 只是一个想法，可能是Babel插件
- Stage 1 - Proposal: 这是值得努力的
- Stage 2 - Draft: 最初的规范
- Stage 3 - Candidate: 完整的规范和最初的浏览器实现
- Stage 4 - Finished: 将添加到下一个年度版本

## 创建一个preset

创建你自己的preset，只需要导出一个配置，返回一个插件的数组：
```js
module.exports = function() {
  return {
    plugins: [
      "pluginA",
      "pluginB",
      "pluginC",
    ]
  };
}
```

preset可以包含其他的preset和带选项的插件：
```js
module.exports = () => ({
  presets: [
    require("@babel/preset-env"),
  ],
  plugins: [
    [require("@babel/plugin-proposal-class-properties"), { loose: true }],
    require("@babel/plugin-proposal-object-rest-spread"),
  ],
});
```

## preset 路径

如果在npm上，您可以传入preset的名称，babel将检查它是否安装在node_modules中：
```json
{
  "presets": ["babel-preset-myPreset"]
}
```

也可以指定preset的相对路径或绝对路径：
```json
{
  "presets": ["./myProject/myPreset"]
}
```

## preset缩写

如果包名的前缀为`babel-preset-`，可以使用缩写：
```js
{
  "presets": [
    "myPreset",
    "babel-preset-myPreset" // equivalent
  ]
}
```

```js
{
  "presets": [
    "@org/babel-preset-name",
    "@org/name" // equivalent
  ]
}
```

## preset排序

preset的排序是逆向的，从最后一个到第一个。
```json
{
  "presets": [
    "a",
    "b",
    "c"
  ]
}
```

将会按`c`，`b`，`a`的顺序运行。
