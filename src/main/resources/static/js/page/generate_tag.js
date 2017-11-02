/**
 * Created by guofeng on 2017/9/28.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker'], function($, COMMON, layer, COMMON_SEARCH){
    var af={
        load:function(){
            //layer config
            COMMON.LAYER_CONFIG.config();
            var a=af.event();a=null;
        },
        /**
         * 事件集合
         */
        event:function(){
            //选择事件
            $("#select").click(function(){
                $("#select").hide();
                var map={
                    searchVal:{
                        popMenu: true,
                        searchValue: '%',
                        searchTable: 'CInventoryHead',
                        searchCol: 'inventoryName,inventoryExplain,id,inventoryDate',
                        colName: '名称,说明'
                    },
                    open:function(result){
                        $("#Inventory_id").val(result.id),
                        $("#Inventory_name").val(result.inventoryName),
                        $("#Inventory_explain").val(result.inventoryExplain);
                        if(result.inventoryDate&&result.inventoryDate!='null'){
                            $("#Inventory_date").val(new Date(Number(result.inventoryDate)).toLocaleString());
                        };
                        map=null;result=null;
                        $("#select").show();
                    }
                };
                var a=COMMON_SEARCH.OPEN_PAGE.openPage(map.searchVal, map.open);a=null;
            });
            //按钮事件
            $(".radio").click(function(){
                if($(this).val()=="默认"){
                    $("#goods_sign").val(1);
                    $("#goods_sign_number").val(1);
                    $("#goods_sign").attr("readonly",true);
                    $("#goods_sign_number").attr("readonly",true);
                }else{
                    $("#goods_sign").val('');
                    $("#goods_sign_number").val('');
                    $("#goods_sign").attr("readonly",false);
                    $("#goods_sign_number").attr("readonly",false);
                };
            });
            //保存事件
            $("#saveBtn").click(af.save);
        },
        /**
         * 保存
         */
        save:function(){
            if($("#Inventory_id").val()==''){
                return null;
            };
            var index_=layer.load(3, {shade: [0.2, '#393D49']})//遮罩
            var map={
                Inventory_id:$("#Inventory_id").val(),
                goods_sign:Number($("#goods_sign").val()),
                goods_sign_number:Number($("#goods_sign_number").val())
            };
            var a=COMMON.WS.ajax("cstorageRoomDefinition/generate", "post", JSON.stringify(map), true, function (data){
                if(data.result=='success'){
                    layer.msg("成功！");
                }else if(data.result=='exist'){
                    layer.msg("请取消货签后再生成！");
                }else{
                    layer.msg("失败！")
                };
                layer.close(index_);index_=null;
            });a=null;map=null;
        }
    };
    //返回入口
    return {
        "init":af.load
    };
});