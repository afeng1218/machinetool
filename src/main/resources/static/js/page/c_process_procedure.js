/**
 * Created by GuoFeng on 2016/4/4.
 */

define(['jquery', 'common', 'layer', 'page/common_search', 'datetimepicker', "fileinput"], function($, COMMON, layer, COMMON_SEARCH){
        var af={
            /**
             * 加载load
             */
            load:function(){
                //layer config
                COMMON.LAYER_CONFIG.config();
                //设置审批权
                var orderApprovalAuthority=COMMON.ECODE.Base64.decode($.cookie('orderApprovalAuthority'));
                if(orderApprovalAuthority=='否'){
                    $('#approveBtn').remove();
                };orderApprovalAuthority=null;
                //获取用户权限
                var arrUrl=window.location.href.split("/");
                var strPage=COMMON.ECODE.Base64.encode(arrUrl[arrUrl.length - 1]);arrUrl=null;
                var username=COMMON.ECODE.Base64.decode($.cookie('username'));
                var organization = COMMON.ECODE.Base64.decode($.cookie("organization"));//组织
                if($.cookie(strPage)== null && username != 'admin'){
                    $('#saveBtn').remove();
                    $('#deleteBtn').remove();
                };strPage=null;username=null;
                $("#title_name").html(organization);organization=null;
                //设置表格有效高度
                var height=window.screen.height/3.5;
                $('.autoName').css("height", height+"px");
                $('#images_').css("height",(height+180)+"px");
                $('.file-preview-thumbnails').parent().css('width','80%');
                $('.file-preview-thumbnails').parent().css('height',(height)+'px');height=null;
                var a=$("#design_date").html(af.thisDate('yyyy-MM-dd'));a=null;
                a=af.event();a=null; //渲染事件
            },
            /**
             * 当前时间
             * @param type
             * @returns {string}
             */
            thisDate:function(type){
                var d=new Date(), str='';
                str += d.getFullYear() +'-'; //获取当前年份
                str += d.getMonth() +1 +'-'; //获取当前月份（0——11）
                if(type=="yyyy-MM-dd"){
                    str += d.getDate();
                }else{
                    str += d.getDate() +' ';
                    str += d.getHours() +':';
                    str += d.getMinutes() +':';
                    str += d.getSeconds();
                };
                return str;
            },
            /**
             * 刀具清单
             * @param result
             * @param fun_
             */
            loadingDjqingDan:function (result,fun_) {
                var wlMap={
                    html:'',
                    popMenu: false,
                    searchValue: result.cuttoolNo,
                    searchTable: 'CCuttoolAssembly',
                    searchCol: 'cuttoolNo,number,CGeneralMaterial.materialNo,CGeneralMaterial.materialDescribe'
                };
                COMMON_SEARCH.OPEN_PAGE.openPage(wlMap, function(wlData){
                    if(wlData.length>0){
                        wlMap.html='<tr class="'+result.cuttoolNo+'" style="padding:0;margin:0;">'+
                            '<td rowspan="'+(wlData.length+1)+'" style="padding:0;width:5%;">'+result.xh+'</td>'+
                            '<td rowspan="'+(wlData.length+1)+'" style="padding:0;width:10%;">'+result.dj+'</td>'+
                            '<td rowspan="'+(wlData.length+1)+'" style="padding:0;width:10%;">'+result.cuttoolNo+'</td>'+
                            '<td rowspan="'+(wlData.length+1)+'" style="padding:0;width:10%;">'+result.cuttoolDescription+'</td></tr>';
                        $.each(wlData, function(index, key){
                            wlMap.html+='<tr class="'+result.cuttoolNo+'" style="padding:0;margin:0;">'+
                                '<td style="padding:0;width:10%;">'+key.CGeneralMaterial_materialNo+'</td>'+
                                '<td style="padding:0;width:10%;">'+key.CGeneralMaterial_materialDescribe+'</td>'+
                                '<td style="padding:0;width:10%;">'+key.number+'</td></tr>';
                        });
                    }else{
                        wlMap.html='<tr class="'+result.cuttoolNo+'" style="padding:0;margin:0;">'+
                            '<td style="padding:0;width:5%;">'+result.xh+'</td>'+
                            '<td style="padding:0;width:10%;">'+result.dj+'</td>'+
                            '<td style="padding:0;width:10%;">'+result.cuttoolNo+'</td>'+
                            '<td style="padding:0;width:10%;">'+result.cuttoolDescription+'</td>'+
                            '<td style="padding:0;width:10%;"></td>'+
                            '<td style="padding:0;width:10%;"></td>'+
                            '<td style="padding:0;width:10%;"></td></tr>';
                    };
                    return fun_(wlMap.html),wlData=null,wlMap=null;
                });
            },
            /**
             * 表格列事件绑定
             * @param table1
             * @param table2
             */
            loadTableEvent:function(table1,table2){
                var a=$("#"+table1+" tbody tr td.add").click(function(){
                    var this_=this;
                    var map={
                        load:function(fun_){
                            if((this_.new==false||this_.new==undefined)){
                                //普通文本
                                this_.new=true;
                                var type=$(this_).attr("type");
                                var typeName=$(this_).attr('typeName');
                                var keydow=$(this_).attr('keydown');
                                $(this_).html('<input type="'+type+'" min="1" class="form-control newInput" value="'+$(this_).html()+'">');
                                $(".newInput").focus();
                                if(!keydow){
                                    $(".newInput").blur(function(){
                                        var value_=$(this).val();
                                        if($(this_).attr('bt')){//必填项
                                            var yesNo=true;
                                            var title=$(this_).attr('typeName');
                                            if(title=='工序号'){
                                                var a=$(".gxBt").each(function(index,key){
                                                    if($(key).text()==value_&&value_!=''){
                                                        yesNo=null;return null;
                                                    }
                                                });a=null;
                                            }else if(title=='工步ID'){
                                                var a=$(".gbBt").each(function(index,key){
                                                    if($(key).text()==value_&&value_!=''){
                                                        yesNo=null;return null;
                                                    }
                                                });a=null;
                                            };
                                            if(!yesNo){
                                                layer.tips(title+'重复，请重新输入！', this_);
                                                value_='';title=null;
                                            };yesNo=null;
                                        };
                                        this_.new=false;
                                        $(this_).html(value_);
                                        value_=null;
                                        return fun_();
                                    });
                                }else{
                                    if(typeName=='设备'){
                                        var searchVal={
                                            popMenu: true,
                                            searchValue: $(this_).text(),
                                            searchTable: 'CMechanicalEquipment',
                                            searchCol: 'equipmentAssetsNo,equipmentName',
                                            colName: '机床编号,机床名称'
                                        };
                                        /*设备查询双击事件回调函数*/
                                        COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function(result){
                                            if(result){
                                                $(this_).html(result.equipmentName);
                                            }else{
                                                $(this_).html($(".newInput").val());
                                            };
                                            result=null;
                                            searchVal=null;
                                            this_.new=false;
                                            return fun_();
                                        });
                                    }else if(typeName=='刀具'){
                                        var searchVal={
                                            popMenu: true,
                                            searchValue: $(this_).text(),
                                            searchTable: 'CCuttoolBasedata',
                                            searchCol: 'cuttoolNo,cuttoolDescription,cuttoolId',
                                            colName: '刀具编号,刀具描述'
                                        };
                                        COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function(result){
                                            searchVal=null;
                                            if(result){
                                                var tr=$("#"+table1+" tbody tr.newTr");
                                                var td=$(this_).parent().children("td");
                                                $.each(tr,function(){
                                                    if(result.cuttoolNo==$(this).children('td').eq(2).html()){
                                                        tr=null;
                                                        return null;
                                                    };
                                                });
                                                if(tr){
                                                    //清除清单重新灌输数据
                                                    if($(".newInput").val()!=''){
                                                        var a=$("."+$(".newInput").val()).remove();a=null;
                                                    };
                                                    $(td).eq(0).html(result.cuttoolId);//刀具ID
                                                    $(this_).html(result.cuttoolNo);
                                                    result.xh=$(td).eq(0).html();
                                                    result.dj=$(td).eq(1).html();
                                                    //刀具清单
                                                    var tdMap={
                                                        load:function(fun_){
                                                            var a=af.loadingDjqingDan(result,fun_);a=null;
                                                        }
                                                    };
                                                    tdMap.load(function(data){
                                                        var a=$('#'+table2+' tbody').append(data);a=null;
                                                        data=null;tdMap=null;result=null;this_.new=false;
                                                        return fun_();
                                                    });
                                                }else{
                                                    layer.tips('实际刀具编号重复，请重新选择！', this_);
                                                    $(this_).html('');result=null;this_.new=false;
                                                    return fun_();
                                                };tr=null;td=null;
                                            }else{
                                                $(this_).html($(".newInput").val());
                                                result=null;this_.new=false;
                                                return fun_();
                                            };
                                        });
                                    };
                                };
                                type=null;typeName=null;keydow=null;
                            };
                        }
                    };
                    map.load(function(){map=null;this_=null;return null;});
                });a=null;
            },
            /**
             * 工序表格的相关操作
             * @param HashMap
             * @param fun_
             */
            loadgyTable:function(HashMap,fun_){
                var map={
                    load:function(rFun){
                        var a=$('#gyTable tbody').append('<tr class="newTr" style="height:35px;padding:0;">'+
                            '<td class="add" style="padding:0;width:5%;line-height:30px;" type="text">'+HashMap.num+'</td>'+
                            '<td class="add gxBt" style="padding:0;width:10%;line-height:30px;" type="number" bt="true" typeName="工序号">'+HashMap.process_number+'</td>'+
                            '<td class="add" style="padding:0;width:15%;line-height:30px;" type="text">'+HashMap.process_name+'</td>'+
                            '<td class="add" style="padding:0;width:30%;line-height:30px;" type="text">'+HashMap.process_description+'</td>'+
                            '<td class="add" style="padding:0;width:15%;line-height:30px;" type="text">'+HashMap.program_name+'</td>'+
                            '<td class="add" style="padding:0;width:15%;line-height:30px;" type="text" keydown="true" typeName="设备">'+HashMap.using_equipment+'</td>'+
                            '<td style="padding:0;width:3%;line-height:30px;">'+
                            '<a href="javascript:void(0)" class="glyphicon glyphicon-remove" onclick="(function(e){var tr=$(e).parent().parent();tr.remove();})(this);"></a>'+
                            '</td>'+
                            '</tr>');
                        a=af.loadTableEvent('gyTable',null);a=null;
                        return rFun();
                    }
                };
                map.load(function(){map=null;HashMap=null;return fun_();})
            },
            /**
             * 刀具表格的相关操作
             * @param HashMap
             * @param fun_
             */
            loadDjtable:function(HashMap,fun_){
                var map={
                    load:function(rFun){
                        var a=$('#djTable tbody').append('<tr class="newTr" style="height:35px;padding:0;margin:0;">'+
                            '<td class="add gbBt" style="padding:0;width:5%;line-height:30px;" type="text" bt="true" typeName="工步ID">'+HashMap.process_step_id+'</td>'+
                            '<td class="add" style="padding:0;width:9%;line-height:30px;" type="text">'+HashMap.program_cuttool_no+'</td>'+
                            '<td class="add" style="padding:0;width:9%;line-height:30px;" type="text" keydown="true" typeName="刀具">'+HashMap.cuttool_no+'</td>'+
                            '<td class="add" style="padding:0;width:14%;line-height:30px;" type="text">'+HashMap.process_description+'</td>'+
                            '<td class="add" style="padding:0;width:9%;line-height:30px;" type="number">'+HashMap.chip_maximum_diameter+'</td>'+
                            '<td class="add" style="padding:0;width:9%;line-height:30px;" type="number">'+HashMap.chip_minimum_diameter+'</td>'+
                            '<td class="add" style="padding:0;width:9%;line-height:30px;" type="number">'+HashMap.chip_speed+'</td>'+
                            '<td class="add" style="padding:0;width:9%;line-height:30px;" type="number">'+HashMap.spindle_speed+'</td>'+
                            '<td class="add" style="padding:0;width:9%;line-height:30px;" type="number">'+HashMap.cutting_depth+'</td>'+
                            '<td class="add" style="padding:0;width:9%;line-height:30px;" type="number">'+HashMap.amount_feed+'</td>'+
                            '<td class="add" style="padding:0;width:6%;line-height:30px;" type="number">'+HashMap.process_time+'</td>'+
                            '<td style="padding:0;width:4%;line-height:30px;">'+
                            '<a href="javascript:void(0)" class="glyphicon glyphicon-remove" onclick="(function(e){var tr=$(e).parent().parent();if($(tr).children(\'td\').eq(2).html()!=\'\'){$(\'.\'+$(tr).children(\'td\').eq(2).html()).remove()};tr.remove();})(this);"></a>'+
                            '</td>'+
                        '</tr>');
                        a=af.loadTableEvent('djTable','djTableQd');a=null;
                        return rFun();
                    }
                };
                map.load(function(){HashMap=null;map=null;return fun_();});
            },
            /**
             * 添加
             * @param type
             * @param function_
             */
            add:function(type,function_){
                //工艺加工
                if(type==1){
                    if(this.num){$("#gyTable tbody tr").length>0?this.num++:this.num=1;}else{this.num=1;};
                    var map={
                        num:this.num,
                        process_number:'',//工序号
                        process_name:'',//工序名称
                        process_description:'',//工序描述
                        program_name:'',//程序名
                        using_equipment:'',//使用设备
                        add:function(fun_){
                            var a=af.loadgyTable(map,fun_);a=null;
                        }
                    };
                    map.add(function(){map=null;return function_();});
                }else{
                    var map={
                        process_step_id:'',//id
                        program_cuttool_no:'',//刀具编号
                        cuttool_no:'',//实际刀具编号
                        process_description:'',//加工过程描述
                        chip_maximum_diameter:0,//切削最大直径
                        chip_minimum_diameter:0,//切削最小直径
                        chip_speed:0,//切削速度
                        spindle_speed:0,//主轴转速
                        cutting_depth:0,//切削深度
                        amount_feed:0,//进给量
                        process_time:0,//时间
                        add:function(fun_){
                            var a=af.loadDjtable(map,fun_);a=null;
                        }
                    };
                    map.add(function(){map=null;return function_();});
                }
            },
            /**
             * 物料点击事件&&清除表单信息
             * @param a
             * @param b
             * @param c
             * @param clear
             */
            selectClear:{
                a:{
                    popMenu:true,
                    readonly:false,
                    searchValue:'',
                    colName:'工艺编码,工艺描述',
                    searchTable:'CGeneralMaterial',
                    searchCol:'materialNo,materialDescribe,materialId',
                    addLimit:[{'colName':'materialClass','colValue':'工艺'}]
                },
                //查询物料界面
                b:function(fun_){
                    var a=COMMON_SEARCH.OPEN_PAGE.openPage(af.selectClear.a, function(HashMap){
                        var a=$('#wl_id').val(HashMap.materialId);a=null;
                        a=$('#wl_code').val(HashMap.materialNo);a=null;
                        a=$('#wl_miaoshu').val(HashMap.materialDescribe);a=null;
                        a=af.selectClear.c(HashMap.materialId,fun_);a=null;HashMap=null;
                    });a=null;
                },
                //查找详细信息
                c:function(id,fun_){
                    var a=af.selectClear.clear(id,function(){
                        if(!id){return fun_();};
                        var a=COMMON.WS.ajax("procedure/select", "post", id, true, function(data){
                            var obj= eval(data);data=null;
                            //版本以及审核
                            if(obj.title.length>0){
                                var a=$("#wl_banben").val(obj.title[0].processVersion);a=null;//版本
                                a=$("#wl_type").val(obj.title[0].approver?'已审批':'未审批');a=null;//是否审核
                            };obj.title=null;
                            //加工工序
                            if(obj.mapA.length>0){
                                for(var i=0;i<obj.mapA.length;i++){
                                    var map={
                                        num:i+1,
                                        process_number:obj.mapA[i].process,//工序号
                                        process_name:obj.mapA[i].process_name,//工序名称
                                        process_description:obj.mapA[i].process_description,//工序描述
                                        program_name:obj.mapA[i].program_name,//程序名
                                        using_equipment:obj.mapA[i].using_equipment,//使用设备
                                        add:function(fun_){
                                            var a=af.loadgyTable(map,fun_);a=null;
                                        }
                                    };
                                    map.add(function(){map=null;});
                                };
                            }else{
                                var a=$("#addRow").click();
                            };obj.mapA=null;
                            //工艺卡片
                            if(obj.mapB.length>0){
                                var a=$("#process_name").html(obj.mapB[0].process_name),//工件名称
                                    a=$("#equipment").html(obj.mapB[0].equipment),//机床型号
                                    a=$("#tool_carrier").html(obj.mapB[0].tool_carrier),//刀架类型
                                    a=$("#map_no").html(obj.mapB[0].map_no),//工件图号
                                    a=$("#title_name").html(obj.mapB[0].title_name),//题头
                                    a=$("#pretend_card").html(obj.mapB[0].pretend_card),//装卡方式
                                    a=$("#program_name").html(obj.mapB[0].program_name),//方案名称
                                    a=$("#order_val").html(obj.mapB[0].order_val),//共几序
                                    a=$("#hardness").html(obj.mapB[0].hardness),//硬度
                                    a=$("#material").html(obj.mapB[0].material),//材料
                                    a=$("#process_number").html(obj.mapB[0].process_number),//工序号
                                    a=$("#designer").html(obj.mapB[0].designer),//设计者
                                    a=$("#design_date").html(obj.mapB[0].design_date),//设计日期
                                    a=$("#attachment_description").html(obj.mapB[0].attachment_description);a=null;//附件说明
                                if(obj.mapB[0].process_diagram!=''){//图片操作
                                    a=$('#id').val(id);a=null;
                                    a=$('#materialParDiv').prepend(
                                        '<div id="imgPreview" class="col-md-12 col-nopadding ">' +
                                        '<img src="uploadImg/'+obj.mapB[0].process_diagram+'" class="file-preview-image" ' +
                                        'style="width: '+(Number($("#images_").width()) - 30)+'px;height:'+(Number($("#images_").height()) - 60)+'px;"/>' +
                                        '<div id="imgPreviewClose" val="'+obj.mapB[0].process_diagram+'" class="close fileinput-remove">x</div>' +
                                        '</div>');a=null;
                                    if($("#wl_type").val()=='未审批'){
                                        a=$("#imgPreviewClose").click(function(){
                                            var lay=layer.confirm('是否确认删除此图片？', {
                                                btn:['删除', '取消'] //按钮
                                            },function(){
                                                var map={
                                                    id:$('#id').val(),
                                                    name:$("#imgPreviewClose").attr('val')
                                                };
                                                var a=COMMON.WS.restful("procedure/removeImages", "post", JSON.stringify(map), true, function (result) {
                                                    if(result){
                                                        layer.msg('图片删除成功！');
                                                        var a=$('#imgPreview').remove();a=null;
                                                    }else{
                                                        layer.msg('图片删除失败！');
                                                    };result=null;
                                                });a=null;map=null;
                                            });
                                        });a=null;
                                    }else{
                                        a=$("#imgPreviewClose").hide();a=null;
                                    };
                                };
                                for(var i=0;i<obj.mapB.length;i++){
                                    var map={
                                        process_step_id:obj.mapB[i].process_step_id,//id
                                        program_cuttool_no:obj.mapB[i].program_cuttool_no,//刀具编号
                                        cuttool_no:obj.mapB[i].cuttool_no,//实际刀具编号
                                        process_description:obj.mapB[i].process_description,//加工过程描述
                                        chip_maximum_diameter:obj.mapB[i].chip_maximum_diameter,//切削最大直径
                                        chip_minimum_diameter:obj.mapB[i].chip_minimum_diameter,//切削最小直径
                                        chip_speed:obj.mapB[i].chip_speed,//切削速度
                                        spindle_speed:obj.mapB[i].spindle_speed,//主轴转速
                                        cutting_depth:obj.mapB[i].cutting_depth,//切削深度
                                        amount_feed:obj.mapB[i].amount_feed,//进给量
                                        process_time:obj.mapB[i].process_time,//时间
                                        add:function(fun_){
                                            var a=af.loadDjtable(map,fun_);a=null;
                                            var httpMap={
                                                xh:obj.mapB[i].process_step_id,
                                                dj:obj.mapB[i].program_cuttool_no,
                                                cuttoolNo:obj.mapB[i].cuttool_no,
                                                cuttoolDescription:obj.mapB[i].cuttool_description
                                            };
                                            a=af.loadingDjqingDan(httpMap,function(htmlR){
                                                var a=$('#djTableQd tbody').append(htmlR);a=null;
                                                htmlR=null;httpMap=null;
                                            });a=null;
                                        }
                                    };
                                    map.add(function(){map=null;});
                                };
                            }else{
                                var a=null;a=$("#addDj").click();a=null;
                            };obj.mapB=null;obj=null;id=null;
                            return fun_();
                        });a=null;
                    });a=null;
                },
                //清除表单
                clear:function(val,fun_){
                    $('#process_diagram_form')[0].reset();
                    //如果当前有图片，清空
                    if($('#imgPreview').length>0){
                        $('#imgPreview').remove();
                        $("#imgPreviewClose").unbind();
                    };
                    a=$("#wl_banben").val('101');a=null;//版本
                    a=$("#wl_type").val('未审批');a=null;//是否审核
                    a=$("#id").val('');a=null;//上传ID
                    a=$("#wl_banben").html('');a=null;//方案版本
                    a=$("#process_name").html('');a=null;//工件名称
                    a=$("#equipment").html('');a=null;//机床型号
                    a=$("#tool_carrier").html('');a=null;//刀架类型
                    a=$("#map_no").html('');a=null;//工件图号
                    a=$("#title_name").html('');a=null;//题头
                    a=$("#pretend_card").html('');a=null;//装卡方式
                    a=$("#program_name").html('');a=null;//方案名称
                    a=$("#order_val").html('');a=null;//共几序
                    a=$("#hardness").html(0);a=null;//硬度
                    a=$("#material").html('');a=null;//材料
                    a=$("#process_number").html('');a=null;//工序号
                    a=$("#designer").html('');a=null;//设计者
                    a=$("#design_date").html(af.thisDate('yyyy-MM-dd'));a=null;//设计日期
                    a=$("#attachment_description").html('');a=null;//附件说明
                    a=$("#gyTable tbody tr").remove();a=null;
                    a=$("#djTable tbody tr").remove();a=null;
                    a=$("#djTableQd tbody tr").remove();a=null;
                    if(val==undefined||val==null){
                        var a=$("#wl_id").val('');a=null;//物料ID
                        a=$("#wl_code").val('');a=null;//物料编码
                        a=$("#wl_miaoshu").val('');a=null;//物料描述
                        a=$("#addRow").click();a=null;
                        a=$("#addDj").click();a=null;
                    };
                    return fun_();
                }
            },
            /**
             * 保存
             * @param map
             * @param mapA
             * @param mapB
             * @param ajax
             * @param save
             */
            save:{
                map: new Array,//数据集合
                mapA: new Array,//加工工艺
                mapB: new Array,//工艺卡片
                ajax: function (function_,shtype) {
                    var a = COMMON.WS.ajax("procedure/save", "post", JSON.stringify(this.map), true, function (data) {
                        if (data) {
                            if ($('#process_diagram').val() != '') {//如果没有选择上传图片则不提交
                                var c = $('#id').val($('#wl_id').val());c = null;
                                var uploadImg = new FormData($("#process_diagram_form")[0]);
                                var b = COMMON.WS.ajax("procedure/upload", "post", uploadImg, true, function (data) {
                                    if (data == -1) {
                                        layer.msg('图片上传失败！');
                                    } else if (data == 0) {
                                        layer.msg('图片上传失败！请选择正确的图片格式！');
                                    };
                                    uploadImg = null;
                                    data = null;
                                });
                                b = null;
                            };
                            if(!shtype){layer.msg('保存成功！');};
                        } else {
                            if(!shtype){layer.msg('保存失败！');};
                        };
                        shtype=null;
                        return function_(data),data=null;
                    });
                    a = null;
                },
                save: function (function_,shtype) {
                    var gyTable = $("#gyTable tbody tr");//加工工艺
                    var djTable = $("#djTable tbody tr");//工艺卡片
                    if ($("#wl_type").val() == "已审批") {
                        layer.msg('已审批的数据无法更改！');
                        shtype=null;
                        gyTable = null;
                        djTable = null;
                        return function_();
                    } else if ($("#wl_code").val() == '') {
                        layer.tips('请选择物料！', "#wl_button");
                        shtype=null;
                        gyTable = null;
                        djTable = null;
                        return function_();
                    } else if ($("#wl_banben").val() == '') {
                        layer.tips('请填写版本号！', "#wl_banben");
                        shtype=null;
                        gyTable = null;
                        djTable = null;
                        return function_();
                    } else if (gyTable.length == 0) {
                        var a = af.add(1, function () {
                            layer.msg('请填写工序号！');
                            return null;
                        });
                        a = null;
                        shtype=null;
                        gyTable = null;
                        djTable = null;
                        return function_();
                    } else if ($("#process_number").text() == '') {
                        $("#process_number").click();
                        layer.tips('请填写工序号！', "#process_number");
                        shtype=null;
                        gyTable = null;
                        djTable = null;
                        shtype=null;
                        return function_();
                    } else if (djTable.length == 0) {
                        var a = af.add(2, function () {
                            layer.msg('请填写工步ID！');
                            return null;
                        });
                        a = null;
                        shtype=null;
                        gyTable = null;
                        djTable = null;
                        return function_();
                    };
                    for (var i = 0; i < gyTable.length; i++) {
                        if (gyTable.eq(i).children("td").eq(1).html() == '') {
                            gyTable.eq(i).children("td").eq(1).click();
                            layer.tips('请填写工序号！', gyTable.eq(i).children("td").eq(1));
                            shtype=null;
                            gyTable = null;
                            djTable = null;
                            return function_();
                        };
                        this.mapA.push({
                            shtype:shtype,//是否审核{默认false}
                            material_id: $("#wl_id").val(),//物料ID
                            process_version: $("#wl_banben").val(),//版本
                            process: gyTable.eq(i).children("td").eq(1).html(),//工序
                            process_name: gyTable.eq(i).children("td").eq(2).html(),//工序名称
                            process_description: gyTable.eq(i).children("td").eq(3).html(),//工序描述
                            program_name: gyTable.eq(i).children("td").eq(4).html(),//程序名称
                            using_equipment: gyTable.eq(i).children("td").eq(5).html()//使用设备
                        });
                    };
                    gyTable = null;
                    this.map.push({mapA: this.mapA});
                    this.mapA = null;
                    for (var i = 0; i < djTable.length; i++) {
                        if (djTable.eq(i).children("td").eq(0).html() == '') {
                            djTable.eq(i).children("td").eq(0).click();
                            layer.tips('请填写工步ID！', djTable.eq(i).children("td").eq(0));
                            shtype=null;
                            gyTable = null;
                            djTable = null;
                            return function_();
                        };
                        this.mapB.push({
                            material_id: $("#wl_id").val(),//物料ID
                            program_version: $("#wl_banben").val(),//方案版本
                            process_name: $("#process_name").text(),//工件名称
                            equipment: $("#equipment").text(),//机床型号
                            tool_carrier: $("#tool_carrier").text(),//刀架类型
                            map_no: $("#map_no").text(),//工件图号
                            title_name: $("#title_name").text(),//题头
                            pretend_card: $("#pretend_card").text(),//装卡方式
                            program_name: $("#program_name").text(),//方案名称
                            order_val: $("#order_val").text(),//共几序
                            hardness: $("#hardness").text(),//硬度
                            material: $("#material").text(),//材料
                            process_number: $("#process_number").text(),//工序号
                            designer: $("#designer").text(),//设计者
                            design_date: $("#design_date").text(),//设计日期
                            attachment_description: $("#attachment_description").text(),//附件说明
                            process_step_id: djTable.eq(i).children("td").eq(0).html(),//工步ID
                            program_cuttool_no: djTable.eq(i).children("td").eq(1).html(),//程序刀具号
                            cuttool_no: djTable.eq(i).children("td").eq(2).html(),//刀具编号
                            process_description: djTable.eq(i).children("td").eq(3).html(),//加工过程描述
                            chip_maximum_diameter: djTable.eq(i).children("td").eq(4).html(),//切屑最大直径
                            chip_minimum_diameter: djTable.eq(i).children("td").eq(5).html(),//切屑最小直径
                            chip_speed: djTable.eq(i).children("td").eq(6).html(),//切屑速度
                            spindle_speed: djTable.eq(i).children("td").eq(7).html(),//主轴转速
                            cutting_depth: djTable.eq(i).children("td").eq(8).html(),//切屑深度
                            amount_feed: djTable.eq(i).children("td").eq(9).html(),//进给量
                            process_time: djTable.eq(i).children("td").eq(10).html()//加工时间
                        });
                    };
                    djTable = null;
                    this.map.push({mapB: this.mapB});
                    this.mapB = null;
                    this.ajax(function_,shtype);
                }
            },
            /**
             * 事件集合
             * @param 图片选择按钮click事件
             * @param 物料点击事件绑定
             * @param 工艺表格事件
             * @param 工序加工添加行
             * @param 刀具表格添加
             * @param 保存
             * @param 删除
             * @param 审批
             * @param 打印
             */
            event:function(){
                /*图片选择按钮click事件*/
                $('#process_diagram').click(function(){
                    if($('#imgPreview').length>0){$('#imgPreview').remove();};
                });
                //物料点击事件绑定
                $("#wl_button").click(function(){
                    var a=$("#wl_button").hide();a=null;
                    a=af.selectClear.b(function(){$("#wl_button").show();});a=null;
                });
                //工艺表格事件
                $(".input").click(function(){
                    var this_=this;
                    var map={
                        load:function(fun_){
                            if(this_.new==false||this_.new==undefined){
                                this_.new=true;
                                var widthTd=$(this_).width();
                                var heightTd=$(this_).height();
                                $(this_).html('<input style="width:'+widthTd+'px;height:'+heightTd+'px;" type="'+$(this_).attr("type")+'" min="1" class="form-control blurTd"'+
                                    ' value="'+$(this_).html()+'">');
                                widthTd=null,heightTd=null;
                                $(".blurTd").focus();
                                $(".blurTd").blur(function(){
                                    this_.new=false;
                                    $(this_).html($(this).val());
                                    return fun_();
                                });
                            };
                        }
                    };
                    map.load(function(){map=null;this_=null;});
                });
                //工序加工添加行
                $("#addRow").click(function(){
                    var a=af.add(1,function(){return null;});a=null;
                });
                var a=$("#addRow").click();a=null;
                //刀具表格添加
                $("#addDj").click(function(){
                    var a=af.add(2,function(){return null;});a=null;
                });
                var a=$("#addDj").click();a=null;
                //保存
                $("#saveBtn").click(function(){
                    var a=layer.load(3, {shade: [0.2, '#393D49']})//遮罩
                    var b=af.save.save(function(y){layer.close(a);y=null;return null;},false);b=null;
                });
                //删除
                $("#removeBtn").click(function(){
                    var map={
                        data:{
                            id:$("#wl_id").val(),
                            name:$("#imgPreviewClose").attr('val')==undefined?'':$("#imgPreviewClose").attr('val')
                        },
                        loading:layer.load(3,{shade: [0.2, '#393D49']}),//遮罩
                        remove:function(fun_){
                            var a=COMMON.WS.restful("procedure/remove", "post", JSON.stringify(map.data), true, function (result) {
                                if(result){
                                    var a=af.selectClear.clear(null,function(){
                                        layer.msg('删除成功！');
                                    });a=null;
                                }else{
                                    layer.msg('删除失败！');
                                };
                                result=null;return fun_();
                            });a=null;
                        }
                    };
                    var a=map.loading;a=null;
                    var a=map.remove(function(){layer.close(map.loading);map=null;});a=null;
                });
                //审批
                $("#approveBtn").click(function(){
                    if($("#wl_type").val()=='未审批'){
                        var map={
                            id:$("#wl_id").val(),//物料ID
                            a:{
                                popMenu:false,
                                searchValue:$("#wl_id").val(),
                                colName:'物料ID,物料版本',
                                searchTable:'CProcessProcedureVersion',
                                searchCol:'materialId,processVersion'
                            },
                            b:function(fun_){
                                var a=COMMON_SEARCH.OPEN_PAGE.openPage(map.a, function(HashMap){
                                    return fun_(HashMap.length),HashMap=null;
                                });a=null;map.a=null;
                            },
                            approve:function(fun_){
                                var a=this.b(function(l){
                                    if(l==0){//先保存
                                        var b=af.save.save(function(y){return fun_(y);},true);b=null;
                                    }else{
                                        var a=COMMON.WS.restful("procedure/approve", "post", map.id, true, function (result) {
                                            return fun_(result),result=null;
                                        });a=null;
                                    };
                                });a=null;
                            }
                        };
                        var loading=layer.load(3, {shade: [0.2, '#393D49']});//遮罩
                        var a=map.approve(function(y){
                            var a=layer.close(loading);a=null;loading=null;
                            if(y){
                                a=layer.msg('审批成功！');a=null;
                                a=$("#wl_type").val('已审批');a=null;
                            }else if(y==false){
                                a=layer.msg('审批失败！');a=null;
                            };
                            y=null;
                            map=null;
                        });a=null;
                    }else{
                        layer.msg('无需再次审批！');
                    };
                });
                //打印
                $("#printBtn").click(function(){
                    $(".print").hide();
                    window.print();
                    $(".print").show();
                });
                return null;
            }
        };
        //返回入口
        return {
            "init":af.load
        };
    }
);