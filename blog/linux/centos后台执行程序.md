# nohup
> 记录时间：2017-10-12

```bash
    # 后台执行node
    nohup npm start &
```

## 注意事项

> 退出shell时，使用`exit`命令退出，如果使用`ctrl+c`强制退出，可能会导致被脚本启动的进程全部中断，后台启动失败