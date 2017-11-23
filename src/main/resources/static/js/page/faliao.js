/**
 * Created by guofeng on 2016/6/28.
 */
var printIfrname=null;  //打印frame
define(['jquery', '../common', 'layer', 'page/common_search', 'bootstrap', 'datetimepicker'], function ($, COMMON, layer, COMMON_SEARCH) {
    /*通用查询配置*/
    var searchVal = {
        /*是否弹出页面 如果是false 则直接返回查询结果(默认是true)*/
        popMenu: true,
        /*查詢條件*/
        searchValue: '',
        /*查询条件是否可编辑 (默认是false)*/
        readonly: false,
        /*查询表实体类（必填项）*/
        searchTable: '',
        /*查询哪几列数据（必填项）*/
        searchCol: '',
        /*自定义显示前两列列名 必须和查询列实体类列名前两列对应(默认 编号、描述)*/
        colName: ''
    };
    //物料ID，查询时用
    var wuliaoArr = [];
    //库位ID，保存时用
    var huoweiArray = [];
    function openHtml(HashMap,type){
        var num = 1;            //行号
        if(HashMap.num==undefined || HashMap.num==null || HashMap.num=="") {
            if ($('#purchaseTable tbody tr').length > 0) {
                num = parseInt($('#purchaseTable tbody tr:last td:first label span').eq(0).html()) + 1;
            }
            HashMap.wuliao = "";            //物料
            HashMap.miaoshu = "";           //描述
            HashMap.danwei = "";            //单位
            HashMap.wuliaoxinjiu = "";      //物料新旧
            HashMap.keyongshuliang = "";    //可用数量
            HashMap.huowei = "";            //货位
            HashMap.pinpai = "";            //品牌
            HashMap.fafangshuliang = "";    //发放数量
        }else{
            num = HashMap.num;
        }
        //物料0为新，1为旧
        var wuliaoxinjiu = '<select class="goods_use_status" id="selectHtml'+num+'" class="form-control" style="line-height:30px;border:' +
            ' 0px"><option value="0">新</option><option value="1">旧</option></select>';
        if(HashMap.wuliaoxinjiu==1){
            wuliaoxinjiu = '<select class="goods_use_status" id="selectHtml'+num+'" class="form-control" style="line-height:30px;border: 0px">' +
                '<option value="1">旧</option><option value="0">新</option></select>';
        }
        $('#purchaseTable tbody').append(' <tr name="newTr" class="add" style="height: 35px;padding: 0px;">' +
            '<td id="newTd0_' + num + '" style="width: 5%;padding:0px;line-height:30px;">  ' +
            '<label class="radio-inline" style="padding-left:0px;padding-right: 3px;">' +
            '<input class="trCheck" type="checkbox" id="trCheck' + num + '" name="trCheck"/>' +
            '<span>' + num + '</span>' +
            '</label>' +
            '</td>' +
            '<td id="newTd1_' + num + '" style="padding: 0px;width: 15%;line-height:30px;">'+HashMap.wuliao+'</td>' +
            '<td id="newTd2_' + num + '" style="padding: 0px;width: 20%;line-height:30px;">'+HashMap.miaoshu+'</td>' +
            '<td id="newTd3_' + num + '" style="padding: 0px;width: 10%;line-height:30px;">'+HashMap.danwei+'</td>' +
            '<td id="newTd4_' + num + '" style="padding: 0px;width: 10%;line-height:30px;">'+wuliaoxinjiu+'</td>' +
            '<td id="newTd5_' + num + '" style="padding: 0px;width: 10%;line-height:30px;">'+HashMap.keyongshuliang+'</td>' +
            '<td id="newTd6_' + num + '" style="padding: 0px;width: 10%;line-height:30px;">'+HashMap.huowei+'</td>' +
            '<td id="newTd7_' + num + '" style="padding: 0px;width: 10%;line-height:30px;">'+HashMap.pinpai+'</td>' +
            '<td id="newTd8_' + num + '" style="padding: 0px;width: 10%;line-height:30px;">'+HashMap.fafangshuliang+'</div></td>' +
            '</tr>');

        var endType = $('#endType').val();  //是否可编辑行的控制；
        //true为不可编辑
        if(endType=="true") {
            //物料点击事件
            $('#newTd1_' + num + '').click(function () {
                if (this.newTd == false || this.newTd == undefined) {
                    this.newTd = true;
                    $(this).html('<input id="newTd1_text_' + num + '" type="text" class="form-control" value="'+$(this).html()+'">');
                    $('#newTd1_text_' + num + '').focus();
                    $('#newTd1_text_' + num + '').blur(function () {
                        this.parentNode.newTd = false;
                        $(this.parentNode).html($(this).val());
                    });
                    //如果此物料编码不对时 清空
                    $('#newTd1_text_' + num + '').change(function () {
                        this.parentNode.newTd = false;
                        $(this.parentNode).html('');
                        $('#newTd2_' + num + '').html('');
                        $('#newTd3_' + num + '').html('');
                        $('#newTd5_' + num + '').html('');
                        $('#newTd6_' + num + '').html('');
                        $('#newTd7_' + num + '').html('');
                        $('#newTd8_' + num + '').html('');
                    });
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
                                //searchCol：物料编码、物料描述、物料单位、物料id
                                searchCol: 'materialNo,materialDescribe,materialUnit,materialId'
                            };
                            COMMON_SEARCH.OPEN_PAGE.openPage(map, function (HashMap) {
                                var purchaseTable = $('#purchaseTable tbody tr');
                                if (purchaseTable.length > 0) {
                                    for (var i = 0; i < purchaseTable.length; i++) {
                                        var row_num = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(0).html();
                                        //如果当前循环行等于num 则跳出本次循环
                                        if (row_num == num) {
                                            continue;
                                        };
                                        //物料
                                        var wuliao = purchaseTable.eq(i).children("td").eq(1).html();
                                        //品牌
                                        var pinpai = purchaseTable.eq(i).children("td").eq(7).html();
                                        if(wuliao==HashMap.materialNo && pinpai==""){
                                            $('#newTd1_' + (num) + '').click();//提示物料重复
                                            layer.tips('第' + num + '行，物料重复，请重新输入', '#newTd1_' + (num) + '');
                                            return null;
                                        }
                                    }
                                }
                                $('#newTd1_' + num + '').html(HashMap.materialNo);
                                $('#newTd2_' + num + '').html(HashMap.materialDescribe);
                                $('#newTd3_' + num + '').html(HashMap.materialUnit);
                                wuliaoArr[HashMap.materialNo] = HashMap.materialId;
                                var obj = {
                                    popMenu: false,            //是否弹出页面 如果是false 则直接返回查询结果(默认是true)
                                    searchValue: HashMap.materialId,       //查询条件
                                    searchTable: 'CStockList',         //searchTable:表实体类
                                    searchCol: 'id.materialId,id.materialId,availableQuantity'  //searchCol：物料编码、可用数量
                                };
                                COMMON_SEARCH.OPEN_PAGE.openPage(obj, function (map) {
                                    var list = eval(JSON.stringify(map));
                                    if (list.length > 0) {
                                        $('#newTd5_' + num + '').html(list[0].availableQuantity);
                                        $('#newTd8_' + num + '').html(list[0].availableQuantity);
                                    }else{
                                        $('#newTd5_' + num + '').html(0);
                                        $('#newTd8_' + num + '').html(0);
                                    }
                                });
                            });
                        }
                    })
                }
            });
            //描述点击事件
            $('#newTd2_' + num + '').click(function () {
                if (this.newTd == false || this.newTd == undefined) {
                    this.newTd = true;
                    $(this).html('<input id="newTd2_text_' + num + '" type="text" class="form-control" value="'+$(this).html()+'">');
                    $('#newTd2_text_' + num + '').focus();
                    $('#newTd2_text_' + num + '').blur(function () {
                        this.parentNode.newTd = false;
                        $(this.parentNode).html($(this).val());
                    });
                }
            });
            //单位点击事件
            $('#newTd3_' + num + '').click(function () {
                if (this.newTd == false || this.newTd == undefined) {
                    this.newTd = true;
                    $(this).html('<input id="newTd3_text_' + num + '" type="text" class="form-control" value="'+$(this).html()+'">');
                    $('#newTd3_text_' + num + '').focus();
                    $('#newTd3_text_' + num + '').blur(function () {
                        this.parentNode.newTd = false;
                        $(this.parentNode).html($(this).val());
                    });
                }
            });
            //可用数量点击事件
            $('#newTd5_' + num + '').click(function () {
                if (this.newTd == false || this.newTd == undefined) {
                    this.newTd = true;
                    $(this).html('<input id="newTd5_text_' + num + '" type="text" class="form-control" value="'+$(this).html()+'">');
                    $('#newTd5_text_' + num + '').focus();
                    $('#newTd5_text_' + num + '').blur(function () {
                        this.parentNode.newTd = false;
                        $(this.parentNode).html($(this).val());
                    });
                    $('#newTd5_text_' + num + '').change(function () {
                        var obj = {
                            popMenu: false,            //是否弹出页面 如果是false 则直接返回查询结果(默认是true)
                            searchValue: wuliaoArr[$('#newTd1_' + num).html()],       //查询条件
                            searchTable: 'CStockList',         //searchTable:表实体类
                            searchCol: 'id.materialId,id.materialId,availableQuantity'  //searchCol：物料编码、可用数量
                        };
                        COMMON_SEARCH.OPEN_PAGE.openPage(obj, function (map) {
                            var list = eval(JSON.stringify(map));
                            if (list.length > 0) {
                                //如果当前输入的可用数量超过 库存最大可用数量时 提示
                                if(Number($('#newTd5_' + num + '').html()) > Number(list[0].availableQuantity)){
                                    $('#newTd5_' + num + '').html(list[0].availableQuantity);
                                    $('#newTd5_' + num + '').click();
                                    layer.tips('可用数量最大为：'+list[0].availableQuantity+'', '#newTd5_' + (num) + '');
                                    return null;
                                }
                            }else{
                                $('#newTd5_' + num + '').html(0);
                                $('#newTd5_' + num + '').click();
                                layer.tips('可用数量最大为：0', '#newTd5_' + (num) + '');
                                return null;
                            }
                        });
                        $('#newTd8_' + num + '').html($(this).val());
                    });
                }
            });
            //品牌点击事件
            $('#newTd7_' + num + '').click(function () {
                if (this.newTd == false || this.newTd == undefined) {
                    this.newTd = true;
                    var purchaseTable = $('#purchaseTable tbody tr');
                    $(this).html('<input id="newTd7_text_' + num + '" type="text" class="form-control" value="'+$(this).html()+'">');
                    $('#newTd7_text_' + num + '').focus();
                    $('#newTd7_text_' + num + '').blur(function () {
                        this.parentNode.newTd = false;
                        $(this.parentNode).html($(this).val());
                    });
                    //绑定回车事件
                    $('#newTd7_text_' + num + '').keydown(function () {
                        if (event.keyCode == 13) {
                            var wuliao = $('#newTd1_' + num + '').html();
                            var obj = {
                                //查询条件
                                searchValue: wuliao,
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
                                if (purchaseTable.length > 0) {
                                    for (var i = 0; i < purchaseTable.length; i++) {
                                        var row_num = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(0).html();
                                        //如果当前循环行等于num 则跳出本次循环
                                        if (row_num == num) {
                                            continue;
                                        };
                                        //物料
                                        var wuliao = purchaseTable.eq(i).children("td").eq(1).html();
                                        //版本
                                        var banben = purchaseTable.eq(i).children("td").eq(7).html();
                                        if(wuliao==map['CGeneralMaterial.materialNo'] && banben==map['versionExplain']){
                                            $('#newTd7_' + (num) + '').click();//提示物料版本重复
                                            $('#newTd7_text_' + (num) + '').val('');
                                            layer.tips('第' + num + '行，物料品牌重复，请重新输入', '#newTd7_' + (num) + '');
                                            return null;
                                        }
                                    }
                                }
                                $('#newTd7_' + num + '').html(map.versionExplain);
                            })
                        }
                    })

                    //判断当前品牌是否存在
                    $('#newTd7_text_' + num + '').change(function () {
                        //物料
                        var wuliao_this = $('#newTd1_' + num + '').html();
                        var obj = {
                            popMenu: false,            //是否弹出页面 如果是false 则直接返回查询结果(默认是true)
                            searchValue: wuliao_this,       //查询条件
                            colName: '物料编码,品牌',             //自定义显示前两列列名
                            searchTable: 'CMaterialVersion',         //searchTable:表实体类
                            searchCol: 'CGeneralMaterial.materialNo,versionExplain'  //searchCol：物料编码、品牌
                        };
                        COMMON_SEARCH.OPEN_PAGE.openPage(obj, function (map) {
                            var list = eval(JSON.stringify(map));
                            var trShow = false;
                            if (list.length > 0) {
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i].versionExplain == $('#newTd7_' + num + '').eq(0).html()) {
                                        trShow = true;
                                        break;
                                    }
                                }
                            }
                            //如此物料没有该品牌则清空
                            if (trShow == false && $('#newTd7_' + num + '').html() != "") {
                                $('#newTd7_' + num + '').html("");
                                $('#newTd7_' + num + '').click();
                            } else {
                                for (var i = 0; i < purchaseTable.length; i++) {
                                    //如果当前循环行等于num 则跳出本次循环
                                    var row_num = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(0).html();
                                    if (row_num == num) {
                                        continue;
                                    };
                                    //物料
                                    var wuliao = purchaseTable.eq(i).children("td").eq(1).html();
                                    //版本
                                    var banben = purchaseTable.eq(i).children("td").eq(7).html();
                                    //品牌为空时物料判断！
                                    if (wuliao == wuliao_this && banben == $('#newTd7_' + num + '').eq(0).html()) {
                                        //清空-品牌
                                        $('#newTd7_' + num + '').html("");
                                        //提示品牌重复
                                        $('#newTd7_' + (num) + '').click();
                                        layer.tips('第' + num + '行，品牌重复，请重新输入', '#newTd7_' + (num) + '');
                                        return null;
                                    }
                                }
                            }
                        });
                    });
                }
            });
        }
        //货位点击事件
        $('#newTd6_' + num + '').click(function () {
            //发送刀具复选框选择后，只有货位可编辑；
            if (this.newTd == false || this.newTd == undefined) {
                this.newTd = true;
                $(this).html('<input id="newTd6_text_' + num + '" type="text" class="form-control" value="'+$(this).html()+'">');
                $('#newTd6_text_' + num + '').focus();
                //货位失去焦点后
                $('#newTd6_text_' + num + '').blur(function () {
                    this.parentNode.newTd = false;
                    $(this.parentNode).html($(this).val());
                });
                //绑定回车事件
                $('#newTd6_text_' + num + '').keydown(function () {
                    //回车
                    if (event.keyCode == 13) {
                        var searchVal = {
                            popMenu: true,
                            searchValue: '%',
                            readonly: true,
                            searchTable: 'CCargoSpaceDefinition',
                            searchCol: 'cargoSpaceNo,cargoSpaceExplain,cargoSpaceId',
                            colName: '库位编号,库位描述',
                        };
                        var addLimit = new Array();
                        addLimit.push({
                            colName: 'CStorageRoomDefinition.storageRoomNo',
                            colValue: $('#kufang').val()
                        });
                        searchVal.addLimit = addLimit;
                        COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function (data) {
                            $('#newTd6_' + num + '').html(data.cargoSpaceNo);
                            huoweiArray[data.cargoSpaceNo] = data.cargoSpaceId;
                        });
                    }
                });
                //绑定change事件，当值发生改变时触发
                $('#newTd6_text_' + num + '').change(function () {
                    var searchVal = {
                        popMenu: false,
                        searchValue: $(this).val(),
                        searchTable: 'CCargoSpaceDefinition',
                        searchCol: 'cargoSpaceNo,cargoSpaceExplain,cargoSpaceId',
                        colName: '库位编号,库位描述',
                    };
                    var addLimit = new Array();
                    addLimit.push({
                        colName: 'CStorageRoomDefinition.storageRoomNo',
                        colValue: $('#kufang').val()
                    });
                    searchVal.addLimit = addLimit;
                    COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function (data) {
                        var list = eval(JSON.stringify(data));
                        if (list.length > 0) {
                            //查询全部时
                            if ($('#newTd6_' + num + '').html().indexOf("%") > -1) {
                                $('#newTd6_' + num + '').html(list[0].cargoSpaceNo);
                                huoweiArray[list[0].cargoSpaceNo] = list[0].cargoSpaceId;
                                return null;
                            }
                            //根据调教查询时
                            for(var i=0;i<list.length;i++){
                                if($('#newTd6_' + num + '').html() == list[i].cargoSpaceNo ||
                                    $('#newTd6_' + num + '').html() == list[i].cargoSpaceExplain){
                                    $('#newTd6_' + num + '').html(list[i].cargoSpaceNo);
                                    huoweiArray[list[i].cargoSpaceNo] = list[i].cargoSpaceId;
                                    break;
                                }
                            }
                        }else{
                            layer.tips('货位"'+ $('#newTd6_' + num + '').html()+'"不存在 ', '#newTd6_' + num + '');
                            $('#newTd6_' + num + '').html('');
                            $('#newTd6_' + (num) + '').click();
                        }
                    });
                });
            }
        });
        //发放数量点击事件
        if(!type){  //不是整体刀具发料才允许更改
            $('#newTd8_' + num + '').click(function () {
                //发送刀具复选框选择后，只有发放数量可编辑；
                if (this.newTd == false || this.newTd == undefined) {
                    this.newTd = true;
                    $(this).html('<input id="newTd8_text_' + num + '" type="number" min="0" class="form-control" value="'+$(this).html()+'">');
                    $('#newTd8_text_' + num + '').focus();
                    //发放数量失去焦点后
                    $('#newTd8_text_' + num + '').blur(function () {
                        if(Number($(this).val()) > Number($('#newTd5_' + num + '').html()) || Number($(this).val()) < 0){
                            layer.tips('发放数量超过或小于可用数量！', '#newTd8_' + (num) + '');
                            $('#newTd8_text_' + num + '').val(Number($('#newTd5_' + num + '').html()));
                            $('#newTd8_text_' + num + '').focus();
                            return null;
                        }
                        this.parentNode.newTd = false;
                        $(this.parentNode).html($(this).val());
                    });
                }
            });
        }
    }
    //行
    var printArry = new Array;
    //打印二维码
    function pinErwm(){
        var faliaohao=$('#faliaohao').val();
        COMMON.WS.restful('cuttool/pinErwm', 'post', JSON.stringify(printArry), true, function (data) {
            $("#pintUrl").val(data.url);
            printIfrname=layer.open({
                type:2,
                shade: false,
                title: false,
                scrollbar:false,
                shadeClose: true,
                area: ['50%', '50%'],
                cancel:function(index_){
                    var lay=layer.confirm("发料号"+faliaohao+'，还未打印确认关闭？关闭后将无法补打！',{
                        title:'<span style="color:red;">安全提示</span>',
                        btn:['确定','取消']
                    },function(){
                        layer.close(lay);layer.close(index_);
                    });
                    return false;
                },
                end:function(){
                    //删除二维码图片
                    COMMON.WS.restful("cuttool/removeImages", "post", faliaohao, true, function (map) {});
                    printArry=new Array();
                },
                content:["cuttool_borrow_print.html","no"]
            });
        });
    };

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

        //设置表格有效高度
        var height = window.screen.height / 3;
        $('.table-body').css("height", height + "px");

        /*添加按钮监听-主要 */
        $('#addTr').click(function () {
            if($('#kufang').val() == ''){
                layer.tips('请填写库房！', '#kufang');
                $('#kufang').focus();
                return null;
            }
            if($('#lingliaoren').val() == ''){
                layer.tips('请填写领料人！', '#lingliaoren');
                $('#lingliaoren').focus();
                return null;
            }
            var hashMap = {};
            openHtml(hashMap);
        });

        /*保存按钮事件监听*/
        $('#saveBtn').click(function () {
            //当选择发到刀具复选框后，发到刀具文本框必须输入；
            if($('#checkbox_id').prop('checked') == true){
                if($("#fadaodaoju").val() == ""){
                    $("#fadaodaoju").focus();
                    layer.tips('请填写刀具编号！', '#fadaodaoju');
                    return null;
                }
            }
            //领料人必填
            if($("#lingliaoren").val() == ""){
                $("#lingliaoren").focus();
                layer.tips('请填写领料人！', '#lingliaoren');
                return null;
            }
            //库房必填
            if($("#kufang").val() == ""){
                $("#kufang").focus();
                layer.tips('请填写库房！', '#kufang');
                return null;
            }
            //题头
            var head = new Array;
            //行
            var row = new Array;
            //提交数据集合
            var upload = new Array;
            //所有行判断可用数量
            var purchaseTable = $('#purchaseTable tbody tr');
            if(purchaseTable.length == 0){
                layer.msg('发料失败，物料信息为空不可发料 ');
                return null;
            }
            for (var i = 0; i < purchaseTable.length; i++) {
                var rowIndexo = purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("span").eq(0).html();;
                if($('#newTd5_'+rowIndexo).html()=='0' || $('#newTd5_'+rowIndexo).html()=='null'){
                    layer.tips('可用数量不足，无法保存！', '#newTd5_' + (rowIndexo) + '');
                    return null;
                }
                //物料是否为空
                if($('#newTd1_'+rowIndexo).html()==""){
                    layer.tips('物料不允许为空，无法保存！', '#newTd1_' + (rowIndexo) + '');
                    return null;
                }
                if ($(purchaseTable).parent().children("tr").eq(i).attr("class") == 'add') {
                    //物料行
                    var map = {
                        type:'5',
                        faliaohao: $('#faliaohao').val(),
                        wuliao_name: $('#newTd1_' + rowIndexo).html(),     //物料
                        wuliao: wuliaoArr[$('#newTd1_' + rowIndexo).html()], //物料id
                        miaoshu: $('#newTd2_' + rowIndexo).html(),
                        danwei: $('#newTd3_' + rowIndexo).html(),
                        wupinxinjiu: $('#selectHtml' + rowIndexo).val(),
                        keyongshuliang: $('#newTd5_' + rowIndexo).html(),
                        huowei_id: $('#newTd6_' + rowIndexo).html() == "" ? "" : huoweiArray[$('#newTd6_' + rowIndexo).html()].toString(), //货位id
                        huowei: $('#newTd6_' + rowIndexo).html(),   //货位
                        pinpai: $('#newTd7_' + rowIndexo).html(),
                        fafangshuliang: $('#newTd8_' + rowIndexo).html()
                    };
                    row.push(map);
                    printArry.push(map);
                }
            }
            if(row.length == 0){
                layer.msg('发料失败，没有可以保存的物料！');
                return null;
            }
            //主数据
            head.push({
                faliaohao : $('#faliaohao').val(),
                fadaodaoju : $('#fadaodaoju').val(),
                lingliaoren : $('#lingliaoren').val(),
                shiyongshebei : $('#shiyongshebei').val(),
                shiyongshebei_id:$("#shiyongshebei_id").val(),
                kufang : $('#kufang').val(),
                kufang_val : $('#kufang_val').val(),
                beizhu : $('#beizhu').val(),
                guanliandaoju : $('#checkbox_id').prop('checked')==true?1:0
            });
            upload.push({
                head : head,
                row : row,
                fileName : 'orderpick.txt'
            });
            upload = JSON.stringify(upload);
            //保存
            COMMON.WS.restful("faliao/saveData", "post", upload, true, function (map) {
                //如果等于0，代表此物料不存在该库房
                if (map.result == '0') {
                    layer.tips('发料失败，该物料不在此货位。 ',"#newTd6_"+map.row);
                }else  if(map.result == '1'){
                    layer.tips('发料失败，该品牌的物料没有库存数量 ',"#newTd7_"+map.row);
                }else if(map.result == '2'){
                    layer.tips('发料失败，该物料不在此库房。 ',"#newTd1_"+map.row);
                }else if(map.result == '3'){
                    layer.msg('发料失败，立体库工作繁忙 ');
                }else if(map.result == '4'){
                    layer.msg('发料失败，立体库共享文件夹不存在 ');
                }else if(map.result == '5'){
                    layer.msg('发料失败，未知的错误，数据以回滚! ');
                }else {
                    layer.msg("发料成功，已发送立体库！");
                    pinErwm();
                    $('#faliaohao').val(map.cissueTitle);
                    for (var i = 0; i < purchaseTable.length; i++) {
                        purchaseTable.eq(i).children("td").eq(0).children("label").eq(0).children("input").eq(0).remove()
                        //保存后的物料行不可编辑
                        $('#newTd1_'+(i+1)).unbind();
                        $('#newTd2_'+(i+1)).unbind();
                        $('#newTd3_'+(i+1)).unbind();
                        $('#newTd4_'+(i+1)).unbind();
                        $('#newTd5_'+(i+1)).unbind();
                        $('#newTd6_'+(i+1)).unbind();
                        $('#newTd7_'+(i+1)).unbind();
                        $('#newTd8_'+(i+1)).unbind();
                        $('#checkbox_id').unbind();//发到刀具失效

                        $('#fadaodaoju').attr("readonly",true);//发到刀具不可编辑
                        $('#kufang').attr("readonly", true);//库房不可编辑
                        $('#lingliaoren').attr("readonly", true);//领料人不可编辑
                        $('#shiyongshebei').attr("readonly", true);//使用设备不可编辑

                        //$('#newTd5_'+(i+1)).html(Number( $('#newTd5_'+(i+1)).html())-Number( $('#newTd8_'+(i+1)).html()));//剩余可用数量
                        $(purchaseTable).parent().children("tr").eq(i).attr("class","update");//将所有提交过物料改变状态；
                    }
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
                        var purchaseTable = $('#purchaseTable tbody tr');
                        for (var i = 0; i < checkedTr.length; i++) {
                            var checkable = checkedTr.eq(i);
                            if (checkable.prop('checked') == true) {
                                //删除
                                checkable.parent().parent().parent().remove();
                            }
                        }
                        layer.close(lay);
                    } catch (e) {
                        layer.msg("An exception occured in the script.Error name: " + e.name
                            + " script.Error message: " + e.message);
                    }
                });
            }
        });

        /*checkbox click监听-主要*/
        $('#checkAll').change(function () {
            if ($('#checkAll').prop('checked') == true) {
                $("input[name='trCheck']").prop('checked', true);
            } else {
                $("input[name='trCheck']").prop('checked', false);
            }
        });
        function check_fun() {
            if ($('#checkbox_id').prop('checked') == true) {
                $('#addTr').css('background-color', '#e5e5e5');
                $('#addTr').css('color', '#000000');
                $('#addTr').unbind();   //去掉按钮事件
                $('#purchaseTable tbody tr').remove();
                $('#fadaodaoju').val('');   //发到刀具
                $('#fadaodaoju_bt').show(); //必填
                $('#fadaodaoju').attr("readonly", false);//发到刀具可编辑
                $('#endType').val(false);   //按钮是否可点击条件
            } else {
                $('#addTr').css('background-color', '#449dd7');
                $('#addTr').css('color', '#ffffff');
                $('#endType').val(true);
                $('#fadaodaoju').val('');
                $('#fadaodaoju_bt').hide();
                $('#purchaseTable tbody tr').remove();
                $('#fadaodaoju').attr("readonly",true);
                $('#addTr').click(function () {
                    var hashMap = {};
                    openHtml(hashMap);
                });
            }
        }
        //发到刀具
        $('#checkbox_id').change(function () {
            var purchaseTable = $('#purchaseTable tbody tr');
            if(purchaseTable.length==0){
                check_fun();
                return null;
            };
            var layerConfirm = layer.confirm("发到刀具，所有未保存的数据将重置！", {
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    check_fun();
                    layer.close(layerConfirm);  //关闭提示窗
                },function () {
                    if ($('#checkbox_id').prop('checked') == true) {
                        $('#checkbox_id').prop('checked',false);
                    }else{
                        $('#checkbox_id').prop('checked',true);
                    }
                }
            );
        });

        //绑定回车事件
        $('#fadaodaoju').keydown(function () {
            //回车
            if (event.keyCode == 13) {
                //库房必填
                if($("#kufang").val() == ""){
                    $("#kufang").focus();
                    layer.tips('请填写库房！', '#kufang');
                    return null;
                }
                var map = {
                    popMenu: true,          //是否弹出页面 如果是false 则直接返回查询结果(默认是true)
                    //查询条件
                    searchValue: this.value,
                    //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                    readonly: false,
                    //自定义显示前两列列名
                    colName: '刀具编号,刀具描述',
                    //searchTable:表实体类
                    searchTable: 'CCuttoolBasedata',
                    //searchCol：刀具编号、刀具描述
                    searchCol: 'cuttoolNo,cuttoolDescription'
                };
                //查询组件
                COMMON_SEARCH.OPEN_PAGE.openPage(map, function (HashMap) {
                    //将刀具编号赋值到发到刀具文本框；
                    $('#fadaodaoju').val(HashMap.cuttoolNo);
                    $('#purchaseTable tbody tr').remove();
                    //查询刀具行
                    COMMON.WS.restful("faliao/selectRow", "post", HashMap.cuttoolNo, true, function (data) {
                        //查询已消耗物料
                        for(var i=0,k=1;i<data.length;i++,k++) {
                            var map = {};
                            map.num = k;
                            map.wuliao = data[i][0];            //物料
                            wuliaoArr[map.wuliao] = data[i][6]; //物料IDW
                            map.miaoshu = data[i][1];           //描述
                            map.danwei = data[i][2];            //单位
                            map.wuliaoxinjiu = data[i][3];      //物料新旧
                            map.keyongshuliang = data[i][4]==null?0:data[i][4];    //可用数量
                            map.huowei = "";            //货位
                            map.pinpai = data[i][5]==null?'':data[i][5]; //品牌
                            //map.fafangshuliang = data[i][4]==null?0:data[i][4];    //发放数量
                            map.fafangshuliang = data[i][7]==null?0:data[i][7];    //发放数量
                            openHtml(map,true);
                        }
                    });
                });
            }
        });
        //change事件，当值发生改变时触发
        $('#fadaodaoju').change(function () {
            //库房必填
            if($("#kufang").val() == ""){
                $("#kufang").focus();
                layer.tips('请填写库房！', '#kufang');
                return null;
            }
            var obj = {
                popMenu: false,          //是否弹出页面 如果是false 则直接返回查询结果(默认是true)
                //查询条件
                searchValue: this.value,
                //searchTable:表实体类
                searchTable: 'CCuttoolBasedata',
                //searchCol：刀具编号、刀具描述
                searchCol: 'cuttoolNo,cuttoolDescription'
            };
            //查询组件
            COMMON_SEARCH.OPEN_PAGE.openPage(obj, function (map) {
                var list = eval(JSON.stringify(map));
                if (list.length > 0) {
                    //查询全部时
                    if($('#fadaodaoju').val().indexOf( "%") > -1){
                        $('#fadaodaoju').val(list[0].cuttoolNo);
                        $('#purchaseTable tbody tr').remove();
                        //查询刀具行
                        COMMON.WS.restful("faliao/selectRow", "post", list[0].cuttoolNo, true, function (data) {
                            //查询已消耗物料
                            for(var i=0,k=1;i<data.length;i++,k++) {
                                var map = {};
                                map.num = k;
                                map.wuliao = data[i][0];            //物料
                                wuliaoArr[map.wuliao] = data[i][6]; //物料ID
                                map.miaoshu = data[i][1];           //描述
                                map.danwei = data[i][2];            //单位
                                map.wuliaoxinjiu = data[i][3];      //物料新旧
                                map.keyongshuliang = data[i][4]==null?0:data[i][4];    //可用数量
                                map.huowei = "";            //货位
                                map.pinpai = data[i][5]==null?'':data[i][5]; //品牌
                                //map.fafangshuliang = data[i][4]==null?0:data[i][4];    //发放数量
                                map.fafangshuliang = data[i][7]==null?0:data[i][7];    //发放数量
                                openHtml(map,true);
                            }
                        });
                        return null;
                    }
                    for (var i = 0; i < list.length; i++) {
                        if($('#fadaodaoju').val() == list[i].cuttoolNo ||
                           $('#fadaodaoju').val() == list[i].cuttoolDescription ){
                            $('#fadaodaoju').val(list[i].cuttoolNo);
                            $('#purchaseTable tbody tr').remove();
                            //查询刀具行
                            COMMON.WS.restful("faliao/selectRow", "post", list[0].cuttoolNo, true, function (data) {
                                //查询已消耗物料
                                for(var i=0,k=1;i<data.length;i++,k++) {
                                    var map = {};
                                    map.num = k;
                                    map.wuliao = data[i][0];            //物料
                                    wuliaoArr[map.wuliao] = data[i][6]; //物料ID
                                    map.miaoshu = data[i][1];           //描述
                                    map.danwei = data[i][2];            //单位
                                    map.wuliaoxinjiu = data[i][3];      //物料新旧
                                    map.keyongshuliang = data[i][4]==null?0:data[i][4];    //可用数量
                                    map.huowei = "";            //货位
                                    map.pinpai = data[i][5]==null?'':data[i][5]; //品牌

                                    map.fafangshuliang = data[i][4]==null?0:data[i][4];    //发放数量
                                    openHtml(map,true);
                                }
                            });
                            break;
                        }
                    }
                }else{
                    $("#fadaodaoju").focus();
                    $('#purchaseTable tbody tr').remove();
                    layer.tips('刀具"'+$("#fadaodaoju").val()+'"不存在 ', '#fadaodaoju');
                    $("#fadaodaoju").val('');
                }
            });
        });

        //人员回车事件
        $('#lingliaoren').keydown(function (e) {
            if (e.keyCode == 13) {
                searchVal.popMenu = true;
                searchVal.readonly = false;
                searchVal.searchValue = $(this).val();
                searchVal.searchTable = 'CBorrower';
                searchVal.searchCol = 'employeeCardNo,borrowedName';
                searchVal.colName = '员工号,借用者';
                COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function (result) {
                    $('#lingliaoren').val(result.borrowedName);
                });
            }
        });
        //change事件，当值发生改变时触发
        $('#lingliaoren').change(function (e) {
            var obj = {
                popMenu: false,
                searchValue: this.value,
                searchTable: 'CBorrower',
                searchCol: 'employeeCardNo,borrowedName'
            };
            //查询组件
            COMMON_SEARCH.OPEN_PAGE.openPage(obj, function (map) {
                var list = eval(JSON.stringify(map));
                if (list.length > 0) {
                    //查询全部时
                    if ($('#lingliaoren').val().indexOf("%") > -1) {
                        $('#lingliaoren').val(list[0].borrowedName);
                        return null;
                    }
                    //根据调教查询时
                    for(var i=0;i<list.length;i++){
                        if($('#lingliaoren').val() == list[i].borrowedName ||
                           $('#lingliaoren').val() == list[i].employeeCardNo){
                            $('#lingliaoren').val(list[i].borrowedName);
                            break;
                        }
                    }
                }else{
                    $("#lingliaoren").focus();
                    layer.tips('领料人"'+ $("#lingliaoren").val()+'"不存在 ', '#lingliaoren');
                    $("#lingliaoren").val('');
                }
            });
        });

        //库房回车事件
        $('#kufang').keydown(function (e) {
            if (e.keyCode == 13) {
                var v = $(this).val();
                if (v.indexOf('%') != -1) {
                    searchVal.popMenu = true;
                    searchVal.readonly = false;
                    searchVal.searchValue = v;
                    searchVal.searchTable = 'CStorageRoomDefinition';
                    searchVal.searchCol = 'storageRoomNo,storageRoomDescribe,storageRoomId';
                    searchVal.colName = '库房编号,库房描述';
                    COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function (result) {
                        $('#kufang').val(result.storageRoomNo);
                        $('#kufang_val').val(result.storageRoomId);
                    });
                }
            }
        });
        //change事件，当值发生改变时触发
        $('#kufang').change(function (e) {
            $('#purchaseTable tbody tr').remove();
            $('#fadaodaoju').val('');
            var obj = {
                popMenu: false,
                searchValue: this.value,
                searchTable: 'CStorageRoomDefinition',
                searchCol: 'storageRoomNo,storageRoomDescribe,storageRoomId'
            };
            //查询组件
            COMMON_SEARCH.OPEN_PAGE.openPage(obj, function (map) {
                var list = eval(JSON.stringify(map));
                if (list.length > 0) {
                    //查询全部时
                    if ($('#kufang').val().indexOf("%") > -1) {
                        $('#kufang').val(list[0].storageRoomNo);
                        $('#kufang_val').val(list[0].storageRoomId);
                        return null;
                    }
                    //根据调教查询时
                    for(var i=0;i<list.length;i++){
                        if($('#kufang').val() == list[i].storageRoomNo ||
                           $('#kufang').val() == list[i].storageRoomDescribe){
                            $('#kufang').val(list[i].storageRoomNo);
                            $('#kufang_val').val(list[i].storageRoomId);
                            break;
                        }
                    }
                }else{
                    $("#kufang").focus();
                    layer.tips('库房"'+$("#kufang").val()+'"不存在 ', '#kufang');
                    $("#kufang").val('');
                    $('#kufang_val').val('');
                }
            });
        });

        //设备回车事件
        $('#shiyongshebei').keydown(function (e) {
            if (e.keyCode == 13) {
                var searchVal = {
                    popMenu: true,
                    searchValue: $('#shiyongshebei').val(),
                    searchTable: 'CMechanicalEquipment',
                    searchCol: 'equipmentAssetsNo,equipmentName,mechanicalId',
                    colName: '机床编号,机床名称'
                };
                /*设备查询双击事件回调函数*/
                COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function (result) {
                    $('#shiyongshebei_id').val(result.mechanicalId);//设备ID
                    $('#shiyongshebei').val(result.equipmentName);
                });
            }
        });
    }
    //返回入口
    return {
        "init": init
    };
});