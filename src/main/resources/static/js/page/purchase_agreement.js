/**
 * Created by GuoFeng on 2016/4/4.
 */

define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, COMMON_SEARCH) {
        /*父页面name*/
        var pageName = $('#pageName', parent.document).val();

        function openHtml(code, userName, accountAuthority, HashMap) {
            var num = 1;        //行号
            var numHidden = 1;  //行号
            var _class = "add"; //默认样式
            if (code == undefined || code == "") {
                if ($('#purchaseTable1 tbody tr').length > 0) {
                    num = parseInt($('#purchaseTable1 tbody tr:last td:first label span').eq(0).html()) + 1;
                    numHidden = parseInt($('#purchaseTable1 tbody tr:last td:first label span:last-child').html()) + 1;
                }
                HashMap.wuliao = "";//物料
                HashMap.miaoshu = "";//描述
                HashMap.leibie = "";//类别
                HashMap.danwei = "";//单位
                HashMap.danjia = "";//单价
                HashMap.pinpai = "";//品牌
            } else {
                _class = "";
                if ($('#purchaseTable1 tbody tr').length > 0) {
                    num = parseInt($('#purchaseTable1 tbody tr:last td:first label span').eq(0).html()) + 1;
                }
                //获取后台行号
                numHidden = HashMap.num;
                if ($("#order_code").val() == "") {
                    $("#order_code").val(HashMap.order_code);
                    $("#order_line").val(HashMap.order_line);
                    $("#buyer").val(HashMap.buyer);
                    $("#supplier_name").val(HashMap.supplier_name);
                    $("#supplier_code").val(HashMap.supplier_code);
                    $("#status").val(HashMap.status);
                    $("#newDate").val(HashMap.newDate);
                    $("#sent_amount").val(HashMap.sent_amount);
                    //供应商不可更改
                    $('#supplier_name').attr("readonly", "true");
                }
            }
            //采购员不允许为空（必填项）
            if ($('#buyer').val() == '') {
                $("#buyer").focus();
                layer.tips('请填写采购员！', '#buyer');
                return null;
            }
            //供应商不允许为空（必填项）
            if ($('#supplier_name').val() == '') {
                $("#supplier_name").focus();
                layer.tips('请填写供应商！', '#supplier_name');
                return null;
            }
            //行(物料编码不允许为空、必填项)
            if (num > 1) {
                if ($('#newTd1_' + (num - 1) + '').html() == '' ||
                    $('#newTd1_' + (num - 1) + '').html() == "<div style=\"padding-top: 5px;\"></div>") {
                    $('#newTd1_' + (num - 1) + '').click();
                    layer.tips('请填写请填写物料！', '#newTd1_' + (num - 1) + '');
                    return null;
                }
            }
            //主要
            $('#purchaseTable1 tbody').append(' <tr name="newTr" class="' + _class + '" style="height: 35px;">' +
                '<td id="newTd0_' + num + '" style="width: 5%;padding:0px;">     ' +
                '<label  class="radio-inline" style="padding-top: 5px;padding-left:0px;padding-right: 3px;">' +
                '<input class="trCheck" type="checkbox" id="trCheck' + num + '" name="trCheck"/>' +
                '<span>' + num + '</span>' +
                '<span style="display: none;">' + numHidden + '</span>' +
                '</label>' +
                '</td>' +
                //物料
                '<td id="newTd1_' + num + '" style="width: 25%;padding:0px;">' +
                '<div style="padding-top: 5px;">' + HashMap.wuliao + '</div></td>' +
                //描述
                '<td id="newTd2_' + num + '" style="width: 30%;padding:0px;">' +
                '<div style="padding-top: 5px;">' + HashMap.miaoshu + '</div></td>' +
                //类别
                '<td id="newTd3_' + num + '" style="width: 10%;padding:0px;">' +
                '<div style="padding-top: 5px;">' + HashMap.leibie + '</div></td>' +
                //单位
                '<td id="newTd4_' + num + '" style="width: 10%;padding:0px;">' +
                '<div style="padding-top: 5px;">' + HashMap.danwei + '</div></td>' +
                //单价
                '<td id="newTd5_' + num + '" style="width: 10%;padding:0px;">' +
                '<div style="padding-top: 5px;">' + HashMap.danjia + '</div></td>' +
                //品牌
                '<td id="newTd6_' + num + '" style="width: 10%;padding:0px;">' +
                '<div style="padding-top: 5px;">' + HashMap.pinpai + '</div></td>' +
                '</tr>');
            if (code == undefined || code == "") {
                //物料列事件绑定
                $('#newTd1_' + num + '').click(function () {
                    if (this.newTd == false || this.newTd == undefined) {
                        var ths = this;
                        ths.newTd = true;
                        var nHtml = this.childNodes[0] ? this.childNodes[0].innerHTML : "";
                        $(this).html('<input id="newTd1_text_' + num + '" type="text" class="form-control" value="' + nHtml + '">');
                        $('#newTd1_text_' + num + '').focus();
                        //绑定回车事件
                        $('#newTd1_text_' + num + '').keydown(function () {
                            if (event.keyCode == 13) {
                                var map = {
                                    popMenu: true,          //是否弹出页面 如果是false 则直接返回查询结果(默认是true)
                                    //查询条件
                                    searchValue: this.value,
                                    //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                                    readonly: false,
                                    //自定义显示前两列列名
                                    colName: '物料编码,物料描述',
                                    //searchTable:表实体类
                                    searchTable: 'CGeneralMaterial',
                                    //searchCol：物料编码、物料描述、物料类别、物料单位
                                    searchCol: 'materialNo,materialDescribe,materialClass,materialUnit'
                                };

                                //查询组件
                                COMMON_SEARCH.OPEN_PAGE.openPage(map, function (HashMap) {
                                    //获取所有协议行
                                    var purchaseTable = $('#purchaseTable1 tbody tr');
                                    if (purchaseTable.length > 0) {
                                        for (var i = 0; i < purchaseTable.length; i++) {
                                            //如果当前循环行等于num 则跳出本次循环
                                            var row_num = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(1).html();
                                            if (row_num == num) {
                                                continue;
                                            };
                                            var material_no = purchaseTable.eq(i).children("td").eq(1).children("div").eq(0).html();
                                            var brand = purchaseTable.eq(i).children("td").eq(6).children("div").eq(0).html();
                                            brand = brand == undefined ? "" : brand;
                                            //品牌为空时物料判断！
                                            if (material_no == HashMap.materialNo && brand == "") {
                                                $(ths).html("");//主要-物料
                                                $('#newTd2_' + num + '').html(""); //主要-描述
                                                $('#newTd3_' + num + '').html("");//主要-类别
                                                $('#newTd4_' + num + '').html("");//主要-单位
                                                $('#newTd1_ff_' + num + '').html("");//发放-物料
                                                $('#newTd2_ff_' + num + '').html("");//发放-描述
                                                $('#newTd6_' + num + '').html("");//清空-品牌
                                                $('#newTd1_' + (num) + '').click();//提示物料重复
                                                layer.tips('第' + num + '行，物料重复，请重新输入', '#newTd1_' + (num) + '');
                                                return null;
                                            }
                                        }
                                    }
                                    //获取表中 该供应商是否已经拥有该物料
                                    var HashMapType = {
                                        supplier_code: $('#supplier_code').val(),
                                        material_no: HashMap.materialNo,
                                        brand: ''
                                    };
                                    HashMapType = JSON.stringify(HashMapType);
                                    COMMON.WS.restful("purchaseAgreement/selectPurchaseAgreement", "post", HashMapType, true, function (data) {
                                        if (data.result > 0) {
                                            //提示物料重复
                                            $('#newTd1_' + (num) + '').click();
                                            layer.tips('此物料与该供应商产生过协议', '#newTd1_' + (num) + '');
                                        } else {
                                            $(ths).html("<div style='padding-top: 5px;'>" + HashMap.materialNo + "</div>");
                                            //主要-描述
                                            $('#newTd2_' + num + '').html("<div style='padding-top: 5px;'>" + HashMap.materialDescribe + "</div>");
                                            //主要-类别
                                            $('#newTd3_' + num + '').html("<div style='padding-top: 5px;'>" + HashMap.materialClass + "</div>");
                                            //主要-单位
                                            $('#newTd4_' + num + '').html("<div style='padding-top: 5px;'>" + HashMap.materialUnit + "</div>");
                                            //发放-物料
                                            $('#newTd1_ff_' + num + '').html("<div style='padding-top: 5px;'>" + HashMap.materialNo + "</div>");
                                            //发放-描述
                                            $('#newTd2_ff_' + num + '').html("<div style='padding-top: 5px;'>" + HashMap.materialDescribe + "</div>");
                                            //清空-品牌
                                            $('#newTd6_' + num + '').html("");
                                        }
                                    });
                                });
                            }
                        });
                        //失去焦点时将value赋值给td下的DIV元素
                        $('#newTd1_text_' + num + '').blur(function () {
                            var node = this.parentNode;
                            if ($(this).val().indexOf("%") == 0) {
                                $(ths).html("");
                                $('#newTd2_' + num + '').html("");  //主要-描述
                                $('#newTd3_' + num + '').html("");  //主要-类别
                                $('#newTd4_' + num + '').html("");  //主要-单位
                                $('#newTd1_ff_' + num + '').html("");   //发放-物料
                                $('#newTd2_ff_' + num + '').html("");   //发放-描述
                                $('#newTd6_' + num + '').html("");      //清空-品牌
                            } else {
                                $(node).html("<div style='padding-top: 5px;'>" + this.value + "</div>");
                            }
                            ;
                            node.newTd = false;
                        });
                        //绑定事件 change
                        $('#newTd1_text_' + num + '').change(function () {
                            if ($(this).val().indexOf("%") == -1) {
                                this.parentNode.newTd = false;
                                var map = {
                                    popMenu: false,          //是否弹出页面 如果是false 则直接返回查询结果(默认是true)
                                    searchValue: this.value,     //查询条件
                                    colName: '物料编码,物料描述',      //自定义显示前两列列名
                                    searchTable: 'CGeneralMaterial',      //searchTable:表实体类
                                    searchCol: 'materialNo,materialDescribe,materialClass,materialUnit'   //searchCol：物料编码、物料描述、物料类别、物料单位
                                };
                                //查询组件
                                COMMON_SEARCH.OPEN_PAGE.openPage(map, function (HashMap) {
                                    var list = eval(JSON.stringify(HashMap));
                                    if (list == "") {
                                        $(ths).html("");    //主要-物料
                                        $('#newTd2_' + num + '').html(""); //主要-描述
                                        $('#newTd3_' + num + '').html("");//主要-类别
                                        $('#newTd4_' + num + '').html("");//主要-单位
                                        $('#newTd1_ff_' + num + '').html("");//发放-物料
                                        $('#newTd2_ff_' + num + '').html("");//发放-描述
                                        $('#newTd6_' + num + '').html("");//清空-品牌
                                        $(ths).click();
                                    } else {
                                        //获取所有协议行
                                        var purchaseTable = $('#purchaseTable1 tbody tr');
                                        if (purchaseTable.length > 0) {
                                            for (var i = 0; i < purchaseTable.length; i++) {
                                                //如果当前循环行等于num 则跳出本次循环
                                                var row_num = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(1).html();
                                                if (row_num == num) {
                                                    continue;
                                                }
                                                ;
                                                var material_no = purchaseTable.eq(i).children("td").eq(1).children("div").eq(0).html();
                                                var brand = purchaseTable.eq(i).children("td").eq(6).children("div").eq(0).html();
                                                brand = brand == undefined ? "" : brand;
                                                //品牌为空时物料判断！
                                                if (material_no == list[0].materialNo && brand == "") {
                                                    $(ths).html("");//主要-物料
                                                    $('#newTd2_' + num + '').html(""); //主要-描述
                                                    $('#newTd3_' + num + '').html("");//主要-类别
                                                    $('#newTd4_' + num + '').html("");//主要-单位
                                                    $('#newTd1_ff_' + num + '').html("");//发放-物料
                                                    $('#newTd2_ff_' + num + '').html("");//发放-描述
                                                    $('#newTd6_' + num + '').html("");//清空-品牌
                                                    $('#newTd1_' + (num) + '').click();
                                                    //提示物料重复
                                                    layer.tips('第' + num + '行，物料重复，请重新输入', '#newTd1_' + (num) + '');
                                                    return null;
                                                }
                                            }
                                        }
                                        //获取表中 该供应商是否已经拥有该物料
                                        var HashMap = {
                                            supplier_code: $('#supplier_code').val(),
                                            material_no: list[0].materialNo,
                                            brand: ''
                                        };
                                        HashMap = JSON.stringify(HashMap);
                                        COMMON.WS.restful("purchaseAgreement/selectPurchaseAgreement", "post", HashMap, true, function (data) {
                                            if (data.result > 0) {
                                                //提示物料重复
                                                $('#newTd1_' + (num) + '').click();
                                                layer.tips('此物料与该供应商产生过协议', '#newTd1_' + (num) + '');
                                            } else {
                                                $(ths).html("<div style='padding-top: 5px;'>" + list[0].materialNo + "</div>");    //主要-物料
                                                $('#newTd2_' + num + '').html("<div style='padding-top: 5px;'>" + list[0].materialDescribe + "</div>");//主要-描述
                                                $('#newTd3_' + num + '').html("<div style='padding-top: 5px;'>" + list[0].materialClass + "</div>");//主要-类别
                                                $('#newTd4_' + num + '').html("<div style='padding-top: 5px;'>" + list[0].materialUnit + "</div>");//主要-单位
                                                $('#newTd1_ff_' + num + '').html("<div style='padding-top: 5px;'>" + list[0].materialNo + "</div>");//发放-物料
                                                $('#newTd2_ff_' + num + '').html("<div style='padding-top: 5px;'>" + list[0].materialDescribe + "</div>");//发放-描述
                                                $('#newTd6_' + num + '').html("");//清空-品牌
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                });
                //类别列事件绑定
                $('#newTd3_' + num + '').click(function () {
                    if (this.newTd == false || this.newTd == undefined) {
                        var ths = this;
                        this.newTd = true;
                        var nHtml = this.childNodes[0] ? this.childNodes[0].innerHTML : "";
                        $(this).html('<input id="newTd3_text_' + num + '" type="text" class="form-control" value="' + nHtml + '">');
                        $('#newTd3_text_' + num + '').focus();
                        $('#newTd3_text_' + num + '').blur(function () {
                            var node = this.parentNode;
                            $(node).html("<div style='padding-top: 5px;'>" + this.value + "</div>");
                            node.newTd = false;
                        });
                    }
                });
            }
            //价格列事件绑定
            $('#newTd5_' + num + '').click(function () {
                if (this.newTd == false || this.newTd == undefined) {
                    var ths = this;
                    this.newTd = true;
                    var nHtml = this.childNodes[0] ? this.childNodes[0].innerHTML : "";
                    $(this).html('<input id="newTd5_text_' + num + '" type="text" class="form-control" value="' + nHtml + '">');
                    $('#newTd5_text_' + num + '').focus();
                    $('#newTd5_text_' + num + '').blur(function () {
                        var node = this.parentNode;
                        $(node).html("<div style='padding-top: 5px;'>" + this.value + "</div>");
                        node.newTd = false;
                    });
                    //判断当前协议行 修改还是新增
                    $('#newTd5_text_' + num + '').change(function () {
                        if ($(ths).parent().attr("class") == " ") {
                            $(ths).parent().attr("class", "update");
                        }
                    });
                }
            });
            //品牌列事件绑定
            $('#newTd6_' + num + '').click(function () {
                if (this.newTd == false || this.newTd == undefined) {
                    var ths = this;
                    this.newTd = true;
                    var nHtml = this.childNodes[0] ? this.childNodes[0].innerHTML : "";
                    $(this).html('<input id="newTd6_text_' + num + '" type="text" class="form-control" value="' + nHtml + '">');
                    $('#newTd6_text_' + num + '').focus();
                    //绑定回车事件
                    $('#newTd6_text_' + num + '').keydown(function () {
                        if (event.keyCode == 13) {
                            var materialNo = $('#newTd1_' + num + ' div').html();
                            var obj = {
                                //查询条件
                                searchValue: materialNo,
                                //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                                readonly: true,
                                //自定义显示前两列列名
                                colName: '物料编码,品牌',
                                //searchTable:表实体类
                                searchTable: 'CMaterialVersion',
                                //文本框是否可编辑！默认“false”
                                searchReadonly: false,
                                //searchCol：物料编码、品牌
                                searchCol: 'CGeneralMaterial.materialNo,versionExplain'
                            };
                            //查询组件
                            COMMON_SEARCH.OPEN_PAGE.openPage(obj, function (map) {
                                $('#newTd6_' + num + '').html("<div style='padding-top: 5px;'>" + map['versionExplain'] + "</div>");
                                //获取界面所有协议行
                                var purchaseTable = $('#purchaseTable1 tbody tr');
                                if (purchaseTable.length > 0) {
                                    for (var i = 0; i < purchaseTable.length; i++) {
                                        //如果当前循环行等于num 则跳出本次循环
                                        var row_num = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(1).html();
                                        if (row_num == num) {
                                            continue;
                                        }
                                        ;
                                        var material_no = purchaseTable.eq(i).children("td").eq(1).children("div").eq(0).html();
                                        var brand = purchaseTable.eq(i).children("td").eq(6).children("div").eq(0).html();
                                        brand = brand == undefined ? "" : brand;
                                        //品牌为空时物料判断！
                                        if (material_no == map['CGeneralMaterial.materialNo'] && brand == map['versionExplain'] && brand != "") {
                                            //清空-品牌
                                            $('#newTd6_' + num + '').html("");
                                            //提示品牌重复
                                            $('#newTd6_' + (num) + '').click();
                                            layer.tips('第' + num + '行，品牌重复，请重新输入', '#newTd6_' + (num) + '');
                                            return null;
                                        }
                                    }
                                }
                                //品牌不为空时判断是否发生过协议
                                if ($(ths).eq(0).children("div").html() != "") {
                                    //获取表中 该供应商是否已经拥有该物料
                                    var HashMap = {
                                        supplier_code: $('#supplier_code').val(),
                                        material_no: map['CGeneralMaterial.materialNo'],
                                        brand: map['versionExplain']
                                    };
                                    HashMap = JSON.stringify(HashMap);
                                    COMMON.WS.restful("purchaseAgreement/selectPurchaseAgreement", "post", HashMap, true, function (data) {
                                        if (data.result > 0) {
                                            //清空-品牌
                                            $('#newTd6_' + num + '').html("");
                                            //提示品牌重复
                                            $('#newTd6_' + (num) + '').click();
                                            layer.tips('此品牌物料与该供应商产生过协议', '#newTd6_' + (num) + '');
                                        } else {
                                            if ($(ths).parent().attr("class") == " ") {
                                                $(ths).parent().attr("class", "update");
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                    $('#newTd6_text_' + num + '').blur(function () {
                        var node = this.parentNode;
                        $(node).html("<div style='padding-top: 5px;'>" + this.value + "</div>");
                        node.newTd = false;
                    });
                    //判断当前协议行 修改还是新增
                    $('#newTd6_text_' + num + '').change(function () {
                        //查询此物料的品牌是否存在!
                        var materialNo = $('#newTd1_' + num + ' div').html();
                        var obj = {
                            popMenu: false,            //是否弹出页面 如果是false 则直接返回查询结果(默认是true)
                            searchValue: materialNo,       //查询条件
                            colName: '物料编码,品牌',             //自定义显示前两列列名
                            searchTable: 'CMaterialVersion',         //searchTable:表实体类
                            searchCol: 'CGeneralMaterial.materialNo,versionExplain'  //searchCol：物料编码、品牌
                        };
                        //查询组件
                        COMMON_SEARCH.OPEN_PAGE.openPage(obj, function (map) {
                            var list = eval(JSON.stringify(map));
                            var trShow = false;
                            if (list.length > 0) {
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i].versionExplain == $(ths).eq(0).children("div").html()) {
                                        trShow = true;
                                        break;
                                    }
                                }
                            }
                            //如此物料没有该品牌则清空
                            if (trShow == false && $(ths).html() != "<div style=\"padding-top: 5px;\"></div>") {
                                $(ths).html("");
                                $(ths).click();
                            } else {
                                //获取界面所有协议行
                                var purchaseTable = $('#purchaseTable1 tbody tr');
                                for (var i = 0; i < purchaseTable.length; i++) {
                                    //如果当前循环行等于num 则跳出本次循环
                                    var row_num = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(1).html();
                                    if (row_num == num) {
                                        continue;
                                    }
                                    ;
                                    var material_no_ = purchaseTable.eq(i).children("td").eq(1).children("div").eq(0).html();
                                    var brand_ = purchaseTable.eq(i).children("td").eq(6).children("div").eq(0).html();
                                    brand_ = brand_ == undefined ? "" : brand_;
                                    //品牌为空时物料判断！
                                    if (material_no_ == materialNo && brand_ == $(ths).eq(0).children("div").html()) {
                                        //清空-品牌
                                        $('#newTd6_' + num + '').html("");
                                        //提示品牌重复
                                        $('#newTd6_' + (num) + '').click();
                                        layer.tips('第' + num + '行，品牌重复，请重新输入', '#newTd6_' + (num) + '');
                                        return null;
                                    }
                                }
                                if ($(ths).eq(0).children("div").html() != "") {
                                    //获取表中 该供应商是否已经拥有该物料
                                    var HashMap = {
                                        supplier_code: $('#supplier_code').val(),
                                        material_no: materialNo,
                                        brand: $(ths).eq(0).children("div").html()
                                    };
                                    HashMap = JSON.stringify(HashMap);
                                    COMMON.WS.restful("purchaseAgreement/selectPurchaseAgreement", "post", HashMap, true, function (data) {
                                        if (data.result > 0) {
                                            //清空-品牌
                                            $('#newTd6_' + num + '').html("");
                                            //提示品牌重复
                                            $('#newTd6_' + (num) + '').click();
                                            layer.tips('此品牌物料与该供应商产生过协议', '#newTd6_' + (num) + '');
                                        } else {
                                            if ($(ths).parent().attr("class") == " ") {
                                                $(ths).parent().attr("class", "update");
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    });
                }
            });
            /*发放*/
            $('#purchaseTable2 tbody').append('<tr name="newTr_ff" style="height: 35px;">' +
                '<td id="newTd0_ff_' + num + '" style="width: 5%;padding:0px;">' +
                '<label class="col-nopadding radio-inline" style="padding-top: 5px;padding-left:0px;padding-right: 3px;">  ' +
                '<span>  ' + num + '</span>' +
                '<span style="display: none;">' + numHidden + '</span>' +
                '</label>' +
                '</td>' +
                '<td id="newTd1_ff_' + num + '" style="width: 25%;padding:0px;"><div style="padding-top: 5px;">' + HashMap.wuliao + '</div></td>' +
                '<td id="newTd2_ff_' + num + '" style="width: 30%;padding:0px;"><div style="padding-top: 5px;">' + HashMap.miaoshu + '</div></td>' +
                '<td id="newTd3_ff_' + num + '" style="width: 20%;padding:0px;"></td>' +
                '<td id="newTd4_ff_' + num + '" style="width: 20%;padding:0px;"></td>' +
                '</tr>');
        }

        function init() {

            /**
             * 设置审批权
             */
            var orderApprovalAuthority = COMMON.ECODE.Base64.decode($.cookie('orderApprovalAuthority'));
            if (orderApprovalAuthority == '否') {

                $('#approveBtn').remove();
            }
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

            //设置表格有效高度
            var height = window.screen.height / 3;
            $('.table-body').css("height", height + "px");

            //采购员&供应商回车事件
            function bdKeydown(e, t) {
                if (event.keyCode == 13) {
                    //采购员
                    if (e == '0') {
                        var map = {
                            //查询条件
                            searchValue: t.value,
                            //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                            readonly: false,
                            //自定义显示前两列列名
                            colName: '采购员,说明',
                            //searchTable:表实体类
                            searchTable: 'CBuyer',
                            //searchCol：id,采购员、说明
                            searchCol: 'buyer,explainText'
                        };
                        //查询组件
                        COMMON_SEARCH.OPEN_PAGE.openPage(map, function (HashMap) {
                            $(t).val(HashMap.buyer);
                        });
                        //供应商
                    } else {
                        var map = {
                            //查询条件
                            searchValue: t.value,
                            //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                            readonly: false,
                            //自定义显示前两列列名
                            colName: '供应商编码,供应商',
                            //searchTable:表实体类
                            searchTable: 'CSupplier',
                            //searchCol：id,供应商编码、供应商
                            searchCol: 'supplierCode,supplier'
                        };
                        //查询组件
                        COMMON_SEARCH.OPEN_PAGE.openPage(map, function (HashMap) {
                            $('#supplier_code').val(HashMap.supplierCode);
                            $(t).val(HashMap.supplier);
                        });
                    }
                }
            }

            /*绑定日期选择器
             $('.calendarBtn').datetimepicker({
             format: 'yyyy-mm-dd hh:mm:ss',
             language: 'zh-CN',  //汉化
             autoclose: true,    //选择日期后自动关闭
             pickerPosition: 'bottom-left',
             todayBtn: 1,
             linkFormat: 'yyyy-mm-dd hh:mm:ss',
             minView: 'month'
             });*/
            function current() {
                var d = new Date(), str = '';
                str += d.getFullYear() + '-'; //获取当前年份
                str += d.getMonth() + 1 + '-'; //获取当前月份（0——11）
                str += d.getDate() + ' ';
                str += d.getHours() + ':';
                str += d.getMinutes() + ':';
                str += d.getSeconds();
                return str;
            }

            $('#newDate').val(current());

            /*主菜单切换按钮点击事件*/
            $('.mainOrder').click(function (e) {
                var item = $(e.target);
                $('#mainStatusBar').find('div').removeClass('select');
                item.addClass('select');
                $(".stock").children().css("display", "none");
                $("#stock" + $(item).attr('data')).css("display", "block");
            });

            //采购员绑定回车事件！
            $('#buyer').keydown(function () {
                bdKeydown(0, this);
            });
            //采购员绑定失去焦点事件
            $('#buyer').blur(function () {
                //alert(this.value);
            });

            //供应商绑定回车事件！
            $('#supplier_name').keydown(function () {
                bdKeydown(1, this);
            });

            /*添加按钮监听-主要 */
            $('#addTr').click(function () {
                var HashMap = {};
                openHtml('', '', '', HashMap);
            });

            /*保存按钮事件监听*/
            $('#saveBtn').click(function () {
                var upload = new Array;
                //题头
                var head = new Array;
                //新增
                var add = new Array;
                //修改
                var update = new Array;
                //协议头
                var HashMap = {
                    //订单号
                    order_code: $('#order_code').val(),
                    //订单版本号
                    order_line: $('#order_line').val(),
                    //采购员
                    buyer: $('#buyer').val(),
                    //受单方
                    by_unilateral: $('#by_unilateral').val(),
                    //供应商编号
                    supplier_code: $('#supplier_code').val(),
                    //供应商
                    supplier_name: $('#supplier_name').val(),
                    //状态
                    status: '未审核',
                    //创建时间
                    newDate: $('#newDate').val()
                };
                //题头
                head.push(HashMap);

                //协议行
                var purchaseTable = $('#purchaseTable1 tbody tr');
                //协议行
                var row_number = 0;
                for (var i = 0; i < purchaseTable.length; i++) {
                    //物料编号
                    var material_no = purchaseTable.eq(i).children("td").eq(1).children("div").eq(0).html();
                    //行类别
                    var row_type = purchaseTable.eq(i).children("td").eq(3).children("div").eq(0).html();
                    //单价
                    var unit_price = purchaseTable.eq(i).children("td").eq(5).children("div").eq(0).html();
                    //品牌
                    var brand = purchaseTable.eq(i).children("td").eq(6).children("div").eq(0).html();
                    if (HashMap.order_code == "") {
                        row_number++;
                    } else {
                        row_number = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(1).html();
                    }
                    //数据集合
                    var trV = {
                        //行号
                        row_number: row_number,
                        //物料编号
                        material_no: material_no != undefined ? material_no : "",
                        //类别
                        row_type: row_type != undefined ? row_type : "",
                        //状态
                        state: '未审核',
                        //单价
                        unit_price: unit_price != undefined && unit_price != "" ? unit_price : 0,
                        //品牌
                        brand: brand != undefined ? brand : ""
                    };
                    if (trV.material_no == "") {
                        $('#newTd1_' + (i + 1) + '').click();
                        layer.tips('请填写请填写物料！', '#newTd1_' + (i + 1) + '');
                        return null;
                    }
                    //判断当前协议行,修改还是新增
                    if ($(purchaseTable).parent().children("tr").eq(i).attr("class") == 'add') {
                        //新增
                        add.push(trV);
                    } else if ($(purchaseTable).parent().children("tr").eq(i).attr("class") == "update") {
                        //修改数据
                        update.push(trV);
                    }
                    //清除绑定的事件
                    purchaseTable.eq(i).children("td").eq(1).unbind();
                    purchaseTable.eq(i).children("td").eq(3).unbind();
                }
                upload.push({
                    head: head,
                    add: add,
                    update: update
                });
                upload = JSON.stringify(upload);
                //保存
                COMMON.WS.restful("purchaseAgreement/savePurchaseAgreement", "post", upload, true, function (map) {
                    if (map.result == 'SUCCESS') {
                        //将所有协议行重置class变为老数据
                        purchaseTable.attr("class", " ");
                        $('#order_code').val(map.order_code);
                        $('#order_line').val(map.order_line);
                        $('#status').val(map.state);
                        $('#newDate').val(map.newDate);
                        //供应商不可更改
                        $('#supplier_name').attr("readonly", "true");
                        layer.msg('保存成功！');
                    }
                });
            });

            /*删除按钮事件监听*/
            $('#deleteBtn').click(function () {
                var cheBoolean = $("input[name='trCheck']").is(':checked');
                if (cheBoolean) {
                    var lay = layer.confirm('是否确认删除选中行？', {
                        btn: ['删除行', '取消'] //按钮
                    }, function () {
                        try {
                            var checkedTr = $("input[name='trCheck']");
                            var length = $("input[name='trCheck']").length;
                            var purchaseTable = $('#purchaseTable1 tbody tr');
                            for (var i = 0; i < length; i++) {
                                var checkable = checkedTr.eq(i);
                                if (checkable.prop('checked') == true) {
                                    //删除数据库中的协议行
                                    if ($(checkable.parent().parent().parent()).attr("class") != "add") {
                                        var row_number = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(1).html();
                                        var uploadValue = ({
                                            order_code: $('#order_code').val(),       //订单号
                                            row_number: row_number,       //协议行号
                                            delete: ''         //删除标识
                                        });
                                        uploadValue = JSON.stringify(uploadValue);
                                        COMMON.WS.restful('purchaseAgreement/deletePurchaseAgreement', 'post', uploadValue, true, function (data) {
                                            if (data.result) {
                                                layer.msg('删除成功！');
                                            }
                                        });
                                    }
                                    //删除协议行
                                    checkable.parent().parent().parent().remove();
                                    //删除发放行
                                    var n2 = 'newTd0_ff_' + (checkable.parent().parent().attr('id') + "").split('_')[1];
                                    $('#' + n2 + '').parent().remove();
                                }
                            }
                            layer.close(lay);
                            /*删除后 调整iframe页面高度*/
                            var height = $(document.body).height();
                            $('#content', parent.document).css('height', height);
                        } catch (e) {
                            layer.msg("An exception occured in the script.Error name: " + e.name
                                + " script.Error message: " + e.message);
                        }
                    });
                } else if ($('#order_code').val() != '') {
                    var lay = layer.confirm('是否确认删除整个协议？', {
                        btn: ['删除', '取消'] //按钮
                    }, function () {
                        var uploadValue = ({
                            order_code: $('#order_code').val(),       //订单号
                            delete: 'all'      //删除标识
                        });
                        uploadValue = JSON.stringify(uploadValue);
                        COMMON.WS.restful('purchaseAgreement/deletePurchaseAgreement', 'post', uploadValue, true, function (data) {
                            if (data.result) {
                                $('#purchaseTable1 tbody tr').remove();
                                $('#purchaseTable2 tbody tr').remove();
                                $('#formId')[0].reset();
                                $('#supplier_name').attr("readonly", false);
                                layer.msg('删除成功！');
                            } else {
                                layer.msg('删除失败！');
                            }
                        });
                    });
                } else {
                    alert("没有可删除的协议！");
                }
            });
            /*审核按钮事件监听*/
            $('#approveBtn').click(function () {
                var lay = layer.confirm('是否审核协议？', {
                    btn: ['审核', '取消'] //按钮
                }, function () {
                    var purchaseTable = $('#purchaseTable1 tbody tr');
                    if ($('#order_code').val() != "" && purchaseTable.length > 0) {
                        var uploadValue = ({
                            order_code: $('#order_code').val()    //单号
                        });
                        uploadValue = JSON.stringify(uploadValue);
                        COMMON.WS.restful('purchaseAgreement/approvalPurchaseAgreement', 'post', uploadValue, true, function (data) {
                            if (data.result) {
                                $('#status').val("已审核");
                                layer.msg('审核成功！');
                            } else {
                                layer.msg('审核失败！');
                            }
                        });

                    }
                });
            });

            /*checkbox click监听-主要*/
            $('#checkAll1').change(function () {
                if ($('#checkAll1').prop('checked') == true) {
                    $("input[name='trCheck']").prop('checked', true);

                } else {
                    $("input[name='trCheck']").prop('checked', false);
                }
            });
        }

        function actionShow(uploadVal, account, accountAuthority) {
            COMMON.WS.local('purchaseAgreement/getAgreementSummaryRow', 'get', uploadVal, true, function (data) {
                for (var i = 0; i < data.length; i++) {
                    var HashMap = {
                        num: data[i][1],           //行号
                        order_code: data[i][0],      //订单号
                        order_line: data[i][17],     //版本号
                        buyer: data[i][16],          //采购员
                        supplier_name: data[i][14],  //供应商
                        supplier_code: data[i][18],  //供应商编码
                        status: data[i][19],         //状态
                        newDate: data[i][20],        //创建时间
                        sent_amount: '',             //发送金额
                        wuliao: data[i][2],          //物料
                        miaoshu: data[i][12],        //描述
                        leibie: data[i][6],          //类别
                        danwei: data[i][13],         //单位
                        danjia: data[i][3],          //单价
                        pinpai: data[i][11]          //品牌
                    };
                    openHtml(no, account, accountAuthority, HashMap);
                }
            });
        }

        /*父页面是采购协议题头页面*/
        if ('purchaseAgreementSummaryHead' == pageName) {
            var allTd = $('.choose td', parent.document);
            //订单号
            var no = allTd.eq(0).text();
            //获取当前操作人员
            var account = $('#hiddenName', parent.parent.parent.document).val();
            //权限
            var accountAuthority = $('#hiddenApprovalAuthority', parent.parent.parent.document).val();
            var uploadVal = {
                'order_code': no
            };
            actionShow(uploadVal, account, accountAuthority);
        }

        /*父页面是采购协议行页面*/
        if ('purchaseAgreementSummaryRow' == pageName) {
            var allTd = $('.choose td', parent.document);
            //订单号
            var no = allTd.eq(0).text();
            //获取当前操作人员
            var account = '';
            //权限
            var accountAuthority = '';

            /*获取父页面的父页面pagename*/
            var ppPageName = $('#pageName', parent.parent.document).val();
            if (ppPageName == 'purchaseAgreementSummaryHead') {
                account = $('#hiddenName', parent.parent.parent.parent.document).val();
                accountAuthority = $('#hiddenApprovalAuthority', parent.parent.parent.parent.document).val();
            } else if (ppPageName == 'purchaseAgreementSummary') {
                account = $('#hiddenName', parent.parent.parent.document).val();
                accountAuthority = $('#hiddenApprovalAuthority', parent.parent.parent.document).val();
            }
            var uploadVal = {
                'order_code': no
            };
            actionShow(uploadVal, account, accountAuthority);
        }

        //返回入口
        return {
            "init": init
        };
    }
);