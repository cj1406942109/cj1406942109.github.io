# windows下安装scipy

> windows正常通过pip命令安装numpy和scipy的时候：

```bash
  pip install numpy
  pip install scipy
```
> numpy可以正常安装成功，但是由于scipy要依赖于numpy和其他的很多库（如LAPACK/BLAS），这些库在windows上并不能简单获取到，而 `pip install scipy`默认安装的为linux环境下的包，所以安装失败

## 解决方法
1. 下载扩展包，手动安装。
    > [下载地址](http://www.lfd.uci.edu/~gohlke/pythonlibs/)，该网站是「非官方的Windows二进制文件Python扩展包（Unofficial Windows Binaries for Python Extension Packages）」。

2. scipy下载地址：http://www.lfd.uci.edu/~gohlke/pythonlibs/#scipy
    > 注意下载的版本：    
    > 如：scipy‑1.0.1‑cp36‑cp36m‑win_amd64.whl    
    > 对应：{包名：scipy}-{版本：1.0.1}-{python版本：cp36即为python3.6}-{系统位数：win_amd64即为64位系统}   
    > 如果下载的版本与本地环境不符，安装时会出现错误信息：`is not a supported wheel on this platform`

3. numpy+mkl下载地址：http://www.lfd.uci.edu/~gohlke/pythonlibs/#numpy
    > 由于scipy依赖于有mkl的numpy库，而从pip安装的numpy的库不带mkl，所以需要从上面的网站下载

