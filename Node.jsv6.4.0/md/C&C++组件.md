# Node.js v6.4.0文档

<!-- toc orderedList:0 -->

- [Node.js v6.4.0文档](#nodejs-v640文档)
- [组件](#组件)
	- [Hello world](#hello-world)
		- [构建](#构建)
		- [链接到Node.js自己的依赖](#链接到nodejs自己的依赖)
		- [使用`require()`加载组件](#使用require加载组件)
	- [Node.js原生抽象](#nodejs原生抽象)
	- [组件实例](#组件实例)
		- [函数参数](#函数参数)
		- [回调函数](#回调函数)
		- [对象工厂](#对象工厂)
		- [函数工厂](#函数工厂)
		- [封装C++对象](#封装c对象)
		- [封装对象工厂](#封装对象工厂)
		- [传递包装对象](#传递包装对象)
		- [退出程序执行钩子](#退出程序执行钩子)
			- [`void AtExit(callback,args)`](#void-atexitcallbackargs)

<!-- tocstop -->

# 组件

Node.js组件是以C或C++编写的动态链接共享对象，可以使用[`require()`](https://nodejs.org/dist/latest-v6.x/docs/api/globals.html#globals_require)方法加载到Node.js，像Node.js的普通模块一样使用。它们主要用来为JavaScript提供运行于Node.js和C/C++库的接口。

目前，实现组件的方法非常复杂，调用了多个知识领域的组件和API。
- V8：Node.js目前使用的用于提供JavaScript实现的C++库。V8提供创建对象，调用函数等机制。V8的API主要记录在`v8.h`头文件（Node.js源码目录树中的`deps/v8/include/v8.h`）中，同时也可以[在线访问](https://v8docs.nodesource.com/)。
- [libuv](https://github.com/libuv/libuv)：实现Node.js事件循环的C语言库，处理平台的线程和所有的异步行为。它也可以作为一个跨平台抽象库使用，简单地说，跨越所有主流操作系统进行对多个公共系统任务的类POSIX访问，像文件系统交互、套接字、定时器和系统事件。libuv也提供了一个类线程的线程抽象，可以用于处理更加复杂需要超越基本事件循环的异步组件。鼓励组件的开发人员考虑如何通过由`libuv`的卸载工作实现非阻塞系统操作，处理线程或自定义`libuv`的线程的使用来避免阻塞带有I/O操作的事件循环或其他时间密集的任务。
- Node.js内部库。Node.js本身输出了一些组件可以使用的C/C++API，其中最主要的是`node::ObjectWrap`类。
- Node.js包含一些其他含有OpenSSL的静态链接库。这些库放在Node.js源码目录树中的`deps/`目录下。只有V8和OpenSSL符号是Node.js有目的地重新导出的，可以被其他组件应用于各种范围。查看[链接到Node.js自己的依赖](https://nodejs.org/dist/latest-v6.x/docs/api/addons.html#addons_linking_to_node_js_own_dependencies)获取更多信息。

下列所有例子都可以[下载](https://github.com/nodejs/node-addon-examples)作为你的个人组件的起点使用。

## Hello world
这个“Hello world”例子是使用C++的一个简单组件编写的，它与下面的JavaScript代码等价。
```js
module.exports.hello = () => 'world';
```

首先，创建`hello.cc`文件
```c
// hello.cc
#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(addon, init)

}  // namespace demo
```

注意：所有的Node.js组件必须输出一个以下格式的初始化函数：
```js
void Initialize(Local<Object> exports);
NODE_MODULE(module_name, Initialize)
```

`NODE_MODULE`后面没有分号因为它不是函数（查看`node.h`）。

`module_name`必须与最后的二进制文件相匹配（包括.node后缀）。

在`hello.cc`例子中，后面的初始化函数是`init`，模块名为`addon`。

### 构建
一旦完成源码编写，必须将其编译为二进制`addon.node`文件。为了实现这个，使用类JSON格式在项目的顶级目录下创建一个名为`binding.gyp`的文件用于描述你的模块的构建配置。这个文件被[node-gyp](https://github.com/nodejs/node-gyp)（一个特别编写的工具用于编译Node.js组件）使用。

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ]
    }
  ]
}
```
注意：`node-gyp`工具的版本是作为`npm`的一部分与Node.js绑定发布的。该版本对于开发者不是直接可用的，它只支持使用`npm install`命令来编译和安装组件。如果想要直接使用`node-gyp`，可以使用`npm install -g node-gyp`进行安装。查看`node-gyp`[安装说明](https://github.com/nodejs/node-gyp#installation)获取更多信息，包括具体平台的需求。

构建之后，二进制组件可以通过Node.js的[`require()`](https://nodejs.org/dist/latest-v6.x/docs/api/globals.html#globals_require)指向构建的`addon.node`模块来使用：
```js
// hello.js
const addon = require('./build/Release/addon');

console.log(addon.hello()); // 'world'
```

请看下面的例子获取更多信息或者访问[ https://github.com/arturadib/node-qt](https://github.com/arturadib/node-qt)查看案例。

因为编译后的二进制组件的确切路径可能依赖其编译如何进行（即：有时在`.build/Debug/`目录下）而不同，组件可以使用[bindings](https://github.com/TooTallNate/node-bindings)包来加载编译后的模块。

注意，尽管`bindings`包在如何定位组件模块上的实现是很复杂的，本质上还是使用了如下的try-catch模式：
```js
try {
  return require('./build/Release/addon.node');
} catch (err) {
  return require('./build/Debug/addon.node');
}
```

### 链接到Node.js自己的依赖
Node.js使用大量的静态链接库，如V8、libuv和OpenSSL。为了链接到v8或者其他依赖所有的组件都是必须的 。通常，这很简单，只要包括合适的`#include<...>`语句（如：`#include<v8.h>`）和`node-gyp`就能自动定位恰当的头文件。然后，需要注意一些说明：
- 当`node-gyp`运行时，它会检测Node.js特定的发行版本并下载完整的源码包或者头文件。如果下载了源码，组件能够完全访问Node.js的所有依赖集。然而，如果只下载了Node.js的头文件，则只能使用被Node.js输出的符号。
- `node-gyp`命令可以使用`--nodeir`参数指向一个本地Node.js源映像。使用这个可选参数，组件就能访问整个依赖集。

### 使用`require()`加载组件
编译后的组件的二进制文件的扩展名为`.node`(与`.dll`或`.so`相对)。[require()](https://nodejs.org/dist/latest-v6.x/docs/api/globals.html#globals_require)函数用来寻找有`.node`扩展名的文件并将其作为动态链接库进行初始化。

当调用[require()](https://nodejs.org/dist/latest-v6.x/docs/api/globals.html#globals_require)时，`.node`扩展名通常被忽略，Node.js仍会查找和初始化组件。一个需要说明的地方是Node.js首先会尝试定位并加载共享相同的基址名模块或JavaScript文件。例如：如果有一个`addon.js`和二进制文件`addon.node`在相同的目录下，那么[requier('addon')](https://nodejs.org/dist/latest-v6.x/docs/api/globals.html#globals_require)会优先加载`addon.js`文件。

## Node.js原生抽象
本文档阐明的每个例子都是直接使用Node.js和V8API实现组件的。理解V8API从一个版本发布到下一个版本（和Node.js的主版本发布到下一个版本）能做什么，有什么，做了哪些显著地改变是很重要的。对于每一个改变，组件可能需要更新和重新编译才能继续运作。Node.js发布机制的设计能最小化这些改变的频率和影响，但是Node.js目前很难保证V8API的稳定性。

[Node.js原生抽象](https://github.com/nodejs/nan)(`nan`)提供了一套工具，推荐组件开发者使用来保证V8和Node.js的过去和以后发布版本之间的兼容性。查看`nan`的[案例](https://github.com/nodejs/nan/tree/master/examples/)了解如何使用。

## 组件实例
下面是帮助开发者入门的一些案例。这些例子使用了V8API。可以参考在线[V8说明](https://v8docs.nodesource.com/)获取
不同V8调用的帮助，也可以查看V8的[嵌入文档](https://developers.google.com/v8/embed)获取用到的几个概念的解释，如`handles`，`scopes`，`function templates`等。

每个案例都会使用下面的`binding.gyp`文件：
```js
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ]
    }
  ]
}
```

当有多个`.cc`文件时，只需要将额外的文件名添加到`sources`数组中，例如：
```js
"sources": ["addon.cc", "myexample.cc"]
```

`binding.gyp`文件就绪后，可以使用`node-gyp`配置和构建示例组件：
```
$ node-gyp configure build
```

### 函数参数
组件通常会暴露对象和函数以供与Node.js一起运行的JavaScript访问。当函数被JavaScript调用时，输入参数和返回值必须映射到C/C++代码。

下例阐述了如何读取JavaScript传入的函数参数和如何返回一个结果：
```c++
// addon.cc
#include <node.h>

namespace demo {

using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

// This is the implementation of the "add" method
// Input arguments are passed using the
// const FunctionCallbackInfo<Value>& args struct
void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // Check the number of arguments passed.
  if (args.Length() < 2) {
    // Throw an Error that is passed back to JavaScript
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  // Check the argument types
  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments")));
    return;
  }

  // Perform the operation
  double value = args[0]->NumberValue() + args[1]->NumberValue();
  Local<Number> num = Number::New(isolate, value);

  // Set the return value (using the passed in
  // FunctionCallbackInfo<Value>&)
  args.GetReturnValue().Set(num);
}

void Init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "add", Add);
}

NODE_MODULE(addon, Init)

}  // namespace demo
```

编译之后，示例组件可以被Node.js引入和使用：
```js
// test.js
const addon = require('./build/Release/addon');

console.log('This should be eight:', addon.add(3, 5));
```

### 回调函数
对于组件，一个通用的做法是将JavaScript函数传递给一个C++函数并在其中执行。下例阐述了如何调用这样的回调函数：
```c++
// addon.cc
#include <node.h>

namespace demo {

using v8::Function;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Null;
using v8::Object;
using v8::String;
using v8::Value;

void RunCallback(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Function> cb = Local<Function>::Cast(args[0]);
  const unsigned argc = 1;
  Local<Value> argv[argc] = { String::NewFromUtf8(isolate, "hello world") };
  cb->Call(Null(isolate), argc, argv);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", RunCallback);
}

NODE_MODULE(addon, Init)

}  // namespace demo
```

注意：该例使用了一个接收整个`module`对象作为第二参数的两个参数形式的`Init()`。这允许组件用一个函数而不是添加一个函数作为`exports`的属性来完全重写`exports`。

为了测试它，允许下面的JavaScript代码：
```js
// test.js
const addon = require('./build/Release/addon');

addon((msg) => {
  console.log(msg); // 'hello world'
});
```

注意：该例中，回调函数是同步调用的。

### 对象工厂
如下例所示，组件可以创建并返回一个从C++函数得到的新对象。使用`msg`属性创建并返回一个对象，该属性打印传递给`creatObject()`的字符串：
```c++
// addon.cc
#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  Local<Object> obj = Object::New(isolate);
  obj->Set(String::NewFromUtf8(isolate, "msg"), args[0]->ToString());

  args.GetReturnValue().Set(obj);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", CreateObject);
}

NODE_MODULE(addon, Init)

}  // namespace demo
```

在JavaScript代码中测试：
```js
// test.js
const addon = require('./build/Release/addon');

var obj1 = addon('hello');
var obj2 = addon('world');
console.log(obj1.msg, obj2.msg); // 'hello world'
```

### 函数工厂
另一个通用的场景是创建一个封装C++函数并将其返回给JavaScript的JavaScript函数：
```c++
// addon.cc
#include <node.h>

namespace demo {

using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void MyFunction(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "hello world"));
}

void CreateFunction(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, MyFunction);
  Local<Function> fn = tpl->GetFunction();

  // omit this to make it anonymous
  fn->SetName(String::NewFromUtf8(isolate, "theFunction"));

  args.GetReturnValue().Set(fn);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", CreateFunction);
}

NODE_MODULE(addon, Init)

}  // namespace demo
```

测试：
```js
// test.js
const addon = require('./build/Release/addon');

var fn = addon();
console.log(fn()); // 'hello world'
```

### 封装C++对象
以允许使用JavaScript的`new`运算符创建新实例的方式封装C++对象/类同样是可以的：
```c++
// addon.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  MyObject::Init(exports);
}

NODE_MODULE(addon, InitAll)

}  // namespace demo
```

然后，在`myobject.h`文件中，包装器类继承`node::ObjectWrap`：
```c++
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include <node_object_wrap.h>

namespace demo {

class MyObject : public node::ObjectWrap {
 public:
  static void Init(v8::Local<v8::Object> exports);

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Persistent<v8::Function> constructor;
  double value_;
};

}  // namespace demo

#endif
```

`myobject`文件中，实现要暴露的多个方法。下面`plusOne()`方法通过添加到构建函数的原型来暴露：
```c++
// myobject.cc
#include "myobject.h"

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Persistent;
using v8::String;
using v8::Value;

Persistent<Function> MyObject::constructor;

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

void MyObject::Init(Local<Object> exports) {
  Isolate* isolate = exports->GetIsolate();

  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);

  constructor.Reset(isolate, tpl->GetFunction());
  exports->Set(String::NewFromUtf8(isolate, "MyObject"),
               tpl->GetFunction());
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new MyObject(...)`
    double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue();
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `MyObject(...)`, turn into construct call.
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Context> context = isolate->GetCurrentContext();
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Object> result =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(result);
  }
}

void MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.Holder());
  obj->value_ += 1;

  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

}  // namespace demo
```

为了构建这个案例，`myobject.cc`文件必须添加到`binding.gyp`：
```js
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [
        "addon.cc",
        "myobject.cc"
      ]
    }
  ]
}
```
测试：
```js
// test.js
const addon = require('./build/Release/addon');

var obj = new addon.MyObject(10);
console.log(obj.plusOne()); // 11
console.log(obj.plusOne()); // 12
console.log(obj.plusOne()); // 13
```

### 封装对象工厂
或者，为了避免使用JavaScript的`new`运算符显示创建一个对象实例，可以使用工厂模式：
```c++
var obj = addon.createObject();
// instead of:
// var obj = new addon.Object();
```
首先，在`addon.cc`中实现`createObject()`方法：
```c++
// addon.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  MyObject::NewInstance(args);
}

void InitAll(Local<Object> exports, Local<Object> module) {
  MyObject::Init(exports->GetIsolate());

  NODE_SET_METHOD(module, "exports", CreateObject);
}

NODE_MODULE(addon, InitAll)

}  // namespace demo
```
在`myobject.h`中，添加静态方法`NewInstance()`来实例化对象。这个方法取代了使用JavaScript中的`new`运算符。
```c++
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include <node_object_wrap.h>

namespace demo {

class MyObject : public node::ObjectWrap {
 public:
  static void Init(v8::Isolate* isolate);
  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Persistent<v8::Function> constructor;
  double value_;
};

}  // namespace demo

#endif
```
`myobject.cc`中的实现与之前的例子相同：
```c++
// myobject.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Persistent;
using v8::String;
using v8::Value;

Persistent<Function> MyObject::constructor;

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

void MyObject::Init(Isolate* isolate) {
  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);

  constructor.Reset(isolate, tpl->GetFunction());
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new MyObject(...)`
    double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue();
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `MyObject(...)`, turn into construct call.
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Context> context = isolate->GetCurrentContext();
    Local<Object> instance =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(instance);
  }
}

void MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  const unsigned argc = 1;
  Local<Value> argv[argc] = { args[0] };
  Local<Function> cons = Local<Function>::New(isolate, constructor);
  Local<Context> context = isolate->GetCurrentContext();
  Local<Object> instance =
      cons->NewInstance(context, argc, argv).ToLocalChecked();

  args.GetReturnValue().Set(instance);
}

void MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.Holder());
  obj->value_ += 1;

  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

}  // namespace demo
```
同样，为了构建这个案例，`myobject.cc`文件必须添加到`binding.gyp`中:
```js
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [
        "addon.cc",
        "myobject.cc"
      ]
    }
  ]
}
```

测试：
```js
// test.js
const createObject = require('./build/Release/addon');

var obj = createObject(10);
console.log(obj.plusOne()); // 11
console.log(obj.plusOne()); // 12
console.log(obj.plusOne()); // 13

var obj2 = createObject(20);
console.log(obj2.plusOne()); // 21
console.log(obj2.plusOne()); // 22
console.log(obj2.plusOne()); // 23
```

### 传递包装对象
除了包装和返回C++对象，通过使用Node.js助手函数`node::ObjectWrap::Unwrap`对它们进行解封装来传递封装的对象也是可以的。下例展示了一个可以传入两个`MyObject`对象作为输入参数的`add()`函数：
```c++
// addon.cc
#include <node.h>
#include <node_object_wrap.h>
#include "myobject.h"

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  MyObject::NewInstance(args);
}

void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  MyObject* obj1 = node::ObjectWrap::Unwrap<MyObject>(
      args[0]->ToObject());
  MyObject* obj2 = node::ObjectWrap::Unwrap<MyObject>(
      args[1]->ToObject());

  double sum = obj1->value() + obj2->value();
  args.GetReturnValue().Set(Number::New(isolate, sum));
}

void InitAll(Local<Object> exports) {
  MyObject::Init(exports->GetIsolate());

  NODE_SET_METHOD(exports, "createObject", CreateObject);
  NODE_SET_METHOD(exports, "add", Add);
}

NODE_MODULE(addon, InitAll)

}  // namespace demo
```

在`myobject.h`中，添加了一个新的公共方法来允许访问解封装后的对象的私有值。
```c++
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include <node_object_wrap.h>

namespace demo {

class MyObject : public node::ObjectWrap {
 public:
  static void Init(v8::Isolate* isolate);
  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);
  inline double value() const { return value_; }

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Persistent<v8::Function> constructor;
  double value_;
};

}  // namespace demo

#endif
```
`myobject.cc`的实现与之前相同：
```c++
// myobject.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::Persistent;
using v8::String;
using v8::Value;

Persistent<Function> MyObject::constructor;

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

void MyObject::Init(Isolate* isolate) {
  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  constructor.Reset(isolate, tpl->GetFunction());
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new MyObject(...)`
    double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue();
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `MyObject(...)`, turn into construct call.
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Context> context = isolate->GetCurrentContext();
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Object> instance =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(instance);
  }
}

void MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  const unsigned argc = 1;
  Local<Value> argv[argc] = { args[0] };
  Local<Function> cons = Local<Function>::New(isolate, constructor);
  Local<Context> context = isolate->GetCurrentContext();
  Local<Object> instance =
      cons->NewInstance(context, argc, argv).ToLocalChecked();

  args.GetReturnValue().Set(instance);
}

}  // namespace demo
```

测试：
```js
// test.js
const addon = require('./build/Release/addon');

var obj1 = addon.createObject(10);
var obj2 = addon.createObject(20);
var result = addon.add(obj1, obj2);

console.log(result); // 30
```

### 退出程序执行钩子
"退出程序执行"钩子是Node.js事件循环结束之后，JavaScriptVM终止、Node.js关闭之前调用的一个函数。"退出执行程序"钩子使用`node::AtExit`API注册。

#### `void AtExit(callback,args)`
- `callback`:`void(*)(void*)`，指向函数的指针用于退出时调用
- `args`：`void*`，退出时传递个回调函数的指针

注册器退出在事件循环结束之后，VM被杀死之前运行的钩子。

AtExit有两个参数：一个指向回到函数的指针，退出时运行；和一个指向传递个回调函数的无类型上下文数据的指针。

回调函数按后进先出的顺序执行。
下面的`addon.cc`是AtExit的实现:
```c++
// addon.cc
#undef NDEBUG
#include <assert.h>
#include <stdlib.h>
#include <node.h>

namespace demo {

using node::AtExit;
using v8::HandleScope;
using v8::Isolate;
using v8::Local;
using v8::Object;

static char cookie[] = "yum yum";
static int at_exit_cb1_called = 0;
static int at_exit_cb2_called = 0;

static void at_exit_cb1(void* arg) {
  Isolate* isolate = static_cast<Isolate*>(arg);
  HandleScope scope(isolate);
  Local<Object> obj = Object::New(isolate);
  assert(!obj.IsEmpty()); // assert VM is still alive
  assert(obj->IsObject());
  at_exit_cb1_called++;
}

static void at_exit_cb2(void* arg) {
  assert(arg == static_cast<void*>(cookie));
  at_exit_cb2_called++;
}

static void sanity_check(void*) {
  assert(at_exit_cb1_called == 1);
  assert(at_exit_cb2_called == 2);
}

void init(Local<Object> exports) {
  AtExit(sanity_check);
  AtExit(at_exit_cb2, cookie);
  AtExit(at_exit_cb2, cookie);
  AtExit(at_exit_cb1, exports->GetIsolate());
}

NODE_MODULE(addon, init);

}  // namespace demo
```
在JavaScript中测试：
```js
// test.js
const addon = require('./build/Release/addon');
```
