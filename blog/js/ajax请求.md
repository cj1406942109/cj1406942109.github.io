# ajax请求
> 记录时间：2018-08-31

使用诸如 XMLHttpRequest 之类的API或者 — 最近以来的 Fetch API 来实现. 这些技术允许网页直接处理对服务器上可用的特定资源的 HTTP 请求，并在显示之前根据需要对结果数据进行格式化。

在早期，这种通用技术被称为Asynchronous JavaScript and XML（Ajax）， 因为它倾向于使用XMLHttpRequest 来请求XML数据。 但通常不是这种情况 (你更有可能使用 XMLHttpRequest 或 Fetch 来请求JSON), 但结果仍然是一样的，术语“Ajax”仍然常用于描述这种技术。

## XMLHttpRequest
XMLHttpRequest （通常缩写为XHR）现在是一个相当古老的技术 - 它是在20世纪90年代后期由微软发明的，并且已经在相当长的时间内跨浏览器进行了标准化。

```js
// 创建一个新的请求对象
var request = new XMLHttpRequest();

// 指定用于从网络请求资源的 HTTP request method , 以及它的URL是什么。
var url = 'https://raw.githubusercontent.com/mdn/learning-area/master/javascript/apis/fetching-data/verse1.txt'
request.open('GET', url);

// 设置我们期待的响应类型 ，XHR默认返回文本 
request.responseType = 'text';

// 从网络获取资源是一个 asynchronous "异步" 操作, 这意味着您必须等待该操作完成（例如，资源从网络返回），然后才能对该响应执行任何操作，否则会出错,将被抛出错误。 XHR允许你使用它的 onload 事件处理器来处理这个事件 — 当onload 事件触发时（当响应已经返回时）这个事件会被运行。 发生这种情况时， response 数据将在XHR请求对象的响应属性中可用。

var textData = '';
request.onload = function() {
  textData = request.response;
};

// 以上都是XHR请求的设置 — 在我们告诉它之前，它不会真正运行，这是通过 send() 完成的.
request.send();
```

## Fetch
Fetch API基本上是XHR的一个现代替代品——它是最近在浏览器中引入的，它使异步HTTP请求在JavaScript中更容易实现，对于开发人员和在Fetch之上构建的其他API来说都是如此。

```js
var url = 'https://raw.githubusercontent.com/mdn/learning-area/master/javascript/apis/fetching-data/verse1.txt'
var textData = '';

// 原XHR代码
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'text';
request.onload = function() {
  textData = request.response;
};
request.send();

// Fetch代码
fetch(url).then(function(response) {
  response.text().then(function(text) {
    textData = text;
  });
});
```
