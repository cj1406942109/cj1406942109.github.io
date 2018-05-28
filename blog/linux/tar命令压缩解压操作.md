# tar命令压缩解压操作
> 记录时间：2016-11-10

```bash
  Usage: tar [OPTION...] [FILE]...
  Examples:
# Create archive.tar from files foo and bar.
tar -cf archive.tar foo bar

# List all files in archive.tar verbosely.
tar -tvf archive.tar

# Extract all files from archive.tar.
tar -xf archive.tar  
```

## 必选参数
> 必选其中的一个参数，并且一次只能使用其中一个，不能同时使用多个

```bash
  -c：创建一个压缩文件(create 的意思)
  -x：解压一个压缩文件
  -t：查看压缩文件里面的内容
  -r：向压缩文件末尾追加文件
  -u：更新原压缩文件中的内容
```

## 可选参数
```bash
  -z：有gzip属性，即需要用 gzip 压缩
  -j：有bz2属性，即需要用 bzip2 压缩
  -Z：有compress属性的
  -v ：压缩的过程中显示文件(显示所有过程)！这个常用，但不建议在后台执行时使用
  -O：将文件解开到标准输出
  -f ：使用文档名，请注意，在 f 之后要立即接文档名！不要再加参数！例如使用『 tar -zcvfP tfile sfile』就是错误的写法，要写成『 tar -zcvPf tfile sfile』才对喔！
  -p ：使用原文件的原来属性（属性不会依据使用者而变）
  -P ：可以使用绝对路径来压缩
  -N ：比后面接的日期(yyyy/mm/dd)还要新的才会被打包进新建的文件中
  --exclude FILE：在压缩的过程中，不要将 FILE 打包
  -f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名

  # 将所有.jpg的文件打成一个名为all.tar的包。-c是表示产生新的包，-f指定包的文件名
  tar -cf all.tar *.jpg
  # 将所有.gif的文件增加到all.tar的包里面去。-r是表示增加文件
  tar -rf all.tar *.gif
  # 更新原来tar包all.tar中logo.gif文件，-u是表示更新文件
  tar -uf all.tar logo.gif
  # 列出all.tar包中所有文件，-t是列出文件
  tar -tf all.tar
  # 解出all.tar包中所有文件，-x是解压
  tar -xf all.tar
```

## 查看
```bash
  # 在不解压的情况下查看压缩包的内容
  tar -tf a.tar.gz
```

## 压缩
```bash
  # 将目录里所有jpg文件打包成jpg.tar
  tar –cvf jpg.tar *.jpg

  # 将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz
  tar –czf jpg.tar.gz *.jpg

  # 将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2
  tar –cjf jpg.tar.bz2 *.jpg

  # 将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z
  tar –cZf jpg.tar.Z *.jpg
```

## 解压
```bash
  *.tar                       用 tar –xvf 解压
  *.gz                        用 gzip -d 或者 gunzip 解压
  *.tar.gz 和 *.tgz           用 tar –xzf 解压
  *.bz2                       用 bzip2 -d 或者 bunzip2 解压
  *.tar.bz2                   用 tar –xjf 解压
  *.Z                         用 uncompress 解压
  *.tar.Z                     用 tar –xZf 解压
```
