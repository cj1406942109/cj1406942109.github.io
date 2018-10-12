# Android Studio AVD的配置与使用
> 记录时间：2018-10-12

## Android Studio自带AVD
Android Studio 程序可以在真机上调试运行，Android Studio 也提供了模拟器来调试运行，这时需要配置 AVD 来选择你调试程序的模拟环境。

具体的配置过程不做详述，可以参考[博客](http://www.ibooker.cc/article/143/detail)

这里，在使用AVD时遇到一个问题，启动配置好的AVD时，发生如下错误：
```
22:15	Emulator: emulator: ERROR: x86 emulation currently requires hardware acceleration!

22:15	Emulator: Process finished with exit code 1
```

这是因为：在 Intel CPU 的主机上，为了加速AVD模拟器的运行速度，需要启用 HAXM 。如果在没有启用 HAXM 时就运行程序，调用AVD模拟器时就会报该错误。

解决方案：

1. 确保电脑的`BIOS`已经启用`Intel Virtual Technology`。
2. 正常安装 Android Studio 的情况下，`intelhaxm-android.exe`已经帮你下载好，其目录为`{sdkpath}/extras/intel/Hardware_Accelerated_Execution_Manager`，找到`intelhaxm-android.exe`，点击安装即可；如果没有下载，可以访问[Intel® Hardware Accelerated Execution Manager](https://software.intel.com/en-us/articles/intel-hardware-accelerated-execution-manager-intel-haxm)手动下载安装。
3. 安装完成之后，再次点击AVD启动按钮，即可正常运行AVD。

注意：对于非 Intel CPU 的主机或不能安装 HAXM 的主机(像我的云主机)，则只能选择 arm 模拟器 或 选择其它第三方的模拟器 (像Genymotion，夜神模拟器等)。
