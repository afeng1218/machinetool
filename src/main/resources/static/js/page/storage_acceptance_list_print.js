/**
 * Created by GuoFeng on 2016/7/8.
 */
define(['jquery', 'common', 'jQueryPrint'], function ($, COMMON) {

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
        /*查询条件封装*/
        var orderNo = '%';
        var buyer = '%';
        var PRNo = '%';
        var storageNo = '%';
        var supplier = '%';
        var isPrint = '%';
        var createDateBegin = '%';
        var createDateEnd = '%';
        if ($('#orderNo', parent.document).val() != '') {

            orderNo = $('#orderNo', parent.document).val()
        }
        if ($('#buyer', parent.document).val() != '') {

            buyer = $('#buyer', parent.document).val()
        }
        if ($('#PRNo', parent.document).val() != '') {

            PRNo = $('#PRNo', parent.document).val();
        }
        if ($('#storageNo', parent.document).val() != '') {

            storageNo = $('#storageNo', parent.document).val();
        }
        if ($('#supplier', parent.document).val() != '') {

            supplier = $('#supplier', parent.document).val();
        }
        if ($('#isPrint', parent.document).val() != '') {

            isPrint = $('#isPrint', parent.document).val();
        }
        if ($('#createDateBegin', parent.document).val() != '') {

            createDateBegin = $('#createDateBegin', parent.document).val();
        }
        if ($('#createDateEnd', parent.document).val() != '') {

            createDateEnd = $('#createDateEnd', parent.document).val();
        }

        var uploadVal = {
            orderNo: orderNo,
            buyer: buyer,
            PRNo: PRNo,
            storageNo: storageNo,
            supplier: supplier,
            isPrint: isPrint,
            createDateBegin: createDateBegin,
            createDateEnd: createDateEnd
        };

        var uploadJSON = JSON.stringify(uploadVal);
        /**
         * 获取入库验收单数据
         */
        COMMON.WS.restful('storageAcceptPrint/getAllStorageAcceptList', 'post', uploadJSON, true, function (data) {

            /*设置div宽度*/
            var divWidth = $('#print').width();
            $('#print').css('padding-left', (divWidth - 1045) / 2);

            for (var i = 0; i < data.length; i++) {

                var order = data[i];

                if (order.length == 0) {

                    continue;
                }

                var head = '<div class="oneOrder">' +
                    '<div class="A4">' +
                    '<table style="width: 1045px;margin-top: 20px;">' +
                    '<tr>' +
                    '<td colspan="12" style="text-align: center;font-size: 14px;">物资入库验收单</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td colspan="1"></td>' +
                    '<td colspan="11" style="text-align: center;font-size: 12px;" class="acceptOrderSide"></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td colspan="4" style="text-align: left;font-size: 12px;" class="supplier"></td>' +
                    '<td colspan="4" style="text-align: center;font-size: 12px;" class="materialClass"></td>' +
                    '<td colspan="4" style="text-align: center;font-size: 12px;" class="PRNo"></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td rowspan="2" class="tableCss">规格型号</td>' +
                    '<td rowspan="2" class="tableCss">物资名称</td>' +
                    '<td rowspan="2" class="tableCss">单位</td>' +
                    '<td rowspan="2" class="tableCss" style="width: 5%;">送货数量</td>' +
                    '<td rowspan="2" class="tableCss" style="width: 5%;">实收数量</td>' +
                    '<td colspan="4" class="tableCss">实际价格</td>' +
                    '<td colspan="2" class="tableCss">计划价格</td>' +
                    '<td rowspan="2" class="tableCss">入库时间</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tableCss">单价</td>' +
                    '<td class="tableCss">金额</td>' +
                    '<td class="tableCss">税价</td>' +
                    '<td class="tableCss">税价合计</td>' +
                    '<td class="tableCss">单价</td>' +
                    '<td class="tableCss">合计金额</td>' +
                    '</tr>' +
                    '</table>' +
                    '</div>' +
                    '</div>';
                $('#print').append(head);

                var lastTable = $('#print .oneOrder:last div:last table');

                var prNo = '';
                if (order[0].prNo != null) {

                    prNo = order[0].prNo;
                }

                /*组织*/
                lastTable.find('.acceptOrderSide').html('--' + order[0].acceptOrderSide + '&nbsp;&nbsp;配套管理中心');
                /*供应商*/
                lastTable.find('.supplier').html('供应商：' + order[0].supplier);
                /*物资类别*/
                lastTable.find('.materialClass').html('物资类别：' + order[0].materialClass);
                /*编号*/
                lastTable.find('.PRNo').html('编号：' + prNo);

                /*获取题头的html*/
                lastTable.find('tr').eq(2).html();

                /**
                 * 行数据
                 */
                for (var j = 0; j < order.length; j++) {

                    if (j == 23 || (j - 23) % 25 == 0) {

                        $('.A4:last').after('<div class="A4">' +
                            '<table style="width: 1045px;margin-top: 20px;">' +
                            '<tr>' + lastTable.find('tr').eq(2).html() + '</tr>' +
                            '<tr>' + lastTable.find('tr').eq(3).html() + '</tr>' +
                            '<tr>' + lastTable.find('tr').eq(4).html() + '</tr>' +
                            '</table>' +
                            '</div>');

                    }

                    $('.A4:last table:last').append('<tr>' +
                        '<td class="tableCss" style="width: 101px;">' + order[j].materialNo + '</td>' +
                        '<td class="tableCss" style="width: 101px;">' + order[j].materialDescribe + '</td>' +
                        '<td class="tableCss" style="width: 64px;">' + order[j].materialUnit + '</td>' +
                        '<td class="tableCss" style="width: 52px;">' + order[j].deliveryNumber + '</td>' +
                        '<td class="tableCss" style="width: 52px;">' + order[j].acceptedNumber + '</td>' +
                        '<td class="tableCss" style="width: 64px;">' + order[j].unitPrice + '</td>' +
                        '<td class="tableCss" style="width: 64px;">' + order[j].acceptPrice + '</td>' +
                        '<td class="tableCss" style="width: 64px;">' + order[j].taxRate + '</td>' +
                        '<td class="tableCss" style="width: 102px;">' + order[j].allPrice + '</td>' +
                        '<td class="tableCss" style="width: 64px;"></td>' +
                        '<td class="tableCss" style="width: 102px;"></td>' +
                        '<td class="tableCss" style="width: 215px;">' + COMMON.LOCAL_TIME.getLocalTime(order[j].createTime) + '</td>' +
                        '</tr>'
                    );

                }
                /**
                 * 表格结尾数据
                 */
                $('.A4:last table:last').append('<tr>' +
                    '<td colspan="1" style="text-align: center;font-size: 12px;height: 25px;">保管员：' + order[0].principalCustodian + '</td>' +
                    '<td colspan="2" style="text-align: center;font-size: 12px;height: 25px;"></td>' +
                    '<td colspan="2" style="text-align: center;font-size: 12px;height: 25px;"></td>' +
                    '<td colspan="2" style="text-align: center;font-size: 12px;height: 25px;"></td>' +
                    '<td colspan="2" style="text-align: center;font-size: 12px;height: 25px;"></td>' +
                    '<td colspan="2" style="text-align: center;font-size: 12px;height: 25px;"></td>' +
                    '<td colspan="1" style="text-align: center;font-size: 12px;height: 25px;">采购员：' + order[0].buyer + '</td>' +
                    '</tr>');
                /**
                 * 打印按钮
                 */
                $('.A4:last table:last').append('<tr class="operator">' +
                    '<td colspan="1" style="text-align: center;font-size: 12px;height: 25px;">' +
                    '<div class="row">' +
                    '<div class="col-md-10">' +
                    '<p class="sesol-btn txt-fff bg-449dd7 print-link no-print printOne">打印</p>' +
                    '</div>' +
                    '</td>' +
                    '</tr>');

            }

        });

        /*打印全部click事件*/
        $(document).on('click', '#printAll', function () {

            var paddingLeft = $('#print').css('padding-left');
            /*设置左内边距等于0*/
            $('#print').css('padding-left', 0);
            /*打印预览*/
            $('#print').print();
            /*重新设置左内边距*/
            $('#print').css('padding-left', paddingLeft);

        });
        /*打印某一个验收单*/
        $(document).on('click', '.printOne', function (e) {

            var event = $(e.target);
            event.parents().eq(7).print();
        });

    }

    return {
        'init': init
    }

});