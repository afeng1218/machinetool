/**
 * Created by CJS on 2016/4/5.
 */
define(['jquery', 'common', 'layer', 'page/common_search'], function ($, COMMON, layer, pageSearch) {

    function addToLiTiKu(cno, isLitiku) {

        if (isLitiku != 1) {
            return;
        }
        //查询刀具装配信息
        /*$.ajax({
         type: "get",
         url: "assembly/searchBycno",
         data: {cuttoolNo: cno},
         contentType: "application/json",
         dataType: "json",
         async: false,
         success: function (data) {
         var json = eval(data);
         var send = new Array();
         $.each(json, function (index, item) {

         var materialNo = item.mname;
         var materialDescription = item.mdes;
         var unit = item.unit;
         var sendLine = materialNo + ';' + materialDescription + ';' + unit;
         send.push({
         sendLine: sendLine
         });
         });
         /!**
         * 刀具面板 入库
         * @type {{source: string, sendValue: Array, fileName: string}}
         *!/
         var uploadValue = {
         source: 'pickorder',
         sendValue: send,
         fileName: cno + '.txt'
         };
         var Json = JSON.stringify(uploadValue);
         COMMON.WS.restful('sendStereoLibrary/send', 'post', Json, false, function (data) {

         if (data.result == 'true') {

         layer.msg('刀具信息发送立体库成功！');

         } else {

         layer.msg('刀具信息发送立体库失败！' + data.result);

         }
         });
         }
         });*/

        /**
         * 发送立体库
         * @type {Array}
         */
        var send = new Array();
        var dateTime = new Date().getTime();
        send.push({
            sendLine: dateTime + ';' + cno + ';1'
        });
        var uploadValue = {
            source: 'putorder',
            sendValue: send,
            fileName: cno + '_' + dateTime + '.txt'
        };
        var Json = JSON.stringify(uploadValue);
        COMMON.WS.restful('sendStereoLibrary/send', 'post', Json, true, function (data) {

            if (data.result == 'true') {

                parent.layer.msg('刀具信息发送立体库成功！', {time: 1000});

            } else {

                parent.layer.msg('刀具信息发送立体库失败！' + data.result, {time: 1000});

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

        var cno = $("#hcno", parent.document).val();
        var cdes = $("#hcdes", parent.document).val();
        var cdiameterbig = $("#hcdiameterbig", parent.document).val();
        var cdiametersmall = $("#hcdiametersmall", parent.document).val();
        var cdiameterlength = $("#hcdiameterlength", parent.document).val();
        var crenshu = $("#hcrenshu", parent.document).val();
        var cfun = $("#hcfun", parent.document).val();
        var ctype = $("#hctype", parent.document).val();
        var ctexing = $("#hctexing", parent.document).val();


        //alert(cno+cdes);
        $("#add_cuttool_no").val(cno);
        $("#add_cuttool_description").val(cdes);
        $("#add_programming_diameter_small").val(cdiameterbig);
        $("#add_programming_diameter_large").val(cdiametersmall);
        $("#add_programming_diameter_length").val(cdiameterlength);
        $("#add_renshu").val(crenshu);
        $("#add_characteristic_description").val(ctexing);
        $("#add_function").val(cfun);
        $("#add_type").val(ctype);
        show_typepic(ctype, 2);
        show_funpic(cfun, 0);

        /*show cuttool_function list()加载功能列表;*/
        init_cuttool_fun_list();
        function init_cuttool_fun_list() {
            $.ajax({
                type: "get",
                url: "parametermodel/showList0",
                dataType: "json",
                success: function (tt) {
                    var json = eval(tt); //数组
                    $('#add_cuttool_function ul').html('');
                    $.each(json, function (index, item) {
                        //循环获取数据
                        var category = json[index].category;
                        var _addHtml = '<li>' + category + '</li>';
                        $('#add_cuttool_function ul').append(_addHtml);
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("加载功能列表"+errorThrown);
                }
            });
        }

        /*show cuttool_type list();加载类型列表*/
        init_cuttool_type_list();
        function init_cuttool_type_list() {
            $.ajax({
                type: "get",
                url: "parametermodel/showList1",
                dataType: "json",
                success: function (tt) {
                    var json = eval(tt); //数组
                    $('#add_cuttool_type ul').html('');
                    $.each(json, function (index, item) {
                        //循环获取数据
                        var category = json[index].category;
                        var _addHtml = '<li>' + category + '</li>';
                        $('#add_cuttool_type ul').append(_addHtml);
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("加载类型列表"+errorThrown);
                }
            });
        }

        //功能下拉
        $('#add_cuttool_function').click(function () {
            $('#add_cuttool_function ul').toggle();
        });

        $('#add_cuttool_function ul').click(function (event) {
            var t1 = $(event.target).text();
            var type = 0;
            $('#add_function').val(t1);
            show_funpic(t1, type);
        });

        //类型下拉
        $('#add_cuttool_type').click(function () {
            $('#add_cuttool_type ul').toggle();
        });

        $('#add_cuttool_type ul').click(function (event) {
            var t2 = $(event.target).text();
            var type = 2;
            $('#add_type').val(t2);
            show_typepic(t2, type);
        });

        function show_funpic(t1, type) {
            $.ajax({
                type: "get",
                url: "parametermodel/getPicname",
                data: {category: t1, type: type},
                dataType: "text",
                success: function (data) {
                    $("#add_fun_img").html('<img src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:250px;height: auto;">');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    layer.msg("图片加载失败");
                }
            });
        }

        function show_typepic(t2, type) {
            $.ajax({
                type: "get",
                url: "parametermodel/getPicname",
                data: {category: t2, type: type},
                dataType: "text",
                success: function (data) {
                    $("#add_type_img").html('<img src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:250px;height: auto;">');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    layer.msg("图片加载失败");
                }
            });
        }

        /**
         * 库房存在验证
         */
        function storageRoomCheck(async) {

            if ($.trim($('#add_first_store').val()) != '') {

                var searchVal = {
                    popMenu: false,
                    async: async,
                    searchValue: $('#add_first_store').val(),
                    searchTable: 'CStorageRoomDefinition',
                    searchCol: 'storageRoomNo,isStereoLibrary',
                    searchColNum: '0,1'
                };
                /*库房查询双击事件回调函数*/
                var status = null;

                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                    if (result == '' || result == null) {

                        layer.tips('库房不存在！', $('#add_first_store'));
                        status = false;

                    } else {

                        $('#isStereoLibrary').val(result[0].isStereoLibrary);
                        status = true;
                    }
                    return;

                });
                return status;

            } else {

                layer.tips('请添加初始库房！', $('#add_first_store'));
                $('#add_first_store').val('');
                return false;
            }
        }

        /**
         * 库房编号input失去焦点事件
         */
        $('#add_first_store').blur(function () {

            storageRoomCheck(true);
        });


        $("#cuttoolAddBtn").click(function () {

            var croom = $('#add_first_store').val();
            var cplace = $('#add_first_allocation').val();
            /**
             * 验证库房是否存在
             */
            if (storageRoomCheck(false) == true) {

                enableCuttool(cno, croom, cplace);
            }
        });

        //启用刀具
        function enableCuttool(cno, croom, cplace) {

            /**
             * 上传的数据
             * @type {{cno: *, croom: *, cplace: *}}
             */
            var uploadVal = {cno: cno, croom: croom, cplace: cplace};

            COMMON.WS.local('cuttool/enableCuttool', 'get', uploadVal, false, function (data) {

                if (data.result == 'true' && data.resultStatus == 'noEnabled') {

                    var isLitiku = $('#isStereoLibrary').val();
                    /**
                     * 添加立体库
                     */
                    addToLiTiKu(cno, isLitiku);
                }
                layer.closeAll();
                parent.parent.parent.location.reload();
            });
            /*$.ajax({
             type: "get",
             url: "cuttool/enableCuttool",
             data: {cno: cno, croom: croom, cplace: cplace},
             dataType: "json",
             success: function (data) {

             if (data.result == 'true'&& data.resultStatus=='enabled') {

             var isLitiku = $('#isStereoLibrary').val();
             /!**
             * 添加立体库
             *!/
             addToLiTiKu(cno, isLitiku);

             layer.closeAll();
             parent.parent.parent.location.reload();
             }
             }
             });*/
        }

        /*库房input enter事件监听*/
        $('#add_first_store').keydown(function (e) {

            if (e.keyCode == '13') {

                var searchVal = {
                    searchValue: $('#add_first_store').val(),
                    searchTable: 'CStorageRoomDefinition',
                    searchCol: 'storageRoomNo,storageRoomDescribe,principalCustodian,isStereoLibrary'
                };
                /*库房查询双击事件回调函数*/
                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                    $('#add_first_store').val(result.storageRoomNo);
                    $('#isStereoLibrary').val(result.isStereoLibrary);
                });

            }
        });
        /*库位input enter事件监听*/
        $('#add_first_allocation').keydown(function (e) {

            if (e.keyCode == '13') {

                if ($("#add_first_store").val() == "") {

                    layer.tips('请输入库房！', $("#add_first_store"), {
                        time: 1000
                    });
                    return;
                }

                var searchVal = {
                    searchTable: 'CCargoSpaceDefinition',
                    searchCol: 'cargoSpaceId,cargoSpaceNo'
                };

                var isEnable = new Array();
                isEnable.push({
                    colName: "CStorageRoomDefinition.storageRoomNo",
                    colValue: $("#add_first_store").val()
                });

                searchVal.addLimit = isEnable;
                /*库房查询双击事件回调函数*/
                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                    $('#add_first_allocation').val(result.cargoSpaceNo);
                });

            }

        });


    }

    return {
        'init': init
    }
});
