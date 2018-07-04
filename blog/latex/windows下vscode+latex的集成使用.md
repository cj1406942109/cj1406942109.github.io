# windows下vscode+latex的集成使用
> 记录时间：2018-07-04

1. 本地安装[texlive](http://tug.org/texlive/)   
安装过程比较简单，不做赘述

2. 安装完成texlive之后，配置系统环境变量    
如：本地安装texlive的路径为：`D:\texlive\2018\bin\win32`，将其添加到系统环境变量`Path`中

3. 安装[vscode](https://code.visualstudio.com/)   
安装过程比较简单，不做赘述

4. 安装vscode插件latex-workshop   
点击左侧的扩展图标或者使用快捷键`ctrl+shift+x`，输入`latex workshop`，点击安装

5. latex-workshop配置
```json
    "latex-workshop.view.pdf.viewer": "tab",
    "latex-workshop.latex.recipes": [
        {
            "name": "pdflatex",
            "tools": [
                "pdflatex"
            ]
        },
        {
            "name": "bibtex",
            "tools": [
                "bibtex"
            ]
        },
        {
            "name": "latexmk",
            "tools": [
                "latexmk"
            ]
        },
        {
            "name": "pdflatex -> bibtex -> pdflatex*2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        }
    ],
    "latex-workshop.latex.tools": [
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ]
        },
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "%DOC%"
            ]
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ]
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ]
        }
    ],
    "latex-workshop.latex.clean.enabled": true,
    "latex-workshop.latex.clean.fileTypes": [
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk"
    ]
```

6. 以上配置完成即可开始编辑tex文档
* 打开`.tex`文件，右键选择编译，或者`ctrl+alt+b`，编译完成点击预览即可

## 注意事项：
1. 以上配置，使用`pdflatex`编译，可以支持中文文件名，使用`xelatex`就不行了，
2. 如果tex文档中包含中文字符，会编译出错，报`Recipe terminated with error.`，可以如下处理，在文章头部加入`\usepackage[UTF8]{ctex}`：
    ```tex
    \documentclass{article}
        %支持中文
        \usepackage[UTF8]{ctex}
        \begin{document}
        Hello, world!

        你好，世界！
        \end{document}
    ```
