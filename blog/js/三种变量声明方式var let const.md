# 三种变量声明方式var let const
> 记录时间：2018-08-31

JavaScript有三种声明方式。

- `var`：声明一个变量，可赋一个初始化值。
- `let`：声明一个块作用域的局部变量，可赋一个初始化值。
- `const`：声明一个块作用域的只读的命名常量。


## var
`variable` 语句声明了一个变量，可选地将其初始化为一个值。

变量声明，无论发生在何处，都在执行任何代码之前进行处理。用var声明的变量的作用域是它当前的执行上下文，它可以是嵌套的函数，也可以是声明在任何函数外的变量。如果你重新声明一个 JavaScript 变量，它将不会丢失其值。

将赋值给未声明变量的值在执行赋值时将其隐式地创建为全局变量（它将成为全局对象的属性）。声明和未声明变量之间的差异是：
- 声明变量的作用域限制在其声明位置的上下文中，而非声明变量总是全局的。
- 声明变量在任何代码执行前创建，而非声明变量只有在执行赋值操作的时候才会被创建。
- 声明变量是它所在上下文环境的不可配置属性，非声明变量是可配置的（如非声明变量可以被删除）。

> **注：** 建议始终声明变量，无论它们是在函数还是全局作用域内。

## let
`let` 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。

`let` 允许你声明一个作用域被限制在块级中的变量、语句或者表达式。与 `var` 关键字不同的是，它声明的变量只能是全局或者整个函数块的。

let声明的变量只在其声明的块或子块中可用，这一点，与var相似。二者之间最主要的区别在于var声明的变量的作用域是整个封闭函数。
```js
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```
当用到内部函数的时候，let会让你的代码更加简洁。
```js
var list = document.getElementById('list');

for (let i = 1; i <= 5; i++) {
  let item = document.createElement('li');
  item.appendChild(document.createTextNode('Item ' + i));

  item.onclick = function(ev) {
    console.log('Item ' + i + ' is clicked.');
  };
  list.appendChild(item);
}

// to achieve the same effect with 'var'
// you have to create a different context
// using a closure to preserve the value
for (var i = 1; i <= 5; i++) {
  var item = document.createElement('li');
  item.appendChild(document.createTextNode('Item ' + i));

  (function(i){
    item.onclick = function(ev) {
      console.log('Item ' + i + ' is clicked.');
    };
  })(i);
  list.appendChild(item);
}
```

在程序或者函数的顶层，let并不会像var一样在全局对象上创造一个属性。
```js
var x = 'global';
let y = 'global';
console.log(this.x); // "global"
console.log(this.y); // undefined
```

在处理构造函数的时候，可以通过let绑定来共享一个或多个私有成员，而不使用闭包：
```js
var Thing;

{
  let privateScope = new WeakMap();
  let counter = 0;

  Thing = function() {
    this.someProperty = 'foo';
    
    privateScope.set(this, {
      hidden: ++counter,
    });
  };

  Thing.prototype.showPublic = function() {
    return this.someProperty;
  };

  Thing.prototype.showPrivate = function() {
    return privateScope.get(this).hidden;
  };
}

console.log(typeof privateScope);
// "undefined"

var thing = new Thing();

console.log(thing);
// Thing {someProperty: "foo"}

thing.showPublic();
// "foo"

thing.showPrivate();
// 1
```

let暂存死区的错误：在相同的函数或块作用域内重新声明同一个变量会引发SyntaxError。

let在包含声明的作用域顶部被创建，通常这种被叫做“变量提升”。但和var不同的是，var的创建会设置一个初试的undefined值，let变量在没有运行到声明代码时是不会被初始化的。引用它将会导致 ReferenceError（而使用 var 声明变量则恰恰相反，该变量的值是 undefined ）。直到初始化执行的时候，该变量都处于从块开始到初始化处理的“暂存死区”。

在 ECMAScript 2015 中，let（const）将不会提升变量到代码块的顶部。因此，在变量声明之前引用这个变量，将抛出错误ReferenceError。这个变量将从代码块一开始的时候就处在一个“暂时性死区”，直到这个变量被声明为止。

```js
function do_something() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError: foo is not defined
  var bar = 1;
  let foo = 2;
}
```

## const
常量是块级作用域，很像使用 let 语句定义的变量。常量的值不能通过重新赋值来改变，并且不能重新声明。

此声明创建一个常量，其作用域可以是全局或本地声明的块。 与var变量不同，全局常量不会变为窗口对象的属性。需要一个常数的初始化器；也就是说，您必须在声明的同一语句中指定它的值（这是有道理的，因为以后不能更改）。

const声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识符不能重新分配。例如，在引用内容是对象的情况下，这意味着可以改变对象的内容（例如，其参数）。

关于“暂存死区”的所有讨论都适用于let和const。

一个常量不能和它所在作用域内的其他变量或函数拥有相同的名称。

```js
// 注意: 常量在声明的时候可以使用大小写，但通常情况下全部用大写字母。 

// 定义常量MY_FAV并赋值7
const MY_FAV = 7;

// 报错
MY_FAV = 20;

// 输出 7
console.log("my favorite number is: " + MY_FAV);

// 尝试重新声明会报错 
const MY_FAV = 20;

//  MY_FAV 保留给上面的常量，这个操作会失败
var MY_FAV = 20; 

// 也会报错
let MY_FAV = 20;

// 注意块范围的性质很重要
if (MY_FAV === 7) { 
    // 没问题，并且创建了一个块作用域变量 MY_FAV
    // (works equally well with let to declare a block scoped non const variable)
    let MY_FAV = 20;

    // MY_FAV 现在为 20
    console.log('my favorite number is ' + MY_FAV);

    // 这被提升到全局上下文并引发错误
    var MY_FAV = 20;
}

// MY_FAV 依旧为7
console.log("my favorite number is " + MY_FAV);

// 常量要求一个初始值
const FOO; // SyntaxError: missing = in const declaration

// 常量可以定义成对象
const MY_OBJECT = {"key": "value"};

// 重写对象和上面一样会失败
MY_OBJECT = {"OTHER_KEY": "value"};

// 对象属性并不在保护的范围内，下面这个声明会成功执行
MY_OBJECT.key = "otherValue";

// 也可以用来定义数组
const MY_ARRAY = [];
// It's possible to push items into the array
// 可以向数组填充数据
MY_ARRAY.push('A'); // ["A"]
// 但是，将一个新数组赋给变量会引发错误
MY_ARRAY = ['B']
```