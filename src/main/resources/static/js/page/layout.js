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
                var rate = "rate" + model_counter;
                var table = null;
                if(modelid=="chechuang") {
                    table = "<div style='border:1px solid #9e9e9e;' onmouseout='smImg(this)' onmousemove='bigImg(this)'><img style='width:100px;height:100px;' src='img/车床.png'></div>";
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
                $("#"+jcID).attr("position-x",$('#position-x').text());
                $("#"+jcID).attr("position-y",$('#position-y').text());
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
                $('#rate').text("");
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
                    + id +'" >'+add_html+'</div>');
                var left = parseInt(ui.offset.left - $(selector).offset().left);
                var top = parseInt(ui.offset.top - $(selector).offset().top);
                $("#"+id).css("position", "absolute").css("left", left).css("top", top);
                //添加连接点
                instance.addEndpoint(id, { anchors: "RightMiddle" }, hollowCircle);
                instance.addEndpoint(id, { anchors: "LeftMiddle" }, hollowCircle);
                instance.addEndpoint(id, { anchors: "TopCenter" }, hollowCircle);
                instance.addEndpoint(id, { anchors: "BottomCenter" }, hollowCircle);
                $('#position-x').text($("#" + id).position().left);
                $('#position-y').text($("#" + id).position().top);
                $('#production_line_name').text($('#production_line').find("option:selected").text());
                // if(modelid=="chechuang"){
                //     $('#category').text("车床");
                // }else if (modelid=="xichuang") {
                //     $('#category').text("铣床");
                // }else if (modelid=="mochuang"){
                //     $('#category').text("磨床");
                // }else if (modelid=="tangchuang"){
                //     $('#category').text("镗床");
                // }

                $("#" + id).draggable({
                    containment: "parent",
                    start: function () {
                        if($("#left_table_id").val()!=id){
                            $("#resource_code").text($("#"+id).attr("resource_code")==undefined?'':$("#"+id).attr("resource_code"));
                            $('#equipment_group').text($(this).attr("equipment_group")==undefined?'':$(this).attr("equipment_group"));
                            $('#category').html($(this).attr("category")==undefined?'':$(this).attr("category"));
                            $('#model').html($(this).attr("model")==undefined?'':$(this).attr("model"));
                            $('#rate').html($(this).attr("rate")==undefined?'':$(this).attr("rate"));
                            $('#production_line_name').html($(this).attr("production_line_name")==undefined?'':$(this).attr("production_line_name"));
                            $('#ip').html($(this).attr("ip")==undefined?'':$(this).attr("ip"));
                            $("#left_table_id").val(id);
                        }
                    },
                    drag: function (event, ui) {
                        instance.repaintEverything();
                    },
                    stop: function () {
                        instance.repaintEverything();
                        //输出坐标
                        $('#position-x').text($(this).position().left)
                        $('#position-y').text($(this).position().top)
                        $('#production_line_name').text($('#production_line').find("option:selected").text());
                    }
                });
                //鼠标点击div事件
                $("#" + id).click(function (e) {
                    $("#left_table_id").val(id);//记录当前是哪个床子
                    $('#resource_code').html($(this).attr("resource_code")==undefined?'':$(this).attr("resource_code"));
                    $('#equipment_group').html($(this).attr("equipment_group")==undefined?'':$(this).attr("equipment_group"));
                    $('#category').html($(this).attr("category")==undefined?'':$(this).attr("category"));
                    $('#model').html($(this).attr("model")==undefined?'':$(this).attr("model"));
                    $('#rate').html($(this).attr("rate")==undefined?'':$(this).attr("rate"));
                    $('#production_line_name').text($('#production_line').find("option:selected").text());
                    $('#position-x').text($(this).position().left);
                    $('#position-y').text($(this).position().top);
                    $('#ip').html($(this).attr("ip")==undefined?'':$(this).attr("ip"));

                });
                return id;
            }
            //保存
            $("#saveBtn").click(function (e) {
                var uploadValue=[];
                var add=[];
                var update=[];
                $(".model").each(function(){
                    var map={
                        resource_id:$(this).attr("id"),
                        resource_code:$(this).attr("resource_code")==null?'':$(this).attr("resource_code"),
                        equipment_group:$(this).attr("equipment_group")==null?'':$(this).attr("equipment_group"),
                        workshop_id:$('#work_shop').val(),
                        production_line_id:$('#production_line').val(),
                        production_line_name:$('#production_line').find("option:selected").text(),
                        category:$(this).attr("category")==null?'':$(this).attr("category"),
                        model:$(this).attr("model")==null?'':$(this).attr("model"),
                        rate:$(this).attr("rate")==null?'':$(this).attr("rate"),
                        position_x:$(this).attr("position-x"),
                        position_y:$(this).attr("position-y"),
                        ip:$(this).attr("ip")==null?'':$(this).attr("ip")
                    };
                    if($(this).attr("type")=="add"){
                        add.push(map);map=null;
                    }
                    if($(this).attr("type")=="load"){
                        update.push(map);map=null;
                    }
                });

                uploadValue.push({
                    add:add,
                    update:update
                });
                alert("upload="+JSON.stringify(uploadValue));

                COMMON.WS.ajax('layout/saveData', 'post', JSON.stringify(uploadValue), true, function (data) {
                    var flag = true;
                    if (data == flag) {

                        layer.msg('保存成功！');

                    } else {

                        layer.msg('请重试');
                    }

                });
            })

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
                        html_+="<div class='model jtk-endpoint-anchor ui-draggable ui-draggable-handle' " +
                            "id='1_'"+(i)+" " +
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
                            "<div style='border: 1px solid rgb(158, 158, 158);'>" +
                            "<img style='width:100px;height:100px;' src='img/"+data[i].category+".png'>" +
                            "</div></div>";
                    };
                    $("#container").html(html_);html_=null;
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

            function removeElement(obj) {
                var element = $(obj).parents(".model");
                if (confirm("确定删除该模型？"))
                    instance.remove(element);
            }

            loadLine();
        }
    };
//返回入口
    return {
        "init": af.load
    };
});

//鼠标移动事件
function bigImg(x) {
    x.style.borderColor = "#000000"
}

function smImg(x) {
    x.style.borderColor = "#9e9e9e"
}

// $(function () {
//     var options = {
//         float: true
//     };
//     $('.grid-stack').gridstack(options);
//
//     new function () {
//         this.items = [
//             {x: 0, y: 0, width: 2, height: 2},
//
//         ];
//
//         this.grid = $('.grid-stack').data('gridstack');
//
//         this.add_new_widget = function () {
//             var node = this.items.pop() || {
//                 x: 2,
//                 y: 2,
//                 width: 2,
//                 height: 2
//             };
//             this.grid.add_widget($('<div><div class="grid-stack-item-content"/><div/>'),
//                 node.x, node.y, node.width, node.height);
//         }.bind(this);
//
//         $('#add-new-widget').click(this.add_new_widget);
//     };
// });
// $().ready(function (e) {
//     //拖拽复制体
//
//     // $('#sortable').sortable({
//     //     placeholder: "portlet-placeholder ui-corner-all",
//     //     revert: true
//     // });
//     // counts = [17];
//     $('#table').draggable({
//
//     })
//
//
//     $('#catalog li').draggable({
//        // connectToSortable: "#sortable",
//         helper: "clone",//复制模式
//         revert: "invalid",
//         cursor: "move",//光标类型
//         stop: function () {
//
//         },
//         helper: function (event) {
//             //替换显示内容
//             var bar_id = event.target.id
//             if (bar_id == "chechuang"){
//                 var source = $("<div class='ui-widget-content ui-corner-tr'><img src='img/timg.jpg'></div>").draggable({});//主体
//             }if (bar_id=="xichuang"){
//                 var source = $("<div class='ui-widget-content ui-corner-tr'><img src='img/box3.png'></div>");//主体
//             }if(bar_id=="mochuang"){
//                 var source = $("<div class='ui-widget-content ui-corner-tr'><img src='img/box1.png'></div>");
//             }
//             //隐藏标签
//             var item = $("<a href='javascript:void(0);' class='remove label label-danger'><i class='glyphicon glyphicon-remove'></i>删除</a>")
//
//             $(item).click(function (event) {
//                 source.remove();
//             });
//
//             $(item, {
//                 style: 'display:none',
//                 // click: function() {
//                 //      source.remove();
//                 //  }
//             }).appendTo(source);
//
//             source.mouseenter(function () {
//                 $(this).find(item).show();
//             });
//
//             source.mouseleave(function () {
//                 $(this).find(item).hide();
//             });
//
//             $(this).append(source);
//
//             return source
//
//         }
//
//
//     });
//
//     //     activeClass: "ui-state-default",
//     //     hoverClass: "ui-state-hover" ,
//     //     accept: ":not(.ui-sortable-helper)",
//     //     drop: function( event, ui ) {
//     //         $( this ).find( ".placeholder" ).remove();
//     //         $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
//     //         alert("拖拽完毕")
//     //     }
//     // }).sortable({
//     //     items: "li:not(.placeholder)",
//     //     sort: function() {
//     //         // 获取由 droppable 与 sortable 交互而加入的条目
//     //         // 使用 connectWithSortable 可以解决这个问题，但不允许您自定义 active/hoverClass 选项
//     //         $( this ).removeClass( "ui-state-default" );
//     //     }
//     // });
// });
