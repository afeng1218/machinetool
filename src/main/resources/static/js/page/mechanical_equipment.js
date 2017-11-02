/**
 * Created by guofeng on 2016/9/1.
 */
define(['jquery', '../common', 'layer', 'page/common_search', 'bootstrap', 'datetimepicker'], function ($, COMMON, layer, COMMON_SEARCH) {

        function init() {

            /**
             * 获取用户权限
             */
            var arrUrl = window.location.href.split("/");
            var strPage = COMMON.ECODE.Base64.encode(arrUrl[arrUrl.length - 1]);
            var username = COMMON.ECODE.Base64.decode($.cookie('username'));

            if ($.cookie(strPage) == null && username != 'admin') {

                $('#saveBtn').remove();
                $('#deleteBtn').remove();
            }
            /**
             * layer config
             */
            COMMON.LAYER_CONFIG.config();

            $('#saveBtn').click(function (e) {
                //必输项检验
                var equipment_assets_no=$("#equipment_assets_no").val();
                var equipment_name=$("#equipment_name").val();
                if(equipment_assets_no==""){
                    $("#equipment_assets_no").select();
                    layer.tips('请填写设备资产编号!', '#equipment_assets_no');
                    return;
                }
                if(equipment_name==""){
                    $("#equipment_name").select();
                    layer.tips('请填写设备名称!', '#equipment_name');
                    return;
                }
                var mechanical_id =$("#mechanical_id").val();
                var equipment_type=$("#equipment_type").val();
                var device_group=$("#device_group").val();
                var main_shaft_type=$("#main_shaft_type").val();
                var main_shaft_trip=$("#main_shaft_trip").val();
                var distance_table_max=$("#distance_table_max").val();
                var max_speed=$("#max_speed").val();
                var max_power=$("#max_power").val();
                var director=$("#director").val();
                var workshop=$("#workshop").val();
                var uploadVal = {
                    'mechanical_id':mechanical_id,
                    'equipment_assets_no': equipment_assets_no,
                    'equipment_name': equipment_name,
                    'equipment_type': equipment_type,
                    'device_group': device_group,
                    'main_shaft_type': main_shaft_type,
                    'main_shaft_trip': main_shaft_trip,
                    'distance_table_max': distance_table_max,
                    'max_speed': max_speed,
                    'max_power': max_power,
                    'director':director,
                    'workshop':workshop
                };
                var uploadJson = JSON.stringify(uploadVal);
                COMMON.WS.restful('MechanicalEquipment/saveData', 'post', uploadJson, true, function (data) {
                    if(data.result){
                        layer.msg("保存成功");
                        $('#equipment_assets_no').attr("readonly",true);//发到刀具不可编辑
                    }
                });
            });
            //查询按钮
            $('#searchBtn').click(function (e) {
                var obj = {
                    //查询条件
                    searchValue: "%",
                    //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                    readonly: false,
                    //自定义显示前两列列名
                    colName: '设备资产编号,设备名称',
                    //searchTable:表实体类
                    searchTable: 'CMechanicalEquipment',
                    //文本框是否可编辑！默认“false”s
                    searchReadonly: false,
                    searchCol: 'equipmentAssetsNo,equipmentName,mechanicalId,equipmentType,deviceGroup,' +
                    'mainShaftType,mainShaftTrip,distanceTableMax,maxSpeed,maxPower,director,workshop'
                };
                //查询组件
                COMMON_SEARCH.OPEN_PAGE.openPage(obj, function (map) {
                    $('#mechanical_id').val(map.mechanicalId);
                    $('#equipment_assets_no').val(map.equipmentAssetsNo);
                    $('#equipment_name').val(map.equipmentName);
                    $('#equipment_type').val(map.equipmentType);
                    $('#device_group').val(map.deviceGroup);
                    $('#main_shaft_type').val(map.mainShaftType);
                    $('#main_shaft_trip').val(map.mainShaftTrip);
                    $('#distance_table_max').val(map.distanceTableMax);
                    $('#max_speed').val(map.maxSpeed);
                    $('#max_power').val(map.maxPower);
                    $("#director").val(map.director);
                    $("#workshop").val(map.workshop);
                    $('#equipment_assets_no').attr("readonly",true);//发到刀具不可编辑
                })
            });
            //重置输入框
            $('#deleteBtn').click(function (e) {
                $('#equipment_assets_no').attr("readonly",false);//发到刀具不可编辑
                $('#mechanical_id').val("");
                $('#equipment_assets_no').val("");
                $('#equipment_name').val("");
                $('#equipment_type').val("");
                $('#device_group').val("");
                $('#main_shaft_type').val("");
                $('#main_shaft_trip').val("");
                $('#distance_table_max').val("");
                $('#max_speed').val("");
                $('#max_power').val("");
                $("#director").val("");
                $("#workshop").val("");
            });
        }
        return {
            'init': init
        }
    }
);

