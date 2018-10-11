# windows安装neo4j
> 记录时间：2018-09-25

## 依赖

安装neo4j之前需要先处理好其依赖，硬件相关这里不做详述，参考[官方文档](https://neo4j.com/docs/operations-manual/current/installation/requirements/)。

重点说明软件，neo4j依赖于java虚拟机，除了windows和mac的社区版内置了JVM，其他的版本，包括所有的企业版，都需要预先安装好JVM。

下载[Oracle Java](https://www.oracle.com/technetwork/java/javase/downloads/index.html)

## 下载neo4j
我们使用windows控制台应用，下载[社区版](https://go.neo4j.com/download-thanks.html?edition=community&release=3.4.7&flavour=winzip)，或者访问[ https://neo4j.com/download/other-releases/#releases]( https://neo4j.com/download/other-releases/#releases)选择其他版本。

下载之后解压即可。

1. 下载解压之后，进入到解压目录，执行`bin\neo4j console`命令即可开始运行服务
2. 使用`Ctrl-C`停止服务

## 注册为windows服务

可以将其注册为服务，方便使用：

1. 使用命令`bin\neo4j install-service`进行服务注册
2. 使用`bin\neo4j start`命令启动服务。可用命令有 `help`, `start`, `stop`, `restart`, `status`, `install-service`, `uninstall-service`, 和 `update-service`。


## 其他

更多细节参考[官方教程](https://neo4j.com/docs/operations-manual/current/installation/windows/)
