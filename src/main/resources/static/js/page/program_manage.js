/**
 * 程序管理 2017/12/19
 */
define(['jquery', 'common', 'layer', 'bootstrap', 'bootstrapTreeView', 'datetimepicker'], function ($, COMMON, layer) {

    var af={
        load:function(){
            COMMON.LAYER_CONFIG.config();
            /*设置主页面 菜单页面高度*/
            var height = ((screen.height * 6) / 8);
            $('#mainPageContentCX').css('height', height);
            $('#mainPageContentCX div:eq(0)').css('height', height - 15);
            $('#mainPageContentCX div:eq(1)').css('height', height - 15);
            af.tree.load(),af.table.load();
        },
        username:COMMON.ECODE.Base64.decode($.cookie('username')),
        /**
         * 获取系统时间
         * @param type
         * @returns {string}
         */
        date:function(){
            var d=new Date(),str='';
            str+=d.getFullYear()+'-'; //获取当前年份
            str+=d.getMonth()+1+'-'; //获取当前月份（0——11）
            str+=d.getDate()+'';
            // str+=d.getHours()+':';
            // str+=d.getMinutes()+':';
            // str+=d.getSeconds();
            return str;
        },
        windowForms:function(obj){
            var openWindow = '<div style="padding:0;margin:0;">' +
                '<div class="col-md-12">' +
                '<div class="col-xs-3" style="margin-top:4px;width:100px;">目录名称：</div>'+
                '<div class="col-xs-8"><input type="text" id="windowForms" value="'+obj.val+'" class="form-control"></div>'+
                '</div>' +
                '<div class="col-md-12 margin-top-5">' +
                '<div class="col-xs-3" style="margin-top:4px;width:100px;">设备编号：</div>'+
                '<div class="col-xs-8"><input type="text" id="windowFormsCode" value="'+(obj.code==undefined?"":obj.code)+'" class="form-control"></div>'+
                '</div>' +
                '</div>';
            layer.open({
                shade:[0.2, '#393D49'],
                shadeClose:false,
                btn:[obj.type,'取消'],
                yes:function(){
                    var map={
                        type:obj.type,
                        node:obj.node,
                        val:$("#windowForms").val(),
                        code:$("#windowFormsCode").val()
                    };
                    obj.setTreeNode(map);
                    map=null;obj=null;
                },
                area: ['35%', '33%'],
                content: openWindow,
                title:'当前选择目录：'+obj.node[0].text
            });
            openWindow=null;
            return null;
        },
        tree:{
            load:function(){
                var options = {
                    borderColor:'rgb(245,245,245)',//边框颜色
                    levels:6,
                    data:[{
                        text:'数控程序目录',
                        nodes: [{
                            text: "第一车间",
                            nodes: [{
                                text: "加工工段1",
                                nodes: [{
                                    text: '设备型号（车床）',
                                    nodes: [{
                                        text: "设备品牌（i5入库）",
                                        nodes: [{
                                            code:'A19391931',
                                            text: 'A19391931',
                                            nodes: [{
                                                code:'A19391931',
                                                text: '入库'
                                            }, {
                                                code:'A19391931',
                                                text: '未入库'
                                            }]
                                        }]
                                    }]
                                }, {
                                    text: '设备品牌（铣床）'
                                }, {
                                    text: '设备品牌（钻床）'
                                }]
                            }, {
                                text: "加工工段2"
                            }, {
                                text: "加工工段3"
                            }]
                        }, {
                            text: "第二车间",
                            nodes: [{
                                text: '加工工段1'
                            }]
                        }]
                    }]
                };
                /*** 加载树形菜单 ***/
                $('#treeviewCX').treeview(options);options=null;
                /*** 折叠菜单***/
                $('#treeviewCX').treeview('collapseAll',{silent:true});
                af.tree.event();
                return null;
            },
            setTreeNode:function(obj){
                var singleNode = {text:obj.val,code:obj.code};
                if(obj.type=='新增'){
                    $("#treeviewCX").treeview("addNode", [singleNode,obj.node,{silent: true}]);
                }else{
                    $("#treeviewCX").treeview("updateNode", [obj.node,singleNode,{silent: true}]);
                };
                $('#treeviewCX').treeview('expandAll',{silent:true});
                $('#treeviewCX').treeview('collapseAll',{silent:true});
                $('#treeviewCX').treeview('revealNode', [obj.node,{silent:true}]);
                $('#treeviewCX').treeview('expandNode', obj.node);
                singleNode=null;obj=null;
                layer.msg("成功！");
                return null;
            },
            event:function(){
                /***tree选择事件***/
                $('#treeviewCX').on('nodeSelected',function(event, data){
                    af.selectCode=null;
                    if(data.code!=undefined&&data.code!=''){
                        af.selectCode=data.code;
                    }else{
                        af.table.removeAll();
                    };
                    event=null;data=null;
                    return null;
                });
                /***节点被展开***/
                $('#treeviewCX').on('nodeExpanded',function(event, data){
                    if(data.text=='数控程序目录'){
                        var node=$('#treeviewCX').treeview('getSelected',{silent:true});
                        $('#treeviewCX').treeview('toggleNodeSelected',[node,{silent:true}]);
                        node=null;
                    };
                    event=null;data=null;
                    return null;
                });
                /***节点被折叠***/
                $('#treeviewCX').on('nodeCollapsed',function(event, data){
                    if(data.text=='数控程序目录'){
                        var node=$('#treeviewCX').treeview('getSelected',{silent:true});
                        $('#treeviewCX').treeview('toggleNodeSelected',[node,{silent:true}]);
                        node=null;
                    };
                    event=null;data=null;
                    return null;
                });
                /***新增tree节点***/
                $("#addBtn").click(function(){
                    var node=$('#treeviewCX').treeview('getSelected',{silent:true});
                    var nodeData=$('#treeviewCX').treeview('getEnabled',{silent:true});
                    var obj={
                        type:'新增',
                        node:node==''?nodeData:node,val:'',
                        setTreeNode:af.tree.setTreeNode,
                        code:node==''?nodeData[0].code==undefined?'':nodeData[0].code:node[0].code==undefined?'':node[0].code
                    };node=null;nodeData=null;
                    af.windowForms(obj);obj=null;
                    return null;
                });
                /***修改tree节点***/
                $("#updateBtn").click(function(){
                    var node=$('#treeviewCX').treeview('getSelected',{silent:true});
                    if(node!=''){
                        var obj={
                            type:'修改',node:node,
                            setTreeNode:af.tree.setTreeNode,
                            val:node[0].text,code:node[0].code
                        };
                        if(node[0].nodes&&node[0].nodes.length>0){
                            var lay = layer.confirm('检测到当前目录下有子目录，如果修改当前目录那么子目录将会清空，确认修改吗？', {
                                title: '<span style="color:red;">提示</span>',
                                btn: ['确定', '取消'] //按钮
                            },function(){
                                af.windowForms(obj);obj=null;
                            });
                        }else{
                            af.windowForms(obj);obj=null;
                        };
                        node=null;
                    };
                    return null;
                });
                /***删除tree节点***/
                $("#deleteBtn").click(function(){
                    if(node!=''){
                        var node = $('#treeviewCX').treeview('getSelected', {silent: true});
                        $("#treeviewCX").treeview("removeNode", node);
                        layer.msg("成功！");
                    }
                });
                return null;
            }
        },
        table:{
            load:function(){
                af.table.event();
                return null;
            },
            tdLoad:function(map){
                $("#tableSwjCx tbody").append("<tr class='add' style='padding:0;margin:0;'>" +
                    "<td style='padding:0;width:6%;line-height:30px;'>" +
                    "<input type='radio' name='radio'/>" +
                    "</td>" +
                    "<td style='padding:0;width:29%;line-height:30px;' class='text'>"+map.name+"</td>" +
                    "<td style='padding:0;width:25%;line-height:30px;' class='time'>"+map.newDate+"</td>" +
                    "<td style='padding:0;width:25%;line-height:30px;' class='time'>"+map.updateDate+"</td>" +
                    "<td style='padding:0;width:15%;line-height:30px;'>"+map.username+"</td>" +
                    "</tr>");
                $("#tableSwjCx tbody tr td.text").click(function(){af.table.tdEdit(this);});//可编辑表格 text
                $(".time").html();
                return null;
            },
            tdEdit:function(e){
                if(e.new==undefined||e.new==false){
                    e.new=true;
                    var tr=$(e).parent();
                    $(e).html('<input type="text" style="height:30px;" class="form-control newInput" value="'+$(e).html()+'">');
                    $(".newInput").focus();
                    $(".newInput").blur(function(){
                        $(e).html($(this).val());
                        e.new=false;e=null;
                    });
                    if(tr.attr("class")=='load'){
                        tr.attr("class","update");
                    };
                };
                return null;
            },
            removeAll:function () {
                $("#tableSwjCx tbody tr").remove();
                return null;
            },
            event:function(){
                $("#addTable").click(function(){//add table
                    if(af.selectCode==null){
                        layer.msg("请选择设备，在添加程序！");
                        return null;
                    };
                    var map={
                        name:'',
                        username:af.username,
                        newDate:af.date(),
                        updateDate:af.date()
                    };
                    af.table.tdLoad(map);
                });
                return null;
            }
        }
    };

    return {
        "init": af.load
    };
});