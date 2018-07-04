# latex文档的几种编译方法
> 记录时间：2018-07-04

## 编译方法
几种常见的编译方式: XeLaTeX， pdfLaTeX， LaTeX。 推荐使用XeLaTeX， pdfLaTeX 编译， 直接
得到pdf 文档。

不同的编译方法， 对应的源文件一般略有不同。 使用pdfLATEX 编译得到的
pdf 文件， 其中文是乱码。 需要增加UTF8 选项：
```tex
\documentclass[UTF8]{ctexart}
\begin{document}
  中文文档测试。
\end{document}
```

## 正反向搜索
TeX 文档和PDF 文件之间的正反向搜索， 使得文档的修改、调试非常方便。

WinEdt 工具栏有(PDF Preview) 和(PDF Search) 两个按钮。
编译TeX 文档后， 点击(PDF Preview) 按钮即可查阅生成的PDF 文件， 在PDF 页面上双击某行， 即可跳转
至TeX 文档的对应源码处， 这是反向搜索功能。
正向搜索功能是指先将鼠标停留在TeX 文档的某处， 然后点击(PDF Search)按钮， 即可跳转至PDF 页面上
对应的位置(用浅蓝色标明某行。 标识的时间很短， 近乎一闪而过)。
当然， 用(PDF Search)预览文档， 也可以实现反向搜索。

TeXworks 中实现该功能的方法: 用Ctrl + 鼠标单击左键， 即可实现正、反向搜索。

## 中文文档
中文的实现, 推荐使用ctex宏集。
> CTEX 宏集是由CTEX 社区发起并维护的LATEX 宏包和文档类的集合。社区另有发布名为CTEX 套装的TEX 发行版, 与CTEX 宏集并非是同一事物。

LaTeX 中文文档的排版有各种方式，例如CCT，CJK，xeCJK 等等。目前最优秀的方式是用ctex 文档类来排版中文文档，它在其它各种方式的基础上以一致的方式解决了中文排版的问题。例如：
```tex
  \documentclass[UTF8]{ctexart}
  \begin{document}
    中文内容测试！
  \end{document}
```
使用这种方式，只需要将文档类从英文的article 改成ctexart，所有中文环境和章节编号等等都已经按照中文习惯设置好了，简单易行。另外，对于book 和report 文档类，也有对应的ctexbook 和ctexrep 中文文档类，其用法类似。