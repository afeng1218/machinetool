/**
 * Created by GuoFeng on 2016/3/22.
 */
define(['jquery','common'],function ($,COMMON) {

    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    /*获取物料查询页面的父页面pageName，选择不同的js事件处理*/
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

        /*库存明细页面*/
        if ('inventoryDetail' == pageName){

            /*序列查询click事件*/
            $('#sequenceSearchBtn').click(function () {

                var searchValue = $('#sequenceSearchValue').val();
                var uploadVal = {
                    'searchValue': searchValue
                };
                if (searchValue != '') {

                    COMMON.WS.local('materialDefinition/sequenceSearch', 'get', uploadVal, true, function (data) {

                        $('#sequenceSearchTable tbody').remove();
                        for (var i = 0; i < data.length; i++) {

                            var supplierSequence = '';
                            var sequenceStatus = '';
                            if (data[i].supplierSequence != null) {

                                supplierSequence = data[i].supplierSequence;
                            }
                            if (data[i].sequenceStatus != null) {

                                sequenceStatus = data[i].sequenceStatus;
                            }
                            $('#sequenceSearchTable').append('<tr>' +
                                '<td class="sequenceCheck">' + data[i].cgeneralMaterial.materialNo + '</td>' +
                                '<td class="sequenceCheck">' + data[i].sequenceNo + '</td>' +
                                '<td class="sequenceCheck">' + supplierSequence + '</td>' +
                                '<td class="sequenceCheck">' + sequenceStatus + '</td>' +
                                '</tr>');
                        }

                        $('.sequenceCheck').bind('dblclick', function (e) {

                            var tr = $(e.target).parent();

                            if ($('.sequenceSearching',parent.document).hasClass('sequence2')) {

                                if ($('.sequence1').val() >= tr.children().eq(1).html()) {

                                    parent.layer.msg('请选在择正确的区间！');
                                    return;
                                }

                            }

                            /*设置序列值*/
                            $('.sequenceSearching',parent.document).val(tr.children().eq(1).html());

                            /*关闭对话框*/
                            parent.layer.close(index);
                        });
                    });
                }
            });
        }
        
    }
    return{
        'init':init
    }
});