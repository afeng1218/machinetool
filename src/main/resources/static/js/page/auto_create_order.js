/**
 * Created by GuoFeng on 2016/4/17.
 */
define(['jquery', 'common', 'layer', 'datetimepicker'], function ($, COMMON, layer) {

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

        /*设置表格高度*/
        $('#autoCreateTable').parent().css('height', screen.height / 2);

        /*首先进行查询条件封装*/
        var applyNo = '%';
        var createDateBegin = '%';
        var createDateEnd = '%';
        var needDateBegin = '%';
        var needDateEnd = '%';
        var materialNo = '%';
        var materialVersion = '%'
        if ($('#applyNO', parent.document).val() != '') {

            applyNo = $('#applyNO', parent.document).val();
        }
        if ($('#createDateBegin', parent.document).val() != '') {

            createDateBegin = $('#createDateBegin', parent.document).val();
        }
        if ($('#createDateEnd', parent.document).val() != '') {

            createDateEnd = $('#createDateEnd', parent.document).val();
        }
        if ($('#needDateBegin', parent.document).val() != '') {

            needDateBegin = $('#needDateBegin', parent.document).val();
        }
        if ($('#needDateEnd', parent.document).val() != '') {

            needDateEnd = $('#needDateEnd', parent.document).val();
        }
        if ($('#materialNo', parent.document).val() != '') {

            materialNo = $('#materialNo', parent.document).val();
        }
        if ($('#materialVersion', parent.document).val() != '') {

            materialVersion = $('#materialVersion', parent.document).val();
        }
        var uploadVal = {
            'searchState': '0',//查询所有已审批申请行
            'applyNo': applyNo,
            'applyPerson': $('#applyPerson', parent.document).val(),
            'state': '已审批',
            'materialNo': materialNo,
            'materialVersion': materialVersion,
            'createDateBegin': createDateBegin,
            'createDateEnd': createDateEnd,
            'needDateBegin': needDateBegin,
            'needDateEnd': needDateEnd
        };
        var uploadJson = JSON.stringify(uploadVal);
        COMMON.WS.restful('purchaseRequisition/getRequisitionHeadOrRow', 'post', uploadJson, true, function (data) {

            /*清除tbody*/
            $('#autoCreateTable tbody').remove();

            for (var i = 0; i < data.length; i++) {

                $('#autoCreateTable').append(
                    '<tr class="tr" style="cursor: pointer;">' +
                    '<td class="td" style="width: 7%;">' +
                    '<label>' +
                    '<input type="checkbox" class="checkBox">' +
                    '<span style="cursor: pointer;">' + (i + 1) + '</span>' +
                    '</label>' +
                    '</td>' +
                    '<td class="td" style="width: 13%;">' + data[i].materialNo + '</td>' +
                    '<td class="td" style="width: 5%;">' + data[i][0].number + '</td>' +
                    '<td class="td" style="width: 15%;">' + data[i].materialDescribe + '</td>' +
                    '<td class="td" style="width: 5%;">' + data[i].unit + '</td>' +
                    '<td class="td" style="width: 10%;">' + data[i].storageRoomNo + '</td>' +
                    '<td class="td" style="width: 5%;">' + data[i].unitPrice + '</td>' +
                    '<td class="td" style="width: 10%;">' + data[i][0].brand + '</td>' +
                    '<td class="td" style="width: 10%;">' + data[i].supplier + '</td>' +
                    '<td class="td" style="width: 20%;">' + data[i][0].demandTime + '</td>' +
                    '<td class="td" style="display: none;">' + data[i].supplierNo + '</td>' +
                    '<td class="td" style="display: none;">' + data[i][0].id.applicationNo + '</td>' +
                    '<td class="td" style="display: none;">' + data[i][0].id.lineNo + '</td>' +
                    '</tr>');
            }

            /*表格行选择事件改变样式*/
            $(document).on('click', '.td', function (e) {

                var tr = $(e.target).parent();
                if (tr.is('tr')) {

                    if (tr.hasClass('choose')) {

                        /*取消选中checkbox*/
                        tr.find('.checkBox').prop('checked', false);

                        tr.removeClass('bg-449dd7');
                        tr.removeClass('choose');

                    } else {

                        /*选中checkbox*/
                        tr.find('.checkBox').prop('checked', true);

                        $('.choose').removeClass('bg-449dd7');
                        $('.choose').removeClass('choose');

                        tr.addClass('bg-449dd7');
                        tr.addClass('choose');
                    }


                }

            });

            /*check box选择事件 全选反选*/
            $('#checkBox').click(function () {

                var state = $('#checkBox').prop('checked');
                $('.checkBox').prop('checked', state);

            });

        });

    }

    /*自动创建按钮事件监听*/
    $('#auto').click(function () {

        var flag = 0;
        var checkedBox = $("input:checked[class='checkBox']").size();
        for (var i = 0; i < checkedBox.length; i++) {

            var check = checkedBox.parent().parent().parent().find('td').eq(6);
            if (check == '') {

                flag = 1;
                break;
            }
        }
        /*如果存在没有协议的行*/
        if (flag == 1) {

            layer.msg('选中行存在没有协议的物料，请手动创建订单！');

        } else {


        }

    });
    /*手动创建按钮事件监听*/
    $('#manual').click(function () {

        var length = $("input:checked[class='checkBox']").size();
        if (length > 0) {

            layer.open({

                type: 2,
                title: false,//不现实表题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['100%', '90%'],
                content: ['purchase_order.html']
            });

        } else {

            layer.msg('请先选择申请物料！');

        }

    });

    return {
        'init': init
    }
});