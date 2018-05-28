# swagger介绍
> 记录时间：2018-04-01
> 官网：[swagger.io](http://swagger.io )  
> 详细文档建议参考[Swagger从入门到精通](https://www.gitbook.com/book/huangwenchao/swagger/details)

## swagger入门教程

1. 创建swagger账户  
    比较简单，详情见[创建swagger账户](https://app.swaggerhub.com/help/signup)

2. 访问swaggerhub查看我的主页   
    查看[swaggerhub介绍信息](https://app.swaggerhub.com/help/ui/overview)

3. 创建我的第一个API  
    查看[创建新api](https://app.swaggerhub.com/help/apis/creating-api)
    > 注意这里介绍在线使用方法，创建时，勾选`Auto Mock Api`选项

4. 进入我的主页查看创建好的API  

5. 点击API跳转到SwaggerHub Editor，在这里，你可以编辑同时预览   
    查看[SwaggerHub Editor介绍](https://app.swaggerhub.com/help/ui/editor)

6. 查看auto mock相关信息    
    [auto mock文档](https://app.swaggerhub.com/help/integrations/api-auto-mocking)

7. 访问api，地址为`https://virtserver.swaggerhub.com/{owner}/{api}/{version}/{path}`，这里注意看清api的请求方法（post、get or 其他）   

    访问方式如下：
    ```bash
      curl -X GET https://virtserver.swaggerhub.com/{owner}/{api}/{version}/{path}
    ```
    查看[auto mock详细文档](https://app.swaggerhub.com/help/integrations/api-auto-mocking)

8. **重点：** 在线swagger ui中查看自己的API（也就是需要下载swagger定义）    

    a. 打开[swagger ui](http://petstore.swagger.io)页面（进入swagger网站首页 >> 在TOOLS中选择swagger ui >> 点击LIVE DEMO）  

    b. 输入api地址`https://api.swaggerhub.com/apis/{owner}/{api}/{version}`
    > 为了找到导出api的方法，花费了很长时间，最终在官方文档中找到，点击[下载swagger定义](https://app.swaggerhub.com/help/apis/downloading-swagger-definition)查看详情    
    > 这里后续如果要在easy-mock中使用swagger，用到的就是该地址    

    c. 点击explore按钮就可以看到和swagger editor中相同的ui啦

9. 如果要结合easy-mock使用，可以不使用swagger的Auto Mock Api功能