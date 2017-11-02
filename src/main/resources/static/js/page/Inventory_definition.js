/**
 * Created by guofeng on 2017/9/28.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function($, COMMON, layer, COMMON_SEARCH){
    var af={
        load:function(){
            //layer config
            COMMON.LAYER_CONFIG.config();
            var a=af.event();a=null;//渲染事件
            a=af.table.load(null,true);a=null;//渲染表格 默认待定 有事件
        },
        /**
         * 获取系统时间
         * @param type
         * @returns {string}
         */
        date:function(type){
            var d=new Date(), str='';
            str+=d.getFullYear()+'-'; //获取当前年份
            str+=d.getMonth()+1+'-'; //获取当前月份（0——11）
            if(type=="yyyy-MM-dd"){
                str+=d.getDate();
            }else{
                str+=d.getDate()+' ';
                str+=d.getHours()+':';
                str+=d.getMinutes()+':';
                str+=d.getSeconds();
            };d=null;
            return str;
        },
        /**
         * type=true 直接保存然后拍照 type=false 保存
         * @param type
         */
        save:function(type){
            if($("#adjustment_type").is(':checked')){
                layer.msg("已传送调整不允许修改数据！");
                return null;
            }else if($("#Inventory_name").val()==''){
                layer.tips("请填写名称！","#Inventory_name");
                $("#Inventory_name").focus();
                return null;
            }else if($("#approval_control").val()=='超出允差'){
                if($("#number_just").val()==''&&$("#number_negative").val()==''&&$("#value_just").val()==''&&$("#value_negative").val()==''){
                    layer.msg("请在数量(%)或者值的文本框中输入数据！");
                    return null;
                };
            };
            var index_=layer.load(3, {shade: [0.2, '#393D49']})//遮罩
            var map={
                snapshot_date:af.date(),
                saveType:type,//是否为拍照或者保存
                Inventory_id:$("#Inventory_id").val(),
                Inventory_name:$("#Inventory_name").val(),
                Inventory_explain:$("#Inventory_explain").val(),
                Inventory_date:$("#Inventory_date").val(),
                approval_control:$("#approval_control").val(),
                number_just:$("#number_just").val(),
                number_negative:$("#number_negative").val(),
                value_just:$("#value_just").val(),
                value_negative:$("#value_negative").val(),
                dynamic_label:$("#dynamic_label").is(':checked')?'1':'0',
                Inventory_range:function(){
                    var table=$("#zkc_table tbody tr");
                    var data="";
                    for(var i=0;i<table.length;i++){
                        data+=table.eq(i).children("td").eq(0).text()+"|";
                    };table=null;
                    return data=data.substring(0,data.length-1);
                }()
            };
            var a=COMMON.WS.ajax("cstorageRoomDefinition/save", "post", JSON.stringify(map), true, function (data){
                layer.close(index_);index_=null;
                var title_name="保存";
                if(type){title_name="拍照";};
                if(data.result!='fail'&&data.result!='repeat'){
                    $("#Inventory_id").val(data.result);
                    if(type){
                        $("#snapshot_date").val(map.snapshot_date);
                        $("#snapshot_type").prop("checked",true)
                    };
                };
                layer.msg(title_name+(data.result=='repeat'?'失败，名称不允许重复！':data.result!='fail'&&data.result!='repeat'?'成功！':"失败！"));
                map=null;type=null;data=null;
            });a=null;
        },
        /**
         * 事件集合
         */
        event:function(){
            /*日期控件绑定*/
            var a=$("#Inventory_date").datetimepicker({
                format: 'yyyy-mm-dd hh:ii:ss',
                autoclose: true,    //选择日期后自动关闭
                pickerPosition: 'bottom-left',
                todayBtn: 1,
                linkFormat: 'yyyy-mm-dd hh:ii:ss',
                minView: 'month'
            });a=null;
            a=$("#inventory_date").val(af.date(null));a=null;
            /*查找*/
            $("#select").click(function(){
                $("#select").hide();
                var map={
                    searchVal:{
                        popMenu: true,
                        searchValue: '%',
                        searchTable: 'CInventoryHead',
                        searchCol: 'inventoryName,inventoryExplain,id,' +
                        'inventoryDate,snapshotDate,inventoryRange,' +
                        'approvalControl,numberJust,numberNegative,' +
                        'valueJust,valueNegative,dynamicLabel,snapshotType,adjustmentType',
                        colName: '名称,说明'
                    },
                    open:function(result){
                        $("#Inventory_id").val(result.id),
                        $("#Inventory_name").val(result.inventoryName),
                        $("#Inventory_explain").val(result.inventoryExplain);
                        if(result.inventoryDate&&result.inventoryDate!='null') {//快照日期
                            $("#Inventory_date").val(new Date(Number(result.inventoryDate)).toLocaleString());
                        };
                        $("#approval_control").val(result.approvalControl),
                        $("#number_just").val(result.numberJust),
                        $("#number_negative").val(result.numberNegative),
                        $("#value_just").val(result.valueJust),
                        $("#value_negative").val(result.valueNegative);
                        if(result.dynamicLabel=='1'||
                            result.dynamicLabel==undefined){//是否允许动态使用标签
                            $("#dynamic_label").prop('checked', true);
                        }else{
                            $("#dynamic_label").prop('checked', false);
                        };
                        if(result.snapshotType=='1'){//完成快照
                            $("#snapshot_type").prop('checked', true);
                        }else{
                            $("#snapshot_type").prop('checked', false);
                        };
                        if(result.adjustmentType=='1'){//是否已传送
                            $("#adjustment_type").prop('checked', true);
                        }else{
                            $("#adjustment_type").prop('checked', false);
                        };
                        if(result.snapshotDate&&result.snapshotDate!='null'){//快照日期
                            $("#snapshot_date").val(new Date(Number(result.snapshotDate)).toLocaleString());
                        };
                        //子库存
                        if(result.inventoryRange){
                            var spl=result.inventoryRange.split("|");
                            var a=$("#zkc_table tbody tr").remove();
                            for(var i=0;i<spl.length;i++){
                                var hmp={
                                    num:i+1,
                                    son_stock:spl[i]
                                };
                                a=af.table.load(hmp,true);hmp=null;
                            };
                            if(spl[spl.length-1]!=''){
                                a=af.table.load(null,true);//添加一空列
                            };
                            spl=null;a=null;
                        };map=null;result=null;
                        $("#select").show();
                    }
                };
                var a=COMMON_SEARCH.OPEN_PAGE.openPage(map.searchVal, map.open);a=null;
            });
            /*审批控制*/
            $('#type_state').click(function () {
                $('#type_state ul').toggle();
                $('#type_state ul li').click(function (e) {
                    var v=$(this).html();
                    $('#approval_control').val(v);
                });
            });
            //取消货签
            a=$("#cancelSignBtn").click(function(){
                if($("#adjustment_type").is(':checked')){
                    layer.msg("已传送调整不允许取消货签！");
                    return null;
                };
                var lay=layer.confirm('是否确认取消货签？', {
                    btn:['确定', '取消'] //按钮
                },function(){
                    var index_=layer.load(3, {shade: [0.2, '#393D49']})//遮罩
                    var id=$("#Inventory_id").val();
                    var a=COMMON.WS.ajax("cstorageRoomDefinition/cancel", "post", id, true, function (data){
                        layer.close(index_);index_=null;
                        if(data){
                            layer.msg("货签取消成功！");
                        }else{
                            layer.msg("货签取消失败！")
                        };
                    });id=null;a=null;
                });lay=null;
                return null;
            });a=null;
            //取消盘点
            a=$("#cancelInventoryBtn").click(function(){
                if($("#adjustment_type").is(':checked')){
                    layer.msg("已传送调整不允许取消盘点！");
                    return null;
                }
                var id=$("#Inventory_id").val();
                var a=COMMON.WS.ajax("cstorageRoomDefinition/cancelInventory", "post", id, true, function (data){
                    layer.close(index_);index_=null;
                    if(data){
                        layer.msg("货签取消成功！");
                    }else{
                        layer.msg("货签取消失败！")
                    };
                });id=null;a=null;
            });a=null;
            //保存
            a=$("#saveBtn").click(function(){
                var a=af.save(false);a=null;
            });a=null;
            //拍照
            a=$("#photographBtn").click(function(){
                var a=af.save(true);a=null;
            });a=null;
            //盘点子库存
            a=$(".radio").click(function(){
                if($(this).val()=='全部'){
                    var a=af.table.remove(false);a=null;
                }else{//待定
                    var a=af.table.remove(true);a=null;
                };
            });a=null;
        },
        /**
         * 表格
         */
        table:{
            num:1,
            /**
             * name=表名
             * type false=全部 true=待定
             * @param type
             */
            remove:function(type){
                af.table.num=1;
                var a=$("#zkc_table tbody tr").remove();a=null;
                if(type){//待定
                    var a=af.table.load(null,type);a=null;
                }else{//全部
                    var a=af.table.select(null,type);a=null;
                };type=null;
            },
            /**
             * HashMap=数据,没有就是null
             * event=是否添加点击事件 true=是 false=否
             * @param HashMap
             * @param event
             */
            load:function(HashMap,event){
                if(HashMap){//全部
                    var a=af.table.add(HashMap,event);a=null;
                }else{//待定
                    var map={num:af.table.num++,son_stock:''};
                    var a=af.table.add(map,event);a=null;map=null;
                };HashMap=null;event=null;
            },
            add:function(HashMap,event){
                var a=$("#zkc_table tbody").append('<tr class="newTr" style="height:25px;padding:0;margin:0;">'+
                    '<td style="padding:0;width:100%;line-height:25px;" type="text" typeName="货位">' +
                    '<div class="col-md-10 zkcAll" id="'+HashMap.num+'_'+HashMap.son_stock+'" style="height:25px;">'+HashMap.son_stock+'</div>'+
                    '<div class="col-md-1 zkcRem" style="margin-left:20px;"><a href="#" class="glyphicon glyphicon-remove" onclick="(function(e){var a=$(\'#zkc_table tbody tr\').length;if(a==1){return null;};var tr=$(e).parent().parent().parent();if($(tr).children(\'td\').eq(2).html()!=\'\'){$(\'.\'+$(tr).children(\'td\').eq(2).html()).remove()};tr.remove();})(this);"></a></div>' +
                    '</td>'+
                '</tr>');a=null;
                if(event){a=af.table.event("#"+HashMap.num+'_'+HashMap.son_stock);a=null;}else{$(".zkcRem").remove();};
                HashMap=null;event=null;
            },
            select:function(e,popMenu){
                var map={
                    searchVal:{
                        popMenu: popMenu,
                        searchValue: '%',
                        searchTable: 'CStorageRoomDefinition',
                        searchCol: 'storageRoomNo,storageRoomDescribe',
                        colName: '库房编号,库房说明'
                    },
                    open:function(result){
                        if(!result){if(e){$(e).html('')};map=null;result=null;return null;};
                        if(popMenu){//待定
                            var type=true;
                            $.each($(".zkcAll"),function(index,key){
                                if($(this).html()==result.storageRoomNo){
                                    type=null;
                                    layer.tips('库房不允许重复，请重新选择！', e);
                                    return null;
                                };
                            });
                            if(type){
                                $(e).html(result.storageRoomNo);
                                var a=af.table.load(null,popMenu);a=null//新增 待定 有事件
                            };result=null;
                        }else{//全部
                            var obj=eval(result);result=null;
                            for(var i=0;i<obj.length;i++){
                                var a={num:i,son_stock:obj[i].storageRoomNo};
                                a=af.table.load(a,popMenu);a=null;
                            };obj=null;
                        };map=null;
                    }
                };
                var a=COMMON_SEARCH.OPEN_PAGE.openPage(map.searchVal, map.open);a=null;
            },
            event:function(e){
                //点击行事件
                var a=$(e).click(function(){af.table.select(this,true);});a=null;e=null;
            }
        }
    };
    //返回入口
    return {
        "init":af.load
    };
});