/**
 * Created by guofeng on 2017/9/28.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker', 'jQueryPrint'], function($, COMMON, layer, COMMON_SEARCH){
    var af={
        load:function(){
            //layer config
            COMMON.LAYER_CONFIG.config();
            af.event();
            var username=COMMON.ECODE.Base64.decode($.cookie('username'));
            $("#Inventory_user").val(username);username=null;
            var height=window.screen.height/2;
            $(".table-body").css("height", height+"px");
        },
        event:function(){
            $("#select").click(af.select);//选择盘点题头
            $("#Inventory_user").click(af.inventoryUser);//默认盘点人
            $("#selectList").click(af.selectList);//查询
            $("#addRow").click(af.table.addRow);//添加行
            $("#saveBtn").click(af.saveData);//保存
            $("#printId").click(af.print);//打印
        },
        select:function(){
            $(this).hide();
            var map={
                searchVal:{
                    popMenu:true,
                    searchValue:'',
                    searchTable:'CInventoryHead',
                    searchCol:'inventoryName,inventoryExplain,id,snapshotDate,dynamicLabel,adjustmentType',
                    colName:'名称,说明'
                },
                open:function(result){
                    af.table.clear();//恢复默认
                    $("#Inventory_id").val(result.id),
                    $("#adjustment_type").val(result.adjustmentType),
                    $("#Inventory_name").val(result.inventoryName),
                    $("#Inventory_explain").val(result.inventoryExplain);
                    if(result.snapshotDate==null||result.snapshotDate=='null'){
                        $("#snapshot_date").val('');
                    }else{
                        $("#snapshot_date").val(new Date(Number(result.snapshotDate)).toLocaleString());
                    };
                    if(result.dynamicLabel!=null&&result.dynamicLabel.toString()=='1'){
                        $("#addRow").show();
                    }else{
                        $("#addRow").hide();
                    };
                    map=null;
                    $("#select").show();
                }
            };
            var a=COMMON_SEARCH.OPEN_PAGE.openPage(map.searchVal, map.open);a=null;
            return null;
        },
        selectList:function(type,load){
            if($("#Inventory_id").val()==''){
                layer.msg("请选择需要盘点的库！");
                return null;
            };
            var index_=load
            $("#selectList").hide();
            if(index_==undefined){index_=layer.load(3, {shade:[0.2, '#393D49']});};//遮罩
            var id=$("#Inventory_id").val();//ID
            af.table.clear();//恢复默认
            var a=COMMON.WS.ajax("cstorageRoomDefinition/selectList", "post", id, true, function (data){
                if(data.length>1){af.table.i=Number(data[1].goods_sign)-Number(data[0].goods_sign);};
                for(var i=0;i<data.length;i++){
                    var map={
                        class:'add',
                        new_goods_sign:data[i].new_goods_sign==null?'':data[i].new_goods_sign,//是否新货签
                        material_no:data[i].material_no==null?'':data[i].material_no, //物料编码
                        material_describe:data[i].material_describe==null?'':data[i].material_describe,//物料描述
                        unit:data[i].unit==null?'':data[i].unit,//单位
                        Inventory_number:data[i].Inventory_number==null?'':data[i].Inventory_number,//盘点数量
                        son_stock:data[i].son_stock==null?'':data[i].son_stock,//子库存
                        goods_position:data[i].goods_position==null?'':data[i].goods_position,//货位
                        batch:data[i].batch==null?'':data[i].batch,//批次
                        sequence:data[i].sequence==null?'':data[i].sequence,//序列
                        Inventory_version:data[i].Inventory_version==null?'':data[i].Inventory_version, //版本
                        Inventory_user:data[i].Inventory_user==null?$("#Inventory_user").val():data[i].Inventory_user,//盘点人
                        snapshot_number:data[i].snapshot_number==null?'':data[i].snapshot_number//拍照数量
                    };
                    af.table.num=data[i].goods_sign==null?0:data[i].goods_sign;//货签编号
                    af.table.load(map);map=null;
                };data=null;
                layer.close(index_);index_=null;
                $("#selectList").show();
            });id=null;a=null;
            return null;
        },
        inventoryUser:function(){
            var map={
                searchVal:{
                    popMenu:true,
                    searchValue:'',
                    searchTable:'CRegist',
                    searchCol:'name,organization',
                    searchColNum:'0,1',
                    colName:'用户名,组织'
                },
                open:function(result){
                    $("#Inventory_user").val(result.name);
                    $(".Inventory_user").html(result.name);
                    map=null;result=null;
                }
            };
            var a=COMMON_SEARCH.OPEN_PAGE.openPage(map.searchVal, map.open);a=null;
            return null;
        },
        table:{
            i:1,//每次货签编号+i 默认1
            num:0,//货签编号
            clear:function(){//恢复默认
                var a=af.table.i=1;
                a=af.table.num=0;
                a=$("#inventoryTable tbody tr").remove();
                a=null;return null;
            },
            loadDing:function(node,dblclick,openPage){
                var searchVal=$('#commonSearchValue').val().trim();
                if(searchVal==''){searchVal='%';};
                var a=COMMON.WS.restful('cstorageRoomDefinition/selectMateriel', 'post', searchVal, true, function (data){
                    var a=$('#searchTable tbody').remove();a=null;
                    for (var i = 0; i < data.length; i++){
                        $('#searchTable').append('<tr class="commonTr" style="cursor:pointer;"></tr>');
                        var lastTr = $('#searchTable tbody tr:last');
                        lastTr.append('<td style="width:50%;">'+data[i].materialNo物料编码+'</td>');
                        lastTr.append('<td style="width:50%;">'+data[i].materialDescribe说明+'</td>');
                        lastTr.append('<td style="display:none;">'+data[i].availableQuantity拍照数量+'</td>');
                        lastTr.append('<td style="display:none;">'+data[i].storage_room_no子库存+'</td>');
                        lastTr.append('<td style="display:none;">'+data[i].material_unit单位+'</td>');
                        lastTr.append('<td style="display:none;">'+(data[i].cargoSpaceNo货位==null?"":data[i].cargoSpaceNo货位)+'</td>');
                        lastTr.append('<td style="display:none;">'+data[i].batch_control批次+'</td>');
                        lastTr.append('<td style="display:none;">'+data[i].sequence_control序列+'</td>');
                        lastTr.append('<td style="display:none;">'+(data[i].material_version_no版本==null?"":data[i].material_version_no版本)+'</td>');
                    };data=null;
                    $('.commonTr').bind('dblclick', function(e){
                        var tr=$(e.target).parent();e=null;
                        layer.close(openPage);openPage=null;
                        var map={
                            materialNo物料编码:tr.children("td").eq(0).html(),
                            materialDescribe说明:tr.children("td").eq(1).html(),
                            availableQuantity拍照数量:tr.children("td").eq(2).html(),
                            storage_room_no子库存:tr.children("td").eq(3).html(),
                            material_unit单位:tr.children("td").eq(4).html(),
                            cargoSpaceNo货位:tr.children("td").eq(5).html(),
                            batch_control批次:tr.children("td").eq(6).html(),
                            sequence_control序列:tr.children("td").eq(7).html(),
                            material_version_no版本:tr.children("td").eq(8).html()
                        };
                        tr=null;e=null;dblclick(node,map);node=null;map=null;
                        $('.commonTr').unbind();
                        $('#commonSearchBtn').unbind();
                        $('#commonSearchValue').unbind();
                        return null;
                    });
                });a=null;searchVal=null;
            },
            openWindow:'<div style="width:100%;margin-right:0;"><div class="account-nav-title bg-449dd7"><span>通用查询页面</span></div><div style="margin-top:10px;align:center center;"><div class="col-md-2 text-right" style="padding-right:0;padding-top:5px;"><span>查询内容</span></div><div class="col-md-4"><input id="commonSearchValue" type="text" class="form-control" placeholder="输入查询内容"/></div><div class="col-md-2 col-md-offset-1"><div class="sesol-btn txt-fff bg-449dd7" id="commonSearchBtn">查询</div></div></div><div class="margin-top-20"><div class="col-md-11" style="margin-left:20px;margin-top:10px;"><div style="padding-right:17px;"><table class="table table-bordered text-center" id="commonSearchTableHead"><thead><tr><td style="width:50%;">编号</td><td style="width:50%;">描述</td></tr></thead></table></div><div class="table-body" id="commonSearchTableBody"><table class="table table-bordered text-center table-hover" id="searchTable"></table></div></div></div></div>',
            openHtml:function(node,dblclick){
                var openPage=layer.open({
                    type:1,
                    title:false,//不现实表题
                    shade:false,
                    shadeClose:true,
                    scrollbar:false,
                    cancel:function(){
                        $('#commonSearchValue').unbind();
                        $('#commonSearchBtn').unbind();
                        $('.commonTr').unbind();
                        dblclick(node,null);
                        node=null;openPage=null;
                    },
                    area:['85%', '75%'],
                    content:af.table.openWindow
                });
                $('#commonSearchTableBody').css('height', screen.height/3);//设置高度
                $('#commonSearchBtn').click(function(){
                    af.table.loadDing(node,dblclick,openPage);
                });
                $('#commonSearchValue').keydown(function(e){
                    if('13'==e.keyCode){af.table.loadDing(node,dblclick,openPage);};
                });
                var a=af.table.loadDing(node,dblclick,openPage);a=null;
                return null;
            },
            addRow:function(){
                var map={
                    class:'add edit',
                    new_goods_sign:'1',//是否新货签
                    material_no:'', //物料编码
                    material_describe:'',//物料描述
                    unit:'',//单位
                    Inventory_number:'',//盘点数量
                    son_stock:'',//子库存
                    goods_position:'',//货位
                    batch:'',//批次
                    sequence:'',//序列
                    Inventory_version:'', //版本
                    Inventory_user:$("#Inventory_user").val(),//盘点人
                    snapshot_number:''//拍照数量
                };
                af.table.num=Number(af.table.num)+Number(af.table.i);//货签编号累加
                af.table.load(map);map=null;
            },
            cmClick:function(){
                var this_=this;
                //数字
                if($(this).attr("type")=='number'&&(this_.new==false||this_.new==undefined)){
                    this_.new=true;
                    $(this_).html('<input type="number" min="1" style="height:25px;" class="form-control newInput" value="'+$(this_).text()+'">');
                    $(".newInput").focus();
                    $(".newInput").blur(function(){
                        this_.new=false;
                        $(this_).html($(this).val());
                        this_=null;
                    });
                };
                //点击事件
                if($(this).attr("type")=='click'&&(this_.new==false||this_.new==undefined)){
                    this_.new=true;af.table.openHtml(this_,function(e,map){
                        if(map==null){e.new=false;e=null;return null;};
                        var type=true;
                        $("#inventoryTable tbody tr").each(function(index,th){
                            if($(this).children("td").eq(2).html()==map.materialNo物料编码){
                                type=false;return null;
                            };
                        });
                        if(type==false){
                            layer.tips("物料编码重复！",e);
                            e.new=false;e=null;return null;
                        };
                        $(e).parent().children("td").eq(2).html(map.materialNo物料编码);
                        $(e).parent().children("td").eq(3).html(map.materialDescribe说明);
                        $(e).parent().children("td").eq(4).html(map.material_unit单位);
                        $(e).parent().children("td").eq(6).html(map.storage_room_no子库存);
                        $(e).parent().children("td").eq(7).html(map.cargoSpaceNo货位);
                        $(e).parent().children("td").eq(8).html(map.batch_control批次);
                        $(e).parent().children("td").eq(9).html(map.sequence_control序列);
                        $(e).parent().children("td").eq(10).html(map.material_version_no版本);
                        $(e).parent().children("td").eq(13).html(map.availableQuantity拍照数量);
                        e.new=false;e=null;
                    });this_=null;
                };
            },
            load:function(HashMap){
                var remove='';//没有删除按钮,只显示
                if(HashMap.new_goods_sign=='1'){//new新标签
                    remove='<a href="javascript:void(0)" class="glyphicon glyphicon-remove" onclick="(function(e){var tr=$(e).parent().parent();if($(tr).children(\'td\').eq(2).html()!=\'\'){$(\'.\'+$(tr).children(\'td\').eq(2).html()).remove();};tr.remove();tr=null;})(this);"></a>';
                };
                $("#inventoryTable tbody").append('<tr class="newTr" style="height:25px;padding:0;margin:0;">'+
                    '<td class="add" style="padding:0;width:6%;line-height:25px;">'+af.table.num+ '</td>'+
                    '<td class="add" style="padding:0;width:6%;line-height:25px;">'+HashMap.new_goods_sign+'</td>'+
                    '<td class="'+HashMap.class+'" style="padding:0;width:10%;line-height:25px;" type="click">'+HashMap.material_no+'</td>'+
                    '<td class="add" style="padding:0;width:15%;line-height:25px;">'+HashMap.material_describe+'</td>'+
                    '<td class="add" style="padding:0;width:6%;line-height:25px;">'+HashMap.unit+'</td>'+
                    '<td class="add edit" style="padding:0;width:6%;line-height:25px;" type="number">'+HashMap.Inventory_number+'</td>'+
                    '<td class="add" style="padding:0;width:6%;line-height:25px;">'+HashMap.son_stock+'</td>'+
                    '<td class="add" style="padding:0;width:6%;line-height:25px;">'+HashMap.goods_position+'</td>'+
                    '<td class="add" style="padding:0;width:6%;line-height:25px;">'+HashMap.batch+'</td>'+
                    '<td class="add" style="padding:0;width:6%;line-height:25px;">'+HashMap.sequence+'</td>'+
                    '<td class="add" style="padding:0;width:6%;line-height:25px;">'+HashMap.Inventory_version+'</td>'+
                    '<td class="add Inventory_user" style="padding:0;width:6%;line-height:25px;">'+HashMap.Inventory_user+'</td>'+
                    '<td style="padding:0;width:3%;line-height:25px;">'+remove+'</td>'+
                    '<td style="display:none;">'+HashMap.snapshot_number+'</td>'+
                '</tr>');HashMap=null;remove=null;
                $(".edit").click(af.table.cmClick);//绑定事件
                return null;
            }
        },
        saveData:function() {
            if($("#adjustment_type").val()=='1'){
                layer.msg("当前盘库记录已经启动调整，无法保存！");
                return null;
            };
            var tr = $("#inventoryTable tbody tr");
            if(tr.length==0){tr=null;return null};
            var index_=layer.load(3, {shade:[0.2, '#393D49']})//遮罩
            var upload = new Array;
            for (var i = 0; i < tr.length; i++) {
                var map = {
                    Inventory_id: $("#Inventory_id").val(),
                    goods_sign: tr.eq(i).children("td").eq(0).text(),
                    new_goods_sign: tr.eq(i).children("td").eq(1).text(),
                    material_no: tr.eq(i).children("td").eq(2).text(),
                    unit: tr.eq(i).children("td").eq(4).text(),
                    Inventory_number: tr.eq(i).children("td").eq(5).text(),
                    son_stock: tr.eq(i).children("td").eq(6).text(),
                    goods_position: tr.eq(i).children("td").eq(7).text(),
                    batch: tr.eq(i).children("td").eq(8).text(),
                    sequence: tr.eq(i).children("td").eq(9).text(),
                    Inventory_version: tr.eq(i).children("td").eq(10).text(),
                    Inventory_user: tr.eq(i).children("td").eq(11).text(),
                    snapshot_number: tr.eq(i).children("td").eq(13).text()
                };
                upload.push(map);map = null;
            };
            var a=COMMON.WS.ajax("cstorageRoomDefinition/saveInput", "post", JSON.stringify(upload), true, function (data){
                if(data){
                    af.selectList(null,index_);
                    layer.msg("盘点成功！");
                }else{
                    layer.msg("盘点失败！");
                }
            });a=null;upload=null;
        },
        print:function(){
            var t=$(".table-body").scrollTop();
            var height=window.screen.height/2;
            $('.table-body').animate({'scrollTop':t+(height-50)});
            t=null;height=null;
            $("#selectList").hide();$("#addRow").hide();
            $("#saveBtn").hide();$("#printId").hide();
            window.print();
            $("#selectList").show();$("#addRow").show();
            $("#saveBtn").show();$("#printId").show();
            return null;
        }
    };
    //返回入口
    return {
        "init":af.load
    };
});