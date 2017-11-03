/**
 * Created by GuoFeng on 2016/6/21.
 */
define(['jquery', 'common','layer','tableExport'], function ($,COMMON,layer) {

    var pIndex = parent.layer.getFrameIndex(window.name); //获取窗口索引
    var index = layer.getFrameIndex(window.name);
    var pageName = $('#pageName', parent.document).val();
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

        /*设置table body高度*/
        $('.table-body').css('height', (screen.height*3) / 5);
        var searchVals = {};
        searchVals.consump_type = $('#consump_type',parent.document).val();
        searchVals.mType = $('#mType',parent.document).val();
        searchVals.productLine = $('#productLine',parent.document).val();
        searchVals.person = $('#person',parent.document).val();
        searchVals.storeroom = $('#storeroom',parent.document).val();
        searchVals.roomID=$('#roomID',parent.document).val();
        searchVals.consumptionResource = $('#consumptionResource',parent.document).val();
        searchVals.beginDate = $('#beginDate',parent.document).val();
        searchVals.endDate = $('#endDate',parent.document).val();
        searchVals.beginDate2 = $('#beginDate2',parent.document).val();
        searchVals.endDate2 = $('#endDate2',parent.document).val();

        var value = JSON.stringify(searchVals);
        COMMON.WS.restful('consumption/blurSearch', 'post', value, true, function (data) {

            if (data == null) {

                return;

            }
            $('#consumptionTable').find('tbody').html('');

            var json = eval(data);
            $.each(json, function (index, item) {

                $('#consumptionTable').find('tbody').append('<tr style="height: 34px">' +
                    '<td style="padding: 0;width: 100px;">'+item.source+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.sourceRow+'</td>' +
                    '<td style="padding: 0;width: 100px;">'+item.materialNo+'</td>' +
                    '<td style="padding: 0;width: 150px;">'+item.materialDescription+'</td>' +
                    '<td style="padding: 0;width: 100px;">'+item.materialType+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.number+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.unitPrice+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.sum+'</td>' +
                    '<td style="padding: 0;width: 100px;">'+item.storageRoom+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.person+'</td>' +
                    '<td style="padding: 0;width: 120px;">'+COMMON.LOCAL_DATE.getLocalDate(item.affairTime)+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.type+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.thatEquipement+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.thatWorkshop+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.thatWorkshopSection+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.thatTeam+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.defaultEquipement+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.defaultWorkshop+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.defaultWorkshopSection+'</td>' +
                    '<td style="padding: 0;width: 80px;">'+item.productionLine+'</td>' +
                    '</tr>');
            });
        });
        /*导出excel按钮click事件监听*/
        $('#output').click(function () {

            tableExport('consumptionTable', '消耗记录汇总', 'csv');
        });
    }

    return {
        'init': init
    }
});