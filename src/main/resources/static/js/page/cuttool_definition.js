/**
 * Created by CJS on 2016/3/21.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'fileinput2', 'bootstrap', 'datetimepicker'], function ($, COMMON, layer, pageSearch) {

        /**
         * 发送立体库
         * @param cutToolNo
         * @param sisterNo
         * @param cutToolDescription
         */
        function sendStereoLibrary(cutToolNo, sisterNo, cutToolDescription) {

            if (sisterNo != '') {

                cutToolNo = cutToolNo + '-' + sisterNo;

            }
            var sendLine = cutToolNo + ';' + cutToolDescription + ';件';
            var sendArray = [];
            sendArray.push({
                sendLine: sendLine
            });
            var uploadValue = {
                source: 'material',
                fileName: cutToolNo + '_' + new Date().getTime() + '.txt',
                sendValue: sendArray
            };

            var uploadJson = JSON.stringify(uploadValue);
            COMMON.WS.restful('sendStereoLibrary/send', 'post', uploadJson, true, function (data) {

                if (data.result == 'true') {

                    layer.msg('刀具信息保存成功！发送立体库成功！');

                } else {

                    layer.msg('刀具信息保存成功！' + data.result);

                }
            });
        }

        /**
         * Created by SunJun on 2016/8/8
         * 保存所有刀具信息
         * @param isUpdate 更新还是新增刀具
         * @constructor
         */
        function SaveCuttoolMsg(isUpdate) {
            //触发图片上传表单
            var formData = new FormData($("#cuttool-img-upload")[0]);//上传的图片数据
            COMMON.WS.ajax('cuttool/upload', 'post', formData, false, function (data) {

                if (data.result != 'true') {

                    layer.msg(data.result);

                }
            });


            /*封装的所有的刀具上传的参数信息*/
            var allCuttoolVal = {};

            var sister_cuttool = $("#sister_cuttool").val();
            var cuttool = {};

            /**
             * 刀具编号
             * @type {string}
             */
            var CNO = "";
            if (sister_cuttool != null && sister_cuttool != "") {

                CNO = $("#cuttool_no").val() + '-' + sister_cuttool;
                cuttool.cuttoolNo = CNO;

            } else {

                CNO = $("#cuttool_no").val();
                cuttool.cuttoolNo = CNO;
            }

            cuttool.barCode = $("#bar_code").val();
            cuttool.characteristicDescription = $("#characteristic_description").val();
            cuttool.cuttoolDescription = $("#cuttool_description").val();
            cuttool.lifetimeTracking = $("#lifetime_tracking").val();
            cuttool.priorityLevel = $("#priority_level").val();
            cuttool.programmingDiameterLarge = $("#programming_diameter_large").val();
            cuttool.programmingDiameterSmall = $("#programming_diameter_small").val();
            cuttool.programmingDiameterLength = $("#programming_diameter_length").val();
            /*cuttool.cuttoolTeam = $("#cuttool_team").val();*/
            cuttool.cuttoolHandleType = $("#cuttool_handle_type").val();
            cuttool.fun = $("#function").val();
            cuttool.type = $("#type").val();
            /**
             * 新旧
             * @type {any}
             */
            cuttool.usingStatus = $("#using_status").val();
            /**
             * 是否启用
             * @type {any}
             */
            cuttool.initiateStatus = 0;
            cuttool.statusDescription = $("#status_description").val();
            cuttool.initialLifetime = $("#initial_lifetime").val();
            cuttool.surplusLifetime = $("#surplus_lifetime").val();
            cuttool.lifeAlarm = $("#lifeAlarm").val();
            /* cuttool.amountProcessingTime=$("#amount_processing_time span");
             cuttool.amountChangeEdge = $("#haha").val();*/
            cuttool.isScrap = $("#isScrap").val();
            cuttool.initialStock = $("#initial_stock").val();
            cuttool.intialGoodsAllocation = $("#intial_goods_allocation").val();

            var img_html = $("#cuttool_img_div").html();
            if (img_html != "") {

                cuttool.graphical = $("#input_imgName").val();

            } else {

                cuttool.graphical = $("#cuttoolpicname").val();
            }
            if (isUpdate == 1) {

                cuttool.updateUser = COMMON.ECODE.Base64.decode($.cookie('username') + '');
            }
            if (isUpdate == 0) {

                cuttool.createUser = COMMON.ECODE.Base64.decode($.cookie('username') + '');
            }

            /******************************装配信息封装上传*******************************/
            var mTR = $(".Mtr");
            var trnum = mTR.length;//表格行数
            var trdatas = [];//所有行对象组成的对象数组

            for (var d = 0; d < trnum; d++) {

                var trdata = {};
                if (mTR.eq(d).find('td').eq(5).find('input').eq(0).is(':checked')) {

                    trdata.easyConsume = 1;

                } else {

                    trdata.easyConsume = 0;
                }
                if (mTR.eq(d).find('td').eq(6).find('input').eq(0).is(':checked')) {

                    trdata.chipCutting = 1;

                } else {

                    trdata.chipCutting = 0;
                }
                if (mTR.eq(d).find('td').eq(7).find('input').eq(0).is(':checked')) {

                    trdata.encodingBody = 1;

                } else {

                    trdata.encodingBody = 0;
                }

                trdata.cuttoolNo = CNO;
                trdata.orderNo = mTR.eq(d).find('td').eq(0).find('span').eq(0).text();
                trdata.materialno = mTR.eq(d).find('td').eq(1).find('span').eq(0).text();
                trdata.number = mTR.eq(d).find('td').eq(3).find('input').eq(0).val();
                trdata.unit = mTR.eq(d).find('td').eq(4).find('span').eq(0).text();
                trdata.brand = mTR.eq(d).find('td').eq(8).find('span').eq(0).text();
                trdata.date = mTR.eq(d).find('td').eq(9).find('span').eq(0).text();

                if (trdata.number == "") {

                    layer.msg('物料数量不能为空！');
                    return;
                }
                if (trdata.materialno != "") {

                    trdatas.push(trdata);
                }
            }
            var assemble = JSON.stringify(trdatas);
            //修改时
            var trdatas2 = [];

            if (assemble == "[]") {

                var trdata2 = {};
                trdata2.cuttoolNo = $('#tab2_cuttool_no').val();
                trdata2.delete = "1";
                trdatas2.push(trdata2);
                var a2 = JSON.stringify(trdatas2);
                assemble = a2;
            }

            /*****************************更新类型参数数据封装***********************************/
            var rowValue1 = [];
            var typeValue = [];
            var CTypeTr = $('#tab2_CTypeTable tr');
            for (var i = 0; i < CTypeTr.length; i++) {
                var CTypeTd = CTypeTr.eq(i).find('td');
                var row = {
                    'parName': CTypeTd.eq(0).find('span').text(),
                    'parVal': CTypeTd.eq(1).find('input').val()
                };
                rowValue1.push(row);
            }

            typeValue.push({
                'rowValue': rowValue1
            });
            var cutNo = $("#cuttool_no").val();
            if ($("#sister_cuttool").val() != null && $("#sister_cuttool").val() != "") {

                cutNo += "-" + $("#sister_cuttool").val();
            }
            typeValue.push({

                'type': 2

            });
            typeValue.push({

                'class': 1

            });
            typeValue.push({

                'cno': cutNo

            });
            /*************************************刀具功能参数数据封装**************************************/
            var functionValue = [];
            var rowArray = [];
            var CFunTr = $('#tab3_funPars tr');
            for (var i = 0; i < CFunTr.length; i++) {
                var CFunTd = CFunTr.eq(i).find('td');
                var row = {
                    'parName': CFunTd.eq(0).find('span').text(),
                    'parVal': CFunTd.eq(1).find('input').val()
                };
                rowArray.push(row);
            }
            var cutNo = $("#cuttool_no").val();
            if ($("#sister_cuttool").val() != null && $("#sister_cuttool").val() != "") {
                cutNo += "-" + $("#sister_cuttool").val();
            }
            functionValue.push({
                'rowValue': rowArray
            });
            functionValue.push({
                'type': 0
            });
            functionValue.push({
                'class': 1
            });
            functionValue.push({
                'cno': cutNo
            });

            /******************************所有刀具参数封装****************************/
            allCuttoolVal.cutBaseMsg = cuttool;//刀具基础参数
            if ($('#tab2_material_table tbody tr').length > 0) {

                allCuttoolVal.assemble = JSON.parse(assemble);//刀具装配信息
            }
            allCuttoolVal.tyle = typeValue;//类型参数数据上传
            allCuttoolVal.function = functionValue;//功能参数数据

            var uploadJSON = JSON.stringify(allCuttoolVal);

            COMMON.WS.restful('cuttool/saveAllCuttoolMsg', 'post', uploadJSON, true, function (data) {

                if (data.result == 'true') {

                    if (isUpdate == 1) {

                        layer.msg('刀具信息更新成功！');

                    } else {

                        /**
                         * 发送立体库
                         */
                        sendStereoLibrary($('#cuttool_no').val(), $('#sister_cuttool').val(), $('#cuttool_description').val());

                    }

                } else {

                    if (isUpdate == 1) {

                        layer.msg('刀具信息更新失败！' + data.result);

                    } else {

                        layer.msg('刀具信息保存失败！' + data.result);
                    }
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

            /*刀具查找*/
            $('#btn_cuttool_search').click(function () {
                layer.open({
                    type: 2,
                    title: false,//不显示标题
                    shadeClose: true,
                    shade: false,
                    //maxmin: true,
                    area: ['100%', '100%'],
                    content: ['cuttool_search.html']
                });
            });

            /*刀具信息保存*/
            $('#saveBtn').click(function () {

                var yz1 = $("#cuttool_no").val();
                var yz2 = $("#cuttool_description").val();
                var yz3 = $('#using_status').val();

                if (yz1 == "" || yz2 == "" || yz3 == "" || $("#sister_cuttool").val() != '') {
                    if (yz1 == "" && yz2 == "") {
                        layer.msg("刀具编号及描述不能为空!");
                        return;
                    }
                    if (yz1 == "") {
                        layer.msg("刀具编号不能为空!");
                        return;
                    }
                    if ($("#sister_cuttool").val().length < 2) {
                        layer.msg("姐妹刀号不足两位，不够两位用0补位！");
                        return;
                    }
                    if (yz2 == "") {
                        layer.msg("描述不能为空!");
                        return;
                    }
                    if (yz3 == "") {
                        layer.msg("刀具状态不能为空");
                        return;
                    }
                }

                var f = document.getElementById("cuttoolpic").files;
                //大小 字节
                if (f[0] != undefined && f[0].size > 716800) {
                    layer.msg("图片大小不允许超过700kb，请重新选择图片！");
                    return null;
                }
                var table = $('.tab2_material_table');
                var num = table.length;
                var lastTr = $('.Mtr:last');

                if (num >= 2 && lastTr.find('td').eq(1).find('span.Mno_span').text() == "") {

                    layer.msg('请输入装配物料信息！');
                    return;
                }
                if (num >= 2 && lastTr.find('td').eq(3).find('input').eq(0).val() == "") {

                    layer.msg('请输入装配物料数量！');
                    return;
                }

                var sister_cuttool = $("#sister_cuttool").val();
                var CNO = "";
                if (sister_cuttool != null && sister_cuttool != "") {

                    CNO = $("#cuttool_no").val() + '-' + sister_cuttool;
                }
                else {

                    CNO = $("#cuttool_no").val();
                }

                /**
                 * 判断刀具编号是否重复
                 */
                $.ajax({
                    type: "get",
                    url: "cuttool/searchByCno",
                    data: {cuttoolNo: CNO},
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {

                        /*已存在刀具信息*/
                        if ('yes' == data.res) {

                            layer.confirm('是否修改该刀具信息？', {

                                btn: ['是', '否'] //按钮

                            }, function () {

                                SaveCuttoolMsg(1);

                            });
                        }
                        /*新建刀具*/
                        else if (data.res == 'no') {

                            SaveCuttoolMsg(0);
                            $('#cuttool_no').prop('readonly', true);
                            $('#sister_cuttool').prop('readonly', true);

                            /*查询失败*/
                        } else {

                            layer.msg(data.res);
                        }
                    }

                });

            });

            /**********刀具删除 guofeng***/
            $("#deleteBtn").click(function () {

                var cuttool_no = $("#cuttool_no").val();//刀具编号
                var sister_cuttool = $("#sister_cuttool").val();//姐妹号
                if (cuttool_no == "") {
                    return layer.msg("请选择需要删除的刀具编号！");
                }
                var lay = layer.confirm('是否确认删除选此刀具？', {
                    btn: ['删除', '取消'] //按钮
                }, function () {
                    if (sister_cuttool != "") {
                        cuttool_no = cuttool_no + "-" + sister_cuttool;
                    }
                    var map = {
                        'cuttool_no': cuttool_no
                    };
                    COMMON.WS.restful("cuttool/deleteCuttool", "post", JSON.stringify(map), true, function (data) {
                        if (data.result) {
                            layer.msg("删除成功！");
                            setTimeout(function () {
                                location.reload();//重置页面
                            }, 1000);
                        } else {
                            layer.msg("此刀具不允许删除！");
                        }
                    })
                });
            });
            /**********刀具删除 end******/

            /*show hand_type list();加载刀柄类型列表*/

            show_handtype_list();
            function show_handtype_list() {
                $.ajax({
                    type: "get",
                    url: "handtype/getList",
                    dataType: "json",
                    success: function (tt) {
                        var json = eval(tt); //数组
                        $('#hand_type ul').html('');
                        $.each(json, function (index, item) {
                            //循环获取数据
                            var id = json[index].id;
                            var handType = json[index].handType;
                            var _addHtml = '<li>' + handType + '</li>';
                            $('#hand_type ul').append(_addHtml);
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert("加载刀柄类型列表"+errorThrown);
                    }
                });
            }

            $('#hand_type').click(function () {
                $('#hand_type ul').toggle();
            });

            $('#hand_type ul').click(function (event) {
                var t1 = $(event.target).text();
                $('#cuttool_handle_type').val(t1);
            });

            /*getCharacterList ();加载特性说明列表*/

            getCharacterList();
            function getCharacterList() {
                $.ajax({
                    type: "get",
                    url: "handtype/getCharacterList",
                    dataType: "json",
                    success: function (tt) {
                        var json = eval(tt); //数组
                        $('#characteristic_description_div ul').html('');
                        $.each(json, function (index, item) {
                            //循环获取数据
                            var id = json[index].id;
                            var characteristicDescription = json[index].characteristicDescription;
                            var _addHtml = '<li>' + characteristicDescription + '</li>';
                            $('#characteristic_description_div ul').append(_addHtml);
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert("加载刀柄类型列表"+errorThrown);
                    }
                });
            }

            /*特性说明下拉选择*/
            $('#characteristic_description_div').click(function () {
                $('#characteristic_description_div ul').toggle();
            });

            $('#characteristic_description_div ul').click(function (event) {
                var t1 = $(event.target).text();
                $('#characteristic_description').val(t1);
            });
            /*加载功能选择;*/
            show_cuttool_function_list();
            function show_cuttool_function_list() {
                $.ajax({
                    type: "get",
                    url: "parametermodel/showList0",
                    dataType: "json",
                    success: function (tt) {
                        var json = eval(tt); //数组
                        $('#cuttool_function ul').html('');
                        $.each(json, function (index, item) {
                            //循环获取数据
                            var category = json[index].category;
                            var _addHtml = '<li>' + category + '</li>';
                            $('#cuttool_function ul').append(_addHtml);
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert("加载功能列表"+errorThrown);
                    }
                });
            }

            /**
             * 显示功能下拉菜单
             */
            $('#cuttool_function').click(function () {

                $('#cuttool_function ul').toggle();
            });

            /**
             * 功能下拉菜单选择事件
             */
            $('#cuttool_function ul').click(function (event) {

                var t1 = $(event.target).text();
                var type = 0;
                $('#function').val(t1);
                show_functionPic(t1, type);//图片加载
            });
            //功能下拉选择图片加载
            function show_functionPic(t1, type) {
                $.ajax({
                    type: "get",
                    url: "parametermodel/getPicname",
                    data: {category: t1, type: type},
                    dataType: "text",
                    success: function (data) {
                        $("#funtion_pic").html('<img src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:290px;max-height: 160px">');
                    },
                });
            }

            /*加载类型列表*/
            show_cuttool_type_list();

            function show_cuttool_type_list() {
                $.ajax({
                    type: "get",
                    url: "parametermodel/showList1",
                    dataType: "json",
                    success: function (tt) {

                        var json = eval(tt); //数组
                        $('#cuttool_type ul').html('');

                        $.each(json, function (index, item) {

                            //循环获取数据
                            var category = json[index].category;
                            var id = json[index].id;
                            var _addHtml = '<li>' + category + '<input type="text" style="display: none;" value="' + id + '"/></li>';
                            $('#cuttool_type ul').append(_addHtml);
                        });

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert("加载类型列表"+errorThrown);
                    }
                });
            }

            $('#cuttool_type').click(function () {
                $('#cuttool_type ul').toggle();
            });

            $('#cuttool_type ul').click(function (event) {
                var t2 = $(event.target).text();
                var id = $(event.target).find('input').val();
                var type = 2;

                $('#type').val(t2);
                $('#typeId').val(id);
                show_typePic(t2, type);
            });
            //类型图片加载
            function show_typePic(t2, type) {
                $.ajax({
                    type: "get",
                    url: "parametermodel/getPicname",
                    data: {category: t2, type: type},
                    dataType: "text",
                    success: function (data) {
                        $("#type_pic").html('<img  src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:290px;max-height: 160px">');
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        layer.msg("图片加载失败");
                    }
                });
            }

            //新旧选择
            $("#inlineRadio1").click(function () {
                var isNew = $("#inlineRadio1").is(':checked');
                if (isNew) {
                    $('#using_status').val(0);
                } else {
                    $('#using_status').val(1);
                }
            });
            $("#inlineRadio2").click(function () {
                var isOld = $("#inlineRadio2").is(':checked');
                if (isOld) {
                    $('#using_status').val(1);
                } else {
                    $('#using_status').val(0);
                }
            });
            //报废复选
            $("#set_isScrap").click(function () {
                var isScrap = $("#set_isScrap").is(':checked');
                if (isScrap) {
                    $('#isScrap').val(1);
                } else {
                    $('#isScrap').val(0);
                }
            });

            $("#set_lifetime_tracking").click(function () {
                var istrack = $("#set_lifetime_tracking").is(':checked');
                if (istrack) {
                    $("#lifetime_tracking").val(1);
                } else {
                    $("#lifetime_tracking").val(0);
                }

            });

            //------------刀具装配

            //单击表格行获取

            var flag = 1;//用于获取点击行号，双击物料信息时传到哪一行
            //添加行
            $(document).on('click', '#cuttool_tab2_table_add_a', function () {

                // $('#cuttool_tab2_table_add_a').click(function () {
                var table = document.getElementById("tab2_material_table");
                var num = table.rows.length;
                var lastTr = $('.Mtr:last');
                if (num >= 2 && lastTr.find('td').eq(1).find('span.Mno_span').text() == "") {

                    layer.tips('请输入物料信息！', lastTr.find('td').eq(1), {time: 1000});
                    return;
                }
                if (num >= 2 && lastTr.find('td').eq(3).find('input').eq(0).val() == "") {

                    layer.tips('请输入数量！', lastTr.find('td').eq(3), {time: 1000});
                    return;
                }

                var mtime = $("#first_assemble_time").val();
                if (mtime == "") {

                    var date = new Date();
                    var seperator1 = "-";
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    if (month >= 1 && month <= 9) {

                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {

                        strDate = "0" + strDate;
                    }
                    var currentdate = year + seperator1 + month + seperator1 + strDate;
                    mtime = currentdate;
                }

                //添加空行
                $("#tab2_material_table").append('<tr class="cuttool_tab2_table_tr Mtr">' +
                    '<td style="width: 5%;text-align: center;">' +
                    '<span class="trNum" >' + num + '</span>' +
                    '</td>' +
                    '<td class="tab2_table_materialno " style="width: 15%;text-align: center;vertical-align: inherit;">' +
                    '<span class="Mno_span"></span>' +
                    '<span class="glyphicon glyphicon-search materialSearch" style="cursor: pointer;display: none;"/>' +
                    '</td>' +
                    '<td style="width: 17%;text-align: center" colspan="8">' +
                    '<span ></span>' +
                    '</td>' +
                    '<td style="width: 8%;text-align: center;">' +
                    '<input  class="materialNumber" type="number" min="1" class="sesol-input "style="border: 0px;text-align: inherit;width: 100%;">' +
                    '</td>' +
                    '<td style="width: 5%;text-align: center">' +
                    '<span ></span>' +
                    '</td>' +
                    '<td style="width: 8%;text-align: center">' +
                    '<input type="checkbox"/>' +
                    '</td>' +
                    '<td  style="width: 8%;text-align: center">' +
                    '<input class="CuttingBody"  type="checkbox"/>' +
                    '</td>' +
                    '<td style="width: 9%;text-align: center;">' +
                    '<input type="checkbox"/>' +
                    '</td>' +
                    '<td class="td_mBrand" style="width: 9%;text-align: center">' +
                    '<span class="M_Brand"></span>' +
                    '<span class="span_mBrand glyphicon glyphicon-search" style="display: none;cursor: pointer;"></span>' +
                    '</td>' +
                    '<td style="width: 16%;text-align: center">' +
                    '<span >' + mtime + '</span>' +
                    '</td>' +
                    '<td class="td_materialDelete">' +
                    '<span class="span_materialDelete glyphicon glyphicon-remove" style="cursor: pointer;"></span>' +
                    '</td>' +
                    '</tr>'
                );

            });

            /*设置物料查询click事件 layer弹出物料查询页面*/
            $(document).on('click', '.materialSearch', function (e) {

                flag = ($(this).parent().parent().find('td:first').find('span').text());
                //设置当前选择行号
                $('#flag').val(flag);
                var tr = $(e.target).parent().parent().parent().parent();
                /*去除edit标志*/
                $('.edit').removeClass('edit');
                /*当前编辑行添加标签*/
                tr.addClass('edit');

                layer.open({
                    type: 2,
                    title: false,//不现实表题
                    shadeClose: true,
                    shade: false,
                    //maxmin: true, 开启最大化最小化按钮
                    area: ['75%', '85%'],
                    content: ['material_search.html']
                });
            });

            /*物料查询按钮显示*/
            $(document).on('click', '.cuttool_tab2_table_tr', function (e) {
                $('.tab2_table_materialno .materialSearch').css('display', 'none');
                $('.td_mBrand .span_mBrand').css('display', 'none');
                $(e.target).find('.materialSearch').css('display', '');
                $(e.target).find('.span_mBrand').css('display', '');
            });

            //删除行
            $(document).on('click', '.span_materialDelete', function (e) {
                var trDelete = layer.confirm('是否删除行？', {
                    btn: ['是', '否'] //按钮
                }, function () {
                    $(e.target).parent().parent().remove();
                    var table = document.getElementById("tab2_material_table");
                    var tablerows = table.rows.length;
                    // var tablerows=$("#tab2_material_table").rows.length;
                    for (var i = 1; i < tablerows; i++) {
                        $("#tab2_material_table").find('tr').eq(i).find('td').eq(0).find('span').eq(0).text(i);
                    }
                    layer.close(trDelete);
                }, function () {

                });
            });
            /*版本选择*/
            $(document).on('click', '.span_mBrand', function (e) {

                var tr = $(e.target).parent().parent();
                var mNo = tr.find('span.Mno_span').text();
                var trNum = tr.find('span.trNum').text();
                var intTrNum = parseInt(trNum) - 1;
                var searchVal = {
                    colName: '物料编号,版本号',
                    searchTable: 'CMaterialVersion',
                    searchCol: 'id.materialVersionNo,versionExplain'
                };
                var isEnable = [];
                isEnable.push({
                    colName: "CGeneralMaterial.materialNo",
                    colValue: mNo
                });
                searchVal.addLimit = isEnable;
                /*库房查询双击事件回调函数*/
                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                    $('.Mtr').eq(intTrNum).find('td.td_mBrand').find('span').eq(0).text(result.versionExplain);
                    // $('.span_mBrand').css("display", "none");
                });
            });


            //切削主体控制
            $(document).on('click', '.CuttingBody', function (e) {
                var cutBody = $(e.target);
                var parentAllTr = $('.Mtr');
                var cutBodyNum = 0;
                for (var j = 0; j < parentAllTr.length; j++) {
                    if (parentAllTr.eq(j).find('td').eq(6).find('input.CuttingBody').is(':checked')) {
                        cutBodyNum++;
                    }
                }
                if (cutBodyNum > 1) {
                    layer.tips('只能有一个切削主体！', cutBody, {time: 2000});
                    cutBody.attr("checked", false);
                } else {

                }
            });
            //tab2中刀具类型图片展示
            function show_tab2_typepic(mtype, type) {
                $.ajax({
                    type: "get",
                    url: "parametermodel/getPicname",
                    data: {category: mtype, type: type},
                    dataType: "text",
                    success: function (data) {

                        $("#tab2_type_pic").html('<img src="uploadImg/' + data + '"  alt="" class="img-thumbnail" style="width: 450px;height: 280px;">');
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        layer.msg("图片加载失败");
                    }
                });
            }

            //tab2中刀具参数显示
            function show_tab2_typePar(cate) {
                $('#tab2_CTypeTable').html('');
                var uploadValue = {
                    "category": cate,
                    "type": 2
                };
                COMMON.WS.local("parametermodel/showCTypePar", "get", uploadValue, true, function (data) {

                    for (var i = 0; i < data.length; i++) {

                        if (data[i].parName == '') {

                            continue;
                        }

                        $('#tab2_CTypeTable').append('' +
                            '<tr>' +
                            '<td style="text-align: center">' +
                            '<span>' + data[i].parName + '</span>' +
                            '</td>' +
                            '<td style="text-align: center">' +
                            '<input value="' + data[i].parValue + '" type="number" class="col-md-1 form-control" style="width:100%;text-align: center" />' +
                            '</td>' +
                            '</tr>');
                    }
                });
            }

            //tab3中刀具功能显示
            function show_tab3(fun) {
                var uploadValue = {
                    "category": fun,
                    "type": 0
                };
                COMMON.WS.local("parametermodel/showCTypePar", "get", uploadValue, true, function (data) {

                    /**
                     * 清空功能参数信息
                     */
                    $('#tab3_funPars tr').remove();

                    for (var i = 0; i < data.length; i++) {

                        if (data[i].parName == '') {

                            continue;
                        }

                        $('#tab3_funPars').append('<tr>' +
                            '<td style="text-align: center">' +
                            '<span>' + data[i].parName + '</span>' +
                            '</td>' +
                            '<td style="text-align: center">' +
                            '<input value="' + data[i].parValue + '" type="number" class="col-md-1 form-control" style="width:100%;text-align: center" />' +
                            '</td>' +
                            '</tr>');
                    }
                });
            }

            //清空装配信息
            $(document).on('click', '#delete_all', function () {
                $('#tab2_material_table').find('tr').eq(0).nextAll().remove();
            });

            $('.order').click(function (e) {
                var item = $(e.target);
                $('#cuttool-status-bar').find('div').removeClass('select');
                item.addClass('select');
                $('#cuttool-status-bar').removeClass('select');
                $('#cuttool-status-bar-value').val($(item).attr('data'));
                var v1 = $('#cuttool-status-bar-value').val();
                show_cuttool_tab(v1);
            });
            function show_cuttool_tab(v1) {

                //tab2刀具编码，描述自动录入
                if ($("#cuttool_no").val() != "") {
                    if ($("#sister_cuttool").val() != "") {
                        $("#tab2_cuttool_no").val($("#cuttool_no").val() + "-" + $("#sister_cuttool").val());
                    } else {
                        $("#tab2_cuttool_no").val($("#cuttool_no").val());
                    }
                }
                //初次装配时间
                var date2 = new Date();
                var seperator = "-";
                var year2 = date2.getFullYear();
                var month2 = date2.getMonth() + 1;
                var strDate2 = date2.getDate();
                if (month2 >= 1 && month2 <= 9) {
                    month2 = "0" + month2;
                }
                if (strDate2 >= 0 && strDate2 <= 9) {
                    strDate2 = "0" + strDate2;
                }
                var currentdate2 = year2 + seperator + month2 + seperator + strDate2;
                var first_assemble_time = currentdate2;
                $("#first_assemble_time").val(first_assemble_time);
                if (v1 == 2) {
                    var typebefore = $("#tab2_materialtype").val();
                    var t = $("#type").val();
                    $("#tab2_materialtype").val(t);
                    var typenow = $("#tab2_materialtype").val();
                    if (typebefore != typenow) {
                        show_tab2_typepic(typenow, 2);
                        show_tab2_typePar(typenow);
                    }
                    else {
                        //类型未变不处理
                    }
                }
                if (v1 == 3) {
                    //判断何时加载tab3及根据功能改变tab3中的内容
                    var funbefore = $("#tab3_function").val();
                    var fun = $("#function").val();
                    $("#tab3_function").val(fun);
                    var tab3_funnow = $("#tab3_function").val();

                    if (funbefore != tab3_funnow) {
                        show_tab3(tab3_funnow);
                    }
                    else {
                        //功能未变不处理
                    }
                }
                $("#tab2_cuttool_description").val($("#cuttool_description").val());
                $(".cuttool_tab").css("display", "none");
                $("#cuttool_tab" + v1).css("display", "");
                if (v1 == 4) {
                    $("#tab4_cuttool_description").val($("#cuttool_description").val());
                    $("#tab4_cuttool_no").val($("#cuttool_no").val());
                }

            }


            /*picture load*/
            initFileInput("cuttoolpic", "/cuttool/upload");

            function initFileInput(ctrlName, uploadUrl) {
                var control = $('#' + ctrlName);
                control.fileinput({
                    uploadUrl: uploadUrl, //上传的地址
                    allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀
                    showUpload: false, //是否显示上传按钮
                    showRemove: false,//是否显示移除按钮
                    showCaption: false,//是否显示标题
                    maxFileCount: 1,
                    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
                });
            }

            $(document).on('click', '#delete_img_div', function () {
                var imddelete = layer.confirm('是否删除图片？', {
                    btn: ['是', '否'] //按钮
                }, function () {
                    $("#cuttool_img_div").html('');
                    $("#delete_img_div").css("display", "none");
                    layer.close(imddelete);
                }, function () {

                });
            });
            //选择新图片后删除展示的图片
            $(document).on('click', '#cuttoolpic', function () {
                $("#cuttool_img_div").html('');
                $("#delete_img_div").css("display", "none");
            });
            /*绑定日期选择器*/
            $('.dateRange').datetimepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                pickerPosition: 'bottom-left',
                todayBtn: 1,
                linkFormat: 'yyyy-mm-dd',
                minView: 'month'
            });

            /******************读取RFID Created by SunJun 2016/7/28*************************/
            /**
             * 写入RFID
             */
            $('#writeRFID').click(function () {

                var cuttoolNo = $('#cuttool_no').val();
                var sisterCuttool = $('#sister_cuttool').val();

                if ($('#cuttool_no').prop('readonly') == true) {

                    var type = $('#typeId').val();

                    var uploadVal = {
                        content: '1' + cuttoolNo + '*' + sisterCuttool + '%' + type + '&'
                    };

                    COMMON.WS.local('cuttool/sendRFID', 'get', uploadVal, true, function (data) {

                        if (data.result == 'true') {

                            layer.msg(data.dataResult + '');

                        } else {

                            layer.msg(data.result + '');
                        }

                    });

                } else {

                    layer.msg('请先选择刀具！');
                }

            });
            /**
             * 读取RFID
             */
            $('#readRFID').click(function () {

                var uploadVal = {
                    content: '0'
                };

                COMMON.WS.local('cuttool/sendRFID', 'get', uploadVal, true, function (data) {

                    if (data.result == 'true') {

                        var cutToolNo = data.dataResult + '';

                        $.ajax({
                            type: "get",
                            url: "cuttool/searchbyno",
                            data: {cuttoolNo: cutToolNo},
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {

                                if (data == null) {

                                    layer.msg("刀具不存在！");
                                    return
                                }
                                var json = eval(data);
                                $.each(json, function (index, item) {

                                    var cno = item.cNo;
                                    var strs = cno.split("-");
                                    var cuttoolno = [];
                                    for (var i = 0; i < strs.length; i++) {

                                        cuttoolno[i] = strs[i];

                                    }
                                    $('#typeId').val(item.typeId);
                                    $("#cuttool_no").val(cuttoolno[0]);
                                    $("#sister_cuttool").val(cuttoolno[1]);
                                    //设置不可编辑
                                    $("#cuttool_no").attr('readonly', 'readonly');
                                    $("#sister_cuttool").attr('readonly', 'readonly');

                                    $("#bar_code").val(item.barCode);
                                    $("#cuttool_description").val(item.cdes);
                                    $("#tab2_cuttool_description").val(item.cdes);
                                    $("#characteristic_description").val(item.ccharacteristicDescription);
                                    $("#cdes").val(item.cdes);
                                    $("#cuttool_handle_type").val(item.handtype);
                                    $("#programming_diameter_small").val(item.cdiameterSmall);
                                    $("#programming_diameter_large").val(item.cdiameterLarge);
                                    $("#programming_diameter_length").val(item.cdiameterLength);
                                    $("#priority_level").val(item.level);
                                    $("#function").val(item.cfun);
                                    $("#type").val(item.ctype);
                                    $("#tab3_function").val(item.cfun);
                                    $("#tab2_materialtype").val(item.ctype);

                                    var isTrack = item.istrack;
                                    if (isTrack == 1) {

                                        $("#lifetime_tracking").val(1);
                                        $("#set_lifetime_tracking").attr("checked", "checked");

                                    }

                                    var usingstatus = item.usingStatus;
                                    if (usingstatus == 0) {

                                        $('#using_status').val(0);
                                        $("#inlineRadio1").attr("checked", "checked");

                                    } else {

                                        $('#using_status').val(1);
                                        $("#inlineRadio2").attr("checked", "checked");
                                    }

                                    var isScrap = item.cisScrap;
                                    if (isScrap == 1) {

                                        $("#isScrap").val(1);
                                        $("#set_isScrap").attr("checked", "checked");

                                    } else {

                                        $("#isScrap").val(0);
                                    }

                                    $("#status_description").val(item.statusDes);
                                    $("#initial_lifetime").val(item.cinitialLifetime);
                                    $("#surplus_lifetime").val(item.csurplusLifetime);
                                    $("#lifeAlarm").val(item.lifeAlarm);
                                });

                            }
                        });
                        //功能和类型图片显示
                        var CFuntion = $("#function").val();
                        var CType = $("#type").val();
                        $.ajax({
                            type: "get",
                            url: "parametermodel/getPicname",
                            data: {category: CFuntion, type: 0},
                            dataType: "text",
                            async: true,
                            success: function (data) {
                                $("#funtion_pic").html('<img src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:290px;max-height: 160px">');
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                layer.msg("图片加载失败");
                            }
                        });

                        $.ajax({
                            type: "get",
                            url: "parametermodel/getPicname",
                            data: {category: CType, type: 2},
                            dataType: "text",
                            async: true,
                            success: function (data) {
                                $("#type_pic").html('<img  src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:290px;max-height: 160px">');
                                $("#tab2_type_pic").html('<img src="uploadImg/' + data + '"  alt="" class="img-thumbnail" style="width: 450px;height: 280px;">');
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                layer.msg("图片加载失败");
                            }
                        });

                        //类型和功能参数显示
                        $('#tab3_funPars').html('');
                        $.ajax({
                            type: "get",
                            url: "cuttool/searchCParBycno",
                            data: {
                                cuttoolNo: cutToolNo,
                                type: 0
                            },
                            contentType: "application/json",
                            dataType: "json",
                            async: true,
                            success: function (data) {
                                var json = eval(data);
                                $.each(json, function (index, item) {
                                    $('#tab3_funPars').append('<tr>' +
                                        '<td style="text-align: center">' +
                                        '<span>' + json[index].id.parameterName + '</span>' +
                                        '</td>' +
                                        '<td style="text-align: center">' +
                                        '<input value="' + json[index].parameterValue + '" type="text" class="col-md-1 form-control" style="width:100%;text-align: center" />' +
                                        '</td>' +
                                        '</tr>');
                                });

                            }
                        });

                        $('#tab2_CTypeTable').html('');
                        $.ajax({
                            type: "get",
                            url: "cuttool/searchCParBycno",
                            data: {
                                cuttoolNo: cutToolNo,
                                type: 2
                            },
                            contentType: "application/json",
                            dataType: "json",
                            async: true,
                            success: function (data) {
                                var json = eval(data);
                                $.each(json, function (index, item) {
                                    $('#tab2_CTypeTable').append('<tr>' +
                                        '<td style="text-align: center">' +
                                        '<span>' + json[index].id.parameterName + '</span>' +
                                        '</td>' +
                                        '<td style="text-align: center">' +
                                        '<input value="' + json[index].parameterValue + '" type="text" class="col-md-1 form-control" style="width:100%;text-align: center" />' +
                                        '</td>' +
                                        '</tr>');
                                });

                            }
                        });

                        //刀具装配信息带出
                        $("#tab2_cuttool_no").val(cutToolNo);
                        $.ajax({
                            type: "get",
                            url: "assembly/searchBycno",
                            data: {cuttoolNo: cutToolNo},
                            contentType: "application/json",
                            dataType: "json",
                            async: true,
                            success: function (data) {

                                var json = eval(data);
                                $("#tab2_material_table").html('<tr>' +
                                    '<th style="width: 5%;text-align: center;">序号</th>' +
                                    '<th style="width: 15%;text-align: center">物料' +
                                    '<div class="cuttool_tab2_table_add" style="width: 10%;margin-right:5px;float: right;">' +
                                    '<a id="cuttool_tab2_table_add_a" style="cursor: pointer;">' +
                                    '<span class="glyphicon glyphicon-plus"></span>' +
                                    '</a>' +
                                    '</div>' +
                                    '</th>' +
                                    '<th style="width: 15%;text-align: center" colspan="8">描述</th>' +
                                    '<th style="width: 8%;text-align: center;">数量</th>' +
                                    '<th style="width: 5%;text-align: center">单位</th>' +
                                    '<th style="width: 8%;text-align: center">易消耗</th>' +
                                    '<th style="width: 8%;text-align: center">切削主体</th>' +
                                    '<th style="width: 8%;text-align: center;">编码主体</th>' +
                                    '<th style="width: 8%;text-align: center">品牌</th>' +
                                    '<th style="width: 15%;text-align: center">日期</th>' +
                                    '<th style="width: 5%;text-align: center">操作</th>' +
                                    '</tr>');
                                $.each(json, function (index, item) {
                                    var no = item.no;
                                    var mname = item.mname;
                                    var mdes = item.mdes;
                                    var num = item.mnum;
                                    var unit = item.unit;
                                    if (unit == null) {
                                        unit = "";
                                    }
                                    var easyConsume = item.easyConsume;
                                    var chipCutting = item.chipCutting;
                                    var encodingBody = item.encodingBody;
                                    var brand = item.brand;
                                    var date = item.date;
                                    var listnum = item.listnum;


                                    var addhtml = '<tr class="cuttool_tab2_table_tr Mtr">' +
                                        '<td style="width: 5%;text-align: center;">' +
                                        '<span class="trNum" >' + no + '</span>' +
                                        '</td>' +
                                        '<td class="tab2_table_materialno " style="width: 15%;text-align: center;vertical-align: inherit;">' +
                                        '<span class="Mno_span">' + mname + '</span>' +
                                        // '<span class="glyphicon glyphicon-search materialSearch" style="cursor: pointer;display: none;"/>' +
                                        '</td>' +
                                        '<td style="width: 17%;text-align: center" colspan="8">' +
                                        '<span>' + mdes + '</span>' +
                                        '</td>' +
                                        '<td style="width: 8%;text-align: center;">' +
                                        '<input  class="materialNumber" value="' + num + '"  type="number" min="1" class="sesol-input "style="border: 0px;text-align: inherit;width: 100%;">' +
                                        '</td>' +
                                        '<td style="width: 5%;text-align: center">' +
                                        '<span>' + unit + '</span>' +
                                        '</td>';
                                    if (easyConsume == 1) {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input checked type="checkbox"/>' +
                                            '</td>';
                                    } else {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input  type="checkbox"/>' +
                                            '</td>';
                                    }
                                    if (chipCutting == 1) {
                                        addhtml = addhtml + '<td  style="width: 8%;text-align: center">' +
                                            '<input class="CuttingBody" checked type="checkbox"/>' +
                                            '</td>';
                                    } else {
                                        addhtml = addhtml + '<td  style="width: 8%;text-align: center">' +
                                            '<input class="CuttingBody"  type="checkbox"/>' +
                                            '</td>';
                                    }
                                    if (encodingBody == 1) {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input checked type="checkbox"/>' +
                                            '</td>';
                                    } else {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input type="checkbox"/>' +
                                            '</td>';
                                    }
                                    addhtml = addhtml +
                                        '<td class="td_mBrand" style="width: 9%;text-align: center">' +
                                        '<span class="M_Brand">' + brand + '</span>' +
                                        '<span class="span_mBrand glyphicon glyphicon-search" style="display: none;cursor: pointer;"></span>' +
                                        '</td>' +
                                        '<td style="width: 16%;text-align: center">' +
                                        '<span >' + date + '</span>' +
                                        '</td>' +
                                        '<td class="td_materialDelete">' +
                                        '<span class="span_materialDelete glyphicon glyphicon-remove" style="cursor: pointer;"></span>' +
                                        '</td>' +
                                        '</tr>';
                                    $("#tab2_material_table tbody").append(addhtml);
                                });
                            }
                        });

                        //刀具图片显示
                        $("#cuttool_img_div").css("display", "");
                        $("#delete_img_div").css("display", "");
                        $("#cuttool_img_div").html('');
                        $.ajax({
                            type: "get",
                            url: "cuttool/getPicName",
                            data: {cuttoolNo: cutToolNo},
                            contentType: "application/json",
                            dataType: "json",
                            async: true,
                            success: function (data) {
                                $(".fileinput-remove").click();
                                var imgname = data.res;
                                $("#cuttool_img_div").append('<input id="input_imgName" type="text" value="' + imgname + '" style="display: none"><img style="height:230px;max-width:320px;width:auto;" src="uploadImg/' + imgname + '">');
                            }
                        });

                        layer.msg('读取成功！');

                    } else {

                        layer.msg(data.result + '');
                    }

                });


            });

            /********************************RFID添加结束************************************/

            /***************************Created by SunJun 2016.6.28**************************/
            /*对刀仪反馈信息*/
            $('#returnMsg').click(function () {

                layer.msg($('#returnMsg').text());

            });

            /* 读取对刀仪后台调用返回数据 */
            function duidaoyiMsg(uploadVal) {

                /*读取对刀仪数据获取*/
                COMMON.WS.local('cuttool/getMicroset', 'post', uploadVal, true, function (data) {

                    if (data.result == 'true') {

                        var result = data.returnData[0];
                        var cuttoolNo = '';
                        var sisterNo = '';
                        var cuttool_sisterNo = '';
                        /*获取刀具信息*/
                        for (var i = 0; i < result.length; i++) {

                            /*参数名*/
                            var parName = result[i].name;
                            /*参数值*/
                            var parValue = result[i].value;

                            /*获取姐妹刀*/
                            if (parName == 'TC_TP1' && parValue != '0') {

                                sisterNo = parValue;
                                continue;
                            }
                            /*获取刀具编号*/
                            if (parName == 'TC_TP2') {

                                cuttoolNo = parValue;

                            }

                        }

                        /*获取组合后的刀具编号*/
                        if (sisterNo == '') {

                            cuttool_sisterNo = cuttoolNo;

                        } else {

                            cuttool_sisterNo = cuttoolNo + '-' + sisterNo;
                        }


                        /*****************************查询刀具信息***********************/
                        var cutNo = cuttool_sisterNo;

                        $.ajax({
                            type: "get",
                            url: "cuttool/searchbyno",
                            data: {cuttoolNo: cutNo},
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                if (data == null) {
                                    layer.msg("空");
                                    return
                                }
                                var json = eval(data);
                                $.each(json, function (index, item) {
                                    var cno = item.cNo;
                                    var strs = cno.split("-");
                                    var cuttoolno = [];
                                    for (var i = 0; i < strs.length; i++) {
                                        cuttoolno[i] = strs[i];
                                    }
                                    $("#cuttool_no").val(cuttoolno[0]);
                                    $("#sister_cuttool").val(cuttoolno[1]);
                                    //设置不可编辑
                                    $("#cuttool_no").attr('readonly', 'readonly');
                                    $("#sister_cuttool").attr('readonly', 'readonly');

                                    $("#bar_code").val(item.barCode);
                                    $("#cuttool_description").val(item.cdes);
                                    $("#tab2_cuttool_description").val(item.cdes);
                                    $("#characteristic_description").val(item.ccharacteristicDescription);
                                    $("#cdes").val(item.cdes);
                                    $("#cuttool_handle_type").val(item.handtype);
                                    $("#programming_diameter_small").val(item.cdiameterSmall);
                                    $("#programming_diameter_large").val(item.cdiameterLarge);
                                    $("#programming_diameter_length").val(item.cdiameterLength);
                                    $("#priority_level").val(item.level);
                                    $("#function").val(item.cfun);
                                    $("#type").val(item.ctype);
                                    $("#tab3_function").val(item.cfun);
                                    $("#tab2_materialtype").val(item.ctype);
                                    var isTrack = item.istrack;
                                    if (isTrack == 1) {
                                        $("#lifetime_tracking").val(1);
                                        $("#set_lifetime_tracking").attr("checked", "checked");
                                    }
                                    var usingstatus = item.usingStatus;
                                    if (usingstatus == 0) {
                                        $('#using_status').val(0);
                                        $("#inlineRadio1").attr("checked", "checked");
                                    }
                                    else {
                                        $('#using_status').val(1);
                                        $("#inlineRadio2").attr("checked", "checked");
                                    }

                                    var isScrap = item.cisScrap;
                                    if (isScrap == 1) {
                                        $("#isScrap").val(1);
                                        $("#set_isScrap").attr("checked", "checked");
                                    }
                                    else {
                                        $("#isScrap", parent.parent.document).val(0);
                                    }
                                    $("#status_description").val(item.statusDes);
                                    $("#initial_lifetime").val(item.cinitialLifetime);
                                    $("#surplus_lifetime").val(item.csurplusLifetime);
                                });

                            }
                        });
                        //功能和类型图片显示
                        var CFuntion = $("#function").val();
                        var CType = $("#type").val();
                        $.ajax({
                            type: "get",
                            url: "parametermodel/getPicname",
                            data: {category: CFuntion, type: 0},
                            dataType: "text",
                            async: false,
                            success: function (data) {
                                $("#funtion_pic").html('<img src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:290px;max-height: 160px">');
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                layer.msg("图片加载失败");
                            }
                        });

                        $.ajax({
                            type: "get",
                            url: "parametermodel/getPicname",
                            data: {category: CType, type: 2},
                            dataType: "text",
                            async: false,
                            success: function (data) {
                                $("#type_pic").html('<img  src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:290px;max-height: 160px">');
                                $("#tab2_type_pic").html('<img src="uploadImg/' + data + '"  alt="" class="img-thumbnail" style="width: 450px;height: 280px;">');
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                layer.msg("图片加载失败");
                            }
                        });

                        //类型和功能参数显示
                        $('#tab3_funPars').html('');
                        $.ajax({
                            type: "get",
                            url: "cuttool/searchCParBycno",
                            data: {
                                cuttoolNo: cutNo,
                                type: 0
                            },
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                var json = eval(data);
                                $.each(json, function (index, item) {
                                    $('#tab3_funPars').append('<tr>' +
                                        '<td style="text-align: center">' +
                                        '<span>' + json[index].id.parameterName + '</span>' +
                                        '</td>' +
                                        '<td style="text-align: center">' +
                                        '<input value="' + json[index].parameterValue + '" type="text" class="col-md-1 form-control" style="width:100%;text-align: center" />' +
                                        '</td>' +
                                        '</tr>');
                                });

                            }
                        });

                        /*刀具参数信息带出*/
                        $('#tab2_CTypeTable').html('');
                        $.ajax({
                            type: "get",
                            url: "cuttool/searchCParBycno",
                            data: {
                                cuttoolNo: cutNo,
                                type: 2
                            },
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                var json = eval(data);
                                $.each(json, function (index, item) {
                                    $('#tab2_CTypeTable').append('<tr>' +
                                        '<td style="text-align: center">' +
                                        '<span>' + json[index].id.parameterName + '</span>' +
                                        '</td>' +
                                        '<td style="text-align: center">' +
                                        '<input value="' + json[index].parameterValue + '" type="text" class="col-md-1 form-control" style="width:100%;text-align: center" />' +
                                        '</td>' +
                                        '</tr>');
                                });

                            }
                        });

                        //刀具装配信息带出
                        $("#tab2_cuttool_no").val(cutNo);
                        $.ajax({
                            type: "get",
                            url: "assembly/searchBycno",
                            data: {cuttoolNo: cutNo},
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                var json = eval(data);
                                $("#tab2_material_table").html('<tr>' +
                                    '<th style="width: 5%;text-align: center;">序号</th>' +
                                    '<th style="width: 15%;text-align: center">物料' +
                                    '<div class="cuttool_tab2_table_add" style="width: 10%;margin-right:5px;float: right;">' +
                                    '<a id="cuttool_tab2_table_add_a" style="cursor: pointer;">' +
                                    '<span class="glyphicon glyphicon-plus"></span>' +
                                    '</a>' +
                                    '</div>' +
                                    '</th>' +
                                    '<th style="width: 15%;text-align: center" colspan="8">描述</th>' +
                                    '<th style="width: 8%;text-align: center;">数量</th>' +
                                    '<th style="width: 5%;text-align: center">单位</th>' +
                                    '<th style="width: 8%;text-align: center">易消耗</th>' +
                                    '<th style="width: 8%;text-align: center">切削主体</th>' +
                                    '<th style="width: 8%;text-align: center;">编码主体</th>' +
                                    '<th style="width: 8%;text-align: center">品牌</th>' +
                                    '<th style="width: 15%;text-align: center">日期</th>' +
                                    '<th style="width: 5%;text-align: center">操作</th>' +
                                    '</tr>');
                                $.each(json, function (index, item) {
                                    var no = item.no;
                                    var mname = item.mname;
                                    var mdes = item.mdes;
                                    var num = item.mnum;
                                    var unit = item.unit;
                                    if (unit == null) {
                                        unit = "";
                                    }
                                    var easyConsume = item.easyConsume;
                                    var chipCutting = item.chipCutting;
                                    var encodingBody = item.encodingBody;
                                    var brand = item.brand;
                                    var date = item.date;
                                    var listnum = item.listnum;


                                    var addhtml = '<tr class="cuttool_tab2_table_tr Mtr">' +
                                        '<td style="width: 5%;text-align: center;">' +
                                        '<span class="trNum" >' + no + '</span>' +
                                        '</td>' +
                                        '<td class="tab2_table_materialno " style="width: 15%;text-align: center;vertical-align: inherit;">' +
                                        '<span class="Mno_span">' + mname + '</span>' +
                                        // '<span class="glyphicon glyphicon-search materialSearch" style="cursor: pointer;display: none;"/>' +
                                        '</td>' +
                                        '<td style="width: 17%;text-align: center" colspan="8">' +
                                        '<span>' + mdes + '</span>' +
                                        '</td>' +
                                        '<td style="width: 8%;text-align: center;">' +
                                        '<input  class="materialNumber" value="' + num + '"  type="number" min="1" class="sesol-input "style="border: 0px;text-align: inherit;width: 100%;">' +
                                        '</td>' +
                                        '<td style="width: 5%;text-align: center">' +
                                        '<span>' + unit + '</span>' +
                                        '</td>';
                                    if (easyConsume == 1) {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input checked type="checkbox"/>' +
                                            '</td>';
                                    } else {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input  type="checkbox"/>' +
                                            '</td>';
                                    }
                                    if (chipCutting == 1) {
                                        addhtml = addhtml + '<td  style="width: 8%;text-align: center">' +
                                            '<input class="CuttingBody" checked type="checkbox"/>' +
                                            '</td>';
                                    } else {
                                        addhtml = addhtml + '<td  style="width: 8%;text-align: center">' +
                                            '<input class="CuttingBody"  type="checkbox"/>' +
                                            '</td>';
                                    }
                                    if (encodingBody == 1) {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input checked type="checkbox"/>' +
                                            '</td>';
                                    } else {
                                        addhtml = addhtml + '<td style="width: 8%;text-align: center">' +
                                            '<input type="checkbox"/>' +
                                            '</td>';
                                    }
                                    addhtml = addhtml +
                                        '<td class="td_mBrand" style="width: 9%;text-align: center">' +
                                        '<span class="M_Brand">' + brand + '</span>' +
                                        '<span class="span_mBrand glyphicon glyphicon-search" style="display: none;"></span>' +
                                        '</td>' +
                                        '<td style="width: 16%;text-align: center">' +
                                        '<span >' + date + '</span>' +
                                        '</td>' +
                                        '<td class="td_materialDelete">' +
                                        '<span class="span_materialDelete glyphicon glyphicon-remove" style="cursor: pointer;"></span>' +
                                        '</td>' +
                                        '</tr>';
                                    $("#tab2_material_table tbody").append(addhtml);
                                });
                            }
                        });

                        //刀具图片显示
                        $("#cuttool_img_div").css("display", "");
                        $("#delete_img_div").css("display", "");
                        $("#cuttool_img_div").html('');
                        $.ajax({
                            type: "get",
                            url: "cuttool/getPicName",
                            data: {cuttoolNo: cutNo},
                            contentType: "application/json",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                $(".fileinput-remove").click();
                                var imgname = data.res;
                                $("#cuttool_img_div").append('<input id="input_imgName" type="text" value="' + imgname + '" style="display: none"><img style="height:230px;max-width:320px;width:auto;" src="uploadImg/' + imgname + '">');
                                //$("#cuttool_img_div").append('<input id="input_imgName" type="text" value="' + imgname + '" style="display: none"><img src="uploadImg/' + imgname + '">');
                            }
                        });

                        /*************************设置刀具参数信息****************************/
                        /*设置刀具参数*/
                        /*参数表格*/
                        var parTable = $('#tab2_CTypeTable tr');

                        for (var i = 0; i < result.length; i++) {

                            /*参数名*/
                            var parName = result[i].name + '';
                            /*参数值*/
                            var parValue = result[i].value;

                            /*设置编程长度*/
                            if (parName == 'TC_DP3') {

                                $('#programming_diameter_length').val(Number(parValue));
                                continue;
                            }
                            /*设置直径最大值最小值*/
                            if (parName == 'TC_DP6') {

                                $('#programming_diameter_small').val(Number(parValue));
                                $('#programming_diameter_large').val(Number(parValue));
                                continue;
                            }

                            /*获取参数信息*/
                            if (parName.indexOf('DP') != -1) {

                                for (var j = 0; j < parTable.length; j++) {

                                    var tr = parTable.eq(j);
                                    /*如果找到对应的参数名酒设置对应的参数名*/
                                    if (tr.find('span').text() == parName) {

                                        tr.find('input').val(parValue);
                                        break;
                                    }

                                }
                            }

                        }


                    } else {

                        $('#returnMsg').text(data.result);
                        $('#returnMsg').click();

                    }

                });

            }

            /*对刀仪定时任务*/
            function timedCount() {

                var v = $('#duquduidaoyi');
                /*判断共享文件夹有没有文件 设置按钮和事件状态*/
                COMMON.WS.local('cuttool/getMicrosetState', 'get', '', true, function (data) {

                    if (data.result == 'true') {

                        v.css('cursor', 'pointer');
                        v.css('background-color', '#449dd7');
                        v.css('color', '#ffffff');
                        if (v.hasClass('noselect')) {

                            v.removeClass('noselect');
                        }

                        /*获取有文件的文件夹路径信息*/
                        var path = data.paths[0];
                        /*解除事件*/
                        $('#duquduidaoyi').unbind();
                        /*绑定按钮click事件*/
                        $('#duquduidaoyi').bind('mousedown', function () {

                            var uploadVal = {};

                            if (path.length == 1) {

                                uploadVal.path = path[0]['path'] + '';
                                duidaoyiMsg(uploadVal);

                            } else {

                                layer.confirm('请选择需要读取的对刀仪', {
                                    btn: ['对刀仪1','对刀仪2']
                                }, function(index){
                                    uploadVal.path = path[0]['path'] + '';
                                    duidaoyiMsg(uploadVal);
                                    layer.close(index);
                                }, function(){
                                    uploadVal.path = path[1]['path'] + '';
                                    duidaoyiMsg(uploadVal);
                                });

                            }

                        });

                        setTimeout(timedCount, 1000);

                    } else if (data.result == 'false') {

                        v.css('cursor', 'none');
                        v.css('background-color', '#e5e5e5');
                        v.css('color', '#000000');
                        if (!v.hasClass('noselect')) {

                            v.addClass('noselect');
                        }
                        /*解除按钮click事件监听*/
                        $('#duquduidaoyi').unbind();
                        setTimeout(timedCount, 1000);

                    } else {

                        $('#returnMsg').text(data.result);
                        $('#returnMsg').click();
                        setTimeout(timedCount, 1000);
                    }


                });

            }

            /*启动对刀仪定时任务*/
            timedCount();
            /*************************************添加结束***********************************/

        }

        return {
            'init': init
        }

    }
);