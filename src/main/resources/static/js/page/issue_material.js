/**
 * Created by CJS on 2016/6/21.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, pageSearch) {


        function addTR() {
            var table = document.getElementById("issueTable");
            var tablerows = table.rows.length;
            var num = tablerows + 1;
            $("#issueTable tbody").append('<tr class="tr" style="height: 40px">' +
                '<td class="text-center" style="width: 6%;padding: 0 0;vertical-align: inherit;">' + num + '</td>' +
                '<td class="text-center" style="width: 14%;padding: 0 0;vertical-align: inherit">' +
                '<span class="glyphicon glyphicon-search materialSearch" style="cursor: pointer;display: none;"/>' +
                '</td>' +
                '<td class="text-center" style="width: 16%;padding: 0 0;vertical-align: inherit"></td>' +
                '<td class="text-center" style="width: 5%;padding: 0 0;vertical-align: inherit"></td>' +
                '<td class="text-center" style="width: 12%;padding: 0 0;vertical-align: inherit">' +
                '<div class="form-group col-nomargin-nopadding">' +
                '<select class="goods_use_status" class="form-control" style="border: 0px">' +
                '<option>新</option>' +
                '<option>旧</option>' +
                '</select>' +
                '</div>' +
                '</td>' +
                '<td class="text-center" style="width: 12%;padding: 0 0;vertical-align: inherit"></td>' +
                '<td class="text-center" style="width: 12%;padding: 0 0;vertical-align: inherit"></td>' +
                '<td class="text-center" style="width: 8%;padding: 0 0;vertical-align: inherit"></td>' +
                '<td class="text-center " style="width: 15%;padding: 0 0;vertical-align: inherit"></td>' +
                '</tr>');
        }

        function saveIssueMsg() {
            
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

            /*父页面name*/
            var pageName = $('#pageName', parent.document).val();

            $('.table-body').css('height', screen.height * 2 / 5);

            var istotal = true;//是否为刀具发放
            $(document).on('click', '#issueCuttool', function () {
                istotal = $("#issueCuttool").is(':checked');
                if (istotal) {
                    $("#cuttoolNo").val("");
                    $("#cuttoolNo").removeAttr('readonly');
                }
                else {
                    $("#cuttoolNo").val("");
                    $("#cuttoolNo").attr('readonly', 'readonly');
                }
            });
            //添加行按钮
            $(document).on('click', '#issue_addTr', function () {
                var picker = $("#picker").val();
                if (picker == '') {
                    layer.tips('请输入领料人！', $("#picker"), {
                        time: 1000
                    });
                    return;
                }
                var issueCuttool = $("#issueCuttool").is(':checked');
                if (issueCuttool) {
                    layer.msg("刀具发放不允许添加行");
                    return;
                }
                var allTr = $('#issueTable tbody tr');
                if (allTr.length == 0) {
                    addTR();
                    return;
                } else {
                    var lastTr = allTr.length - 1;
                    var material = allTr.eq(lastTr).find('td').eq(1);
                    var num = allTr.eq(lastTr).find('td').eq(8);
                    var aviNum =allTr.eq(lastTr).find('td').eq(5);
                    //完善数据输入
                    if (material.find('span:first').hasClass('materialSearch')) {
                        layer.tips('请选择物料！', material, {
                            time: 1000
                        });
                        return;
                    }
                    if ('' == num.text()) {
                        layer.tips('请输入数量！', num, {
                            time: 1000
                        });
                        return;
                    }
                    if (parseInt(num.text())>parseInt(aviNum.text())) {
                        layer.tips('不可大于可用数量！', num, {
                            time: 1000
                        });
                        return;
                    }
                    addTR();
                }
            });
            //行点击事件
            $(document).on('click', '.tr', function (e) {

                var v = $(e.target);
                var p = $(e.target).parent();
                var tdNumber = p.find('td').eq(8);
                if (v.is('td')) {
                    $('.number').parent().html($('.number').val());
                    if (v.is(tdNumber)) {
                        v.html('<input type="number" class="form-control number" min="1" value="' + v.text() + '"/>');
                        $('.number').focus();
                    } else {
                        $('.tr').css('background-color', '#FFFFFF');
                        /*设置当前行颜色*/
                        p.css('background-color', '#EEEEEE');
                        $('.tr').removeClass('edit');
                        p.addClass('edit');
                    }

                } else {
                }
            });
            //数量失去焦点事件
            /* $(document).on('blur', '.number', function (e) {
             var v = $(e.target);
             var p = $(e.target).parent();
             });*/


            /*物料查询按钮显示*/
            $(document).on('click', '.tr', function (e) {
                $('.viewSearchBtn .materialSearch').css('display', 'none');
                $(e.target).find('.materialSearch').css('display', '');
            });

            /*物料选择按钮click事件监听*/
            $(document).on('click', '.materialSearch', function (e) {

                /*弹出查询界面之前隐藏按钮*/
                $(e.target).css('display', 'none');
                /*添加标识 先去除所有标识*/
                var tr = $(e.target).parent().parent();
                /*去除edit标志*/
                $('.cx').removeClass('cx');
                /*当前编辑行添加标签*/
                tr.addClass('cx');

                var searchVal = {
                    searchTable: 'CGeneralMaterial',
                    searchCol: 'materialNo,materialDescribe,materialUnit'
                };
                /*库房查询双击事件回调函数*/
                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                    var materialNo = result.materialNo;
                    $('.cx').find('td').eq(1).text(materialNo);
                    $('.cx').find('td').eq(2).text(result.materialDescribe);
                    $('.cx').find('td').eq(3).text(result.materialUnit);

                    var use_status = $('.cx').find('td').eq(4).find('option:selected').text();
                    //物料库存
                    var uploadValue = {
                        "RoomNo": $("#storeRoom").val(),
                        "materialNO": materialNo,
                        "use_status": use_status
                    };
                    COMMON.WS.local("stockDetailList/materialNum", "get", uploadValue, true, function (num) {
                        $('.cx').find('td').eq(5).text(num);
                    });
                });
            });


            //删除按钮
            $(document).on('click', '#deleteBtn', function () {
                if ($("#issueCuttool").is(':checked')) {
                    layer.msg("刀具发放不允许删除行");
                    return;
                } else {
                    $('.edit').remove();
                    //重置行号
                    var allTr = $('#issueTable tbody tr');
                    var trNum = allTr.length;
                    for (var j = 0; j < trNum; j++) {
                        var trNo = allTr.eq(j).find('td').eq(0);
                        trNo.text(j + 1);
                    }
                }
            });

            //保存按钮
            $(document).on('click', '#saveBtn', function () {
            //检查信息完整
                var allTr = $('#issueTable tbody tr');
                if (allTr.length == 0) {
                    layer.msg("请添加发料行");
                    return;
                } else {
                    var lastTr = allTr.length - 1;
                    var material = allTr.eq(lastTr).find('td').eq(1);
                    var num = allTr.eq(lastTr).find('td').eq(8);
                    var aviNum = allTr.eq(lastTr).find('td').eq(5);
                    //完善数据输入
                    if (material.find('span:first').hasClass('materialSearch')) {
                        layer.tips('请选择物料！', material, {
                            time: 1000
                        });
                        return;
                    }
                    if ('' == num.text()) {
                        layer.tips('请输入数量！', num, {
                            time: 1000
                        });
                        return;
                    }
                    if (parseInt(num.text()) > parseInt(aviNum.text())) {
                        layer.tips('不可大于可用数量！', num, {
                            time: 1000
                        });
                        return;
                    }
                    saveIssueMsg();
                }
            });
        }

        return {
            'init': init
        }
    }
);
