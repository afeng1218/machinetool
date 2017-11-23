/**
 * Created by GuoFeng on 2016/7/15.
 */
define(['jquery', 'common', 'layer','page/common_search'], function ($, COMMON, layer, COMMON_SEARCH) {
    var af={
        loading:function(){
            af.event();
            af.loadDate({production_line_id:'',type:'all'});
            af.timedRefresh(true,1500);
            COMMON.LAYER_CONFIG.config();
            return null;
        },
        loadDate:function(map){
            COMMON.WS.ajax("toolLife/selectLine", "post", JSON.stringify(map), true, function (data){
                if(map.type=="all"){
                    for(var i=0;i<data.line.length;i++){
                        $("#selectId").append('<option value="'+data.line[i].production_line_id+'">'+data.line[i].production_line_name+'</option>');
                    };
                };
                for(var i=0;i<data.tool.length;i++){
                    $("#productionLineTable tbody").append('<tr ip="'+data.tool[i].ip+'" value="'+data.tool[i].resource_code+'" '+(i==0?'class="focus"':'')+'>' +
                        '<td style="width:100%;font-size:12px;">' +
                            '<img src="img/'+data.tool[i].category+'.png" width="80" height="60">' +
                            '<div>设备编号:'+data.tool[i].resource_code+'</div>' +
                        '</td>' +
                    '</tr>');
                };
                $("#productionLineTable>tbody>tr").on("click", function () {
                    $(this).parent().find("tr.focus").toggleClass("focus");//取消原先选中行
                    $(this).toggleClass("focus");//设定当前行为选中行
                    $("#toolTable tbody tr").remove();
                    var map={
                        production_line_id:$("#selectId").val(),
                        resource_code:$(this).attr("value")
                    };
                    af.loadRightRowData(map,af.loadTimed);map=null;
                });
                $("#productionLineTable>tbody>tr:eq(0)").click();
                map=null;data.line=null;data.tool=null;data=null;
            });
            return null;
        },
        loadRightRowData:function(map,return_){
            COMMON.WS.ajax("toolLife/selectRowData", "post", JSON.stringify(map), true, function (data){
                for(var i=0;i<20;i++){
                    var tool_number='t'+(i+1),//刀号
                        cuttool_no='',//刀具编号
                        class_='class="add" ',
                        initial_lifetime='',//初始寿命
                        life_alarm='';// 报警值
                    if(data.rowData!=undefined){
                        tool_number=data.rowData[i].tool_number==undefined?'t'+(i+1):data.rowData[i].tool_number;//刀号
                        cuttool_no=data.rowData[i].cuttool_no==undefined?'':data.rowData[i].cuttool_no;//刀具编号
                        class_='class="load" ';
                        initial_lifetime=data.rowData[i].initial_lifetime==undefined?'':data.rowData[i].initial_lifetime;//初始寿命
                        life_alarm=data.rowData[i].life_alarm==undefined?0:data.rowData[i].life_alarm;// 报警值
                    };
                    $("#toolTable tbody").append('<tr ' + class_ + (cuttool_no==""?"":'style="background-color:rgb(232,255,232);"') +'>' +
                        '<td style="padding:0;width:10%;line-height:30px;">'+tool_number+'</td>' +
                        '<td style="padding:0;width:10%;line-height:30px;" class="update">'+cuttool_no+'</td>' +
                        '<td style="padding:0;width:10%;line-height:30px;">'+initial_lifetime+'</td>' +
                        '<td style="padding:0;width:10%;line-height:30px;">'+(cuttool_no==""?"":life_alarm)+'</td>' +
                        '<td style="padding:0;width:10%;line-height:30px;">'+(cuttool_no==""?"":0)+'</td>' +
                        '<td style="padding:0;width:5%;line-height:30px;">' +
                            '<a href="javascript:void(0);" class="glyphicon glyphicon-cloud-upload"></a>' +
                        '</td>' +
                    '</tr>');
                    tool_number=null;cuttool_no=null;
                    initial_lifetime=null;life_alarm=null;
                };
                data=null;
                $("#toolTable tbody tr td.update").click(function(){af.open(this);});
                $("#toolTable tbody tr td a.glyphicon-cloud-upload").click(function(){af.cloudUpload(this);});
                return_();
            });
            return null;
        },
        loadTimed:function(){
            var upload={
                production_line_id:$("#selectId").val(),//生产线ID
                resource_code:$("#productionLineTable tbody tr.focus").attr("value"),
                ip:$("#productionLineTable tbody tr.focus").attr("ip")
            };
            COMMON.WS.ajax("toolLife/loadData", "post", JSON.stringify(upload), true, function (data){
                if(data.return==-1){
                    if(af.intervalId!=null){
                        window.clearInterval(af.intervalId);
                        af.intervalId=null;
                    };
                    layer.msg("连接超时！");
                }else{
                    //layer.msg("获取实际寿命成功！");
                    var tr=$("#toolTable tbody tr");
                    if(data.map!=undefined){
                        var str=data.map.split("|");
                        for(var i=3,j=0;i<str.length;i++,j++){
                            //if(tr.eq(j).find("td").eq(1).html()==''){continue;};
                            tr.eq(j).find("td").eq(4).html(str[i]);
                            tr.eq(j).css("background-color",af.updateBgColor(
                                tr.eq(j).find("td").eq(3).html(),
                                tr.eq(j).find("td").eq(4).html()));
                            if(tr.eq(j).attr("class")=='load'){
                                tr.eq(j).attr("class","update");
                            };
                        };
                    };
                };
            });
            upload=null;
            return null;
        },
        cloudUpload:function(e){
            var tr=$(e).parent().parent();
            var openWindow = '<div style="padding:0;margin:0;">' +
                '<div class="col-xs-3" style="margin-top:4px;width:100px;">实际寿命：</div>'+
                '<div class="col-xs-8"><input type="number" min="0.000" class="form-control new_surplus_lifetime" value="0.000"></div>'+
            '</div>';
            layer.open({
                shade:[0.2, '#393D49'],
                shadeClose:false,
                yes:function(){
                    var map={
                        resource_code:$("#productionLineTable tbody tr.focus").attr("value"),
                        tool_number:$(tr).children('td').eq(0).html(),
                        cuttool_no:$(tr).children('td').eq(1).html(),
                        surplus_lifetime:$(".new_surplus_lifetime").val(),
                        ip:$("#productionLineTable tbody tr.focus").attr("ip")
                    };
                    COMMON.WS.ajax("toolLife/uploadLifetime", "post", JSON.stringify(map), true, function (data){
                        if(data==-1){
                            layer.msg("连接超时！");
                        }else {
                            layer.msg("修改实际寿命成功！");
                        };
                        $(tr).removeAttr('style');
                        $(tr).children('td').eq(4).html(map.surplus_lifetime);
                        tr.css("background-color",af.updateBgColor(
                            $(tr).children('td').eq(3).html(),
                            $(tr).children('td').eq(4).html()));
                        if(tr.attr('class')=='load'){tr.attr('class','update')};
                        tr=null;map=null;
                    });
                },
                area: ['35%', '30%'],
                content: openWindow,
                title: "刀号：{"+$(tr).children('td').eq(0).html()+"} 刀具编号：{"+$(tr).children('td').eq(1).html()+"}"
            });
            openWindow=null;
            return null;
        },
        event:function(){
            //生产线
            $("#selectId").change(function(){
                $("#toolTable tbody tr").remove();
                $("#productionLineTable tbody tr").remove();
                af.loadDate({production_line_id:$(this).val(),type:'tool'});
                return null;
            });
            //保存
            $("#saveData").click(function(){
                var index_=layer.open({type: 3});
                var production_line_id=$("#selectId").val();//生产线ID
                var resource_code=$("#productionLineTable tbody tr.focus").attr("value");
                var upload=new Array();
                var add=new Array();
                var update=new Array();
                var tr=$("#toolTable tbody tr");
                for(var i=0;i<tr.length;i++){
                    var map={
                        production_line_id:production_line_id,
                        resource_code:resource_code,
                        tool_number:tr.eq(i).find("td:eq(0)").html(),
                        cuttool_no:tr.eq(i).find("td:eq(1)").html(),
                        surplus_lifetime:(Number(tr.eq(i).find("td:eq(2)").html())-Number(tr.eq(i).find("td:eq(4)").html()))+""
                    };
                    if(tr.eq(i).attr("class")=="add"){
                        add.push(map);
                    };
                    if(tr.eq(i).attr("class")=="update"){
                        update.push(map);
                    };
                    map=null;
                };
                upload.push({
                    add:add,
                    update:update
                });
                COMMON.WS.ajax("toolLife/saveData", "post", JSON.stringify(upload), true, function (data){
                    layer.close(index_);index_=null;
                    if(data){
                        layer.msg("残余寿命更新成功！");
                        $("#productionLineTable>tbody>tr:eq(0)").click();
                    }else{
                        layer.msg("残余寿命更新失败！");
                    };
                });
            });
            return null;
        },
        updateBgColor:function (life_alarm,surplus_lifetime) {
            var bgColor='';
            if(life_alarm!=''&&surplus_lifetime!='') {
                if (Number(surplus_lifetime) < Number(life_alarm)) {//实际寿命小于报警值时
                    bgColor = "rgb(232,255,232)";//绿色
                } else if (Number(surplus_lifetime) >= Number(life_alarm)) {//实际寿命大于报警值时
                    bgColor = "rgb(255,221,221)";//红色
                };
            };
            surplus_lifetime=null;
            life_alarm=null;
            return bgColor;
        },
        open:function(e){
            if(e.new==false||e.new==undefined){
                e.new=true;
                $(e).html('<input type="text" style="height:30px;" class="form-control newInput" value="'+$(e).html()+'">');
                var searchVal={
                    popMenu: true,
                    searchValue: $(e).text(),
                    searchTable: 'CCuttoolBasedata',
                    searchCol: 'cuttoolNo,cuttoolDescription,initialLifetime,lifeAlarm',
                    colName: '刀具编号,刀具描述'
                };
                COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function(result){
                    var tr=$(e).parent();
                    if(result){
                        $(e).html(result.cuttoolNo);
                        tr.find("td").eq(2).html(result.initialLifetime);
                        tr.find("td").eq(3).html(result.lifeAlarm=='null'?0:result.lifeAlarm);
                        tr.find("td").eq(4).html(0);
                    }else{
                        $(e).html($(".newInput").val());
                    };
                    if(tr.attr("class")=='load'){
                        tr.attr("class","update");
                    };
                    result=null;searchVal=null;e.new=false;
                });
            };
            return null;
        },
        intervalId:null,
        timedRefresh:function(b,t){
            if(b){af.intervalId=window.setInterval(function(){af.loadTimed();},t);};
            return null;
        }
    };
    return {
        'init': af.loading
    }
});