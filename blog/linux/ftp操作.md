# ftp操作
> 记录时间：2016-11-11

## 连接到ftp
```bash
  # 连接到ip地址为192.168.11.11端口号为8080的远程主机
  ftp 192.168.11.11 8080

  # 切换目录
  cd dir
  
  # 将远程主机中dri1下的file1复制到dir2下并命名为file2
  get dir1/file1 dir2/file2

  # 断开远程连接
  quit
```
