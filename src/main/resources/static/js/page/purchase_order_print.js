/**
 * Created by GuoFeng on 2016/5/19.
 */
define(['jquery', 'common', 'layer', 'jQueryPrint'], function ($, COMMON, layer) {

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }
    function add(i,length_, map) {
        var j = Number($('#html_row').val());
        $("#PrintHTML" + j + "").append('<table id="print_head' + j + '" style="width: 1045px; border-collapse: collapse;">' +
            '<tbody><tr>' +
            '<td style="width:35%;height: 25px; font-size: 12px;">供应商：'+map.supplier+'</td>' +
            '<td style="width:35%;height: 25px; font-size: 12px;">采购员：'+map.buyer+'</td>' +
            '<td style="width:25%;height: 25px; font-size: 12px;">类型：非ERP采购订单</td>' +
            '</tr></tbody>' +
            '</table>' +
            '<table style="width: 1045px; border: solid 1px black; border-collapse: collapse; table-layout: fixed; margin-top:' +
            ' 5px;"id="print_tbody' + j + '">' +
            '<tbody>' +
            '<tr>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 80px;">订单号</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 50px;">行号</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 45px;">发运</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 90px;">物料编码</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 150px;">物料描述</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 80px">需求日期</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 50px;">接受库房</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 50px;">单位</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 50px;;">数量</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 90px;">单价(不含税)</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 90px;">金额(不含税)</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 70px;">税率</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 90px;">合计(含税)</th>' +
            '<th style="font-size: 12px; text-align: center; border: 1px solid black; width: 60px;">品牌</th>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '<table id="print_bottom' + j + '" style="width: 1045px; border-collapse: collapse; margin-top: 20px;">' +
            '<tbody><tr>' +
            '<td style="width:35%;font-size: 12px; text-align: left;">单位领导：</td>' +
            '<td style="width:35%;font-size: 12px; text-align: left;">采购订单管理员：</td>' +
            '<td style="width:25%;font-size: 12px; text-align: left;">订单打印日期：'+getNowFormatDate()+'</td>' +
            '</tr></tbody>' +
            '</table>');
        var for_ = false;
        var sum = 0;
        for (i; i < length_; i++) {
            sum+= Number(map.data[i].total.replace(/\,/g,""));
            if ($("#print_tbody" + j + " tbody").height() < 500) {
                $("#print_tbody" + j + " tbody").append('<tr><td class="print_">'+map.applyNO+'</td>' +
                    '<td class="print_">' + map.data[i].rowNo + '</td>' +
                    '<td class="print_"></td>' +
                    '<td class="print_">'+map.data[i].materialNo+'</td>' +
                    '<td class="print_">'+map.data[i].material_describe+'</td>' +
                    '<td class="print_">'+map.data[i].build_time+'</td>' +
                    '<td class="print_">'+map.data[i].storage_room_no+'</td>' +
                    '<td class="print_">'+map.data[i].unit+'</td>' +
                    '<td class="print_">'+map.data[i].delivery_number+'</td>' +
                    '<td class="print_">'+map.data[i].unit_price+'</td>' +
                    '<td class="print_">'+map.data[i].money+'</td>' +
                    '<td class="print_">'+map.data[i].tax_rate+'</td>' +
                    '<td class="print_">'+map.data[i].total+'</td>' +
                    '<td class="print_">'+map.data[i].brand+'</td>' +
                    '</tr>');
            } else {
                for_ = true;
                break;
            }
        }
        var k = j;
        $("#PrintHTML" + j + "").after("<div id='PrintHTML" + (++k) + "'  class='example example-1' style='margin-top: 10px;background-color: white; width: 595px;'></div>");
        $("#print_tbody" + j + " tbody").append('<tr>' +
            '<td colspan="11" style="font-size: 12px; height: 30px; ' +
            'text-align: left; border: 1px solid black; padding-left: 20px;"' +
            ' id="Print_AmountName">金额总合计：</td> ' +
            '<td colspan="2" class="print_" id="Print_osaled_earnest"> '+sum.toFixed(6)+' </td>' +
            '<td style="border: 1px solid black"></td>' +
            '</tr>');
        var _px = j==1?470:540;
        if(Number($("#print_tbody" + j + " tbody").height()) > 550){
            _px = 89;
        }
        //打印按钮
        $('#print_bottom' + j).after('<div class="operator">' +
            '<div class="row" style="align: center;">' +
            '<div class="col-md-1">' +
            '<p style="width: 80px;" class="sesol-btn txt-fff bg-449dd7 print-link no-print"' +
            'onclick="$(\'#PrintHTML' + j + '\').print()"' +
            'onselectstart="return false">打印</p></div>' +
            '</div>' +
            '</div><div id="_px' + j + '" style="height:' + _px + 'px;"></div>');

        $('#html_row').val(k);
        if (for_) {
            add(i, length_, map);
        }
    }

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /**
         * 设置打印高度
         * @type {number}
         */

        var height_ = window.screen.height / 1.8;
        var width_ = window.screen.width / 1.8;
        $('#table-body').height(height_);
        $('#table-body').width(width_);

        //订单号
        var applyNO = $('#applyNO', parent.document).val() == "" ? "%" : $('#applyNO', parent.document).val();
        //行号
        var rowNo = $('#rowNo', parent.document).val() == "" ? "%" : $('#rowNo', parent.document).val();
        //类别
        var class_ = $('#class_', parent.document).val() == "" ? "%" : $('#class_', parent.document).val();
        //发放号
        var provide_no = $('#provide_no', parent.document).val() == "" ? "%" : $('#provide_no', parent.document).val();
        //来源申请
        var apply_no = $('#apply_no', parent.document).val() == "" ? "%" : $('#apply_no', parent.document).val();
        //供应商
        var supplier_code = $('#supplier_code', parent.document).val() == "" ? "%" : $('#supplier_code', parent.document).val();
        //采购员
        var buyer = $('#buyer', parent.document).val() == "" ? "%" : $('#buyer', parent.document).val();
        //结果
        var stamp_ornot = $('#stamp_ornot ', parent.document).val() == "" ? "%" : $('#stamp_ornot ', parent.document).val();
        //物料
        var materialNo = $('#materialNo', parent.document).val() == "" ? "%" : $('#materialNo', parent.document).val();
        var createDateBegin = $('#createDateBegin', parent.document).val() == "" ? "%" : $('#createDateBegin', parent.document).val();
        var createDateEnd = $('#createDateEnd', parent.document).val() == "" ? "%" : $('#createDateEnd', parent.document).val();
        var needDateBegin = $('#needDateBegin', parent.document).val() == "" ? "%" : $('#needDateBegin', parent.document).val();
        var needDateEnd = $('#needDateEnd', parent.document).val() == "" ? "%" : $('#needDateEnd', parent.document).val();

        var uploadVal = {
            applyNO: applyNO,
            rowNo: rowNo,
            class_: class_,
            provide_no: provide_no,
            buyer: buyer,
            apply_no: apply_no,
            stamp_ornot: stamp_ornot,
            supplier_code: supplier_code,
            materialNo: materialNo,
            'createDateBegin': createDateBegin,
            'createDateEnd': createDateEnd,
            'needDateBegin': needDateBegin,
            'needDateEnd': needDateEnd
        };
        uploadVal = JSON.stringify(uploadVal);
        COMMON.WS.restful('purchaseOrderPrint/showPrint', 'post', uploadVal, true, function (data) {
            var aa = [];
            var map = "[";
            if(data.length==0){
                layer.msg('没有可打印的采购订单！');
                return null;
            }
            for (var i = 0; i < data.length; i++) {
                if (aa[data[i][0]] == data[i][0]) {
                    map = map.substring(0, map.length - 3);
                    map += ",{'materialNo':'" + data[i][2] + "'," +
                        "'material_describe':'"+ data[i][3] +"'," +
                        "'build_time':'"+ data[i][4] +"'," +
                        "'storage_room_no':'"+ data[i][5] +"'," +
                        "'unit':'"+ data[i][6] +"'," +
                        "'delivery_number':'"+ data[i][7] +"'," +
                        "'unit_price':'"+ data[i][8] +"'," +
                        "'money':'"+ data[i][9] +"'," +
                        "'tax_rate':'"+ data[i][10] +"'," +
                        "'total':'"+ data[i][11] +"'," +
                        "'brand':'"+ data[i][12] +"'," +
                        "'rowNo':'" + data[i][1] + "'}]},";
                } else {
                    aa[data[i][0]] = data[i][0];
                    map += "{'applyNO':'" + data[i][0] + "'," +
                        "'supplier':'"+data[i][13]+"'," +
                        "'buyer':'"+data[i][14]+"','data':[{" +
                        "'materialNo':'" + data[i][2] + "'," +
                        "'material_describe':'"+ data[i][3] +"'," +
                        "'build_time':'"+ data[i][4] +"'," +
                        "'storage_room_no':'"+ data[i][5] +"'," +
                        "'unit':'"+ data[i][6] +"'," +
                        "'delivery_number':'"+ data[i][7] +"'," +
                        "'unit_price':'"+ data[i][8] +"'," +
                        "'money':'"+ data[i][9] +"'," +
                        "'tax_rate':'"+ data[i][10] +"'," +
                        "'total':'"+ data[i][11] +"'," +
                        "'brand':'"+ data[i][12] +"'," +
                        "'rowNo':'" + data[i][1] + "'}]},";
                }
            }
            if(map!='['){
                map = map.substring(0, map.length - 1) + "]";
                var obj = eval('(' + map + ')');
                var i=0;
                for(i;i < obj.length;i++){
                    var row_length = obj[i].data.length;
                    add(0,row_length,obj[i]);
                }
                if(i == obj.length){
                    //数据加载完后
                    var j = $('#html_row').val();
                    $('#_px' + (j - 1)).height(0);
                    $("#PrintHTML" + j + "").height(0);
                }
            }
        });

        /**
         * 打印后的状态修改
         */
        var checkPrint = function (){
            var data = {};
            data.title = "采购订单";
            data.order_code = "";
            data.row = [{
                material_id:'1'
            },{
                material_id:'2'
            }];

            data = JSON.stringify(data);
            COMMON.WS.restful('purchaseOrderPrint/checkPrint', 'post', data, true, function (data) {
                alert("data="+data);
            });
        }
    }

    return {
        'init': init
    }
});