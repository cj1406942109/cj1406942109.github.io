/**
 * Created by dushang on 2016/8/17.
 */


define(["jQuery","accordion"],function($){

    $(function () {

        /*初始化页面*/
        initPage();

        /*订单基本信息*/
        var basicData={
            name:'',
            email:'',
            telephone:'',
            responsibleParty:'',
            submitDate:'',
            invoiceTitle:'',
            acceptType:'',
            remark:'',
            orderType:'',
            typeDescription:'',
            orderStatus:0
        };
        /*样品表所有数据*/
        var sampleData=[];
        /*单个样品数据格式*/
        var sample={
            sampleId:'',
            sampleName:'',
            sampleType:'',
            carrierName:'',
            resistance:'',
            fragmentLength:'',
            primeType:'',
            seqRequirements:'',
            remark:''
        };
        /*单个样品dom结构*/
        var sampleContent=
            "<tr>"+
            "<td><input type='text' class='sample-id' name='sampleId' value='1' disabled></td>"+
            "<td><input type='text' class='sample-name' name='sampleName'></td>"+
            "<td>"+
            "<select class='sample-type'>"+
            "<option name='sampleType' value='1'>质粒</option>"+
            "<option name='sampleType' value='2'>PCR已纯化</option>"+
            "<option name='sampleType' value='3'>菌液</option>"+
            "<option name='sampleType' value='4'>PCR未纯化</option>"+
            "<option name='sampleType' value='5'>其他（请注明）</option>"+
            "</select>"+
            "</td>"+
            "<td><input type='text' class='carrier-name' name='carrierName'></td>"+
            "<td><input type='text' class='resistance' name='resistance'></td>"+
            "<td><input type='text' class='fragment-length' name='fragmentLength'></td>"+
            "<td>"+
            "<select class='primer-type'>"+
            "<option name='primerType' value='1'>自带引物</option>"+
            "<option name='primerType' value='2'>通用引物</option>"+
            "</select>"+
            "</td>"+
            "<td>"+
            "<select class='seq-requirements'>"+
            "<option name='seqRequirements' value='1'>正向</option>"+
            "<option name='seqRequirements' value='2'>反向</option>"+
            "<option name='seqRequirements' value='3'>双向</option>"+
            "<option name='seqRequirements' value='4'>测通</option>"+
            "</select>"+
            "</td>"+
            "<td>"+
            "<textarea class='remark' cols='10'></textarea>"+
            "</td>"+
            "<td><i class='fa fa-trash' aria-hidden='true'></i></td>"+
            "</tr>";



        /*初始化页面*/
        function initPage() {

            /*初始化风琴菜单*/
            initAccordion();

            /*绑定页面删除按钮点击事件*/
            bindDeleteEvent();

            /*添加样品按钮点击事件*/
            $('#addSample').on('click',addSample);

            /*重置按钮点击事件*/
            $('#resetButton').on('click',function () {
                $('#sampleTable tbody').html(sampleContent);
                $("#realReset").click();
                bindDeleteEvent();
            });

            /*保存按钮点击事件*/
            $('#saveButton').on('click',function () {
                transferData();
            });

            /*保存并下单按钮点击事件*/
            $('#saveSubmitButton').on('click',function () {
                basicData.orderStatus=1;
                transferData();
            })
        }

        function initAccordion() {
            $("#orderCategory").accordion({
                'title':'订购单类型',
                'menus':[
                    ['DNA测序','#/1']
                ],
                'width':'220px',
                'hasSubmenus':false,
                'foldIcon':'fa-chevron-right'
            });

            /*默认选中第一个*/
            setTimeout(function () {
                $(".accordion-menu li:nth-child(1)").find('div').click();
            },10);

        }

        /*添加样品*/
        function addSample() {

            $('#sampleTable tbody').append(sampleContent);   //添加样品

            bindDeleteEvent();
            changeSampleId();
        }

        /*修改样品编号*/
        function changeSampleId() {
            var i=1;
            $('.sample-id').each(function () {
                $(this).val(i);
                i++;
            })
        }

        /*绑定删除按钮点击事件*/
        function bindDeleteEvent() {
            $('.fa-trash').each(function () {
                $(this).on('click',deleteSample);
            });
        }

        /*删除样品*/
        function deleteSample() {
            $(this).parent().parent().remove();

            changeSampleId();
        }

        /*获取基本信息数据*/
        function getBasicData() {

            basicData.name=$('#name').val();
            basicData.email=$('#email').val();
            basicData.telephone=$('#telephone').val();
            basicData.responsibleParty=$('#responsibleParty').val();
            basicData.submitDate=$('#submitDate').val();
            basicData.invoiceTitle=$('#invoiceTitle').val();
            basicData.acceptType=$('.accept-type[name="acceptType"]:checked').val();
            basicData.remark=$('#remark').val();
            $('#orderCategory').find("li").each(function () {
                if($(this).find('div').hasClass('chosen')){
                    basicData.orderType=$(this).find('a').attr('href').split("#/")[1];
                    basicData.typeDescription=$(this).find('a').text();
                }
            });
            console.log(basicData);
        }

        /*获取样品表数据*/
        function getSampleData() {
            sampleData=[];

            $('#sampleTable tbody').find('tr').each(function () {
                sample.sampleId=$(this).find('.sample-id').val();
                sample.sampleName=$(this).find('.sample-name').val();
                sample.sampleType=$(this).find('.sample-type').val();
                sample.carrierName=$(this).find('.carrier-name').val();
                sample.resistance=$(this).find('.resistance').val();
                sample.fragmentLength=$(this).find('.fragment-length').val();
                sample.primeType=$(this).find('.primer-type').val();
                sample.seqRequirements=$(this).find('.seq-requirements').val();
                sample.remark=$(this).find('.remark').val();

                sampleData.push($.extend(true,{},sample));
            });
            console.log(sampleData);
        }

        /*通过ajax请求将数据传递到服务器*/
        function transferData() {

            getBasicData();
            getSampleData();

            $.ajax({
                url:'',
                type:'POST',
                data:{
                    basicData:basicData,
                    sampleData:sampleData
                },
                cache:false,
                /*数据传送成功*/
                success:function (data) {

                    if(basicData.orderStatus==0){
                        /*如果保存，跳转到我的订单-未提交订单*/
                        document.location.href="my-order.html#/1";
                    }else{
                        /*如果保存并下单，跳转到我的订单-已提交订单*/
                        document.location.href="my-order.html#/2";
                    }

                },
                /*数据传送失败*/
                error:function () {
                    // alert("failed");
                }
            })
        }
    });
});