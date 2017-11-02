/**
 * Created by CJS on 2016/6/2.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, pageSearch) {

    /*页面索引*/
    var index = parent.layer.getFrameIndex(window.name);

    //发送立体库
    function addToLiTiKu(taskNo, mno, mNum, croomNo) {

        var uploadValue = {
            croomNo: croomNo
        };

        var Json = JSON.stringify(uploadValue);
        COMMON.WS.restful('storageDefinition/isLitiku', 'post', Json, true, function (data) {

            if (data.res == 'yes') {

                var send = new Array();
                var sendLine = taskNo + ';' + mno + ';' + mNum;
                send.push({
                    sendLine: sendLine
                });
                /**
                 * 报废换取
                 * @type {{source: string, sendValue: Array, fileName: string}}
                 */
                var uploadValue = {
                    source: 'pickorder',
                    sendValue: send,
                    fileName: 'bfhq' + new Date().getTime() + '.txt'
                };
                var Json = JSON.stringify(uploadValue);
                COMMON.WS.restful('sendStereoLibrary/send', 'post', Json, true, function (data) {

                    if (data.result == 'true') {

                        layer.msg('报废换取成功！发送立体库成功！');

                    } else {

                        layer.msg('报废换取成功！发送立体库失败！' + data.result);
                    }
                });
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

        var pageName = $('#pageName', parent.document).val();

        //----------------------------按库房、货位、新旧选择检查各物料的库存现有量够不够借用数量
        function isenough(uploadValue) {

            COMMON.WS.local("stockDetailList/availableNum", "get", uploadValue, false, function (obj) {

                if ('1' == obj) {
                    $("#enableBeSave").val("0");
                    return;
                }
                if ('0' == obj) {
                    $("#enableBeSave").val("0");
                    return;
                }
                if ('2' == obj) {
                    $("#enableBeSave").val("1");
                    // layer.msg("改为："+$("#enableBeSave").val());
                    return;
                }
                if ('3' == obj) {
                    $("#enableBeSave").val("0");
                }
            });
        }

        /**
         * 保存报废信息
         */
        function saveScrapMsg(scrapChangeNum) {

            var uploadVal = {
                'totalcuttoolborrow': $('#totalcuttoolborrow', parent.document).prop('checked'),
                'materialNo': $("#scrap_Mno").val(),
                'scrap_Equno': $("#scrap_Equno").val(),
                'scrap_MDes': $("#scrap_MDes").val(),
                'scrap_CNo': $("#scrap_CNo").val(),
                'scarp_OrderNo': $("#scarp_OrderNo").val(),
                'scrap_taskNo': $("#scrap_taskNo").val(),
                'scrap_rowNo': $("#scrap_rowNo").val(),
                'scrapReason': $("#scrapReason").val(),
                'borrowNum': parseInt($("#borrowNum").val()),
                'haveReturnNum': parseInt($("#haveReturnNum").val()),
                'scrapNum': $("#scrapNum").val(),
                'scrapChangeNum': $("#scrapChangeNum").val(),
                'roomNo': $("#scrapRoomNo").val(),
                'goodallocation': $("#scrap_goodAllocation").val(),
                'person': $('#borrower', parent.document).val(),
                'createPerson': COMMON.ECODE.Base64.decode($.cookie('username'))
            };
            var uploadJson = JSON.stringify(uploadVal);
            COMMON.WS.restful('cuttoolScrap/saveScrapMsg', 'post', uploadJson, false, function (data) {

                if (data.result == 'true') {

                    /**
                     * 发送立体库
                     */
                    if (scrapChangeNum != 0) {
                        //发送立体库
                        var taskNo = $("#scrap_taskNo").val();
                        var mno = $("#scrap_Mno").val();
                        var mNum = $("#scrapChangeNum").val();
                        var croomNo = $("#scrapRoomNo").val();
                        /*添加立体库*/
                        addToLiTiKu(taskNo, mno, mNum, croomNo);
                    }

                } else {

                    layer.msg("保存失败");

                }
            });
        }

        //判断整体刀具是否都报废完
        function isTotalScrap() {

            var uploadVal = {
                'taskNo': $("#scrap_taskNo").val(),
                'cuttoolNo': $("#scrap_CNo").val()
            };
            var uploadJson = JSON.stringify(uploadVal);
            COMMON.WS.restful('cuttoolScrap/isTotalScrap', 'post', uploadJson, true, function (data) {

                if (data.result == 'true') {

                    parent.location.reload();

                } else {

                    parent.location.reload();

                }
            });
        }


        if (pageName == "cuttoolReturn") {

            var chooseTd = $('.edit td', parent.document);
            var equipment = $('#equipment', parent.document).val();
            var cuttoolNo = $('#cReturnCNo', parent.document).val();
            var workOrderNo = $('#work_order_no', parent.document).val();
            var taskNo = $('#return_no', parent.document).val();
            var scrapPerson = $('#borrower', parent.document).val();
            var roomNo = $('#cRetrurnCRoom', parent.document).val();
            var rowNo = chooseTd.eq(0).text();
            var materialNo = chooseTd.eq(1).text();
            var isEncodingBody = chooseTd.eq(1).hasClass('encodingBody');
            var materialDes = chooseTd.eq(2).text();
            var goodallocation = chooseTd.eq(6).text();
            //layer.msg(cuttoolNo+"-"+workOrderNo+"-"+taskNo+"-"+rowNo+"-"+materialNo+"-"+materialDes+"-"+goodallocation);


            $("#scrap_Mno").val(materialNo);
            $("#scrap_Equno").val(equipment);
            $("#scrap_MDes").val(materialDes);
            $("#scrap_CNo").val(cuttoolNo);
            $("#scarp_OrderNo").val(workOrderNo);
            $("#scrap_taskNo").val(taskNo);
            $("#scrap_rowNo").val(rowNo);
            $("#scrapRoomNo").val(roomNo);
            $("#scrap_goodAllocation").val(goodallocation);
            $("#scrapPerson").val(scrapPerson);
            $("#borrowNum").val(chooseTd.eq(5).text());
            $("#haveReturnNum").val(chooseTd.eq(7).text());
            $("#haveScrapNum").val(chooseTd.eq(12).text());
            // layer.msg( $("#haveScrapNum").val());
            //报废编码体不允许输入换取数量
            if (isEncodingBody) {

                $("#scrapChangeNum").attr('readonly', 'readonly');
            }
        }

        /*保存事件监听*/
        $(document).on('click', '#saveBtn', function () {

            var borrowNum = parseInt($("#borrowNum").val());
            var haveReturnNum = parseInt($("#haveReturnNum").val());
            var haveSrcapNum = $("#haveScrapNum").val();
            var scrapNum = $("#scrapNum").val();
            var scrapChangeNum = $("#scrapChangeNum").val();
            // layer.msg(borrowNum+"-"+haveReturnNum+"-"+haveSrcapNum);

            if (scrapNum == null || scrapNum == "") {

                layer.msg("请输入报废数量");
                return;
            }
            if (scrapNum > borrowNum - haveReturnNum - haveSrcapNum) {

                layer.msg("超出可报废数量范围");
                return;
            }
            if (scrapChangeNum == null || scrapChangeNum == "") {

                scrapChangeNum = 0;
            }
            if (scrapChangeNum > scrapNum) {

                layer.msg("换取数量应小于报废数量");
                return;
            }
            //判断换取数量库存够不够
            var uploadValue1 = {

                "RoomNo": $('#cRetrurnCRoom', parent.document).val(),
                "roomplace": $("#scrap_goodAllocation").val(),
                "materialNO": $("#scrap_Mno").val(),
                "use_status": '新',
                "borrowNum": scrapChangeNum
            };
            /*换取数量判断*/
            isenough(uploadValue1);

            var canBeSave = $("#enableBeSave").val();
            if ('1' == canBeSave) {

                /**
                 * 保存报废信息
                 */
                saveScrapMsg(scrapChangeNum);

                //若为整体刀具则检查是否全报废完，若是则修改刀具状态
                if (cuttoolNo != "") {

                    isTotalScrap();

                } else {

                    //parent.location.reload();
                    var allEditTd = $('.edit td', parent.document);
                    var number = allEditTd.eq(5).text();
                    var scrapNumber = allEditTd.eq(12).text();
                    /*报废数量*/
                    allEditTd.eq(12).text(Number(scrapNumber) + Number(scrapNum));
                    /*借用数量加上换取数量*/
                    allEditTd.eq(5).text(Number(number) + Number(scrapChangeNum));

                    parent.layer.close(index);

                }

            }
        });
    }

    return {
        'init': init
    }
});
