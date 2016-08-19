/**
 * Created by panzr on 2016/6/30.
 */
$(document).ready(function () {

    $('.btn-block').on('click',illegalInput);
    function illegalInput() {
        var regExp=new RegExp("[0-9]{11}");
        var username=$('#username').val();
        var password=$('#password').val();
        var warningInfo="";
        if($.trim(username)==""){
            /*用户名不能为空*/
            warningInfo="账号不能为空！";
        }else if(!regExp.test(username)){
            /*用户名格式不正确*/
            warningInfo="账号为11位有效手机号";
        }else if($.trim(password)==""){
            warningInfo="密码不能为空！";
        }else if(username=="13012341234"&&password=="123456"){
            warningInfo="";
        }else{
            warningInfo="用户尚未注册！";
        }
        if(warningInfo!=""){
            $('#warning-info').html(warningInfo);
            $(".alert-danger").show();
            setTimeout(function(){$('.alert-danger').fadeOut();},1000);
            return false;
        }else{
            document.location.href="user-center.html";
            return false;   //阻止事件冒泡
        }

    }
});