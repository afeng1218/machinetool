/**
 * Created by guofeng on 2017/9/28.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function($, COMMON, layer, COMMON_SEARCH){
    var af={
        load:function(){
            //layer config
            COMMON.LAYER_CONFIG.config();
            var a=af.event();a=null;
            var username=COMMON.ECODE.Base64.decode($.cookie('username'));
            $("#approval_user").val(username);username=null;
            var height=window.screen.height/2;
            $(".table-body").css("height", height+"px");
            return null;
        },
        event:function(){
            $("#select").click(af.select);//选择盘点题头
            $("#approval_user").click(af.inventoryUser);//默认审批人
            $("#selectList").click(af.selectList);//查询
            $("#saveBtn").click(af.saveData);//保存
            $("#adoptAll").click(af.table.adoptAll);//全部通过
            $("#refuseAll").click(af.table.refuseAll);//全部拒绝
            $("#startUp").click(af.startUp);//启动调整
            return null;
        },
        select:function(){
            $("#select").hide();
            var map={
                searchVal:{
                    popMenu:true,
                    searchValue:'',
                    searchTable:'CInventoryHead',
                    searchCol:'inventoryName,inventoryExplain,id,snapshotDate,adjustmentType',
                    colName:'名称,说明'
                },
                open:function(result){
                    var r=af.table.remove();r=null;
                    $("#Inventory_id").val(result.id),//ID
                    $("#adjustment_type").val(result.adjustmentType),//是否已经调整
                    $("#Inventory_name").val(result.inventoryName),//名称
                    $("#Inventory_explain").val(result.inventoryExplain);//描述
                    $("#approval_type").val(0);//恢复没有审批的状态
                    if(result.snapshotDate==null||result.snapshotDate=='null'){
                        $("#snapshot_date").val('');
                    }else{
                        $("#snapshot_date").val(new Date(Number(result.snapshotDate)).toLocaleString());
                    };
                    $("#select").show();result=null;
                }
            };
            var a=COMMON_SEARCH.OPEN_PAGE.openPage(map.searchVal, map.open);a=null;
            return null;
        },
        selectList:function(e,loading){
            if($("#Inventory_id").val()==''){
                layer.msg("请选择需要盘点的盘库记录！");
                return null;
            };
            var index_=loading
            $("#selectList").hide();
            if(index_==undefined){index_=layer.load(3, {shade:[0.2, '#393D49']});};//遮罩
            var r=af.table.remove();r=null;
            var id=$("#Inventory_id").val();//ID
            var a=COMMON.WS.ajax("cstorageRoomDefinition/selectList", "post", id, true, function (data){
                if(data.length>0){$("#approval_type").val(data[0].approval_type);};
                for(var i=0;i<data.length;i++){
                    var map={
                        approval_type:data[i].approval_type==null?'':data[i].approval_type, //审批状态
                        material_no:data[i].material_no==null?'':data[i].material_no, //物料编码
                        material_describe:data[i].material_describe==null?'':data[i].material_describe,//物料描述
                        snapshot_number:data[i].snapshot_number==null?'':data[i].snapshot_number,//拍照数量
                        unit:data[i].unit==null?'':data[i].unit,//单位
                        adjustment_number:data[i].adjustment_number==null?'':data[i].adjustment_number,//调整数量
                        adjustment_value:data[i].adjustment_value==null?'':data[i].adjustment_value,//调整值
                        percentage:data[i].percentage==null?'':data[i].percentage,//百分比
                        son_stock:data[i].son_stock==null?'':data[i].son_stock,//子库存
                        goods_position:data[i].goods_position==null?'':data[i].goods_position,//货位
                        batch:data[i].batch==null?'':data[i].batch,//批次
                        sequence:data[i].sequence==null?'':data[i].sequence,//序列
                        Inventory_version:data[i].Inventory_version==null?'':data[i].Inventory_version, //版本
                        approval_user:data[i].approval_user==null?$("#approval_user").val():data[i].approval_user//审批人
                    };
                    af.table.load(map);map=null;
                };data=null;
                var evn=af.table.event();evn=null;
                layer.close(index_);index_=null;
                $("#selectList").show();
            });id=null;a=null;
            return null;
        },
        saveData:function(){
            var tr=$("#inventoryTable tbody tr");
            if(tr.length==0){
                layer.msg("请您查询盘库记录后审批！");
                return null;
            };
            if($("#adjustment_type").val()=='1'){
                layer.msg("当前盘库记录已经启动调整，无需再次审批！");
                return null;
            };
            if(tr.length==0){tr=null;return null;};
            for(var i=0;i<tr.length;i++){
                if(tr.find("input:radio:checked").val()==undefined){
                    layer.msg("由于此程序具有不可撤消的特性，您必须批准或拒绝所有的调整！");
                    layer.close(index_);index_=null;
                    return null;
                };
            };
            var upload=new Array;
            var id=$("#Inventory_id").val();
            $(".update").each(function(index,e){
                var map={
                    id:id,
                    material_no:$(e).find('td:eq(2)').text(),
                    son_stock:$(e).find('td:eq(9)').text(),
                    approval_user:$("#approval_user").val(),
                    approval_type:$(e).find("input:radio:checked").val()
                };
                upload.push(map);map=null;
            });
            if(upload.length==0){return null;};
            var index_=layer.load(3, {shade:[0.2, '#393D49']});
            var a=COMMON.WS.ajax("cstorageRoomDefinition/saveData", "post", JSON.stringify(upload), true, function (data){
                if(data){
                    var a=af.selectList(null,index_);
                    a=null;layer.msg("审批成功！");
                    $("#approval_type").val(1);
                }else{
                    layer.msg("审批失败！");
                };data=null;index_=null;
            });a=null;upload=null;
            return null;
        },
        startUp:function(){
            var tr=$("#inventoryTable tbody tr");
            if(tr.length==0){return null;};
            if($("#approval_type").val()==0){
                layer.msg("由于此程序具有不可撤消的特性，您必须批准或拒绝所有的调整！");
                return null;
            };
            if($("#adjustment_type").val()=='1'){
                layer.msg("当前盘库记录已经启动调整，无需再次启动！");
                return null;
            };
            var index_=layer.load(3, {shade:[0.2, '#393D49']});
            var upload=new Array();
            var head={
                id:$("#Inventory_id").val(),
                name:$("#Inventory_name").val()
            };
            var update=new Array();
            var reg = new RegExp("^-[0-9]*$");
            for(var i=0;i<tr.length;i++){
                var a=Number(tr.eq(i).find('td:eq(4)').text());
                var b=tr.eq(i).find('td:eq(6)').text();
                if(reg.test(b)){
                    a=a-Number(b);
                }else{
                    a=a+Number(b);
                };
                var map={
                    material_no:tr.eq(i).find('td:eq(2)').text(),
                    available_quantity:a
                };
                update.push(map);map=null;
            };tr=null;reg=null;
            upload.push({
                head:head,
                update:update
            });head=null;update=null;
            COMMON.WS.ajax("cstorageRoomDefinition/startUp", "post", JSON.stringify(upload), true, function (data){
                if(data){
                    layer.msg("启动成功！");
                    $("#adjustment_type").val(1);
                }else{
                    layer.msg("启动失败！");
                };data=null;
                layer.close(index_);index_=null;
            });upload=null;
            return null;
        },
        table:{
            event:function(){
                $(".adopt").click(af.table.adopt);
                $(".refuse").click(af.table.refuse);
                return null;
            },
            //全部通过
            adoptAll:function(){
                $(".adopt").prop("checked",true);
                $("#inventoryTable tbody tr").attr("class","update");
                return null;
            },
            //全部拒绝
            refuseAll:function(){
                $(".refuse").prop("checked",true);
                $("#inventoryTable tbody tr").attr("class","update");
                return null;
            },
            //通过
            adopt:function(e){
               $(e.target).parent().parent().attr('class','update');
                return null;
            },
            //拒绝
            refuse:function(e){
                $(e.target).parent().parent().attr('class','update');
                return null;
            },
            //清空表
            remove:function(){
                $("#inventoryTable tbody tr").remove();
                return null;
            },
            load:function(HashMap){
                var a="<input type='radio' class='adopt' value='1' name='"+HashMap.material_no+"'>";
                var b="<input type='radio' class='refuse' value='2' name='"+HashMap.material_no+"'>";
                if(HashMap.approval_type=='1'){
                    a="<input type='radio' class='adopt' value='1' checked name='"+HashMap.material_no+"'>";
                }else if(HashMap.approval_type=='2'){
                    b="<input type='radio' class='refuse' value='2' checked name='"+HashMap.material_no+"'>";
                };
                $("#inventoryTable tbody").append('<tr class="add" style="height:25px;padding:0;margin:0;">'+
                    '<td style="padding:0;width:5%;line-height:25px;">'+a+'</td>'+
                    '<td style="padding:0;width:5%;line-height:25px;">'+b+'</td>'+
                    '<td style="padding:0;width:10%;line-height:25px;">'+HashMap.material_no+'</td>'+
                    '<td style="padding:0;width:13%;line-height:25px;">'+HashMap.material_describe+'</td>'+
                    '<td style="padding:0;width:8%;line-height:25px;">'+HashMap.snapshot_number+'</td>'+
                    '<td style="padding:0;width:5%;line-height:25px;">'+HashMap.unit+'</td>'+
                    '<td style="padding:0;width:8%;line-height:25px;">'+HashMap.adjustment_number+'</td>'+
                    '<td style="padding:0;width:7%;line-height:25px;">'+HashMap.adjustment_value+'</td>'+
                    '<td style="padding:0;width:5%;line-height:25px;">'+HashMap.percentage+'</td>'+
                    '<td style="padding:0;width:7%;line-height:25px;">'+HashMap.son_stock+'</td>'+
                    '<td style="padding:0;width:5%;line-height:25px;">'+HashMap.goods_position+'</td>'+
                    '<td style="padding:0;width:5%;line-height:25px;">'+HashMap.batch+'</td>'+
                    '<td style="padding:0;width:5%;line-height:25px;">'+HashMap.sequence+'</td>'+
                    '<td style="padding:0;width:5%;line-height:25px;">'+HashMap.Inventory_version+'</td>'+
                    '<td class="approval_user" style="padding:0;width:7%;line-height:25px;">'+HashMap.approval_user+'</td>'+
                '</tr>');
                HashMap=null;a=null;b=null;
                return null;
            }
        }
    };
    //返回入口
    return {
        "init":af.load
    };
});