# 分析HTML文档
> 记录时间：2018-03-27


1. `<!DOCTYPE html>`：声明文档类型。

> 很久以前，早期的HTML(大约1991年2月)，文档类型声明类似于链接，规定了HTML页面必须遵从的良好规则，**能自动检测错误和其他有用的东西**。使用如下：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```
> 然而现在没有人再这样写，需要保证每一个东西都正常工作已成为历史。你只需要知道`<!DOCTYPE html>`是最短的有效的文档声明。

2. `<head></head>`：`<head>`元素。
> 这个元素是一个容器，它包含了所有你想要包含在html页面中但不想在html页面中显示的内容。
> 包括：
> - 你想在搜索结果中出现的关键字和页面描述
> - CSS样式
> - 字符集声明
> - ...

3. `<meta chareset="utf-8">`：设置文档使用utf-8字符集编码。
> utf-8字符集包含了人类大部分的文字，基本上能够识别所有的文本内容，使用它，可以在以后避免很多其他问题。
> `name`特性指定了meta元素的类型，说明该元素包含了什么类型的信息。
> `content`指定了实际的元数据内容。

> 如：
> ```html
> <meta name="author" content="Chris Mills">
> <meta name="description" content="The MDN Learning Area aims to provide complete beginners to the Web with all they need to know to getstarted with developing web sites and applications.">
> ```

> 指定作者在某些情况下是很有用的：如果你需要联系页面的作者，问一些关于页面内容的问题。 一些内容管理系统能够自动获取页面作者的信息，然后用于某种目的。

> 指定包含关于页面内容的关键字的页面内容的描述是很有用的，因为它可能或让你的页面在搜索引擎的相关的搜索出现得更多

4. html中的空白
> 无论你用了多少空白(包括空白字符，包括换行), 当渲染这些代码的时候，HTML解释器会将连续出现的空白字符减少为一个单独的空格符。那么为什么我们会使用那么多的空白呢? 答案就是为了可读性 —— 如果你的代码被很好地进行格式化，那么就很容易理解你的代码是怎么回事, 反之就只有聚做一团的混乱. 在我们的HTML代码中，我们让每一个嵌套的元素以两个空格缩进。 你使用什么风格来格式化你的代码取决于你 (比如所对于每层缩进使用多少个空格),但是你应该坚持使用某种风格。

5. 实体引用：在html中包含特殊字符
> 在html中，字符`<`，`>`，`"`，`'`和`&`是特殊字符。他们是html语法自身的一部分，如果要在文本中使用，而不想让它被浏览器视为代码并被解释，我们必须使用**字符引用**，来表示字符的特殊编码。如：
>
>    原字符|字符引用
>    -|:-:|-
>    <  |  &lt;
>    >  |  &gt;
>    "  |  &quot;
>    '  |  &apos;
>    &  |  &amp;

6. css使用`<link>`元素，位于文档头部，有两个属性
> `rel="stylesheet"`，表明这是文档的样式表
> `href=""my-css-file.css`，包含了样式表文件的路径

7. javascript使用`<script>`元素，最好放在文档尾部（`</body>`标签之前），这样可以保证在加载脚本之前浏览器已经解析了html内容。

8. 为文档设定主语言
> 可以通过添加`lang`属性到`<html>`标签上来实现为你的站点设定语言，如：
> `<html lang="en-US">`

> 这在很多方面都很有用。如果你的HTML文档的语言设置好了，那么你的HTML文档就会被搜索引擎更有效地索引 (例如，允许它在特定于语言的结果中正确显示),对于那些使用屏幕阅读器的视障人士也很有用(比如, 法语和英语中都有“six”这个单词，但是发音却完全不同)。

> 还可以将文档分段设置为不同的语言，如：
> ```html
> <p>Japanese example: <span lang="jp">ご飯が熱い。</span>.</p>
> ```

9. `<em>`(emphasis)，通过将文字写成斜体来强调它。
> 这样做可以让文档被屏幕阅读器识别出来，并以不同的语调发出。浏览器的默认风格为斜体，但是不应该为了纯粹获得斜体风格而使用该标签。

10. `<strong>`(strong importance)，通过粗体字来达到强调的效果。
> 这样做可以让文档被屏幕阅读器识别出来，并以不同的语调发出。浏览器的默认风格为粗体，但是不应该为了纯粹获得粗体风格而使用该标签。

11. 表象元素：`<b>`, `<i>`, 和 `<u>` 们出现于人们要在文本中使用粗体、斜体、下划线但CSS仍然不被完全支持的时期。这些元素仅仅影响表象而没有语义，成为**表象元素(persentational elements)**。

12. 超链接
> 当链接到要下载的资源而不是在浏览器中打开时，可以使用下载属性来提供一个默认的保存文件名。
> ```html
> <a href="https://download.mozilla.org/?product=firefox-39.0-SSL&os=win&lang=en-US" download="firefox-39-installer.exe">
> Download Firefox 39 for Windows
> </a>
> ```

13. 引用

  - 块引用：
    使用`<blockquote>`元素包裹一个块级内容，表示从其他地方引用，并在`cite`属性中用URL来指向引用的资源。
  - 行内引用：
    使用`<q>`元素表示行内引用。
  - 引文：
    `cite`属性的内容听起来很有用，但不幸的是，浏览器、屏幕阅读器等等不会真的关心它，如果不使用JavaScript或CSS，浏览器不会显示cite的内容。

14. 缩略语
> 使用`<abbr>`元素来包裹一个缩略语或缩写，并且提供缩写的解释（包含在`title`属性中），如：
> ```html
> <p>We use <abbr title="Hypertext Markup Language">HTML</abbr> to structure our web documents.</p>
> 
> <p>I think <abbr title="Reverend">Rev.</abbr> Green did it in the kitchen with the chainsaw.</p>
> ```

15. 标记联系方式
> 使用`<address>`元素用于标记联系方式,`<address>`元素是为了标记编写HTML文档的人的联系方式，而不是任何其他的内容。如：
> ```html
> <address>
>   <p>Chris Mills, Manchester, The Grim North, UK</p>
> </address>
> ```

16. 上标和下标
> 使用`<sup>`和`<sub>`元素来表示上标和下标，在使用日期、化学方程式、数学公式时可能会用到。如：
> ```html
> <p>My birthday is on the 25<sup>th</sup> of May 2001.</p>
> <p>Caffeine's chemical formula is C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.</p>
> <p>If x<sup>2</sup> is 9, x must equal 3 or -3.</p>
> ```

17. 展示计算机代码
  - `<code>`：用于标记计算机通用代码。
  - `<code>`：用于标记固定宽度的文本块，其中保留空格（通常是代码块）。
  - `<var>`：用于标记具体变量名。
  - `<kbd>`：用于标记输入电脑的键盘（或其他类型）输入。
  - `<samp>`：用于标记计算机程序的输出。

18. 标记时间和日期
> HTML还支持将时间和日期标记为可供机器识别的格式的`<time>`元素。
> 不同格式的时间不容易被电脑识别 — 假如你想自动抓取页面上所有事件的日期并将它们插入到日历中，`<time>`元素允许你附上清晰的、可被机器识别的 时间/日期来实现这种需求。
