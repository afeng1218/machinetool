//鼠标移动事件
function bigImg(x) {
    x.style.borderColor = "#000000"
};
function smImg(x) {
    x.style.borderColor = "#9e9e9e"
};
function removeElement(obj) {
    if(confirm("确定删除该模型？"))
        $('#'+obj).detach();
}
define(['jquery', 'common', 'layer', 'jqueryui', 'jsPlumb'], function ($, COMMON, layer) {
    var af = {
        load: function () {
            //layer config
            COMMON.LAYER_CONFIG.config();

            var modelid = null;
            $('#catalog li').draggable({
                helper: "clone",//复制模式
                cursor: "move",//光标类型
                scope: "plant",
                start: function () {
                    modelid = event.target.id;
                }
            });

            $("#container").droppable({
                scope: "plant",
                drop: function (event, ui) {
                    //创建模型到拖拽区
                    CreateModel(ui, $(this));
                }
            });

            //初始化一个jsPlumb实例
            var model_counter = 0;
            var instance = jsPlumb.getInstance({
                DragOptions: {cursor: "pointer", zIndex: 2000},
                ConnectionOverlays: [
                    ["Arrow", {
                        location: 1,
                        visible: true,
                        width: 11,
                        length: 11,
                        direction: 1,
                        id: "arrow_forwards"
                    }],
                    ["Arrow", {
                        location: 0,
                        visible: true,
                        width: 11,
                        length: 11,
                        direction: -1,
                        id: "arrow_backwards"
                    }],
                    ["Label", {
                        location: 0.5,
                        id: "label",
                        cssClass: "aLabel"
                    }]
                ],
                Container: "container"
            });
            instance.importDefaults({
                ConnectionsDetachable: true,
                ReattachConnections: true
            });
            var connectorPaintStyle = {
                stroke: "#84ACB3",
                strokeWidth: 2
            };
            var hollowCircle = {
                endpoint: ["Dot", {cssClass: "endpointcssClass"}], //端点形状
                connectorStyle: connectorPaintStyle,
                //  connectorHoverStyle: connectorHoverStyle,
                paintStyle: {
                    fill: "#84ACB3",
                    radius: 6
                },      //端点的颜色样式
                isSource: true, //是否可拖动（作为连接线起点）
                connector: ["Flowchart", {stub: 30, gap: 0, coenerRadius: 0, alwaysRespectStubs: true, midpoint: 0.5}],
                isTarget: true, //是否可以放置（连接终点）
                maxConnections: -1
            };

            function getModelTable() {
                var rate = "1_" + model_counter;
                var table = null;
                if(modelid=="chechuang") {
                    table = "<div style='border:1px solid #9e9e9e;'" +
                        " onmouseout='smImg(this)' onmousemove='bigImg(this)'>" +
                        "<a href='javascript:void(0);' onclick='removeElement(this)' class='delete'><i class='glyphicon glyphicon-remove'></i></a>'" +
                        "<img style='width:100px;height:100px;' src='img/车床.png'>" +
                        "</div>";
                }if(modelid=="xichuang"){
                    table = "<div style='border:1px solid #9e9e9e;' onmouseout='smImg(this)' onmousemove='bigImg(this)'><img style='width:100px;height:100px;' src='img/铣床.png'></div>";
                }if(modelid=="mochuang"){
                table = "<div style='border:1px solid #9e9e9e;' onmouseout='smImg(this)' onmousemove='bigImg(this)'><img style='width:100px;height:100px;' src='img/车床.png'></div>";
                }if(modelid=="tangchuang"){
                    table = "<div style='border:1px solid #9e9e9e;' onmouseout='smImg(this)' onmousemove='bigImg(this)'><img style='width:100px;height:100px;' src='img/车床.png'></div>";
                }
                return table;
            }

            //右侧可编辑表格赋值事件
            $(".left_data").keyup(function(){
                var jcID=$("#left_table_id").val();
                //判断位置是否改变
                if($("#"+jcID).attr("type")=="load"){
                    $("#"+jcID).attr("type","update");
                };
                if($(this).attr("id")=='resource_code'){
                    $("#"+jcID).attr("resource_code",$(this).text());
                };
                if($(this).attr("id")=='equipment_group'){
                    $("#"+jcID).attr("equipment_group",$(this).text());
                };
                if($(this).attr("id")=='category'){
                    $("#"+jcID).attr("category",$(this).text());
                };
                if($(this).attr("id")=='model'){
                    $("#"+jcID).attr("model",$(this).text());
                };
                if($(this).attr("id")=='rate'){
                    $("#"+jcID).attr("rate",$(this).text());
                };
                if($(this).attr("id")=='production_line_name'){
                    $("#"+jcID).attr("production_line_name",$(this).text());
                };
                if($(this).attr("id")=='ip'){
                    $("#"+jcID).attr("ip",$(this).text());
                };
                jcID=null;
            });

            function clear(){
                $('#workshop_name').text("");
                $('#resource_code').text("");
                $('#equipment_group').text("");
                $('#redirect').text("");
                $('#model').text("");
                $('#rate').text("0");
                $('#ip').text("");
                $('#category').text("");
                $('#production_line_name').text("");
            };

            function CreateModel(ui, selector) {
                model_counter++;
                var rate = "rate" + model_counter;
                var id = "1_" + model_counter;
                clear();
                $("#left_table_id").val(id);//记录当前是哪个床子
                var type = 1;
                var add_html = getModelTable(ui, type);
                $(selector).append('<div class="model" type="add" id="'
                    + id +'" category="'+$("#"+modelid).attr("value")+'" ' +
                    'production_line_name="'+$('#production_line').find("option:selected").text()+'">'+add_html+'</div>');
                var left = parseInt(ui.offset.left - $(selector).offset().left);
                var top = parseInt(ui.offset.top - $(selector).offset().top);
                $("#"+id).css("position", "absolute").css("left", left).css("top", top);
                //添加连接点
                instance.addEndpoint(id, { anchors: "RightMiddle" }, hollowCircle);
                instance.addEndpoint(id, { anchors: "LeftMiddle" }, hollowCircle);
                instance.addEndpoint(id, { anchors: "TopCenter" }, hollowCircle);
                instance.addEndpoint(id, { anchors: "BottomCenter" }, hollowCircle);
                $('#category').html($("#"+modelid).attr("value"));
                $('#position-x').text($("#" + id).position().left);
                $('#position-y').text($("#" + id).position().top);
                $('#production_line_name').text($('#production_line').find("option:selected").text());
                $("#" + id).draggable({
                    containment: "parent",
                    start: function () {
                        if($("#left_table_id").val()!=id){
                            $("#resource_code").text($("#"+id).attr("resource_code")==undefined?'':$("#"+id).attr("resource_code"));
                            $('#equipment_group').text($(this).attr("equipment_group")==undefined?'':$(this).attr("equipment_group"));
                            $('#category').html($(this).attr("category")==undefined?'':$(this).attr("category"));
                            $('#model').html($(this).attr("model")==undefined?'':$(this).attr("model"));
                            $('#rate').html($(this).attr("rate")==undefined?'0':$(this).attr("rate"));
                            $('#production_line_name').html($(this).attr("production_line_name")==undefined?'':$(this).attr("production_line_name"));
                            $('#ip').html($(this).attr("ip")==undefined?'':$(this).attr("ip"));
                            $("#left_table_id").val(id);
                        };
                        $('#position-x').text($(this).position().left);
                        $('#position-y').text($(this).position().top);
                    },
                    drag: function (event, ui) {
                        instance.repaintEverything();
                    },
                    stop: function () {
                        instance.repaintEverything();
                    }
                });
                $("#" + id).mouseenter(function () {
                    $(this).find(".delete").show();

                });
                $("#" + id).mouseleave(function () {
                    $(this).find(".delete").hide();
                });
                //鼠标点击div事件
                $("#" + id).click(function (e) {
                    $("#left_table_id").val(id);//记录当前是哪个床子
                    $('#resource_code').html($(this).attr("resource_code")==undefined?'':$(this).attr("resource_code"));
                    $('#equipment_group').html($(this).attr("equipment_group")==undefined?'':$(this).attr("equipment_group"));
                    $('#category').html($(this).attr("category")==undefined?'':$(this).attr("category"));
                    $('#model').html($(this).attr("model")==undefined?'':$(this).attr("model"));
                    $('#rate').html($(this).attr("rate")==undefined?'0':$(this).attr("rate"));
                    $('#production_line_name').text($('#production_line').find("option:selected").text());
                    $('#position-x').text($(this).position().left);
                    $('#position-y').text($(this).position().top);
                    $('#ip').html($(this).attr("ip")==undefined?'':$(this).attr("ip"));
                });
                return id;
            }
            //保存
            $("#saveBtn").click(function (e) {
                var uploadValue = [];
                var add = [];
                var update = [];
                if ($("#position-x").html() == "") {
                    layer.msg("未编辑任何数据无法保存");
                    return
                }

                if ($("#resource_code").html() == "") {
                    layer.msg("请填写资源编号");
                    return
                }

                if ($("#equipment_group").html() == "") {
                    layer.msg("请填写设备组");
                    return
                }

                if ($("#model").html() == "") {
                    layer.msg("请输入设备型号");
                    return
                }

                if ($("#ip").html() == "") {
                    layer.msg("请输入IP");
                    return
                } else {
                    $(".model").each(function () {
                        var map = {
                            id: $(this).attr("id"),
                            resource_code: $(this).attr("resource_code") == null ? '' : $(this).attr("resource_code"),
                            equipment_group: $(this).attr("equipment_group") == null ? '' : $(this).attr("equipment_group"),
                            workshop_id: $('#work_shop').val(),
                            production_line_id: $('#production_line').val(),
                            production_line_name: $('#production_line').find("option:selected").text(),
                            category: $(this).attr("category") == null ? '' : $(this).attr("category"),
                            model: $(this).attr("model") == null ? '' : $(this).attr("model"),
                            rate: $(this).attr("rate") == null ? '' : $(this).attr("rate"),
                            position_x: $(this).position().left,
                            position_y: $(this).position().top,
                            ip: $(this).attr("ip") == null ? '' : $(this).attr("ip")
                        };
                        if ($(this).attr("type") == "add") {
                            add.push(map);
                            map = null;
                        }
                        if ($(this).attr("type") == "update") {
                            update.push(map);
                            map = null;
                        }
                    });
                    uploadValue.push({
                        add: add,
                        update: update
                    });
                    add = null;
                    update = null;
                    COMMON.WS.ajax('layout/saveData', 'post', JSON.stringify(uploadValue), true, function (data) {
                        var flag = true;
                        if (data == flag) {
                            layer.msg('保存成功！');
                        } else {
                            layer.msg('请重试');
                        }
                    });
                    uploadValue = null;
                    return null;
                }
            });

            function loadLine(){
                clear();
                $("#container").html("");
                var uploadValue ={
                    workshop_id:$('#work_shop').val(),
                    production_line_id:$('#production_line').val()
                };
                COMMON.WS.ajax('layout/getLayoutById', 'post', JSON.stringify(uploadValue), true, function (data) {
                    var html_="";
                    for(var i=0;i<data.length;i++){
                        html_+="<div class='model' " +
                            "id='"+data[i].id+"'" +
                            "type='load' " +
                            "resource_code='"+data[i].resourceCode+"'" +
                            "equipment_group='"+data[i].equipmentGroup+"'" +
                            "category='"+data[i].category+"'" +
                            "model='"+data[i].model+"'" +
                            "rate='"+data[i].rate+"'" +
                            "production_line_name='"+data[i].productionLineName+"'" +
                            "position-x='"+data[i].x+"'" +
                            "position-y='"+data[i].y+"'" +
                            "ip='"+data[i].ip+"'" +
                            "style='position: absolute; left: "+data[i].x+"px; top:"+data[i].y+"px;'>" +
                            "<div style='border:1px solid #9e9e9e;' onmouseout='smImg(this)' onmousemove='bigImg(this)'>" +
                            "<a href='javascript:void(0);' onclick='removeElement("+data[i].id+")' class='delete'><i class='glyphicon glyphicon-remove'></i></a>"+
                            "<img style='width:100px;height:100px;' src='img/"+data[i].category+".png'>" +
                            "</div></div>";
                    };
                    $("#container").html(html_);html_=null;
                    $(".model").draggable({
                        containment: "parent",
                        cursor: "move",
                        drag: function () {
                            $('#resource_code').html($(this).attr("resource_code")==undefined?'':$(this).attr("resource_code"));
                            $('#equipment_group').html($(this).attr("equipment_group")==undefined?'':$(this).attr("equipment_group"));
                            $('#category').html($(this).attr("category")==undefined?'':$(this).attr("category"));
                            $('#model').html($(this).attr("model")==undefined?'':$(this).attr("model"));
                            $('#rate').html($(this).attr("rate")==undefined? 0:$(this).attr("rate"));
                            $('#production_line_name').text($('#production_line').find("option:selected").text());
                            $('#ip').html($(this).attr("ip")==undefined?'':$(this).attr("ip"));
                            $('#position-x').text($(this).position().left);
                            $('#position-y').text($(this).position().top);
                        },
                        stop:function (event) {
                            var id = event.target.id;
                            //判断位置是否改变
                            if($("#"+id).attr("type")=="load"){
                                $("#"+id).attr("type","update");
                            };
                            if($(this).attr("position-x")=='position-x'){
                                $("#"+id).attr("position-x",$(this).position().left);
                            };
                            if($(this).attr("position-y")=='position-y'){
                                $("#"+id).attr("position-y",$(this).position().top);
                            };

                        }
                    });
                    $(".model").mouseenter(function () {
                        $(this).find(".delete").show();

                    });
                    $(".model").mouseleave(function () {
                        $(this).find(".delete").hide();
                    });

                    $(".model").click(function(){
                        $("#left_table_id").val($(this).attr("id")==undefined?'':$(this).attr("id"));//记录当前是哪个床子
                        $('#resource_code').html($(this).attr("resource_code")==undefined?'':$(this).attr("resource_code"));
                        $('#equipment_group').html($(this).attr("equipment_group")==undefined?'':$(this).attr("equipment_group"));
                        $('#category').html($(this).attr("category")==undefined?'':$(this).attr("category"));
                        $('#model').html($(this).attr("model")==undefined?'':$(this).attr("model"));
                        $('#rate').html($(this).attr("rate")==undefined?'':$(this).attr("rate"));
                        $('#production_line_name').html($(this).attr("production_line_name")==undefined?'':$(this).attr("production_line_name"));
                        $('#position-x').text($(this).position().left);
                        $('#position-y').text($(this).position().top);
                        $('#ip').html($(this).attr("ip")==undefined?'':$(this).attr("ip"));
                    });
                });
                uploadValue=null;
                return null;
            };

            //下拉列表查询事件
            $("#production_line").bind("change",loadLine);
            loadLine();
        }
    };
//返回入口
    return {
        "init": af.load
    };
});