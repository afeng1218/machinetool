/**
 * Created by guofeng on 2017/11/7.
 */
define(['jquery', 'common', 'layer', 'page/common_search','datetimepicker'], function($, COMMON, layer, COMMON_SEARCH){
    var af={
        load:function(){
            COMMON.LAYER_CONFIG.config();
            var height=window.screen.height/3-1;
            $('#projectTable').parent().css('height', height+'px');
            $("#tableQX").parent().css('height',(height-100)+'px');
            $('.account-info-list').css('height',(height-50)+'px');
            af.event();
        },
        event:function(){
            $(".date").datetimepicker({
                todayBtn: 1,
                autoclose: true,//选择日期后自动关闭
                minView: 'month',
                pickerPosition: 'bottom-left',
                format: 'yyyy-mm-dd hh:ii:ss',
                linkFormat: 'yyyy-mm-dd hh:ii:ss'
            });
            $("#selectBtn").click(af.table.loadProject);
            $("#saveBtn").click(af.save);
            $("#addRow").click(function(){
                af.table.addProject(null);
            });
            $("#addQX").click(function(){
                af.table.addQX(null);
            });
            return null;
        },
        save:function(){
            var upload=new Array();
            //***************************主数据***************************
            var tableAdd=$('#projectTable tbody tr.add');//获取新增的数据
            var tableUpdate=$('#projectTable tbody tr.update');//获取修改过的数据
            var tableRemove=$('#projectTable tbody tr.remove');//获取删除的数据
            var project=new Array();
            var add=new Array();
            var update=new Array();
            var remove=new Array();
            for(var i=0;i<tableAdd.length;i++){
                var map={
                    detection_project:tableAdd.eq(i).find("td").eq(1).text(),//检测项目
                    prompt:tableAdd.eq(i).find("td").eq(2).text(),//提示
                    define_type:tableAdd.eq(i).find("td").eq(3).text(),//类型
                    enable:tableAdd.eq(i).find("td").eq(4).find("input:checkbox").prop("checked")?'1':'0',//启动
                    activity_prompt:tableAdd.eq(i).find("td").eq(5).text()//活动提示
                };
                add.push(map);map=null;
            };tableAdd=null;
            for(var i=0;i<tableUpdate.length;i++){
                var map={
                    id:tableUpdate.eq(i).find("td").eq(0).find("input:radio").val(),//ID
                    detection_project:tableUpdate.eq(i).find("td").eq(1).text(),//检测项目
                    prompt:tableUpdate.eq(i).find("td").eq(2).text(),//提示
                    define_type:tableUpdate.eq(i).find("td").eq(3).text(),//类型
                    enable:tableUpdate.eq(i).find("td").eq(4).find("input:checkbox").prop("checked")?'1':'0',//启动
                    activity_prompt:tableUpdate.eq(i).find("td").eq(5).text()//活动提示
                };
                update.push(map);map=null;
            };tableUpdate=null;
            for(var i=0;i<tableRemove.length;i++){
                var map={
                    id:tableRemove.eq(i).find("td").eq(0).find("input:radio").val()//id
                };
                remove.push(map);map=null;
            };tableRemove=null;
            project.push({add:add,update:update,remove:remove});
            add=null;update=null;remove=null;
            //**************************主数据 end*************************
            //**************************附属数据***************************
            var projectRow=new Array();
            var id=$("input[name='radio']:checked").val();
            var ggxz={
                id:id==undefined?'':id,
                target_value:$("#target_value").val(),
                custom_up:$("#custom_up").val(),
                custom_down:$("#custom_down").val(),
                specifications_up:$("#specifications_up").val(),
                specifications_down:$("#specifications_down").val(),
                reasonable_up:$("#reasonable_up").val(),
                reasonable_down:$("#reasonable_down").val()
            };
            var qxz=new Array();
            var tableQX=$('#tableQX tbody tr');//获取缺陷值数据
            for(var i=0;i<tableQX.length;i++){
                var map={
                    simple_code:tableQX.eq(i).find("td").eq(0).text(),//简码
                    explain_define:tableQX.eq(i).find("td").eq(1).text()//说明
                };
                qxz.push(map);map=null;
            };tableQX=null;id=null;
            projectRow.push({ggxz:ggxz,qxz:qxz});
            ggxz=null;qxz=null;
            //***************************附属数据 end**********************
            upload.push({project:project,projectRow:projectRow});
            project=null;projectRow=null;
            COMMON.WS.ajax("collectelementdefine/save", "post", JSON.stringify(upload), true, function (data) {
                if(data.result){
                    layer.msg('保存成功！');
                    af.table.loadProject();
                }else{
                    layer.msg('保存失败！');
                };
            });upload=null;
            return null;
        },
        clear:function(bool){
            if(bool){$('#projectTable tbody tr').remove();};
            $('#tableQX tbody tr').remove();
            $('#formId')[0].reset();
            return null;
        },
        table:{
            number:1,
            loadProject:function(){
                af.clear(true);
                var load={
                    newTime:$("#newTime").val(),
                    endTime:$("#endTime").val()
                };
                COMMON.WS.local("collectelementdefine/selectTitle", "post", load, false, function(data){
                    for(var i=0;i<data.length;i++){
                        af.table.addProject(data[i]);
                    };
                    data=null;
                });
                load=null;
                $("input[name='radio']").eq(0).attr("checked",true);
                af.table.loadQX($("input[name='radio']").eq(0).val());
                return null;
            },
            loadQX:function(id){
                af.clear(false);
                if(id==""||id==null||id==undefined){return null;};
                COMMON.WS.local("collectelementdefine/selectRow", "post", {id:id}, false, function(data){
                    if(data.ggxz!=''){
                        $("#target_value").val(data.ggxz[0].target_value),
                        $("#custom_up").val(data.ggxz[0].custom_up),
                        $("#custom_down").val(data.ggxz[0].custom_down),
                        $("#specifications_up").val(data.ggxz[0].specifications_up),
                        $("#specifications_down").val(data.ggxz[0].specifications_down),
                        $("#reasonable_up").val(data.ggxz[0].reasonable_up),
                        $("#reasonable_down").val(data.ggxz[0].reasonable_down)
                    };
                    for(var i=0;i<data.qxz.length;i++){
                        af.table.addQX(data.qxz[i]);
                    };
                    data=null;
                });
                return null;
            },
            addProject:function(HashMap){
                if($('#projectTable tbody tr').length==0){af.table.number=1};
                var checkbox="<input type='checkbox' id='checkboxId"+af.table.number+"' "+(HashMap&&HashMap.enable=='1'?'checked':'')+">";
                var radio="<input type='radio' name='radio' id='rowIndex"+af.table.number+"' value='"+(HashMap?HashMap.id:'')+"'/>&nbsp;";
                $('#projectTable tbody').append('<tr class="'+(HashMap?HashMap.class:'add')+'" style="height:28px;padding:0;">'+
                    '<td style="padding:0;width:6%;line-height:28px;" type="number" edit="false">'+radio+af.table.number+'</td>'+
                    '<td class="add" style="padding:0;width:25%;line-height:28px;" type="text" edit="true">'+(HashMap?HashMap.detection_project:'')+'</td>'+
                    '<td class="add" style="padding:0;width:25%;line-height:28px;" type="text" edit="true">'+(HashMap?HashMap.prompt:'')+'</td>'+
                    '<td class="add" style="padding:0;width:10%;line-height:28px;" type="select" edit="true">'+(HashMap?HashMap.define_type:'')+'</td>'+
                    '<td style="padding:0;width:6%;line-height:28px;" type="check" edit="false">'+checkbox+'</td>'+
                    '<td class="add" style="padding:0;width:22%;line-height:28px;" type="text" edit="true">'+(HashMap?HashMap.activity_prompt:'')+'</td>'+
                    '<td style="padding:0;width:6%;line-height:28px;" type="remove" edit="false">'+
                    '<a href="javascript:void(0)" class="glyphicon glyphicon-remove" id="removeId'+af.table.number+'"></a>'+
                    '</td>'+
                '</tr>');checkbox=null;radio=null;HashMap=null;
                //radio
                $("#rowIndex"+af.table.number).bind('click',function(){
                    af.table.loadQX($(this).val());
                    return null;
                });
                //checkbox
                $("#checkboxId"+af.table.number).change(function(){
                    if($(this).parent().parent().attr("class")=="load"){
                        $(this).parent().parent().attr("class","update");
                    };
                    return null;
                });
                //remove
                $("#removeId"+af.table.number).bind('click',function(){
                    af.clear(false);
                    if($(this).parent().parent().attr("class")=="add"){
                        $(this).parent().parent().remove();
                    }else{
                        $(this).parent().parent().hide();
                        $(this).parent().parent().attr("class","remove");
                    };
                    $.each($("input[name='radio']"),function(index,name){
                        if($(this).parent().parent().attr("class")!="remove"){
                            $("input[name='radio']").eq(index).prop("checked",true);
                            af.table.loadQX($("input[name='radio']").eq(index).val());
                            return false;
                        };
                    });
                    return null;
                });
                //绑定事件 text number select
                $('#projectTable tbody tr td.add').bind('click',function(){
                    af.table.tableClick(this);
                    return null;
                });
                af.table.number++;
                return null;
            },
            addQX:function(HashMap){
                $('#tableQX tbody').append('<tr class="add" style="height:20px;padding:0;">'+
                    '<td class="add" style="padding:0;width:30%;line-height:28px;" type="text" edit="true">'+(HashMap?HashMap.simple_code: '')+'</td>'+
                    '<td class="add" style="padding:0;width:60%;line-height:28px;" type="text" edit="true">'+(HashMap?HashMap.explain_define:'')+'</td>'+
                    '<td style="padding:0;width:10%;line-height:28px;">'+
                    '<a href="javascript:void(0)" class="glyphicon glyphicon-remove" onclick="(function(e){$(e).parent().parent().remove();})(this);"></a>'+
                    '</td>'+
                '</tr>');
                //绑定事件text number
                $('#tableQX tbody tr td').bind('click',function(){
                    af.table.tableClick(this);
                    return null;
                });
                return null;
            },
            tableClick:function(e){
                if($(e).attr("edit")=="false"){return null;};
                var type=$(e).attr("type");
                $(e).attr("edit","false");
                //文本框&数字框
                if(type=="text"||type=="number"){
                    var val=$(e).text();
                    var html='<input type="'+type+'" min="1" style="height:28px;" class="form-control newInput" value="'+val+'">';
                    $(e).html(html);html=null;val=null;
                    $(".newInput").focus();
                    $(".newInput").blur(function(){
                        $(e).attr("edit","true");
                        $(e).html($(this).val());
                        return null;
                    });
                    $(".newInput").change(function(){
                        if($(e).parent().attr("class")=="load"){
                            $(e).parent().attr("class","update");
                        };
                        return null;
                    });
                    //下拉条
                }else if(type=="select"){
                    var val=$(e).text();
                    var html='<select class="selectpicker" style="width:99%;height:27px;">' +
                        '<option value="变量" '+(val=='变量'?'selected':'')+'>变量</option>' +
                        '<option value="缺陷属性" '+(val=='缺陷属性'?'selected':'')+'>缺陷属性</option>' +
                        '</select>';val=null;
                    $(e).html(html);html=null;
                    $(".selectpicker").focus();
                    $(".selectpicker").blur(function(){
                        $(e).html(this.value);
                        $(e).attr("edit","true");
                        e=null;return null;
                    });
                    $(".selectpicker").change(function(){
                        if($(e).parent().attr("class")=="load"){
                            $(e).parent().attr("class","update");
                        };
                        return null;
                    });
                };
                type=null;return null;
            }
        }
    };
    return{
        'init':af.load
    };
});