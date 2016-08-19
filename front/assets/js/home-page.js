/**
 * Created by dushang on 06/04/16.
 */
define(["jQuery","bootstrapJs"],function($){

    $(function () {
        var placeholder=$('#order-num');
        placeholder.on('click',function(){
            $(this).attr("placeholder","");
            $(this).css('border','1px solid rgba(255,255,255,0.4)');
            $('.order-number-search').css('box-shadow','0 0 0 5px rgba(255,255,255,0.4)');


            /*如果当前显示为警告信息，则清空警告信息，字体颜色还原*/
            if($(this).css("color")=="rgb(245, 79, 79)"){
                /*注意rgb(255, 79, 79)的写法，缺少空格则条件不能成立*/
                $.ajax({url:"",success:function(){
                    placeholder.val("").css("color","#999");
                }});
            }
        });
        placeholder.blur(function(){
            $(this).attr("placeholder","请输入您的订单号");
            if($(this).css("color")!="rgb(245, 79, 79)"){
                $(this).css('border','1px solid rgba(255,255,255,0.2)');
            }
            $('.order-number-search').css('box-shadow','0 0 0 5px rgba(255,255,255,0.2)');
        });
        var searchbtn=$('#search-button');
        searchbtn.on('mouseover',function(){
            $(this).css({'background-color':"#3976e5",'border':'1px solid #3976e5','cursor':'pointer'});
            $('.order-number-search').css('box-shadow','0 0 0 5px rgba(255,255,255,0.4)');
        });
        searchbtn.on('mouseout',function(){
            $(this).css({'background-color':"#5c8ce6",'border':'1px solid #5c8ce6'});
            $('.order-number-search').css('box-shadow','0 0 0 5px rgba(255,255,255,0.2)');
        });


        /*对订单号进行空和数字位数限制*/

        placeholder.keydown(function(e){
            var key= e.which;/*给出按键的索引值*/
            if(key==13){
                illegalOrder();
                return false;
            }
        });
        $("#search-button").on("click",illegalOrder);

        function illegalOrder(){
            var orderNum = placeholder.val();
            var regExp= new RegExp("[0-9]{12}");

            if($.trim(orderNum)==""){
                $.ajax({url:"",success:function(){
                    placeholder.val("输入订单号不能为空！").css({"color":"#f54f4f","border":"1px solid #f54f4f","border-right":"none"}).blur();
                }});
                return false;
            }else if(!regExp.test(orderNum)){
                $.ajax({url:"",success:function(){
                    placeholder.val("请输入12位有效订单号！").css({"color":"#f54f4f","border":"1px solid #f54f4f","border-right":"none"}).blur();
                }});
                return false;
            }else{
                <!--模拟点击提交效果-->
                $("#hide-submit").click();
            }
        }

        /*轮播图时间控制*/
        $('.carousel').carousel({
            interval: 5000
        })
    });

});
