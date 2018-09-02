# for...in 与 for...of
> 记录时间：2018-08-31

## for...in
for...in语句以任意顺序遍历一个对象的可枚举属性。对于每个不同的属性，语句都会被执行。

for...in 循环只遍历可枚举属性。像 Array和 Object使用内置构造函数所创建的对象都会继承自Object.prototype和String.prototype的不可枚举属性，例如 String 的 indexOf()  方法或 Object的toString()方法。循环将遍历对象本身的所有可枚举属性，以及对象从其构造函数原型中继承的属性（更接近原型链中对象的属性覆盖原型属性）。

for...in 循环以任意序迭代一个对象的属性（请参阅delete运算符，了解为什么不能依赖于迭代的表面有序性，至少在跨浏览器设置中）。如果一个属性在一次迭代中被修改，在稍后被访问，其在循环中的值是其在稍后时间的值。一个在被访问之前已经被删除的属性将不会在之后被访问。在迭代进行时被添加到对象的属性，可能在之后的迭代被访问，也可能被忽略。通常，在迭代过程中最好不要在对象上进行添加、修改或者删除属性的操作，除非是对当前正在被访问的属性。这里并不保证是否一个被添加的属性在迭代过程中会被访问到，不保证一个修改后的属性（除非是正在被访问的）会在修改前或者修改后被访问，不保证一个被删除的属性将会在它被删除之前被访问。

for...in不应该用于迭代一个 Array，其中索引顺序很重要。

数组索引只是具有整数名称的枚举属性，并且与通用对象属性相同。不能保证for ... in将以任何特定的顺序返回索引。for ... in循环语句将返回所有可枚举属性，包括非整数类型的名称和继承的那些。

虽然用for...in来迭代Array元素很诱人，但是它返回的除了数字索引外还有可能是你自定义的属性名字。因此还是用带有数字索引的传统的for 循环来迭代一个数组比较好，因为如果你想改变数组对象，比如添加属性或者方法，for...in 语句迭代的是 自定义的属性而不是数组的元素。

```js
var obj = {a:1, b:2, c:3};
    
for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```


## for...of
for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

```js
let iterable = [10, 20, 30];

for (let value of iterable) {
    value += 1;
    console.log(value);
}
// 11
// 21
// 31
```

## 两者区别
下面的这个例子展示了 for...of 和 for...in 两种循环语句之间的区别。与 for...in 循环遍历的结果是数组元素的下标不同的是， for...of 遍历的结果是元素的值：

```js
let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}
//此循环仅以原始插入顺序记录iterable 对象的可枚举属性。它不记录数组元素3, 5, 7 或hello，因为这些不是枚举属性。但是它记录了数组索引以及arrCustom和objCustom。

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}
// 这个循环类似于第一个，但是它使用hasOwnProperty() 来检查，如果找到的枚举属性是对象自己的（不是继承的）。如果是，该属性被记录。记录的属性是0, 1, 2和foo，因为它们是自身的属性（不是继承的）。属性arrCustom和objCustom不会被记录，因为它们是继承的。


for (let i of arr) {
   console.log(i); // logs "3", "5", "7" // 注意这里没有 hello
}
// 该循环迭代并记录iterable作为可迭代对象定义的迭代值，这些是数组元素 3, 5, 7，而不是任何对象的属性。
```
