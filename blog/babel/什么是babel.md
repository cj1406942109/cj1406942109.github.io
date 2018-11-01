# 什么是Babel
> 记录时间：2018-10-30

## Babel是一个JavaScript编译器

Babel是一个工具链，主要用于将ECMAScript 2015+代码转换为向后兼容的JavaScript版本，以适应当前和更旧的浏览器或环境。

## Babel能做什么

- 转换语法
- 在目标环境中填充缺少的特性
- 源代码转换
- 更多...

语法转换示例：
```js
// Babel Input: ES2015 arrow function
[1, 2, 3].map((n) => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

## Babel支持的版本

ES2015以及更新的版本。

通过语法转换，Babel能够支持最新的JavaScript版本。

Babel插件允许你使用浏览器目前不支持的新语法。

## JSX和React

Babel能够转换JSX语法。

通过使用[react preset](https://Babeljs.io/docs/en/Babel-preset-react)：

安装preset：
```sh
npm install --save-dev @Babel/preset-react
```

将`@Babel/preset-react`添加到Babel配置文件中。

```js
export default React.createClass({
  getInitialState() {
    return { num: this.getRandomNumber() };
  },

  getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  },

  render() {
    return <div>
      Your dice roll:
      {this.state.num}
    </div>;
  }
});
```

## 类型注释（Flow 和 Typescript）

Babel能够剔除类型注释。注意只能将[flow preset](https://Babeljs.io/docs/en/Babel-preset-flow)或[typescript preset](https://Babeljs.io/docs/en/Babel-preset-typescript)结合使用，因为Babel本身不做类型检查。

安装flow preset：
```sh
npm install --save-dev @Babel/preset-flow
```

```js
// @flow
function square(n: number): number {
  return n * n;
}
```

安装typescript preset：
```sh
npm install --save-dev @Babel/preset-typescript
```

```js
function Greeter(greeting: string) {
    this.greeting = greeting;
}
```

## Babel是可插拔的

Babel由插件构成，可以使用现有的插件构建您自己的转换管道或编写自己的转换管道。通过创建一个[preset](https://Babeljs.io/docs/en/plugins#presets)可以轻松使用一些插件的集合。

可以使用[astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa)动态创建插件或使用[generator-Babel-plugin](https://github.com/Babel/generator-Babel-plugin)生成插件模板。

```js
// A plugin is just a function
export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      }
    }
  };
}
```

## Babel是可调式的

Babel支持源代码映射，这样您就可以轻松调试编译后的代码。

## Babel是兼容规范的

Babel试图尽可能地遵守ECMAScript标准。 作为对性能的权衡，它还可能有一些特定的选项来更加符合规范。

## Babel是紧凑的
Babel试图使用尽可能少的代码，而不依赖于庞大的运行时。

在某些情况下，这可能很难做到，而且对于特定的转换有一些“松散”的选项，这些选项可能会在可读性、文件大小和速度方面牺牲规范遵从性。
