/**
 * Created by GuoFeng on 2016/7/15.
 */
define(['jquery', 'common', 'layer'], function ($, COMMON, layer) {
    var af={
        loading:function(){
            af.event();
            af.loadDate({type:'all'});
        },
        loadDate:function(map){
            //获取生产线
            COMMON.WS.ajax("toolLife/selectLine", "post", map, false, function (data){
                if(map.type=="all"){
                    var line=data.line;
                    for(var i=0;i<line.length;i++){
                        $("#selectId").append('<option value="'+line[i].production_line_id+'">'+line[i].production_line_name+'</option>');
                    };
                };
                var tool=data.tool;
                for(var i=0;i<tool.length;i++){

                };
                data=null;
            });
        },
        event:function(){
            $("#productionLineTable>tbody>tr").on("click", function () {
                $(this).parent().find("tr.focus").toggleClass("focus");//取消原先选中行
                $(this).toggleClass("focus");//设定当前行为选中行
            });
            $("#selectId").click(function(){
                af.loadDate({type:'tool'});
            });
            return null;
        }
    };
    return {
        'init': af.loading
    }
});