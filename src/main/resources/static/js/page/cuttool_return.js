/**
 * Created by CJS on 2016/4/8.
 */
var printIfrname=null;  //打印frame
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, pageSearch) {
        //发送立体库
        function addToLiTiKu(taskNo, cno, croomNo, isTotal,function_,index) {

            var uploadValue = {
                croomNo: croomNo
            };
            var Json = JSON.stringify(uploadValue);
            /**
             * 是否是立体库
             */
            COMMON.WS.restful('storageDefinition/isLitiku', 'post', Json, true, function (data) {

                if (data.res == 'yes') {

                    $("#isStereoLibrary").val(1);

                    var send = new Array();
                    var uploadValue = {};
                    /**
                     * 入库
                     * @type {string}
                     */
                    uploadValue.source = 'putorder';
                    /**
                     * 物料归还
                     */
                    if (!$('#totalcuttoolborrow').prop('checked')) {

                        var allTr = $('#cReturnTable tbody tr');

                        for (var i = 0; i < allTr.length; i++) {

                            var allTd = allTr.eq(i).find('td');
                            var trMno = allTd.eq(1).text();
                            var mNum = allTd.eq(8).text();

                            if (mNum != '') {

                                var sendLine = taskNo + ';' + trMno + ';' + mNum;
                                send.push({
                                    sendLine: sendLine
                                });
                                /**
                                 * 清空归还数量
                                 */
                                allTd.eq(8).text('');
                            }
                        }
                        /**
                         * 入库
                         * @type {{source: string, sendValue: Array, fileName: string}}
                         */
                        uploadValue.sendValue = send;
                        uploadValue.fileName = 'ghwl' + new Date().getTime() + '.txt';

                        /**
                         * 整体道具归还
                         */
                    } else {

                        /**
                         * 发送行数据封装
                         */
                        /*任务号*/
                        var returnNo = $('#return_no').val();
                        /*刀具编号*/
                        var cReturnCNo = $('#cReturnCNo').val();

                        send.push({sendLine: returnNo + ';' + cno + ';1'});

                        uploadValue.sendValue = send;
                        uploadValue.fileName = 'ghdj' + new Date().getTime() + '.txt';
                    }

                    var Json = JSON.stringify(uploadValue);

                    COMMON.WS.restful('sendStereoLibrary/send', 'post', Json, true, function (data) {

                        if (data.result == 'true') {

                            layer.msg('归还是成功！发送立体库成功！');
                            $("#sendCheck").val(1);

                        } else {

                            $("#sendCheck").val(0);
                            layer.msg('归还成功！发送立体库失败！' + data.result);
                        }
                        if(function_){ function_(index);}
                    });

                } else {

                    $("#isStereoLibrary").val(0);
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
            $('#cReturnTable').parent().css('height', screen.height / 3);
            $('#cReturnTable').parent().css('overflow-y', 'scroll');

            /*父页面name*/
            var pageName = $('#pageName', parent.document).val();

            /**
             * 刀具归还汇总行页面
             */
            if (pageName == "borrowReturnSummaryRow") {

                $("#cBorrowCNo").attr('readonly', 'readonly');
                var chooseTd = $('.choose td', parent.document);
                var borrowNo = chooseTd.eq(0).text();
                var borrower = chooseTd.eq(4).text();
                var equipmentName = chooseTd.eq(9).text();
                var cuttoolNo = chooseTd.eq(1).text();
                if (cuttoolNo == "") {
                    $("#totalcuttoolborrow").removeAttr("checked");
                }
                $("#cReturnCNo").val(cuttoolNo);
                $("#return_no").val(borrowNo);
                $("#borrower").val(borrower);
                $("#equipment").val(equipmentName);

                var uploadVal = {
                    'cuttool_taskNo': borrowNo,
                    'cuttoolNo': cuttoolNo
                };
                var uploadJson = JSON.stringify(uploadVal);

                COMMON.WS.restful('cuttoolBorrow/getRowByBorrowNoOrCuttoolNo', 'post', uploadJson, true, function (data) {

                    $("#cRetrurnCRoom").val(data[0].goodsNo);
                    $('#cReturnTable tbody').html('');

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
                            '<td class="important haveReturn"  style="width: 6%;padding: 0 0;vertical-align: inherit">' + returnNumber + '</td>' +
                            '<td class="important returnNum" style="padding: 0;width: 15%;vertical-align: inherit"></td>' +
                            '<td class="important brand" style="padding: 0;width: 15%;vertical-align: inherit">' + materialBrand + '</td>' +
                            '<td class="other borrowTime" style="width: 22%;padding: 0 0;display: none;vertical-align: inherit">' + borrowDate + '</td>' +
                            '<td class="other returnTime" style="width: 20%;padding: 0 0;display: none;vertical-align: inherit">' + returnDate + '</td>' +
                            '<td class="other scrapNum" style="width: 10%;padding: 0 0;display: none;vertical-align: inherit">' + scrapNum + '</td>' +
                            '<td class="other remarks" style="width: 30%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
                            '</tr>';
                        $('#cReturnTable tbody').append(appendHtml);
                    }


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
            /**
             * 刀具归还汇总题头页面
             */
            if (pageName == "borrowReturnSummaryHead") {

                $('#totalcuttoolborrow').attr('disabled', 'disabled');
                $('#cReturnCNo').prop('readonly', true);

                if ($('.choose td', parent.document).eq(1).text() == '') {

                    $('#totalcuttoolborrow').prop('checked', false);
                }

                var chooseTd = $('.choose td', parent.document);
                var borrowNo = chooseTd.eq(0).text();
                var cuttoolNo = chooseTd.eq(1).text();
                var borrower = chooseTd.eq(3).text();
                var equipmentName = chooseTd.eq(5).text();
                var surplus_lifetime = chooseTd.eq(6).text();
                $("#return_no").val(borrowNo);
                $("#cReturnCNo").val(cuttoolNo);
                $("#borrower").val(borrower);
                $("#equipment").val(equipmentName);
                $("#surplus_lifetime").val(surplus_lifetime);
                var uploadVal = {
                    'cuttool_taskNo': borrowNo,
                    'cuttoolNo': cuttoolNo
                };

                var uploadJson = JSON.stringify(uploadVal);

                COMMON.WS.restful('cuttoolBorrow/getRowByBorrowNoOrCuttoolNo', 'post', uploadJson, true, function (data) {

                    // if(data.length){}
                    $("#cRetrurnCRoom").val(data[0].goodsNo);
                    $('#cReturnTable tbody').html('');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].createTime == null) {
                            var createTime = "";
                        } else {
                            var createTime = COMMON.LOCAL_DATE.getLocalDate(data[i].createTime);
                        }
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
                            '<td class="important haveReturn"  style="width: 6%;padding: 0 0;vertical-align: inherit">' + returnNumber + '</td>' +
                            '<td class="important returnNum" style="padding: 0;width: 15%;vertical-align: inherit"></td>' +
                            '<td class="important brand" style="padding: 0;width: 15%;vertical-align: inherit">' + materialBrand + '</td>' +
                            '<td class="other borrowTime" style="width: 22%;padding: 0 0;display: none;vertical-align: inherit">' + borrowDate + '</td>' +
                            '<td class="other returnTime" style="width: 20%;padding: 0 0;display: none;vertical-align: inherit">' + returnDate + '</td>' +
                            '<td class="other scrapNum" style="width: 10%;padding: 0 0;display: none;vertical-align: inherit">' + scrapNum + '</td>' +
                            '<td class="other remarks" style="width: 30%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
                            '</tr>';
                        $('#cReturnTable tbody').append(appendHtml);
                    }
                });

            } else {

                //列表直接进入归还界面
                // 设置输入框编辑状态
                $("#return_no").removeAttr('readonly');
                $("#totalcuttoolborrow").attr('disabled', 'disabled');
                $("#cReturnCNo").attr('readonly', 'readonly');
                $("#borrower").attr('readonly', 'readonly');
                $("#equipment").attr('readonly', 'readonly');

                /*刀具任务号查询页面*/
                $('#return_no').keydown(function (e) {

                    if (e.keyCode == '13') {

                        var searchVal = {
                            /*是否弹出页面*/
                            popMenu: true,
                            /*查詢條件*/
                            searchValue: $('#return_no').val(),
                            /*查询条件是否可编辑*/
                            readonly: false,
                            /*查询表实体类*/
                            searchTable: 'CCuttoolBorrowTitle',
                            /*查询哪几列数据*/
                            searchCol: 'borrowNo,CBorrower.borrowedName',
                            /*自定义显示前两列列名*/
                            colName: '任务号,借用者',
                            searchColNum: '0,1'
                        };
                        /**
                         * 没有归还的订单
                         */
                        searchVal.addLimit = [{colName: 'isReturn', colValue: '否'}];
                        /*库房查询双击事件回调函数*/
                        pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                            returnMsg(result, '');
                        });
                    }
                });
            }

            /**
             * 获取刀具装配信息
             * @param result 返回的刀具装配信息
             * @param cuttoolNo 刀具编号
             */
            function returnMsg(result, cuttoolNo) {

                var cuttool_taskNo = '';
                if (cuttoolNo == '') {

                    cuttool_taskNo = result.borrowNo;
                }
                $('#return_no').val(result.borrowNo);
                //带出归还信息
                var uploadVal = {
                    'cuttool_taskNo': cuttool_taskNo,
                    'cuttoolNo': cuttoolNo
                };
                var uploadJson = JSON.stringify(uploadVal);

                COMMON.WS.restful('cuttoolBorrow/getRowByBorrowNoOrCuttoolNo', 'post', uploadJson, true, function (data) {

                    // if(data.length){}
                    $("#cRetrurnCRoom").val(data[0].goodsNo);

                    if ('整体刀具模式' == data[0].type) {

                        $("#totalcuttoolborrow").prop('checked', true);

                    } else {

                        $("#totalcuttoolborrow").prop('checked', false);

                    }
                    $("#cReturnCNo").val(data[0].cuttoolNo);
                    $("#borrower").val(data[0].createPerson);
                    $("#equipment").val(data[0].equipmentName);
                    if (data[0].surplusLifetime == 0) {

                        $("#surplus_lifetime").val("");

                    } else {

                        $("#surplus_lifetime").val(data[0].surplusLifetime);

                    }

                    $('#cReturnTable tbody').html('');
                    for (var i = 0; i < data.length; i++) {

                        if (data[i].createTime == null) {

                            var createTime = "";

                        } else {

                            var createTime = COMMON.LOCAL_DATE.getLocalDate(data[i].createTime);

                        }
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
                            '<td class="important haveReturn"  style="width: 6%;padding: 0 0;vertical-align: inherit">' + returnNumber + '</td>' +
                            '<td class="important returnNum" style="padding: 0;width: 15%;vertical-align: inherit"></td>' +
                            '<td class="important brand" style="padding: 0;width: 15%;vertical-align: inherit">' + materialBrand + '</td>' +
                            '<td class="other borrowTime" style="width: 22%;padding: 0 0;display: none;vertical-align: inherit">' + borrowDate + '</td>' +
                            '<td class="other returnTime" style="width: 20%;padding: 0 0;display: none;vertical-align: inherit">' + returnDate + '</td>' +
                            '<td class="other scrapNum" style="width: 10%;padding: 0 0;display: none;vertical-align: inherit">' + scrapNum + '</td>' +
                            '<td class="other remarks" style="width: 30%;padding: 0 0;display: none;vertical-align: inherit"></td>' +
                            '</tr>';
                        $('#cReturnTable tbody').append(appendHtml);

                        if ($("#otherbtn").css('background-color') == 'rgb(68, 157, 215)') {

                            $('#otherbtn').click();
                        }
                    }
                });
            }

            /**
             * 行单击事件
             */
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
            var ghArray=new Array();
            function saveBtn(function_) {
                var index=layer.load(3,{shade: [0.2, '#393D49']});
                var borrowNo = $("#return_no").val();
                var roomNo = $("#cRetrurnCRoom").val();

                var uploadValue = {};
                var rowArray = new Array();
                var returnPerson = $("#borrower").val();
                /*获取所有行 进行行数据封装*/
                var allTr = $('#cReturnTable tbody tr');

                /**
                 * 判断归还数量是否全为空
                 * @type {number}
                 */
                var flag = 0;
                for (var i = 0; i < allTr.length; i++) {

                    var allTd = allTr.eq(i).find('td');
                    var retNum = allTd.eq(8).text();
                    if (retNum != ""&&retNum!='0') {

                        flag = 1;
                        break;
                    }
                }

                if (flag == 0) {
                    layer.close(index);
                    layer.msg('请输入归还数量！', {icon: 5});
                    return null;
                }

                /**
                 * 题头信息
                 * @type {{}}
                 */
                var title = {
                    'username': COMMON.ECODE.Base64.decode($.cookie('username') + ''),
                    'borrowNo': borrowNo,
                    'roomNo': roomNo,
                    'returnPerson': returnPerson,
                    'cuttool_no':$('#cReturnCNo').val()
                };
                /**
                 * 添加题头信息
                 */
                uploadValue.title = title;

                /**
                 * 封装行信息
                 */
                for (var i = 0; i < allTr.length; i++) {

                    var allTd = allTr.eq(i).find('td');
                    var rownum = allTd.eq(0).text();
                    var isNew = allTd.eq(4).find('option:selected').text();
                    var borNum = allTd.eq(5).text();
                    var retNum = allTd.eq(8).text();
                    var haveRetNum = allTd.eq(7).text();
                    var goodPlace = allTd.eq(6).text();

                    var borrowNum = Number(borNum);
                    var returnNum = Number(retNum);
                    var haveReturnNum = Number(haveRetNum);


                    if (returnNum + haveReturnNum > borrowNum) {
                        layer.close(index);
                        layer.msg("总归还数量超过借用数量");
                        return;

                    } else {

                        var row = {
                            'type':'2',
                            'return_no':title.borrowNo,
                            'rowNo': rownum,
                            'materialNo': allTd.eq(1).text(),
                            'returnNum': Number(allTd.eq(8).text()),
                            'goodPlace': goodPlace,
                            'isNew': isNew
                        };

                        /**
                         * 添加行数据
                         */
                        rowArray.push(row);
                        ghArray.push(row);
                    }
                }
                /**
                 * 添加行数据
                 */
                uploadValue.rowVal = rowArray;

                COMMON.WS.restful('cuttoolBorrow/saveReturnMsg', 'post', JSON.stringify(uploadValue), true, function (data) {

                        if (data.result == 'true') {

                            //清空归还数量 设置已归还数量
                            for (var i = 0; i < allTr.length; i++) {

                                var allTd = allTr.eq(i).find('td');
                                var retNum2 = 0;

                                if (allTd.eq(8).text() == '') {

                                    continue;

                                } else {

                                    retNum2 = Number(allTd.eq(8).text());
                                }
                                var returnNum2 = Number(retNum2);
                                var haveRetNum2 = Number(allTd.eq(7).text());


                                if (haveRetNum2 == "") {

                                    var haveReturnNum2 = 0;

                                } else {

                                    var haveReturnNum2 = haveRetNum2;
                                }
                                /**
                                 * 重新设已归还数量
                                 */
                                allTd.eq(7).text(returnNum2 + haveReturnNum2);
                                /**
                                 * 清空归还数量
                                 */
                                //allTd.eq(8).html('');
                            }

                            //发送立体库
                            var taskNo = $("#return_no").val();
                            var cno = $("#cReturnCNo").val();
                            var croomNo = $('#cRetrurnCRoom').val();
                            var isTotal;
                            if ($("#totalcuttoolborrow").is(':checked')) {

                                isTotal = 1;

                            } else {

                                isTotal = 0;
                            }
                            addToLiTiKu(taskNo, cno, croomNo, isTotal,function_,index);
                            var isLitiku = $("#isStereoLibrary").val();
                            if (isLitiku == 1) {

                                if ($("#sendCheck").val() != 1) {
                                    return;
                                }
                            }

                        } else {

                            layer.close(index);
                            layer.msg("归还失败！" + data.result);

                        }
                    }
                );
            }

            /*保存事件监听*/
            $(document).on('click', '#saveBtn', function () {
                saveBtn(function(index){
                    pinErwm(index);
                });
            });

            /*报废按钮监听*/
            $(document).on('click', '#scrapBtn', function (e) {

                var choose = $('.edit');

                if (choose.length > 0) {

                    //检查编码体其他行是否报废
                    var thisTrisEncoding = $('.edit').find('td').eq(1).hasClass('encodingBody');

                    if (thisTrisEncoding) {

                        var AllTr = $('#cReturnTable tbody tr');

                        for (var i = 0; i < AllTr.length; i++) {

                            var otherTrisEncoding = AllTr.eq(i).find('td').eq(1).hasClass('encodingBody');

                            if (!otherTrisEncoding) {

                                // 借用数量-已归还数量-报废数量=0;
                                var tr = AllTr.eq(i);
                                var trBorrowNum = tr.find('td').eq(5).text();
                                var trHaveReturnNum = tr.find('td').eq(7).text();
                                var trScrapNum = tr.find('td').eq(12).text();
                                if (trBorrowNum == "" || trBorrowNum == "0") {

                                    trBorrowNum = "0";
                                }
                                if (trHaveReturnNum == "" || trHaveReturnNum == "0") {

                                    trHaveReturnNum = "0";
                                }
                                if (trScrapNum == "" || trScrapNum == "0") {

                                    trScrapNum = "0";
                                }
                                // alert(parseInt(trBorrowNum)+";"+parseInt(trHaveReturnNum)+";"+parseInt(trScrapNum));
                                var isZero = parseInt(trBorrowNum) - parseInt(trHaveReturnNum) - parseInt(trScrapNum);
                                if (isZero == 0) {

                                } else {

                                    layer.msg("请先报废完其他非编码体行");
                                    return;
                                }
                            }
                        }
                    }
                    /*弹出归还页面*/
                    layer.open({
                        type: 2,
                        title: false,
                        closeBtn: 1,
                        shadeClose: false,
                        shade: false,
                        area: ['100%', '90%'],
                        content: ['cuttool_scrap.html']
                    });

                } else {

                    layer.msg('请先选择行！');
                }
            });
            /*整体归还按钮监听*/
            $(document).on('click', '#totalReturnBtn', function () {
                if (!$("#totalcuttoolborrow").is(':checked')) {
                    layer.msg("不是整体刀具");
                    return;
                }
                var totalReturnBtnClick = $("#totalReturnBtnClick").val();
                if (totalReturnBtnClick == '0') {
                    $("#totalReturnBtnClick").val("1");
                    var allTr = $('#cReturnTable tbody tr');
                    if (allTr.length > 0) {
                        for (var i = 0; i < allTr.length; i++) {
                            var allTd = allTr.eq(i).find('td');
                            var borrowNum = allTd.eq(5).text();
                            var haveScrapNum = allTd.eq(12).text();
                            if (haveScrapNum == "") {
                                haveScrapNum = 0;
                            } else {
                                haveScrapNum = parseInt(haveScrapNum);
                            }
                            allTd.eq(8).text(borrowNum - haveScrapNum);
                        }
                    }
                } else {
                    $("#totalReturnBtnClick").val("0");
                    var allTr = $('#cReturnTable tbody tr');
                    if (allTr.length > 0) {
                        for (var i = 0; i < allTr.length; i++) {
                            var allTd = allTr.eq(i).find('td');
                            allTd.eq(8).html('');
                        }
                    }
                }
            });
            /**
             * 读取RFID
             */
            $(document).on('click', '#readRFID', function () {

                var uploadVal = {
                    content: '0&'
                };

                COMMON.WS.local('cuttool/sendRFID', 'get', uploadVal, true, function (data) {

                    if (data.result == 'true') {

                        var cutToolNo = data.dataResult + '';

                        var searchVal = {
                            /*是否弹出页面*/
                            popMenu: false,
                            /*查詢條件*/
                            searchValue: cutToolNo,
                            /*查询表实体类*/
                            searchTable: 'CCuttoolBorrowTitle',
                            /*查询哪几列数据*/
                            searchCol: 'CCuttoolBasedata.cuttoolNo,borrowNo',
                            /*查询哪一列条件*/
                            searchColNum: '0,1'
                        };
                        /**
                         * 没有归还的
                         * @type {*[]}
                         */
                        searchVal.addLimit = [{colName: 'isReturn', colValue: '否'}];
                        /*库房查询双击事件回调函数*/
                        pageSearch.OPEN_PAGE.openPage(searchVal, function (result) {

                            if (result == '' || result == null) {

                                layer.msg('刀具"' + cutToolNo + '"尚未借用！');

                            } else {

                                /**
                                 * 获取借用信息
                                 */
                                returnMsg(result[0], cutToolNo);
                            }
                        });

                    } else {

                        layer.msg(data.result + '');
                    }

                });
            });
            //打印二维码
            function pinErwm(index) {
                var return_no=$("#return_no").val();
                if(ghArray.length==0){
                    layer.close(index);
                    layer.msg('暂无需要归还的刀具，无需打印二维码！');
                    return null;
                };
                COMMON.WS.restful('cuttool/pinErwm', 'post', JSON.stringify(ghArray), true, function (data) {
                    layer.close(index);
                    $("#pintUrl").val(data.url);
                    printIfrname=layer.open({
                        type:2,
                        shade: false,
                        title: false,
                        scrollbar:false,
                        shadeClose: true,
                        area: ['50%', '50%'],
                        cancel:function(index_){
                            var lay=layer.confirm("任务号"+return_no+'，还未打印确认关闭？关闭后将无法补打！',{
                                title:'<span style=color:red;">安全提示</span>',
                                btn:['确定','取消']
                            },function(){
                                layer.close(lay);layer.close(index_);
                            });
                            return false;
                        },
                        end:function(){
                            //删除二维码图片
                            COMMON.WS.restful("cuttool/removeImages", "post", return_no, true, function (map) {});
                            ghArray=new Array();
                        },
                        content:["cuttool_borrow_print.html","no"]
                    });
                });rowValue=null;
            }
        }

        return {
            'init': init
        }
    }
);
