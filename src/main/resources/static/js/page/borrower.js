/**
 * Created by GuoFeng on 2016/7/4.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, pageSearch) {

    function saveBorrowerMsg(){
        var employee_no=$("#employee_no").val();
        var workshop=$("#workshop").val();
        var person_name=$("#person_name").val();
        var work_section=$("#work_section").val();
        var team=$("#team").val();
        var production_line=$("#production_line").val();
        var equipment=$("#equipment").val();
        var borrower_class=$("#borrower_class").val();
        var organization=$("#organization").val();
        var createPerson=$("#hiddenName",parent.document).val();
        var uploadVal = {
            'employeeCardNo': employee_no,
            'workshop': workshop,
            'borrowedName': person_name,
            'workshopSection': work_section,
            'team': team,
            'productionLine': production_line,
            'equipmentName': equipment,
            'classification': borrower_class,
            'organization': organization,
            'createPerson':createPerson
        };
        var uploadJson = JSON.stringify(uploadVal);

        COMMON.WS.restful('borrower/saveBorrower', 'post', uploadJson, true, function (data) {
                if('success'==data.res){
                    layer.msg("保存成功");
                }
        });
    }
    function updateBorrowerMsg(){
        var employee_no=$("#employee_no").val();
        var workshop=$("#workshop").val();
        var person_name=$("#person_name").val();
        var work_section=$("#work_section").val();
        var team=$("#team").val();
        var production_line=$("#production_line").val();
        var equipment=$("#equipment").val();
        var borrower_class=$("#borrower_class").val();
        var organization=$("#organization").val();
        var updatePerson=$("#hiddenName",parent.document).val();
        var uploadVal = {
            'employeeCardNo': employee_no,
            'workshop': workshop,
            'borrowedName': person_name,
            'workshopSection': work_section,
            'team': team,
            'productionLine': production_line,
            'equipmentName': equipment,
            'classification': borrower_class,
            'organization': organization,
            'updatePerson':updatePerson
        };
        var uploadJson = JSON.stringify(uploadVal);

        COMMON.WS.restful('borrower/updateBorrower', 'post', uploadJson, true, function (data) {
            if('success'==data.res){
                layer.msg("修改成功");
            }
        });
    }

        function init() {

            /**
             * 获取用户权限
             */
            var arrUrl = window.location.href.split("/");
            var strPage = COMMON.ECODE.Base64.encode(arrUrl[arrUrl.length - 1]);
            var username = COMMON.ECODE.Base64.decode($.cookie('username'));

            if ($.cookie(strPage) == null && username != 'admin') {

                $('#saveBtn').remove();
                $('#deleteBtn').remove();
            }
            /**
             * layer config
             */
            COMMON.LAYER_CONFIG.config();

            /**
             * 保存事件监听
             */
            $(document).on('click', '#saveBtn', function (e) {
                //必输项检验
                var employee_no=$("#employee_no").val();
                var employee_name=$("#person_name").val();
                if(employee_no==""&&employee_name==""){
                    layer.msg("请输入员工号及人名!");
                    return;
                }
                if(employee_no==""){
                    layer.msg("请输入员工号!");
                    return;
                }
                if(employee_name==""){
                    layer.msg("请输入人名!");
                    return;
                }
                $.ajax({
                    type: "get",
                    url: "borrower/searchByBno",
                    data: {employeeCardNo: $("#employee_no").val()},
                    contentType: "application/json",
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data) {

                        if ('yes' == data.res) {
                            var isUpadte = layer.confirm('是否修改借用者信息？', {
                                btn: ['是', '否'] //按钮
                            }, function () {
                                updateBorrowerMsg();
                                layer.close(isUpadte);
                            }, function () {
                                return;
                            });
                        }else{
                            var isSave = layer.confirm('是否保存借用者信息？', {
                                btn: ['是', '否'] //按钮
                            }, function () {
                                saveBorrowerMsg();
                                layer.close(isSave);
                            }, function () {
                                return;
                            });
                        }
                    }
                });
            });
            //查询按钮
            $(document).on('click', '#searchBtn', function (e) {
                layer.open({
                    type: 2,
                    title: false,
                    shadeClose: true,
                    shade: false,
                    area: ['100%','100%'],
                    content: ['borrower_search_result.html']
                });
            });
            /*设备输入框查询:input enter事件监听*/
            $('#equipment').keydown(function (e) {
                if (e.keyCode == '13') {
                    var searchVal = {
                        popMenu: true,
                        searchValue: $('#equipment').val(),
                        searchTable: 'CMechanicalEquipment',
                        searchCol: 'equipmentAssetsNo,equipmentName',
                        colName: '机床编号,机床名称'
                    };
                    /*库房查询双击事件回调函数*/
                    
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                        $('#equipment').val(result.equipmentName);
                    });

                } else {

                }
            });
            /*员工号输入框查询:input enter事件监听*/
            $('#employee_no').keydown(function (e) {
                if (e.keyCode == '13') {
                    var searchVal = {
                        /*是否弹出页面*/
                        popMenu: true,
                        searchValue: $('#employee_no').val(),
                        searchTable: 'CBorrower',
                        searchCol: 'employeeCardNo,borrowedName',
                        /*自定义显示前两列列名*/
                        colName: '员工编号,员工名称'
                    };
                    /*库房查询双击事件回调函数*/
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                        $('#employee_no').val(result.employeeCardNo);
                    });

                } else {

                }
            });
            //清空输入框
             $(document).on('click', '#deleteBtn', function (e) {
            //     $("#deleteBtn").click(function(){
                    $('#employee_no').val("");
                    $('#employee_no').removeAttr("readonly");
                    $('#workshop').val("");
                    $('#person_name').val("");
                    $('#work_section').val("");
                    $('#team').val("");
                    $('#production_line').val("");
                    $('#equipment').val("");
                    $('#borrower_class').val("");
                    $('#organization').val("");
                });
        }
        return {
            'init': init
        }
    }
);

