# Node.js v6.4.0文档


<!-- toc orderedList:0 -->

- [Node.js v6.4.0文档](#nodejs-v640文档)
- [DNS](#dns)
	- [dns.getServers()](#dnsgetservers)
	- [dns.lookup(hostname[,option],callback)](#dnslookuphostnameoptioncallback)

<!-- tocstop -->


# DNS
> **稳定性：2 - 稳定**

`dns`模块包含两种不同种类的函数。

1）使用底层的操作系统工具执行名称解析的函数，这些函数不一定执行网络通讯。这一类只有一个函数：[dns.lookup()](https://nodejs.org/dist/latest-v6.x/docs/api/dns.html#dns_dns_lookup_hostname_options_callback)。**开发者如果想要在同一操作系统上寻找其他应用以相同的方式执行名称解析的行为应该使用 `dns.lookup()`**。

例如：查看`nodejs.org`。
```js
const dns = require('dns');

dns.lookup('nodejs.org', (err, addresses, family) => {
  console.log('addresses:', addresses);
});
```

2）连接到一个实际的DNS服务器执行名称解析的函数，这些函数总是使用网络来执行DNS查询。这一类函数包含`dns`模块中除了`dns.lookup()`的所有函数。这些函数不使用`dns.lookup()`使用的配置文件的相同集合（如：/etc/hosts）。开发者应该在不希望使用底层操作系统的工具来进行名称解析，而是总是执行DNS查询时使用这些函数。

下面是解析`nodejs.org`并逆序解析返回的IP地址的例子：
```js
const dns = require('dns');

dns.resolve4('nodejs.org', (err, addresses) => {
  if (err) throw err;

  console.log(`addresses: ${JSON.stringify(addresses)}`);

  addresses.forEach((a) => {
    dns.reverse(a, (err, hostnames) => {
      if (err) {
        throw err;
      }
      console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);
    });
  });
});
```

选择不同的函数会有一些细微的差别，详细信息请查询[实现注意事项部分](https://nodejs.org/dist/latest-v6.x/docs/api/dns.html#dns_implementation_considerations)。

## dns.getServers()
添加于v0.1.90

返回用于名称解析的IP地址字符串数组。

## dns.lookup(hostname[,option],callback)

添加于v0.1.90

将一个域名（如`nodejs.org`）解析为首次发现的A（IPv4）或AAAA（IPv6）记录。`options`可以是对象或者整数。如果未提供`options`，则IPv4和IPv6地址都是合法的。如果`options`是整数，则必须是`4`或`6`。或者`options`可以是包含以下属性的对象：
- `family`<[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)> - 记录族。如果给出，则必须是整数4或者6。如果未给出，IPv4和IPv6都是可接受的。
- `hints`<[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)> - 如果给出，它必须是支持的`getaddrinfo`标志中的一个或多个。如果未给出，则不将标志的值传递给`getaddrinfo`。
