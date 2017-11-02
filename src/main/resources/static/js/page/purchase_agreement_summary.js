/**
 * Created by guofeng on 2016/5/12.
 */
define(['jquery', 'common', 'layer','page/common_search', 'datetimepicker'], function ($, COMMON, layer,COMMON_SEARCH) {

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*订单状态选择*/
        $('#purchaseState').click(function () {

            $('#purchaseState ul').toggle();
            $('#purchaseState ul li').click(function (e) {

                var v = $(e.target).html();
                $('#purchaseState input').val(v);
            });

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

        /*日期选择事件监听*/
        $('#createStartDate').on('click', function () {
            var endDate = $('#createDateEnd').val();
            if (endDate != '') {
                $(this).datetimepicker('setEndDate', endDate);
            }
        });
        $('#createEndDate').on('click', function () {
            var startDate = $('#createDateBegin').val();
            if (startDate != '') {
                $(this).datetimepicker('setStartDate', startDate);
            }
        });
        //供应商回车事件
        $('#supplier').keydown(function(){
            if (event.keyCode == 13) {
                var map = {
                    //查询条件
                    searchValue:this.value,
                    //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                    readonly: false,
                    //自定义显示前两列列名
                    colName: '供应商编码,供应商',
                    //searchTable:表实体类
                    searchTable : 'CSupplier',
                    //searchCol：id,供应商编码、供应商
                    searchCol   : 'supplierCode,supplier'
                };
                //查询组件
                COMMON_SEARCH.OPEN_PAGE.openPage(map,function(HashMap){
                    $('#supplier').val(HashMap.supplier);
                    $('#supplier_code').val(HashMap.supplierCode);
                });
            }
        });
        $('#supplier').blur(function () {
            if($(this).val()==''){
                $('#supplier_code').val("");
            }
        });
        //采购员回车事件
        $('#buyer').keydown(function(){
            if (event.keyCode == 13) {
                var map = {
                    //查询条件
                    searchValue:this.value,
                    //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                    readonly: false,
                    //自定义显示前两列列名
                    colName: '采购员,说明',
                    //searchTable:表实体类
                    searchTable : 'CBuyer',
                    //searchCol：id,采购员、说明
                    searchCol   : 'buyer,explainText'
                };
                //查询组件
                COMMON_SEARCH.OPEN_PAGE.openPage(map,function(HashMap){
                    $('#buyer').val(HashMap.buyer);
                });
            }
        });
    };
    /*物料查询页面*/
    $('#materialSearch').click(function () {
        layer.open({
            type: 2,
            title: false,
            closeBtn: 1,
            shadeClose: false,
            shade: false,
            area: ['85%', '90%'],
            content: ['material_search.html']
        });
    });
    $('#materialNo').blur(function () {
        if($(this).val()==''){
            $('#materialVersion').val("");
        }
    });

    //供应商点击绑定
    $('#supplierSearch').click(function () {
        var map = {
            //查询条件
            searchValue:this.value,
            //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
            readonly: false,
            //自定义显示前两列列名
            colName: '供应商编码,供应商',
            //searchTable:表实体类
            searchTable : 'CSupplier',
            //searchCol：id,供应商编码、供应商
            searchCol   : 'supplierCode,supplier'
        };
        //查询组件
        COMMON_SEARCH.OPEN_PAGE.openPage(map,function(HashMap){
            $('#supplier').val(HashMap.supplier);
            $('#supplier_code').val(HashMap.supplierCode);
        });
    });

    /*查询按钮事件监听*/
    $('#searchBtn').click(function(){
        var radio_name = $("input[name='radio_name']:checked").val();
        //题头
        if(radio_name==1){
            layer.open({
                type: 2,
                title: false,
                closeBtn: 2,
                shadeClose: false,
                shade: false,
                area: ['90%', '96%'],
                content: ['purchase_agreement_summary_head.html']
            });
        //协议行
        }else{
            layer.open({
                type: 2,
                title: false,
                closeBtn: 2,
                shadeClose: false,
                shade: false,
                area: ['90%', '96%'],
                content: ['purchase_agreement_summary_row.html']
            });
        }
    });

    return {
        'init': init
    }
});