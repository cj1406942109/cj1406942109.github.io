# Python 安装Numpy
> 记录时间：2017-10-10

> Numpy是用于科学计算的python基础包

## 安装

```bash
    # 下载wheels包安装
    https://pypi.python.org/pypi/numpy
    # windows，64位系统安装包下载地址：
    https://pypi.python.org/packages/e9/7c/5665454a5cea3db586b315fa167d4b8b7963fdcc98c3b6578bc5eb4e6153/numpy-1.13.3-cp36-none-win_amd64.whl#md5=8748204cc74d46f617c316507360ccb3

    # 安装（需要先安装pip）
    pip install D:/numpy-1.13.3-cp36-none-win_amd64.whl # 注意包的路径

    # 测试
    # 打开python.exe
    from numpy import *
    random.rand(4,4)
    # 有输出即安装成功
```