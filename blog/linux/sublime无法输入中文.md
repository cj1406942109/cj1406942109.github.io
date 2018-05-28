# sublime无法输入中文
> 记录时间：2016-11-24

## 解决sublime下无法输入中文的问题
> 详见博客：https://my.oschina.net/lee2013/blog/396855

注意：如果从锁定到启动器的图标打开sublime，此时还是不能输入中文，
需要修改目录: `~/.local/share/applications` 下的 `sublime_text.desktop` 文件：
```bash
  # 将1修改为2
  1. Exec=/opt/sublime_text/sublime_text
  ===> 
  2. Exec=bash -c "LD_PRELOAD=/opt/sublime_text/libsublime-imfix.so exec /opt/sublime_text/sublime_text %F"
```
