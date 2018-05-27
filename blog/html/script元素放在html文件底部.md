# `<script>`元素放在HTML文件底部的原因

> 浏览器按照代码在文件中的顺序解析HTML。如果JavaScript在最前面被加载，HTML还未加载，JavaScript就无法作用于HTML，所以JavaScript无效，如果JavaScript代码出现问题，则HTML不会被加载，所以JavaScript代码放在HTML代码底部是最好的选择。
