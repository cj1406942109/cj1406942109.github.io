# dos同步系统时间
> 记录时间：2017-03-10

## 使用w32tm命令

```bash
  1. 使用管理员权限打开cmd

  2. 输入命令
  w32tm /resync
```

## 如果服务未启动
```bash
  # 注册服务
  w32tm /register

  # 启动服务
  net start w32time
```

# 如果不能同步成功
```bash
  # 执行w32tm /resync，输出：此计算机没有重新同步，因为没有可用的时间数据
  //TODO:
  未解决
```