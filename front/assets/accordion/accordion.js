/**
 * Created by dushang on 11/05/16.
 */

;(function($,window,document,undefined){
    var Accordion=function(ele,opt){
        this.$elements=ele;
        this.defaults={

            //*******************content part*******************//
            'title':'AccordionTitle',
            'menus':[
                /*content ,href,*/
                /*menu default href is '', which means no href attribute here*/
                ['menu1',''],
                ['menu2',''],
                ['menu3',''],
                ['menu4','']
            ],
            'hasSubmenus':true,
            'submenus':[
                [
                    ['menu1submenu1','#'],
                    ['menu1submenu2','#'],
                    ['menu1submenu3','#']
                ],
                [
                    ['menu2submenu1','#'],
                    ['menu2submenu2','#'],
                    ['menu2submenu3','#'],
                    ['menu2submenu4','#'],
                    ['menu2submenu5','#'],
                    ['menu2submenu6','#']
                ],
                [
                    ['menu3submenu1','#'],
                    ['menu3submenu2','#'],
                    ['menu3submenu3','#'],
                    ['menu3submenu4','#']
                ],
                [
                    ['menu4submenu1','#'],
                    ['menu4submenu2','#']
                ]
            ],


            //*******************style part*******************//
            /*whole part*/
            'width':'290px',
            'bg':'#fafbfc',
            'border':'1px solid #ddd',
            'float':'left',
            'bottomSpaceHeight':'120px',

            /*accordion title*/
            'titleIcon':'fa-bookmark',
            'titleIconSize':'30px',
            'titleIconColor':'#386cca',
            'titleHeight':'80px',
            'titleIconLeftDistance':'30px',
            'titleIconRightDistance':'15px',
            'titleFontSize':'24px',
            'titleFontColor':'#386cca',
            'titleBg':'#fafbfc',
            'titleDelimitLine':'1px solid #ddd',

            /*main menu*/
            'menuHeight':'60px',
            'menuFontSize':'16px',
            'menuFontColor':'#666',
            'menuBg':'#fafbfc',
            'menuLeftDistance':'30px',
            'menuDelimitLine':'1px solid #ddd',

            /*sub menu*/
            'submenuHeight':'50px',
            'submenuFontSize':'14px',
            'submenuFontColor':'#666',
            'submenuBg':'#fafbfc',
            'submenuLeftDistance':'10px',

            /*fold icon*/
            'foldIcon':'fa-chevron-down',
            'foldIconSize':'16px',
            'foldIconColor':'#666',
            'foldIconMarginRight':'30px',

            /*unfold icon*/
            'unfoldIcon':'fa-chevron-up',
            'unfoldIconSize':'16px',
            'unfoldIconColor':'#386cca',
            'unfoldIconMarginRight':'30px',

            /*submenu hover status*/
            'hoverBg':'#f0f3f5',
            'hoverBorderLeft':'1px solid #5c8ce6',

            /*chosen status*/
            'chosenBg':'#ebf1f5',
            'chosenBorderLeft':'4px solid #5c8ce6',

            //*******************animation part*******************//

            /*show only one submenu at a time or not ,*/
            /*if true ,there will only one submenu to be shown every time*/
            'showOneSubmenu':true,

            /*you can choose whether to show the first submenu when opening the page first time,*/
            'showFirstSubmenu':true,
            /*if showFirstSubmenu is true, you can set delay time, value 100 means 1 second*/
            'delayTime':'400',

            /*you can set the time of slidedown or slideup, value 100 means 1 second*/
            'animationTime':'700'


        };
        this.options = $.extend({}, this.defaults, opt);
    };

    Accordion.prototype={
        init: function(){

            //********************************init content********************************//
            var options=this.options;

            /*添加accordion标题div和菜单div*/
            var titleDiv="<div class='accordion-title'></div>";
            var menuDiv= "<ul class='accordion-menu'></ul>";
            this.$elements.append(titleDiv);
            this.$elements.append(menuDiv);

            /*添加标题具体内容*/
            $('.accordion-title').append("<i class='fa "+options.titleIcon+"' aria-hidden='true'></i>")
                .append("<span>"+options.title+"</span>");

            /*添加菜单具体内容*/
            /*如果有子菜单*/
            if(options.hasSubmenus){
                $.each(options.menus,function(i,menu){
                    var submenusDiv="";
                    $.each(options.submenus[i],function(j,submenu){
                        submenusDiv+="<li><a href='"+submenu[1]+"'>"+submenu[0]+"</a></li>";
                    });
                    submenusDiv="<ul class='accordion-submenu'>"+submenusDiv+"</ul>";
                    $('.accordion-menu').append("<li><div><a href='"+menu[1]+"'>"+menu[0]+"<i class='fa "+options.foldIcon+"' aria-hidden='true'></i></a></div>"+submenusDiv+"</li>");
                });
            }else{
                var submenusDiv="";
                $.each(options.menus,function(i,menu){
                    submenusDiv+="<li><div><a href='"+menu[1]+"'>"+menu[0]+"<i class='fa "+options.foldIcon+"' aria-hidden='true'></i></a></div></li>"
                });

                $('.accordion-menu').append(submenusDiv);
            }


            //********************************init style********************************//

            /*添加accordion-nav类*/
            this.$elements.addClass('accordion-nav');

            /*whole part*/
            $('.accordion-nav').css({
                'width':options.width,
                'background':options.bg,
                'padding-bottom':options.bottomSpaceHeight,
                'border':options.border,
                'float':options.float
            });

            $('.accordion-nav a').css('text-decoration','none');
            $('.accordion-nav ul').css({
                'margin':0,
                'padding':0,
                'list-style-type':'none'
            });

            /*accordion title*/
            $('.accordion-title').css({
                'height':options.titleHeight,
                'line-height':options.titleHeight,
                'padding':'0 0 0 '+options.titleIconLeftDistance,
                'background':options.titleBg,
                'border-bottom':options.titleDelimitLine
            });
            $('.accordion-title i').css({
                'color':options.titleIconColor,
                'font-size':options.titleIconSize
            });
            $('.accordion-title span').css({
                'margin-left':options.titleIconRightDistance,
                'color':options.titleFontColor,
                'font-size':options.titleFontSize
            });

            /*menu part*/
            $('.accordion-menu').css('background',options.menuBg);
            $('.accordion-menu li div').css({
                'height':options.menuHeight,
                'line-height':options.menuHeight,
                'font-size':options.menuFontSize,
                'background':options.menuBg,
                'border-bottom':options.menuDelimitLine,
                'clear':'both'
            });
            $('.accordion-menu li a').css({
                'margin-left':options.menuLeftDistance,
                'color':options.menuFontColor
            });

            /*sub menu*/
            $('.accordion-submenu li').css({
                'height':options.submenuHeight,
                'line-height':options.submenuHeight,
                'font-size':options.submenuFontSize,
                'color':options.submenuFontColor,
                'background':options.submenuBg,
                'margin-left':options.submenuLeftDistance
            });

            setfoldStatus();

            //********************************animation style********************************//

            /*menu hover status*/
            $('.accordion-menu li').hover(function(){
                $(this).css('cursor','pointer');
            },function(){
                $(this).css('cursor','auto');
            });

            /*去除所有href为空的超链接响应*/
            $('.accordion-menu a').each(function(){
                if($(this).attr('href')==''){
                    $(this).removeAttr('href');
                }
            });


            if(options.hasSubmenus){
                /*submenu hover status*/
                $('.accordion-submenu li').hover(function(){
                    if(!$(this).hasClass('chosen')){
                        $(this).addClass('hover');
                    }

                    $('.hover').css({
                        'cursor':'pointer',
                        'border-left':options.hoverBorderLeft,
                        'background':options.hoverBg
                    });
                },function(){
                    if(!$(this).hasClass('chosen')){
                        $('.hover').css({
                            'cursor':'auto',
                            'border-left':'none',
                            'background':options.submenuBg
                        });
                    }
                    $(this).removeClass('hover');
                });

                /*chosen status*/
                $('.accordion-submenu').on('click','li',function(){

                    $('.chosen').css({
                        'cursor':'auto',
                        'border-left':'none',
                        'background':options.submenuBg
                    });
                    $('.accordion-menu').find('li').removeClass('chosen');
                    $(this).addClass('chosen');

                    $('.chosen').css({
                        'border-left':options.chosenBorderLeft,
                        'background':options.chosenBg
                    });
                });

                /*模拟点击事件冒泡到父级元素*/
                $('.accordion-submenu li').on('click',function(){
                    $(this)[0].firstChild.click();
                });
            }else{
                /*hover status*/
                $('.accordion-menu li div').hover(function(){
                    if(!$(this).hasClass('chosen')){
                        $(this).addClass('hover');
                    }

                    $('.hover').css({
                        'cursor':'pointer',
                        'border-left':options.hoverBorderLeft,
                        'background':options.hoverBg
                    });
                },function(){
                    if(!$(this).hasClass('chosen')){
                        $('.hover').css({
                            'cursor':'auto',
                            'border-left':'none',
                            'background':options.menuBg
                        });
                    }
                    $(this).removeClass('hover');
                });

                /*chosen status*/
                $('.accordion-menu li').on('click','div',function(){

                    $('.chosen').css({
                        'cursor':'auto',
                        'border-left':'none',
                        'background':options.menuBg
                    });
                    $('.accordion-menu').find('div').removeClass('chosen');
                    $(this).addClass('chosen');

                    $('.chosen').css({
                        'border-left':options.chosenBorderLeft,
                        'background':options.chosenBg
                    });
                });

                /*模拟点击事件冒泡到父级元素*/
                $('.accordion-menu li div').on('click',function(){
                    $(this)[0].firstChild.click();
                });
            }


            /*有子菜单时，添加以下动画效果*/
            if(options.hasSubmenus){
                /*是否每次只显示一个子菜单*/
                if(options.showOneSubmenu){

                    $('.accordion-submenu').hide();
                    /*第一次打开页面时是否显示子菜单*/
                    if(options.showFirstSubmenu){
                        $('.accordion-submenu').first().delay(options.delayTime).slideDown(options.animationTime);
                        /*修改icon样式*/
                        $('.accordion-menu').find('i').first().addClass(options.unfoldIcon).removeClass(options.foldIcon);

                        $('.accordion-menu div:eq(1)').css("border-top",options.menuDelimitLine);

                        setfoldStatus();
                    }

                }
                /*显示多个菜单*/
                else{
                    $('.accordion-submenu').hide();

                    if(options.showFirstSubmenu){

                        $('.accordion-submenu').first().delay(options.delayTime).slideDown(options.animationTime);
                        /*修改icon样式*/
                        $('.accordion-menu').find('i').first().addClass(options.unfoldIcon).removeClass(options.foldIcon);

                        $('.accordion-menu div:eq(1)').css("border-top",options.menuDelimitLine);

                        setfoldStatus();
                    }else{

                        /*remove class adn add class*/
                        /*  $('.accordion-menu div').find('i').addClass(options.unfoldIcon).removeClass(options.foldIcon);
                         $('.accordion-menu div:gt(0)').css("border-top",options.delimitLine);*/
                    }

                }

                /*点击主菜单*/
                $('.accordion-menu').on('click','div',function(){
                    /*点击主菜单，其子菜单下拉*/
                    $(this).next('.accordion-submenu').slideToggle(options.animationTime);

                    if(options.showOneSubmenu){
                        /*将点击菜单的同级菜单全部收起*/
                        $(this).parent().siblings().find('.accordion-submenu').slideUp(options.animationTime);

                        /*将点击菜单的同级菜单图标全部改为收起状态*/
                        $(this).parent().siblings().find('i').addClass(options.foldIcon).removeClass(options.unfoldIcon);

                        /*移除所有子菜单的顶部分割线*/
                        $(this).parent().parent().find('div').css('border-top','none');

                        setfoldStatus();
                    }

                    /*判断当前子菜单状态*/
                    if($(this).find('i').hasClass(options.unfoldIcon)){
                        /*如果当前点击菜单为展开状态*/
                        /*移除其下一个子菜单的分割线*/
                        $(this).parent().next().find('div').css('border-top','none');
                        /*将其菜单图标改为收起状态*/
                        $(this).find('i').removeClass(options.unfoldIcon).addClass(options.foldIcon);

                    }else{
                        /*如果当前点击菜单为收起状态*/
                        /*给其下一个子菜单添加分割线*/
                        $(this).parent().next().find('div').css('border-top',options.menuDelimitLine);
                        /*将其菜单图标改为展开状态*/
                        $(this).find('i').removeClass(options.foldIcon).addClass(options.unfoldIcon);

                    }

                    setfoldStatus();

                });
            }

            function setfoldStatus(){
                $('.accordion-menu li a i').each(function(){
                    if($(this).hasClass(options.foldIcon)){
                        $(this).css({
                            'float':'right',
                            'margin-right':options.foldIconMarginRight,
                            'color':options.foldIconColor,
                            'font-size':options.foldIconSize,
                            'line-height':options.menuHeight
                        })
                    }else{
                        $(this).css({
                            'float':'right',
                            'margin-right':options.unfoldIconMarginRight,
                            'color':options.unfoldIconColor,
                            'font-size':options.unfoldIconSize,
                            'line-height':options.menuHeight
                        })
                    }
                });
            }
        }
    };


    /*在插件中使用Accordion对象*/
    $.fn.accordion=function(options){
        /*创建Accordion类的实体*/
        var accordion = new Accordion(this,options);

        /*调用其他方法*/
        return accordion.init();
    }

})(jQuery,window,document);

