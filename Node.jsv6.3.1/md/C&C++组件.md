# Node.js v6.3.1文档

<!-- toc orderedList:0 -->

- [Node.js v6.3.1文档](#nodejs-v631文档)
- [组件](#组件)
	- [Hello world](#hello-world)
		- [构建](#构建)

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
