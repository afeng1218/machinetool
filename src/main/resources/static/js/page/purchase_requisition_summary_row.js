/**
 * Created by SunJun on 2016/3/24.
 */
define(['jquery', 'common', 'layer', 'tableExport'], function ($, COMMON, layer) {

    /*父页面name*/
    var pageName = $('#pageName', parent.document).val();

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        $('#rowTable').parent().css('height', screen.height / 2);

        /*打开事件监听*/
        $(document).on('click', '#open', function () {

            var choose = $('.choose');
            var state = choose.find('td').eq(11).text();

            if (choose.length > 0) {

                if (state == '已审批') {

                    layer.msg('不能打开已审批申请行！');

                } else {

                    /*打开申请编辑页面*/
                    layer.open({
                        type: 2,
                        title: false,
                        closeBtn: 1,
                        shadeClose: false,
                        shade: false,
                        area: ['100%', '90%'],
                        content: ['purchase_requisition.html']
                    });

                }

            } else {

                layer.msg('请先选择申请行！');
            }

        });

        /*导出excel事件监听*/
        $(document).on('click', '#output', function () {

            if (pageName == 'purchaseRequisitionHead') {

                tableExport('rowTable', '编号' + applyNo + '采购申请行汇总', 'csv');

            } else {

                tableExport('rowTable', '采购申请行汇总', 'csv');
            }

        });
        /*表格行click事件监听*/
        $(document).on('click', '.td', function (e) {

            var tr = $(e.target).parent();
            $('.tr').removeClass('bg-449dd7');
            $('.tr').removeClass('choose');
            tr.addClass('bg-449dd7');
            tr.addClass('choose');
        });

    }

    /*申请行数据添加*/
    function paintTable(data) {

        for (var i = 0; i < data.length; i++) {

            var acceptNumber = data[i][0].acceptNumber;
            var cancleNumber = data[i][0].cancleNumber;
            var orderType = data[i][0].orderType;
            var unitPrice = data[i].unitPrice;
            var supplier=data[i][0].supplier;

            if (acceptNumber == null) {

                acceptNumber = '';
            }
            if (cancleNumber == null) {

                cancleNumber = '';
            }
            if (orderType == null) {

                orderType = '';
            }
            if (unitPrice == null) {

                unitPrice = '';
            }
            if(supplier==null){
                
                supplier='';
            }
            
            $('#rowTable').append(
                '<tr class="tr" style="cursor: pointer;">' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 120px;">' + data[i][0].id.applicationNo + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + data[i][0].id.lineNo + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;">' + data[i].materialNo + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 150px;">' + data[i].materialDescribe + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + data[i][0].number + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + data[i].unit + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + unitPrice + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 80px;">' + data[i][0].brand + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;">' + supplier + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + acceptNumber + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + cancleNumber + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 70px;">' + data[i][0].state + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 70px;">' + data[i].type + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 70px;"></td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;"></td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;"></td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;"></td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 70px;">' + data[i][0].applicant + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 150px;">' + data[i][0].buildTime + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 70px;">' + data[i].storageRoomNo + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 100px;"></td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + data[i][0].lastMonthConsumption + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + data[i][0].currentInventory + '</td>' +
                '<td class="td" style="padding-left: 0;padding-right: 0;width: 50px;">' + data[i][0].allInventory + '</td>' +
                '</tr>'
            );
        }

    }

    /*父页面是申请汇总页面*/
    if (pageName == 'purchaseRequisitionSummary') {

        var state='false';
        if($('#checkboxHead', parent.document).prop('checked')){
            
            state='true';
        }
        
        var searchState =state;
        var createDateBegin = '%';
        var createDateEnd = '%';
        var needDateBegin = '%';
        var needDateEnd = '%';
        var materialNo = '%';
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
        var uploadVal = {
            'searchState': searchState,
            'applyNo': $('#applyNO', parent.document).val(),
            'applyPerson': $('#applyPerson', parent.document).val(),
            'state': $('#state', parent.document).val(),
            'materialNo': materialNo,
            'materialVersion': $('#materialVersion', parent.document).val(),
            'createDateBegin': createDateBegin,
            'createDateEnd': createDateEnd,
            'needDateBegin': needDateBegin,
            'needDateEnd': needDateEnd
        };
        var uploadJson = JSON.stringify(uploadVal);
        COMMON.WS.restful('purchaseRequisition/getRequisitionHeadOrRow', 'post', uploadJson, true, function (data) {

            paintTable(data);

        });

    }
    /*父页面是申请题头汇总页面*/
    if (pageName == 'purchaseRequisitionHead') {

        var chooseTr = $('.choose', parent.document);
        var applyNo = chooseTr.find('td:first').html();
        var uploadVal = {
            'applyNo': applyNo
        };
        /*申请行数据获取*/
        COMMON.WS.local('purchaseRequisition/getRequisitionRowByApplyNo', 'get', uploadVal, true, function (data) {

            paintTable(data);
        });

    }

    return {
        'init': init
    }
});