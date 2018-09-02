# 变量提升
> 记录时间：2018-08-29

因为变量声明在任何代码执行之前被处理，所以在变量作用域的任何地方声明一个变量等同于在变量作用域的顶部声明该变量。

因此，一个变量可以在它被声明之前使用，这种行为，就叫 **变量提升（hoisting）**，其表现就是变量声明会被移动到函数或者全局代码的顶部。

由于该原因，建议始终在变量的作用域（全局代码或函数）顶部声明该变量，这样能够很清晰地看到哪些变量是局部变量，哪些事全局变量。

> **注意：** 变量提升会影响变量声明，但是不会影响变量值得初始化。

```js
    function do_something() {
        console.log(bar); // undefined
        var bar = 111;
        console.log(bar); // 111
    }

    // is implicitly understood as: 
    function do_something() {
        var bar;
        console.log(bar); // undefined
        bar = 111;
        console.log(bar); // 111
    }
```
