# 添加端口
> 记录时间：2017-10-08

```bash
# 添加8010端口
firewall-cmd --zone=public --permanent --add-port=8010/tcp

# 重载防火墙
firewall-cmd --reload
```