# latex文档的基本构成
> 记录时间：2018-07-04

一篇LATEX 文档, 由三个部分组成: 文档类声明, 导言区, 正文。
  ```tex
    \documentclass{article}
    \usepackage{hyperref}
    \begin{document}
      Hello World!
    \end{document}
  ```

* 文档类：`\documentclass{...}`，里面声明你要书写什么样式的文档，常用的有：`article`，`book`，`report`。可以自己定义一个新的文档类， 对文章的总体样式和各个细节进行声明， 或者定义自己的命令。

  latex指明文档类的基本命令：`\documentclass[选项]{文档类}`：
  > **文档类**    
    * `article`    排版科技期刊、短报告、程序文档、邀请函等。   
    * `report`    排版多章节的长报告、短篇的书籍、博士论文等。    
    * `book`    排版书籍。    
    * `slides`    排版幻灯片。其中使用了较大的 sans serif 字体。也可以考虑使用 FoilTEX 来得到相同的效果。   
  > **选项**    
    * *纸张大小*（a4paper，a5paper，b4paper，letterpaper，legalpaper，executivepaper）：默认的letterpaper 纸张常见于美国，和国内常用的A4 纸张的大小稍有差别，建议自己指定。   
    * *字体大小*（10pt，11pt，12pt）：默认为10pt。    
    * *纸张方向*（portrait，landscape）：默认为portrait（纵向），在屏幕阅读也许landscape（横向）更方便。    
    * *草稿定稿*（draft，final）：默认为final（定稿）；如果是draft（草稿），页面内容有溢出时会显示粗黑条。    
    * *单面双面*（oneside，twoside）：对于article 和report 文档类，默认设置为单面，页码总是在右边；对于book 文档类，默认设置为双面，奇数页页码在右边，偶数页页码在左边，这样双面打印时页码总在外侧。    
    * *新章开始*（openright，openany）：仅对book 文档类有效，默认值为openright，即每章都从奇数页开始；如果设置为openany，则每章仅从新的一页开始，不管奇偶页。

* 正文：即`\begin{document}`和`\end{document}`之间的部分。
* 导言区： 夹在`\documentclass{...}`和`\begin{document}`之间的部分，放置需要使用的宏包，或者自己规定一些新的命令。如：
  ```tex
    \documentclass{article}
    \newcommand{\wuda}{中国湖北省武汉市武汉大学}
    \begin{document}
      你好，我来自\wuda。
    \end{document}
  ```
  定义了一个新命令`\wuda`，得到的正文内容就是`你好，我来自中国湖北省武汉市武汉大学。`

  可能你需要定义的东西太多，这时，可以将它们写在一个文档里，这种文档就是宏包，使用时，只需要在导言区用`\usepackage{...}`，即可插入该文档的内容。

  例如，我们想书写一个数学符号⊵，该数学符号已经由宏包amssymb 定义过了， 这样只需要在导言区写上\usepackage{amssymb}， 加载该宏包即可。
  ```tex
    \documentclass{ctexart}
    \usepackage{amssymb}
    \begin{document}
      $\unrhd$
    \end{document}
  ```
