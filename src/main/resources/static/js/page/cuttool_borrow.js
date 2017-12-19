/**
 * Created by GuoFeng on 2016/4/8.
 */
var printIfrname=null;  //打印frame
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, pageSearch) {
    var sourceCheke = false;    //是否处理来源表中的数据，保存时用到
    //打印二维码
    function pinErwm(){
        var borrow_no=$("#borrow_no").val();
        var rowValue = new Array();
        var allTr = $('#cBorrowTable tbody tr');
        for (var i = 0; i < allTr.length; i++) {
            var allTd = allTr.eq(i).find('td');
            var row = {
                'type':'1',
                'borrow_no':borrow_no,
                'material_no': allTd.eq(1).text(),
                'borrow_number': allTd.eq(5).text(),
                'cargo_space_no': allTd.eq(6).text()
            };allTd=null;
            rowValue.push(row);row=null;
        }allTr=null;
        COMMON.WS.restful('cuttool/pinErwm', 'post', JSON.stringify(rowValue), true, function (data) {
            $("#pintUrl").val(data.url);
            printIfrname=layer.open({
                type:2,
                shade: false,
                title: false,
                scrollbar:false,
                shadeClose: true,
                area: ['50%', '50%'],
                cancel:function(index_){
                    var lay=layer.confirm("任务号"+borrow_no+'，还未打印确认关闭？关闭后将无法补打！',{
                        title:'<span style="color:red;">安全提示</span>',
                        btn:['确定','取消']
                    },function(){
                        layer.close(lay);layer.close(index_);
                    });
                    return false;
                },
                end:function(){
                    //删除二维码图片
                    COMMON.WS.restful("cuttool/removeImages", "post", borrow_no, true, function (map) {});
                },
                content:["cuttool_borrow_print.html","no"]
            });
        });rowValue=null;
    };

    //发送立体库
    function addToLiTiKu(taskNo, cno, croomNo, isTotal) {

        var uploadValue = {
            croomNo: croomNo
        };
        var Json = JSON.stringify(uploadValue);
        COMMON.WS.restful('storageDefinition/isLitiku', 'post', Json, false, function (data) {

            if (data.res == 'yes') {

                $("#isStereoLibrary").val(1);

            } else {

                $("#isStereoLibrary").val(0);

            }
        });
        /**
         * 是整体刀具
         */
        if ($('#totalcuttoolborrow').prop('checked')) {

            var send = new Array();
            var sendLine = taskNo + ';' + cno + ';' + 1;
            send.push({
                sendLine: sendLine
            });
            /**
             * 出库
             * @type {{source: string, sendValue: Array, fileName: string}}
             */
            var uploadValue = {
                source: 'pickorder',
                sendValue: send,
                fileName: 'jydj' + new Date().getTime() + '.txt'
            };
            var Json = JSON.stringify(uploadValue);

            COMMON.WS.restful('sendStereoLibrary/send', 'post', Json, false, function (data) {

                if (data.result == 'true') {

                    $("#sendCheck").val(1);
                    layer.msg('借用信息保存成功，发送立体库成功！');

                } else {

                    $("#sendCheck").val(0);
                    layer.msg('刀具信息发送立体库失败！' + data.result);
                }
                pinErwm();
            });
        }
        /**
         * 不是整体刀具
         */
        else {

            var send = new Array();
            var allTr = $('#cBorrowTable tbody tr');
            for (var i = 0; i < allTr.length; i++) {

                var allTd = allTr.eq(i).find('td');
                var trMno = allTd.eq(1).text();
                var mNum = allTd.eq(5).text();
                var sendLine = taskNo + ';' + trMno + ';' + mNum;
                send.push({
                    sendLine: sendLine
                });
            }
            var uploadValue = {
                source: 'pickorder',
                sendValue: send,
                fileName: 'jywl' + new Date().getTime() + '.txt'
            };
            var Json = JSON.stringify(uploadValue);
            COMMON.WS.restful('sendStereoLibrary/send', 'post', Json, false, function (data) {

                if (data.result == 'true') {

                    $("#sendCheck").val(1);
                    layer.msg('刀具保存成功！发送立体库成功！');

                } else {

                    $("#sendCheck").val(0);
                    layer.msg('刀具保存成功！发送立体库失败！' + data.result);
                }
                pinErwm();
            });
        }
    }


    //设置默认库房
    function setDefaultRoom() {

        var uploadValue = {
            person: $("#hiddenName", parent.parent.document).val()
        };
        var Json = JSON.stringify(uploadValue);
        COMMON.WS.restful('storageDefinition/searchByid', 'post', Json, false, function (data) {

            $("#cBorrowCRoom").val(data.roomNo);
            $("#isStereoLibrary").val(data.isLitiku);

        });
    }

    /*物料查询*/
    function materialSearch() {

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
            $('.edit').removeClass('edit');
            /*当前编辑行添加标签*/
            tr.addClass('edit');

            var searchVal = {
                searchTable: 'CGeneralMaterial',
                searchCol: 'materialNo,materialDescribe'
            };
            /*查询双击事件回调函数*/
            pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                var materialNo = result.materialNo;
                /*判断物料编号是否重复*/
                var parentAllTr = $('.tr');
                for (var i = 0; i < parentAllTr.length; i++) {
                    if (!parentAllTr.eq(i).hasClass('edit') && parentAllTr.eq(i).find('td').eq(1).find('span:first-child').html() == materialNo) {
                        layer.msg('申请借用物料不能重复！', $('.edit td').eq(1), {time: 2000});
                        return;
                    }
                }
                $('.edit').find('td').eq(1).html('<span>' + result.materialNo + '</span>' +
                    '<span class="glyphicon glyphicon-search materialSearch" style="cursor: pointer;display: none;"/>'
                );
                $('.edit').find('td').eq(2).html(result.materialDescribe);
            });

            /*  layer.open({
             type: 2,
             title: false,//不显示表题
             shadeClose: true,
             shade: false,
             //maxmin: true, 开启最大化最小化按钮
             area: ['75%', '85%'],
             content: ['material_search.html']
             });*/
        });
    }
    //日期
    function current() {
        var d = new Date(), str = '';
        str += d.getFullYear() + '-'; //获取当前年份
        str += d.getMonth() + 1 + '-'; //获取当前月份（0——11）
        str += d.getDate();
        //str += d.getHours() + ':';
        //str += d.getMinutes() + ':';
        //str += d.getSeconds();
        return str;
    }
    /*初始化添加行*/
    function addTrFunction() {

        var uuid = Math.uuidFast();
        var uuid2 = Math.uuidFast();
        var table = document.getElementById("cBorrowTable");
        var tablerows = table.rows.length;
        var num = tablerows + 1;

        $('#cBorrowTable tbody').append('<tr class="tr" style="height:35px">' +
            '<td  style="width: 6%;padding: 0 0 0 4px;vertical-align: inherit">' + num + '</td>' +
            '<td   class="viewSearchBtn"  style="width: 12%;padding: 0 0;vertical-align: inherit">' +
            '<span class="glyphicon glyphicon-search materialSearch" style="cursor: pointer;display: none;"/>' +
            '</td>' +
            '<td class="important"  style="width: 16%;padding: 0 0;vertical-align: inherit"></td>' +
            '<td class="important"  style="width: 4%;padding: 0 0 0 4px;vertical-align: inherit">件</td>' +
            '<td class="important"  style="width: 12%;padding: 0 0;vertical-align: inherit">' +
            '<div class="form-group col-nomargin-nopadding">' +
            '<select class="goods_use_status" class="form-control" style="border: 0px">' +
            '<option>新</option>' +
            '<option>旧</option>' +
            '</select>' +
            '</div>' +
            '</td>' +
            '<td class="important"  style="width: 8%;padding: 0 0;vertical-align: inherit"></td>' +
            '<td class="important"  style="width: 6%;padding: 0 0;vertical-align: inherit"></td>' +
            '<td class="important"  style="width: 6%;padding: 0 0;vertical-align: inherit"></td>' +
            '<td class="important" style="padding: 0;width: 15%;">' +
            '<div class="col-md-9" style="padding: 0;">' +
            '<input class="form-control" style="padding: 0;" id="' + uuid + '" value="'+current()+'" readonly/>' +
            '</div>' +
            '<div class="col-lg-3" style="padding: 0;">' +
            '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="glyphicon glyphicon-calendar calendarBtn dataBtn1"' +
            ' data-link-field="' + uuid + '"></span>' +
            '</div>' +
            '</td>' +
            '<td class="important" style="padding: 0;width: 15%;">' +
            '<div class="col-md-9" style="padding: 0;">' +
            '<input class="form-control" style="padding: 0;" id="' + uuid2 + '" value="'+current()+'" readonly/>' +
            '</div>' +
            '<div class="col-lg-3" style="padding: 0;">' +
            '<span id="planReturnBtn' + num + '" style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="dataBtn2 glyphicon glyphicon-calendar calendarBtn "' +
            ' data-link-field="' + uuid2 + '"></span>' +
            '</div>' +
            '</td>' +
            '<td class="other" style="width: 22%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
            '<td class="other"  style="width: 20%;padding: 0 0;display: none;vertical-align: inherit">' +
            '</td>' +
            '<td class="other" style="width: 40%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
            '</tr>');

        /*绑定日历选择器*/
        $('.calendarBtn').datetimepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            pickerPosition: 'bottom-left',
            todayBtn: 1,
            linkFormat: 'yyyy-mm-dd',
            minView: 'month'
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

        /*父页面name*/
        var pageName = $('#pageName', parent.document).val();

        /*刀具面板*/
        if (pageName == 'cuttoolPanel') {

            var createPerson = $("#hiddenName", parent.parent.document).val();

        } else {

            var createPerson = $("#hiddenName", parent.document).val();

        }

        //var pIndex = parent.layer.getFrameIndex(window.name);
        //layer.close(pIndex);
        if (pageName == 'cuttoolPanel') {

            var borrowCNo = $('#borrowCNo', parent.document).val();

        } else {

            var borrowCNo = "";

        }

        /**
         * 父页面是借用汇总行
         * @type {any}
         */
        if (pageName == 'borrowSummaryRow') {

            /**
             * 是否是整体刀具不可选
             */
            $('#totalcuttoolborrow').attr('disabled', 'disabled');

            $("#cBorrowCNo").attr('readonly', 'readonly');

            var chooseTd = $('.choose td', parent.document);
            var borrowNo = chooseTd.eq(0).text();
            var borrower = chooseTd.eq(5).text();
            var equipmentName = chooseTd.eq(10).text();
            var cuttoolNo = chooseTd.eq(1).text();
            if (cuttoolNo == "") {
                $("#totalcuttoolborrow").removeAttr("checked");
            }
            $("#cBorrowCNo").val(cuttoolNo);
            $("#borrow_no").val(borrowNo);
            $("#borrower").val(borrower);
            $("#equipment_name").val(equipmentName);

            var uploadVal = {
                'cuttool_taskNo': borrowNo,
                'cuttoolNo': cuttoolNo
            };
            var uploadJson = JSON.stringify(uploadVal);

            COMMON.WS.restful('cuttoolBorrow/getRowByBorrowNoOrCuttoolNo', 'post', uploadJson, true, function (data) {

                $("#cBorrowCRoom").val(data[0].goodsNo);
                $('#cBorrowTable tbody').html('');

                for (var i = 0; i < data.length; i++) {

                    if (data[i].borrowDate == null) {
                        var borrowDate = "";
                    } else {
                        var borrowDate = COMMON.LOCAL_DATE.getLocalDate(data[i].borrowDate);
                    }
                    if (data[i].returnDate == null) {
                        var returnDate = "";
                    } else {
                        var returnDate = COMMON.LOCAL_DATE.getLocalDate(data[i].returnDate);
                    }
                    if (data[i].planReturnTime == null) {

                        var planReturnTime = "";
                    } else {

                        var planReturnTime = COMMON.LOCAL_DATE.getLocalDate(data[i].planReturnTime);
                    }
                    if (data[i].borrowCode == null) {
                        var workno = "";
                    } else {
                        var workno = data[i].borrowCode;
                    }
                    if (data[i].borrowNumber == null) {
                        var borrowNumber = 0;
                    } else {
                        var borrowNumber = data[i].borrowNumber;
                    }
                    if (data[i].returnNumber == null) {
                        var returnNumber = 0;
                    } else {
                        var returnNumber = data[i].returnNumber;
                    }
                    if (data[i].scrapNum == null) {
                        var scrapNum = 0;
                    } else {
                        var scrapNum = data[i].scrapNum;
                    }
                    if (data[i].goodsAllocationNo == null) {
                        var goodsAllocationNo = "";
                    } else {
                        var goodsAllocationNo = data[i].goodsAllocationNo;
                    }
                    if (data[i].materialBrand == null) {
                        var materialBrand = "";
                    } else {
                        var materialBrand = data[i].materialBrand;
                    }

                    var appendHtml = '<tr class="tr" style="height:35px">' +
                        '<td  style="width: 6%;padding: 0 0 0 4px;vertical-align: inherit">' + data[i].rownum + '</td>';
                    if (data[i].isEncodingBody == 1) {
                        appendHtml += '<td  class=" materialNo encodingBody"  style="width: 12%;padding: 0 0;vertical-align: inherit">' + data[i].materialNo + '</td>';
                    } else {
                        appendHtml += '<td  class=" materialNo"  style="width: 12%;padding: 0 0;vertical-align: inherit">' + data[i].materialNo + '</td>';
                    }

                    var uuid3 = Math.uuidFast();
                    var uuid4 = Math.uuidFast();
                    var uuid5 = Math.uuidFast();

                    appendHtml += '<td class="important materialDes "  style="width: 16%;padding: 0 0;vertical-align: inherit">' + data[i].materialDes + '</td>' +
                        '<td class="important unit "  style="width: 4%;padding: 0 0 0 4px;vertical-align: inherit">' + data[i].materialUnit + '</td>' +
                        '<td class="important isNew "  style="width: 12%;padding: 0 0;vertical-align: inherit">' +
                        '<div class="form-group col-nomargin-nopadding">' +
                        '<select  class="form-control" style="border:0px;">' +
                        '<option>新</option>' +
                        '<option>旧</option>' +
                        '</select>' +
                        '</div>' +
                        '</td>' +
                        '<td class="important borrowNum "  style="width: 8%;padding: 0 0;vertical-align: inherit">' + borrowNumber + '</td>' +
                        '<td class="important roomPlace "  style="width: 6%;padding: 0 0;vertical-align: inherit">' + goodsAllocationNo + '</td>' +
                        '<td class="important"  style="width: 6%;padding: 0 0;vertical-align: inherit">' + materialBrand + '</td>' +
                        '<td class="important" style="padding: 0;width: 15%;">' +
                        '<div class="col-md-9" style="padding: 0;">' +
                        '<input class="form-control" style="padding: 0;" id="' + uuid4 + '" readonly value="' + borrowDate + '"/>' +
                        '</div>' +
                        '<div class="col-lg-3" style="padding: 0;">' +
                        '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="dataBtn1 glyphicon glyphicon-calendar calendarBtn "' +
                        ' data-link-field="' + uuid4 + '"></span>' +
                        '</div>' +
                        '</td>' +
                        '<td class="important" style="padding: 0;width: 15%;">' +
                        '<div class="col-md-9" style="padding: 0;">' +
                        '<input class="form-control" style="padding: 0;" id="' + uuid5 + '" readonly value="'+planReturnTime+'"/>' +
                        '</div>' +
                        '<div class="col-lg-3" style="padding: 0;">' +
                        '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="glyphicon glyphicon-calendar calendarBtn dataBtn2"' +
                        ' data-link-field="' + uuid5 + '"></span>' +
                        '</div>' +
                        '</td>' +
                        '<td class="other" style="width: 22%;padding: 0 0;display: none;vertical-align: inherit">' + returnNumber + '</td>' +
                        '<td class="other"  style="width: 20%;padding: 0 0;display: none;vertical-align: inherit">' +
                        '<div class="col-md-9" style="padding: 0;">' +
                        '<input class="form-control" style="padding: 0;" id="' + uuid3 + '" readonly value="' + returnDate + '"/>' +
                        '</div>' +
                        '<div class="col-lg-3" style="padding: 0;">' +
                        '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="glyphicon glyphicon-calendar calendarBtn "' +
                        ' data-link-field="' + uuid3 + '"></span>' +
                        '</div>' +
                        '</td>' +
                        '<td class="other" style="width: 40%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
                        '</tr>';
                    $('#cBorrowTable tbody').append(appendHtml);
                }

                /*绑定日历选择器*/
                $('.calendarBtn').datetimepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    pickerPosition: 'bottom-left',
                    todayBtn: 1,
                    linkFormat: 'yyyy-mm-dd',
                    minView: 'month'
                });
                /**
                 * 设置借用日期
                 */
                $('.dataBtn1').on('click', function (e) {

                    var thisSpan = $(e.target);
                    var endDate = thisSpan.parent().parent().next().find('div:first input').val();
                    if (endDate != '') {
                        $(this).datetimepicker('setEndDate', endDate);
                    }
                });
                /**
                 * 设置归还日期
                 */
                $('.dataBtn2').on('click', function (e) {
                    var thisSpan = $(e.target);
                    var startDate = thisSpan.parent().parent().prev().find('div:first input').val();
                    if (startDate != '') {
                        $(this).datetimepicker('setStartDate', startDate);
                    }
                });

            });

            $(document).on('click', '.tr', function (e) {

                var v = $(e.target);
                var p = $(e.target).parent();
                var isChecked = $("#totalcuttoolborrow").is(':checked');
                /*如果点击的是td*/
                if (v.is('td')) {
                    $('.number').parent().html($('.number').val());
                    var returnNumber = p.find('td').eq(8);
                    /*如果选择的是数量或者库房*/
                    if (v.is(returnNumber) && !isChecked) {
                        v.html('<input type="number" style="vertical-align: inherit" class="form-control number" min="1" value="' + v.text() + '"/>');
                        $('.number').focus();
                    }
                    /*如果选择是其他td*/
                    else {
                        /*所有行颜色设置白色*/
                        $('.tr').css('background-color', '#FFFFFF');

                        /*设置当前行颜色*/
                        p.css('background-color', '#EEEEEE');
                        $('.tr').removeClass('edit');
                        p.addClass('edit');

                    }
                }
            });

        }

        var borrowRoomNo = $('.select', parent.document).find('td').eq(14).text();
        var surplus_lifetime = $('.select', parent.document).find('td').eq(13).text();

        if (borrowCNo != "") {

            $("#cBorrowCNo").val(borrowCNo);
            $("#cBorrowCRoom").val(borrowRoomNo);
            $("#surplus_lifetime").val(surplus_lifetime);
            $.ajax({
                type: "get",
                url: "assembly/searchBycno",
                data: {cuttoolNo: borrowCNo},
                contentType: "application/json",
                dataType: "json",
                success: function (data) {

                    var json = eval(data);
                    $.each(json, function (index, item) {

                        var mname = item.mname;
                        var mdes = item.mdes;
                        var mnum = item.mnum;
                        var unit = item.unit;
                        if (unit == null) {

                            unit = "";

                        }
                        var brand = item.brand;
                        if (brand == null) {

                            brand = "";
                        }
                        var uuid = Math.uuidFast();
                        var uuid2 = Math.uuidFast();
                        var uuid3 = Math.uuidFast();
                        var table = document.getElementById("cBorrowTable");
                        var tablerows = table.rows.length;
                        var num = tablerows + 1;

                        $('#cBorrowTable tbody').append('<tr class="tr" style="height:35px">' +
                            '<td  style="width: 6%;padding: 0 0 0 4px;vertical-align: inherit">' + num + '</td>' +
                            '<td   class="viewSearchBtn"  style="width: 12%;padding: 0 0;vertical-align: inherit">' +
                            mname +
                            '</td>' +
                            '<td class="important"  style="width: 16%;padding: 0 0;vertical-align: inherit">' + mdes + '</td>' +
                            '<td class="important"  style="width: 4%;padding: 0 0 0 4px;vertical-align: inherit">' + unit + '</td>' +
                            '<td class="important"  style="width: 12%;padding: 0 0;vertical-align: inherit">' +
                            '<div class="form-group col-nomargin-nopadding">' +
                            '<select class="goods_use_status" class="form-control" style="border: 0px">' +
                            '<option>新</option>' +
                            '<option>旧</option>' +
                            '</select>' +
                            '</div>' +
                            '</td>' +
                            '<td class="important"  style="width: 8%;padding: 0 0;vertical-align: inherit">' + mnum + '</td>' +
                            '<td class="important"  style="width: 6%;padding: 0 0;vertical-align: inherit"></td>' +
                            '<td class="important"  style="width: 6%;padding: 0 0;vertical-align: inherit">' + brand + '</td>' +
                            '<td class="important" style="padding: 0;width: 15%;">' +
                            '<div class="col-md-9" style="padding: 0;">' +
                            '<input class="form-control" style="padding: 0;" id="' + uuid + '" readonly/>' +
                            '</div>' +
                            '<div class="col-lg-3" style="padding: 0;">' +
                            '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="glyphicon glyphicon-calendar calendarBtn dataBtn1"' +
                            ' data-link-field="' + uuid + '"></span>' +
                            '</div>' +
                            '</td>' +
                            '<td class="important" style="padding: 0;width: 15%;">' +
                            '<div class="col-md-9" style="padding: 0;">' +
                            '<input class="form-control" style="padding: 0;" id="' + uuid2 + '" readonly/>' +
                            '</div>' +
                            '<div class="col-lg-3" style="padding: 0;">' +
                            '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="dataBtn2 glyphicon glyphicon-calendar calendarBtn "' +
                            ' data-link-field="' + uuid2 + '"></span>' +
                            '</div>' +
                            '</td>' +
                            '<td class="other" style="width: 22%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
                            '<td class="other"  style="width: 20%;padding: 0 0;display: none;vertical-align: inherit">' +
                            '<div class="col-md-9" style="padding: 0;">' +
                            '<input class="form-control" style="padding: 0;" id="' + uuid3 + '" readonly/>' +
                            '</div>' +
                            '<div class="col-lg-3" style="padding: 0;">' +
                            '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="glyphicon glyphicon-calendar calendarBtn "' +
                            ' data-link-field="' + uuid3 + '"></span>' +
                            '</div>' +
                            '</td>' +
                            '<td class="other" style="width: 40%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
                            '</tr>');

                        /*绑定日历选择器*/
                        $('.calendarBtn').datetimepicker({
                            format: 'yyyy-mm-dd',
                            autoclose: true,
                            pickerPosition: 'bottom-left',
                            todayBtn: 1,
                            linkFormat: 'yyyy-mm-dd',
                            minView: 'month'
                        });

                        /**
                         * 设置借用日期
                         */
                        $('.dataBtn1').on('click', function (e) {

                            var thisSpan = $(e.target);
                            var endDate = thisSpan.parent().parent().next().find('div:first input').val();
                            if (endDate != '') {
                                $(this).datetimepicker('setEndDate', endDate);
                            }
                        });
                        /**
                         * 设置归还日期
                         */
                        $('.dataBtn2').on('click', function (e) {
                            var thisSpan = $(e.target);
                            var startDate = thisSpan.parent().parent().prev().find('div:first input').val();
                            if (startDate != '') {
                                $(this).datetimepicker('setStartDate', startDate);
                            }
                        });

                    });
                }
            });
        }

        /**
         * 整体刀具借出
         * @type {any}
         */
        var istotal = $("#totalcuttoolborrow").is(':checked');

        /**
         * 设置借用日期
         */
        $(document).on('click', '.dataBtn1', function (e) {

            var thisSpan = $(e.target);
            var endDate = thisSpan.parent().parent().next().find('div:first input').val();
            if (endDate != '') {
                $(this).datetimepicker('setEndDate', endDate);
            }
        });
        /**
         * 设置归还日期
         */
        $(document).on('click', '.dataBtn2', function (e) {

            var thisSpan = $(e.target);
            var startDate = thisSpan.parent().parent().prev().find('div:first input').val();
            if (startDate != '') {
                $(this).datetimepicker('setStartDate', startDate);
            }
        });

        /**
         * 整体道具checkbox选择事件
         */
        $(document).on('click', '#totalcuttoolborrow', function () {

            istotal = $("#totalcuttoolborrow").is(':checked');
            if (istotal) {
                //清空行条目
                $('#cBorrowTable tbody').html('');
                $("#cBorrowCNo").removeAttr('readonly');
                $("#cBorrowCRoom").val("");
                $("#cBorrowCRoom").attr('readonly', 'readonly');
                $("#cBorrowCRoom").addClass("read");
            }
            else {
                $('#cBorrowTable tbody').html('');
                $("#cBorrowCNo").val("");
                $("#cBorrowCNo").attr('readonly', 'readonly');
                /**
                 * 获取用户默认库房
                 */
                setDefaultRoom();
                $("#cBorrowCRoom").removeAttr('readonly');
                $("#cBorrowCRoom").removeClass("read");
            }
            sourceCheke = false;    //是否操作来源表重置为默认，不可操作
        });

        //表格主要、其他按钮事件
        $("#importantbtn").click(function () {
            $(".important").css("display", "");
            $(".other").css("display", "none");
            $("#importantbtn").css("background-color", "#449dd7");
            $("#importantbtn").css("color", "#fff");
            $("#otherbtn").css("background-color", "#e5e5e5");
            $("#otherbtn").css("color", "#333");
        });

        $("#otherbtn").click(function () {
            $(".other").css("display", "");
            $(".important").css("display", "none");
            $("#otherbtn").css("background-color", "#449dd7");
            $("#otherbtn").css("color", "#fff");
            $("#importantbtn").css("background-color", "#e5e5e5");
            $("#importantbtn").css("color", "#333");

        });

        /*table 上一层div css设置*/
        $('#cBorrowTable').parent().css('height', screen.height / 3);
        $('#cBorrowTable').parent().css('overflow-y', 'scroll');

        //----------------------------按库房、货位、新旧选择检查各物料的库存现有量够不够借用数量
        function isenough(i, uploadValue) {

            var uploadJson = JSON.stringify(uploadValue);

            COMMON.WS.restful('stockDetailList/availableNum', 'post', uploadJson, false, function (obj) {

                // COMMON.WS.local("stockDetailList/availableNum", "get", uploadValue, false, function (obj) {
                if ('1' == obj) {
                    $("#enableBeSave").val("false");
                    layer.tips('库存不足', $('#cBorrowTable tbody tr').eq(i).find('td').eq(5), {
                        tipsMore: true
                    });
                    return;
                }
                if ('0' == obj) {
                    $("#enableBeSave").val("false");
                    layer.tips('此库位无该物料', $('#cBorrowTable tbody tr').eq(i).find('td').eq(1), {
                        tipsMore: true
                    });
                    return;
                }
                if ('2' == obj) {
                    $("#enableBeSave").val("true");
                    /*  layer.tips('可借用', $('#cBorrowTable tbody tr').eq(i).find('td').eq(6), {
                     tipsMore: true
                     });*/
                    return;
                }
                if ('3' == obj) {

                    $("#enableBeSave").val("false");
                    layer.tips('无此库位', $('#cBorrowTable tbody tr').eq(i).find('td').eq(6), {
                        tipsMore: true
                    });
                }
            });
        }

        /*添加行按钮监听*/
        $(document).on('click', '#cuttool_borrow_table_add', function () {

            if (istotal) {

                layer.msg("整体刀具不允许添加行");
                return;
            }
            if ($('.tr').length > 0) {
                /*判断最后一行是否编辑完成*/
                var lastTr = $('.tr:last');
                if (lastTr.find('td').eq(1).find('span:first').hasClass('materialSearch')) {

                    layer.tips('请选择物料！', lastTr.find('td').eq(1), {
                        time: 1000
                    });

                } else if (lastTr.find('td').eq(5).text() == '') {

                    layer.tips('请输入数量！', lastTr.find('td').eq(5), {
                        time: 1000
                    });

                } else if (lastTr.find('td').eq(6).text() == '' && lastTr.find('td').eq(6).hasClass('restricted')) {

                    layer.tips('请选择库位！', lastTr.find('td').eq(6), {
                        time: 1000
                    });

                } else if (lastTr.find('td').eq(8).find('div:first-child').find('input').eq(0).val() == '') {

                    layer.tips('请选择借用时间！', lastTr.find('td').eq(8), {
                        time: 1000
                    });

                } else if (lastTr.find('td').eq(9).find('div:first-child').find('input').eq(0).val() == '') {

                    layer.tips('请选择预归还时间！', lastTr.find('td').eq(9), {
                        time: 1000
                    });

                } else {

                    //检查物料库存数量
                    var borrowNum1 = lastTr.find('td').eq(5).text();
                    var storageRoom1 = $("#cBorrowCRoom").val();
                    var rplace1 = lastTr.find('td').eq(6).text();
                    var materialNO1 = lastTr.find('td').eq(1).text();
                    var use_status1 = lastTr.find('td').eq(4).find('option:selected').text();
                    var uploadValue1 = {
                        "RoomNo": storageRoom1,
                        "roomplace": rplace1,
                        "materialNO": materialNO1,
                        "use_status": use_status1,
                        "borrowNum": borrowNum1
                    };

                    isenough($('.tr').length - 1, uploadValue1);

                    var cansave_add = $("#enableBeSave").val();
                    if ('false' == cansave_add) {

                        return;

                    } else {

                        addTrFunction();
                    }
                }
            } else {

                addTrFunction();
            }
        });

        /*物料查询事件绑定*/
        materialSearch();

        /*库房input enter事件监听*/
        $('#cBorrowCRoom').keydown(function (e) {

            if (e.keyCode == '13' && !$('#cBorrowCRoom').hasClass("read")) {
                var searchVal = {
                    popMenu: true,
                    searchValue: $('#cBorrowCRoom').val(),
                    searchTable: 'CStorageRoomDefinition',
                    searchCol: 'storageRoomNo,storageRoomDescribe,principalCustodian,isStereoLibrary',
                    colName: '库房编号,库房描述'
                };
                /*库房查询双击事件回调函数*/
                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                    $('#cBorrowCRoom').val(result.storageRoomNo);
                    $('#isStereoLibrary').val(result.isStereoLibrary);
                });

            } else {

            }
        });
        /*设备input enter事件监听*/
        $('#equipment_name').keydown(function (e) {
            if (e.keyCode == '13') {
                var searchVal = {
                    /*是否弹出页面*/
                    popMenu: true,
                    searchValue: $('#equipment_name').val(),
                    searchTable: 'CMechanicalEquipment',
                    searchCol: 'equipmentAssetsNo,equipmentName,mechanicalId',
                    colName: '机床编号,机床名称'
                };
                /*库房查询双击事件回调函数*/
                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                    $('#equipment_name').val(result.equipmentName);
                    $('#equipment_id').val(result.mechanicalId);
                });

            } else {

            }
        });

        /**
         * 人员keydown事件
         */
        $('#borrower').keydown(function (e) {

            var borrower = $.trim($('#borrower').val());

            if (e.keyCode == '13') {

                if (borrower.indexOf('%') != -1) {

                    var searchVal = {
                        /*是否弹出页面*/
                        popMenu: true,
                        searchValue: borrower,
                        searchTable: 'CBorrower',
                        searchCol: 'employeeCardNo,borrowedName',
                        /*自定义显示前两列列名*/
                        colName: '员工编号,员工名称'
                    };

                    /*库房查询双击事件回调函数*/
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {
                        $('#borrower').val(result.borrowedName);
                        $('#employeeNo').val(result.employeeCardNo);
                    });

                } else if (borrower != '') {

                    var searchVal = {

                        /*是否弹出页面*/
                        popMenu: false,
                        searchValue: borrower,
                        searchTable: 'CBorrower',
                        searchCol: 'employeeCardNo,borrowedName',
                        searchColNum: '1,1'
                    };

                    /*库房查询双击事件回调函数*/
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                        if (result != null && result != '') {

                            $('#borrower').val(result[0].borrowedName);
                            $('#employeeNo').val(result[0].employeeCardNo);

                        } else {

                            $('#borrower').focus();
                            layer.tips('采购员不存在！', $('#borrower'));
                        }
                    });

                }

            }
        });

        /**
         * 人员失去焦点事件
         */
        $('#borrower').blur(function () {

            var borrower = $.trim($('#borrower').val());

            if (borrower == '' || borrower.indexOf('%') != -1) {

                $('#borrower').val('');

            } else {

                var searchVal = {

                    /*是否弹出页面*/
                    popMenu: false,
                    searchValue: borrower,
                    searchTable: 'CBorrower',
                    searchCol: 'employeeCardNo,borrowedName',
                    searchColNum: '1,1'
                };

                /*库房查询双击事件回调函数*/
                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                    if (result != null && result != '') {

                        $('#borrower').val(result[0].borrowedName);
                        $('#employeeNo').val(result[0].employeeCardNo);

                    } else {

                        $('#borrower').focus();
                        layer.tips('采购员不存在！', $('#borrower'));
                    }
                });
            }

        });

        /**
         * 刀具装配信息获取
         */
        function cutAssemblyMsg(data) {

            var json = eval(data);
            $('#cBorrowTable tbody').html('');

            $.each(json, function (index, item) {
                var no = item.no;
                var mname = item.mname;
                var mdes = item.mdes;
                var mnum = item.mnum;
                var restricted_cargo_space = item.restricted_cargo_space;
                var unit = item.unit;
                if (unit == null || unit == "") {
                    unit = "";
                }
                var brand = item.brand;
                var uuid4 = Math.uuidFast();
                var uuid5 = Math.uuidFast();

                var addHtml = '<tr class="tr" style="height:35px">' +
                    '<td  style="width: 6%;padding: 0 0 0 4px;vertical-align: inherit">' + no + '</td>' +
                    '<td   class="viewSearchBtn"  style="width: 12%;padding: 0 0;vertical-align: inherit">' + mname + '</td>' +
                    '<td class="important"  style="width: 16%;padding: 0 0;vertical-align: inherit">' + mdes + '</td>' +
                    '<td class="important"  style="width: 4%;padding: 0 0 0 4px;vertical-align: inherit">' + unit + '</td>' +
                    '<td class="important"  style="width: 12%;padding: 0 0;vertical-align: inherit">' +
                    '<div class="form-group col-nomargin-nopadding">' +
                    '<select id="goods_use_status" class="form-control" style="border:0px;">' +
                    '<option>新</option>' +
                    '<option>旧</option>' +
                    '</select>' +
                    '</div>' +
                    '</td>' +
                    '<td class="important"  style="width: 8%;padding: 0 0;vertical-align: inherit">' + mnum + '</td>';
                if (restricted_cargo_space == 1) {

                    addHtml += '<td class="important restricted"  style="width: 6%;padding: 0 0;vertical-align: inherit"></td>';

                } else {

                    addHtml += '<td class="important"  style="width: 6%;padding: 0 0;vertical-align: inherit"></td>';
                }
                addHtml += '<td class="important"  style="width: 6%;padding: 0 0;vertical-align: inherit">' + brand + '</td>' +
                    '<td class="important" style="padding: 0;width: 15%;">' +
                    '<div class="col-md-9" style="padding: 0;">' +
                    '<input class="form-control" style="padding: 0;" id="' + uuid4 + '" readonly/>' +
                    '</div>' +
                    '<div class="col-lg-3" style="padding: 0;">' +
                    '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="dataBtn1 glyphicon glyphicon-calendar calendarBtn "' +
                    ' data-link-field="' + uuid4 + '"></span>' +
                    '</div>' +
                    '</td>' +
                    '<td class="important" style="padding: 0;width: 15%;">' +
                    '<div class="col-md-9" style="padding: 0;">' +
                    '<input class="form-control" style="padding: 0;" id="' + uuid5 + '" readonly/>' +
                    '</div>' +
                    '<div class="col-lg-3" style="padding: 0;">' +
                    '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="glyphicon glyphicon-calendar calendarBtn dataBtn2"' +
                    ' data-link-field="' + uuid5 + '"></span>' +
                    '</div>' +
                    '</td>' +
                    '<td class="other" style="width: 22%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
                    '<td class="other"  style="width: 20%;padding: 0 0;display: none;vertical-align: inherit">' +
                    /*'<div class="col-md-9" style="padding: 0;">' +
                     '<input class="form-control" style="padding: 0;" id="' + uuid6 + '" readonly/>' +
                     '</div>' +
                     '<div class="col-lg-3" style="padding: 0;">' +
                     '<span style="margin-top: 8px;margin-left: 5px;cursor: pointer;" class="glyphicon glyphicon-calendar calendarBtn"' +
                     ' data-link-field="' + uuid6 + '"></span>' +
                     '</div>' +*/
                    '</td>' +
                    '<td class="other" style="width: 40%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
                    '</tr>';
                $('#cBorrowTable tbody').append(addHtml);


            });
            /*绑定日历选择器*/
            $('.calendarBtn').datetimepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                pickerPosition: 'bottom-left',
                todayBtn: 1,
                linkFormat: 'yyyy-mm-dd',
                minView: 'month'
            });
        }

        /*刀具编号keydown事件监听*/
        $('#cBorrowCNo').keydown(function (e) {

            var cuttoolNo = $.trim($('#cBorrowCNo').val());

            if (e.keyCode == '13' && cuttoolNo != '') {

                //弹出查找框
                var searchVal = {
                    /*是否弹出页面*/
                    popMenu: false,
                    /*查詢條件*/
                    searchValue: cuttoolNo,
                    /*查询条件是否可编辑*/
                    readonly: false,
                    /*查询表实体类*/
                    searchTable: 'CCuttoolBasedata',
                    /*查询哪几列数据*/
                    searchCol: 'cuttoolNo,cuttoolDescription,initialStock,surplusLifetime',
                    /*查询哪几列*/
                    searchColNum: '0,1',
                    /*自定义显示前两列列名*/
                    colName: '刀具编号,刀具描述'
                };
                var isEnable = new Array();
                isEnable.push({
                    colName: "initiateStatus",
                    colValue: "1"
                });
                searchVal.addLimit = isEnable;

                if (cuttoolNo.indexOf('%') == -1) {

                    searchVal.popMenu = false;
                    /*双击事件回调函数*/
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                        if (result == null || result == '') {

                            $('#cBorrowCNo').focus();
                            layer.tips('刀具编号不存在！', $('#cBorrowCNo'));

                        } else {

                            $('#cBorrowCNo').val(result[0].cuttoolNo);

                            if (result[0].initialStock != null) {

                                $('#cBorrowCRoom').val(result[0].initialStock);

                            } else {

                                $('#cBorrowCRoom').val("");
                            }
                            if (result[0].surplusLifetime != null) {

                                $("#surplus_lifetime").val(result[0].surplusLifetime);

                            } else {

                                $("#surplus_lifetime").val('');
                            }

                            COMMON.WS.local('assembly/searchBycno', 'get', {cuttoolNo: cuttoolNo}, true, function (data) {

                                cutAssemblyMsg(data);
                            });

                        }

                    });

                } else {

                    searchVal.popMenu = true;
                    /*双击事件回调函数*/
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                        $('#cBorrowCNo').val(result.cuttoolNo);

                        if (result.initialStock != 'null') {

                            $('#cBorrowCRoom').val(result.initialStock);

                        } else {

                            $('#cBorrowCRoom').val("");
                        }
                        if (result.surplusLifetime != 'null') {

                            $("#surplus_lifetime").val(result.surplusLifetime);

                        } else {

                            $("#surplus_lifetime").val('');
                        }

                        COMMON.WS.local('assembly/searchBycno', 'get', {cuttoolNo: result.cuttoolNo}, true, function (data) {

                            cutAssemblyMsg(data);
                        });


                    });

                }

            }
        });

        /**
         * 刀具编号失去焦点监听
         */
        $('#cBorrowCNo').blur(function () {

            var cuttoolNo = $.trim($('#cBorrowCNo').val());

            if (cuttoolNo == '' || cuttoolNo.indexOf('%') != -1) {

                $('#cBorrowCNo').val('');

            } else {

                //弹出查找框
                var searchVal = {
                    /*是否弹出页面*/
                    popMenu: false,
                    /*查詢條件*/
                    searchValue: cuttoolNo,
                    /*查询条件是否可编辑*/
                    readonly: false,
                    /*查询表实体类*/
                    searchTable: 'CCuttoolBasedata',
                    /*查询哪几列数据*/
                    searchCol: 'cuttoolNo,cuttoolDescription,initialStock,surplusLifetime',
                    searchColNum: '0,1'
                };
                var isEnable = new Array();
                isEnable.push({
                    colName: "initiateStatus",
                    colValue: "1"
                });
                searchVal.addLimit = isEnable;
                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                    if (result == '' || result == null) {

                        /*重新获取焦点*/
                        $('#cBorrowCNo').focus();
                        layer.tips('请输入有效的刀具编号！', $('#cBorrowCNo'));

                    } else {

                        $('#cBorrowCNo').val(result[0].cuttoolNo);

                        if (result[0].initialStock != null) {

                            $('#cBorrowCRoom').val(result[0].initialStock);

                        } else {

                            $('#cBorrowCRoom').val("");
                        }
                        if (result[0].surplusLifetime != null) {

                            $("#surplus_lifetime").val(result[0].surplusLifetime);

                        } else {

                            $("#surplus_lifetime").val('');
                        }

                        COMMON.WS.local('assembly/searchBycno', 'get', {cuttoolNo: cuttoolNo}, true, function (data) {

                            cutAssemblyMsg(data);
                        });

                    }
                });
            }
        });

        /*保存数据封装*/
        function save(istotal) {

            var borrowNo = $.trim($('#borrow_no').val());

            if (borrowNo == "") {

                //设置任务编号
                /* var str1 = new Date().Format("MMddhhmm");
                 $('#borrow_no').val(str1 + "");
                 $('#hiddenTaskNo').val(str1 + "");*/
                uploadValue = {

                    taskNo: borrowNo

                };
                var uploadJson = JSON.stringify(uploadValue);
                COMMON.WS.restful('cuttoolBorrow/setTaskNo', 'post', uploadJson, false, function (data) {

                    $('#borrow_no').val(data.taskNo);

                });
            } else if (borrowNo != "" && $("#saveClick").val() == "Y") {

                layer.confirm('该单号已经保存,是否重新借用？', {
                    btn: ['是', '否'] //按钮
                }, function () {

                    location.reload();

                });
                return;

            }
            var cBorrowType;
            if (istotal) {

                cBorrowType = "整体刀具模式";

                /**
                 * 判断刀具是否已经借用、或者刀具借用未归还
                 */
                var flag = 0;
                COMMON.WS.local('cuttoolBorrow/canBorrowOrNot', 'get', {cuttoolNo: $('#cBorrowCNo').val()}, false, function (data) {

                    if (data.result[0] == 'true') {

                        layer.msg('该刀具尚未归还，不可借用！');
                        flag = 1;
                    }

                });
                if (flag == 1) {

                    return;
                }

            } else {

                cBorrowType = "自由模式";

            }
            /*这里进行保存操作*/
            var uploadValue = new Array();
            var rowValue = new Array();
            /*获取所有行 进行行数据封装*/
            var allTr = $('#cBorrowTable tbody tr');

            /*行数据封装*/
            /*题头数据封装*/

            uploadValue.push({
                'borrow_no': $('#borrow_no').val(),
                'type': cBorrowType,
                'cuttool_no': $('#cBorrowCNo').val(),
                'storage_room_no': $('#cBorrowCRoom').val(),
                'work_order_no': $('#work_order_no').val(),
                'borrower': $('#borrower').val(),
                'employeeNo': $('#employeeNo').val(),
                // 'equipment_name': $('#equipment_name').val(),
                'equipment_id': $('#equipment_id').val(),
                'surplus_lifetime': $('#surplus_lifetime').val(),
                'isReturn': "否",
                'title_borrow_date': allTr.eq(0).find('td').eq(8).find('div:first-child input').val(),
                'title_plan_return_time': allTr.eq(0).find('td').eq(9).find('div:first-child input').val(),
                'createPerson': createPerson
            });
            for (var i = 0; i < allTr.length; i++) {
                var allTd = allTr.eq(i).find('td');
                /*行数据上传*/
                var row = {
                    'borrow_code': $('#borrow_no').val(),
                    'rownum': allTd.eq(0).text(),
                    'material_no': allTd.eq(1).text(),
                    'goods_use_status': allTd.eq(4).find('option:selected').text(),
                    'borrow_number': allTd.eq(5).text(),
                    'goods_allocation_no': allTd.eq(6).text(),
                    'brand': allTd.eq(7).text(),
                    'borrow_date': allTd.eq(8).find('div:first-child input').val(),
                    'plan_return_time': allTd.eq(9).find('div:first-child input').val(),
                    'returnNum': allTd.eq(10).text(),
                    'return_time': allTd.eq(11).text(),
                    'remarks': allTd.eq(12).text()
                };
                rowValue.push(row);
            }
            uploadValue.push({
                'sourceCheke': sourceCheke,
                'rowValue': rowValue
            });
            var uploadJson = JSON.stringify(uploadValue);
            var taskNo = $("#borrow_no").val();
            var cno = $("#cBorrowCNo").val();
            var croomNo = $('#cBorrowCRoom').val();
            var isTotal;
            if ($("#totalcuttoolborrow").is(':checked')) {
                isTotal = 1;
            } else {
                isTotal = 0;
            }
            COMMON.WS.restful('cuttoolBorrow/saveBorrowMsg', 'post', uploadJson, false, function (data) {

                if ('true' == data.result) {

                    $("#saveClick").val("Y");

                    /**
                     * 发送立体库
                     */
                    var uploadVal = {croomNo: $('#cBorrowCRoom').val()};
                    COMMON.WS.restful('storageDefinition/isLitiku', 'post', JSON.stringify(uploadVal), true, function (data) {

                        if (data.res == 'yes') {

                            addToLiTiKu(taskNo, cno, croomNo, isTotal);
                        }
                    });

                } else {

                    layer.msg('刀具保存失败！');
                    $("#saveClick").val("N");
                }
            });
        }

        /*保存检查*/
        function saveCheck(istotal) {

            var canBeSave = "N";

            /*这里判断有没有添加行*/
            var allTr = $('#cBorrowTable tbody tr');

            if (allTr.length == 0) {
                layer.msg("请添加行");
                return;
            }
            for (var i = 0; i < allTr.length; i++) {

                var material = allTr.eq(i).find('td').eq(1);
                var use_status = allTr.eq(i).find('td').eq(4).find('option:selected').text();
                var num = allTr.eq(i).find('td').eq(5);
                var roomplace = allTr.eq(i).find('td').eq(6);
                var date = allTr.eq(i).find('td').eq(8).find('div:first-child input');
                var date2 = allTr.eq(i).find('td').eq(9).find('div:first-child input');

                //完善数据输入
                /*提示选择物料*/
                if (material.find('span:first').hasClass('materialSearch')) {

                    layer.tips('请选择物料！', material, {
                        time: 1000
                    });
                    return;
                }
                /*提示输入数量*/
                if ('' == num.text()) {

                    layer.tips('请输入数量！', num, {
                        time: 1000
                    });
                    return;
                }
                /*提示请选择货位*/
                if ('' == roomplace.text() && roomplace.hasClass('restricted')) {

                    layer.tips('请选择货位！', roomplace, {
                        time: 1000
                    });
                    return;
                }
                /*提示借用时间*/
                if ('' == date.val()) {

                    /*关闭询问框*/
                    layer.tips('请选择借用时间！', date, {
                        time: 1000
                    });
                    return;
                }
                /*提示预归还时间时间*/
                if ('' == date2.val()) {

                    /*关闭询问框*/
                    layer.tips('请选择预归还时间！', date2, {
                        time: 1000
                    });
                    return;
                }
                var borrowNum = num.text();
                var storageRoom = $("#cBorrowCRoom").val();
                var rplace = roomplace.text();
                var materialNO = material.text();
                var uploadValue = {
                    "RoomNo": storageRoom,
                    "roomplace": rplace,
                    "materialNO": materialNO,
                    "use_status": use_status,
                    "borrowNum": borrowNum
                };
                /**
                 * 判断库房现有量够不够借
                 */
                isenough(i, uploadValue);
                var cansave_save = $("#enableBeSave").val();
                if ('false' == cansave_save) {

                    canBeSave = "N";
                    return;

                } else {

                    canBeSave = "Y";

                }
            }
            if ('N' == canBeSave) {

                return;

            } else {

                save(istotal);

            }
        }

        /**
         * 来源查询方法
         **/
        function search() {
            COMMON.WS.restful('source/getSourceData', 'get', '', true, function (data) {
                /*清空表格*/
                $('#searchTable tbody').remove();
                for (var i = 0; i < data.length; i++) {
                    $('#searchTable').append('<tr class="commonTr" style="cursor: pointer;"></tr>');
                    var lastTr = $('#searchTable tbody tr:last');
                    lastTr.append('<td class="' + data[i].cuttool_no + '" style="width: 20%;">' + data[i].cuttool_no + '</td>');
                    lastTr.append('<td class="' + data[i].cuttool_description + '" style="width: 20%;">' + data[i].cuttool_description + '</td>');
                    lastTr.append('<td class="' + data[i].tdi_machine + '" style="width: 20%">' + data[i].tdi_machine + '</td>');
                    lastTr.append('<td class="' + (data[i].tdi_tool_count == undefined ? 0 : data[i].tdi_tool_count) + '" style="width: 20%">' + (data[i].tdi_tool_count == undefined ? 0 : data[i].tdi_tool_count) + '</td>');
                    lastTr.append('<td class="' + data[i].tdi_setdate + '" style="width: 20%">' + data[i].tdi_setdate + '</td>');
                }
                /*绑定双击事件*/
                $('.commonTr').bind('dblclick', function (e) {
                    var tr = $(e.target).parent();
                    //编号
                    $('#cBorrowCNo').val(tr.children("td").eq(0).text());
                    $('#cBorrowCNo').blur();
                    //机床设备
                    $('#equipment_name').val(tr.children("td").eq(2).text());
                    sourceCheke = true;
                    /*关闭layer*/
                    layer.close(openPage);
                });
            });
        }

        /**
         * 来源按钮click事件绑定
         **/
        $("#cBorrowSearch").on("click", function () {
            var openWindow = '<div style="width: 100%;margin-right: 0;">' +
                '<div class="account-nav-title bg-449dd7">' +
                '<span></span>' +
                '</div>' +
                '<div style="margin-top: 10px;align: center center;">' +
                '<div class="col-md-2 text-right" style="padding-right: 0;padding-top: 5px;">' +
                '</div>' +
                '<div class="col-md-4">' +
                '</div>' +
                '<div class="col-md-2 col-md-offset-1">' +
                '</div>' +
                '</div>' +
                '<div class="margin-top-20">' +
                '<div class="col-md-11" style="margin-left: 40px;margin-top: 10px;">' +
                '<!-- 标题 -->' +
                '<div style="padding-right:17px;">' +
                '<table class="table table-bordered text-center" id="commonSearchTableHead">' +
                '<thead>' +
                '<tr>' +
                '<td style="width: 20%;">编号</td>' +
                '<td style="width: 20%;">描述</td>' +
                '<td style="width: 20%;">设备</td>' +
                '<td style="width: 20%;">刀具数量</td>' +
                '<td style="width: 20%;">平衡时间</td>' +
                '</tr>' +
                '</thead>' +
                '</table>' +
                '</div>' +
                '<!-- 标题 end-->' +
                '<!-- 内容 -->' +
                '<div class="table-body" id="commonSearchTableBody">' +
                '<table class="table table-bordered text-center table-hover" id="searchTable">' +
                '</table>' +
                '</div>' +
                '<!-- 内容 end-->' +
                '</div>' +
                '</div>' +
                '</div>';

            openPage = layer.open({
                type: 1,
                title: false,//不现实表题
                shadeClose: true,
                shade: false,
                //maxmin: true, 开启最大化最小化按钮
                area: ['85%', '75%'],
                content: openWindow
            });

            /*输入框获取焦点*/
            $('#commonSearchValue').focus();

            /*设置table高度*/
            $('#commonSearchTableBody').css('height', screen.height / 3);

            search();
        })

        /*来源定时任务*/
        function timedCount() {
            var v = $('#cBorrowSearch');
            /*判断共享文件夹有没有文件 设置按钮和事件状态*/
            COMMON.WS.local('source/getSourceState', 'get', '', true, function (data) {
                if (data.result == 'true') {
                    v.css('cursor', 'pointer');
                    v.css('background-color', '#449dd7');
                    v.css('color', '#ffffff');
                    if (v.hasClass('noselect')) {
                        v.removeClass('noselect');
                    }
                    setTimeout(timedCount, 1000);
                } else if (data.result == 'false') {
                    v.css('cursor', 'none');
                    v.css('background-color', '#e5e5e5');
                    v.css('color', '#000000');
                    if (!v.hasClass('noselect')) {
                        v.addClass('noselect');
                    }
                    setTimeout(timedCount, 1000);
                } else {
                    setTimeout(timedCount, 1000);
                }
            });
        };

        timedCount();

        /*保存事件监听*/
        $(document).on('click', '#saveBtn', function () {

            var cperson = $.trim($("#borrower").val());

            var croom = $.trim($("#cBorrowCRoom").val());

            if (cperson == "" || cperson == null) {

                layer.tips("请输入人员信息", $("#borrower"));
                return;
            }
            else if (croom == "" || croom == null) {

                layer.tips("请输入库房号", $("#cBorrowCRoom"));
                return;

            } else {

                /**
                 * 检查以及保存借用信息
                 */
                saveCheck(istotal);
            }
        });

        $(document).on('blur', '.tdStoragePlace', function () {

            var bTr = $('#cBorrowTable tbody tr');
            for (var i = 0; i < bTr.length; i++) {
                var bTd = bTr.eq(i).find('td');
                var kuwei = bTd.eq(6).find('input').eq(0).val();
                if (kuwei != null) {
                    bTd.eq(6).html(kuwei);
                }
            }
        });

        $(document).on('blur', '.number', function () {

            var bTr = $('#cBorrowTable tbody tr');
            for (var i = 0; i < bTr.length; i++) {
                var bTd = bTr.eq(i).find('td');
                var mNum = bTd.eq(5).find('input').eq(0).val();
                if (mNum != null) {
                    bTd.eq(5).html(mNum);
                }
            }
        });
        /*行选择事件*/
        $(document).on('click', '.tr', function (e) {

            var v = $(e.target);
            var p = $(e.target).parent();

            /*如果点击的是td*/
            if (v.is('td')) {

                $('.number').parent().html($('.number').val());
                $('.tdStoragePlace').parent().html($('.tdStoragePlace').val());
                $('.storageNo').parent().html($('.storageNo').val());
                $('.remarks').parent().html($('.remarks').val());
                var tdNumber = p.find('td').eq(5);
                var tdStoragePlace = p.find('td').eq(6);
                var tdRetNumber = p.find('td').eq(10);
                var borrowRemarks = p.find('td').eq(12);
                /*如果选择的是数量或者库房*/
                if (v.is(tdNumber) || v.is(tdStoragePlace) || v.is(tdRetNumber) || v.is(borrowRemarks)) {

                    if (v.is(tdNumber) && !istotal) {
                        v.html('<input type="number" class="form-control number" min="1" value="' + v.text() + '"/>');
                        $('.number').focus();
                    } else if (v.is(tdStoragePlace)) {

                        v.html('<input class="form-control tdStoragePlace " value="' + v.text() + '"/>');

                        /*获取焦点*/
                        $('.tdStoragePlace').focus();

                        /*库位input enter事件监听*/
                        $('.tdStoragePlace').keydown(function (e) {

                            var thisTrNum = $(e.target).parent().parent().find('td').eq(0).text();
                            var eqTrNum = parseInt(thisTrNum) - 1;

                            if (e.keyCode == '13') {

                                var searchVal = {
                                    searchValue: $('.tdStoragePlace').val(),
                                    /*查询表实体类*/
                                    searchTable: 'CCargoSpaceDefinition',
                                    /*查询哪几列数据*/
                                    searchCol: 'cargoSpaceNo,cargoSpaceExplain',
                                    /*自定义显示前两列列名*/
                                    colName: '库位编号,库位描述',
                                };
                                var isEnable = new Array();
                                isEnable.push({
                                    colName: "CStorageRoomDefinition.storageRoomNo",
                                    colValue: $('#cBorrowCRoom').val()
                                });
                                searchVal.addLimit = isEnable;
                                /*双击事件回调函数*/
                                pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                                    $("#cBorrowTable tbody tr").eq(eqTrNum).find('td').eq(6).html(result.cargoSpaceNo);
                                });

                                /* var storageRoom = $("#cBorrowCRoom").val();
                                 var uploadValue = {
                                 "RoomNo": storageRoom
                                 };
                                 COMMON.WS.local("cargoSpaceDefinition/searchByRoomNo", "get", uploadValue, false, function (data) {

                                 var json = eval(data);
                                 var selecthtml = '<div class="form-group col-nomargin-nopadding">' +
                                 '<select id="cplaceselect" class="form-control">';
                                 var addtr = '';
                                 $.each(json, function (index, item) {
                                 var cargoSpaceNo = item.cargoSpaceNo;
                                 addtr += '<option>' + cargoSpaceNo + '</option>';
                                 });
                                 selecthtml += addtr + '</select></div>';
                                 layer.open({
                                 type: 1,
                                 title: false,//不显示表题
                                 shadeClose: true,
                                 shade: false,
                                 //maxmin: true, 开启最大化最小化按钮
                                 area: ['20%', 'auto'],
                                 content: selecthtml
                                 });
                                 $('.tdStoragePlace').val($("#cplaceselect").find("option:selected").text());
                                 $("#cplaceselect").change(function () {
                                 $('.tdStoragePlace').val($("#cplaceselect").find("option:selected").text());
                                 });

                                 });*/
                            }
                            else {

                            }
                        });
                    }
                    /*else if (v.is(tdRetNumber)) {
                     v.html('<input type="number" class="form-control number" min="1" value="' + v.text() + '"/>');
                     $('.number').focus();
                     } else if (v.is(borrowRemarks)) {
                     v.html('<input class="form-control remarks" value="' + v.text() + '"/>');
                     $('.remarks').focus();
                     }*/
                }
                /*如果选择是其他td*/
                else {

                    if (p.css('background-color') == 'rgb(255, 255, 255)') {
                        /*所有行颜色设置白色*/
                        $('.tr').css('background-color', '#FFFFFF');

                        /*设置当前行颜色*/
                        p.css('background-color', '#EEEEEE');
                        $('.tr').removeClass('edit');
                        p.addClass('edit');
                    } else {
                        p.css('background-color', '#FFFFFF');
                    }
                }
            }
            else {
            }
        });
        /*删除事件监听*/
        $(document).on('click', '#deleteBtn', function () {

            if ($("#totalcuttoolborrow").is(':checked')) {
                layer.msg("整体刀具借用不允许删除行");
                return;
            }
            if ("N" == $("#saveClick").val()) {
                $('.edit').remove();
            } else if ("Y" == $("#saveClick").val()) {
                layer.msg("保存后不可删除");
            } else {
                $('.edit').remove();
            }
        });
        /**
         *  读取RFID 带出装配信息
         */
        $(document).on('click', '#readRFID', function () {

            /**
             * 清除数据
             * @type {{content: string}}
             */
            $('#borrow_no').val('');
            $('#totalcuttoolborrow').prop('ckecked', true);
            $('#work_order_no').val('');
            $('#borrower').val('');
            $('#equipment_name').val('');
            $('#surplus_lifetime').val('');

            var uploadVal = {
                content: '0&'
            };

            COMMON.WS.local('cuttool/sendRFID', 'get', uploadVal, true, function (data) {

                if (data.result == 'true') {

                    var cutToolNo = data.dataResult + '';

                    //弹出查找框
                    var searchVal = {
                        /*是否弹出页面*/
                        popMenu: false,
                        /*查詢條件*/
                        searchValue: cutToolNo,
                        /*查询表实体类*/
                        searchTable: 'CCuttoolBasedata',
                        /*查询哪几列数据*/
                        searchCol: 'cuttoolNo,cuttoolDescription,initialStock,surplusLifetime',
                        searchColNum: '0,1'
                    };
                    var isEnable = new Array();
                    isEnable.push({
                        colName: "initiateStatus",
                        colValue: "1"
                    });
                    searchVal.addLimit = isEnable;
                    /*双击事件回调函数*/
                    pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                        $('#cBorrowCNo').val(cutToolNo);
                        if (result[0].initialStock != null) {

                            $('#cBorrowCRoom').val(result[0].initialStock);

                        } else {

                            $('#cBorrowCRoom').val("");

                        }
                        if (result[0].surplusLifetime != null) {

                            $("#surplus_lifetime").val(result[0].surplusLifetime);

                        } else {

                            $("#surplus_lifetime").val('');

                        }
                        $.ajax({
                            type: "get",
                            url: "assembly/searchBycno",
                            data: {cuttoolNo: cutToolNo},
                            contentType: "application/json",
                            dataType: "json",
                            success: function (data) {

                                cutAssemblyMsg(data);
                            }
                        });
                    });

                } else {

                    layer.msg(data.result + '');
                }

            });
        });
    }
    return {
        'init': init
    }
});
