# 基本介绍

1. svg以xml的形式描述二维图形。svg支持三种图形对象类型：矢量图形（包含直线和曲线的路径）、图片和文字。
2. svg图形是支持动态和交互，可以通过嵌入svg动画元素或者更通过脚本来定义动画。
3. svg的MIME类型是`"images/svg+xml"`，svg文件的推荐扩展名为`".svg"`，svg文件的gzip压缩文件的推荐扩展名为`".svgz"`。
4. svg命名空间：`http://www.w3.org/2000/svg`，svg 1.1的公共标识符是`PUBLIC "-//W3C//DTD SVG 1.1//EN"`，svg 1.1的推荐系统标识符是`http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd`。
5. svg文档类型声明示例：`<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
         "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`。
6. 用DTDs验证xml文档有很多问题，因此，不推荐在svg文档中添加`DOCTYPE`声明。


# 定义

1. 动画元素：可用于激活其他元素的属性或属性值，有：`animateColor`、`animateMotion`、`animateTransform`、`animate`和`set`。
2. 动画事件属性：指定脚本去运行一个特定的动画相关的事件，有：`onbegin`、`onedn`、`onload`和`onrepeat`。
3. 基本图形：svg中预定义的标准图形，便于通用图形操作，有：`circle`、`ellipse`、`line`、`polygon`、`polyline`和`rect`。
4. 画布：用于绘制图形元素的表层，可以是真实的物理设备，如显示器或纸张；也可以是抽象的表面，如分配的区域或计算机内存。
5. 剪切路径：`path`、`text`和基本图形的结合，作为1比特遮罩(`mask`)的轮廓使用，其内部的都将显示，外部的都将被遮挡。
6. 容器元素：将图形元素获其他容器元素作为子元素，有：`a`、`defs`、`glyph`、`g`、`marker`、`mask`、`missing-glyph`、`pattern`、`svg`、`switch`和`symbol`。
7. 条件处理属性：控制是否对显示的元素进行处理。大多数元素有条件处理属性。svg 1.1中定义的有：`requiredExtensions`、`requiredFeatures`和`systemLanguage`。
8. 核心属性：可以在任何svg元素上指定，有：`id`、`xml:base`、`xml:lang`和`xml:space`。
9. 当前内层svg文档片段：xml文档的子树，以给定svg元素的最直接祖先`svg`元素作为开始。
10. 当前svg文档片段：xml文档的子树，以给定svg元素的最外层祖先`svg`元素作为开始。需要最外层的`svg`和该元素之间的所有的容器元素都是svg语言。
11. 当前转换矩阵（CTM）：使用3x3的矩阵（[x' y' 1] = [x y 1]*matrix）定义数学映射将一个坐标系转换为另一个坐标系。CTM定义从用户坐标系转换为视口坐标系的映射。
12. 描述性元素：提供其父元素的补充描述信息，有：`desc`、`metadata`和`title`。
13. 文档事件属性：指定脚本去运行特定的文档范围事件，有：`onabort`、`onerror`、`onresize`、`onscroll`、`onunload`和`onzoom`。
14. 事件属性：当特定类型的事件在指定属性的元素上触发时，指定脚本去运行。
15. 填充：绘制一个图形的内部，或者文本字符串的字形内部。
16. 过滤器原始属性：所有过滤器原始元素的通用属性集，有：`height`、`result`、`width`、`x`和`y`。
17. 过滤器原始元素：可以作为一个`filter`元素的孩子使用，来指定过滤器图中的一个节点，有：`feBlend`、`feColorMatrix`、`feComponentTransfer`、`feComposite`、`feConvolveMatrix`、`feDiffuseLighting`、`feDisplacementMap`、`feFlood`、`feGaussianBlur`、`feImage`、`feMerge`、`feMorphology`、`feOffset`、`feSpecularLighting`、`feTile`和`feTurbulence`。
18. 字体：
