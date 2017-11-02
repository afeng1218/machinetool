/**
 * Created by GuoFeng on 2016/4/14.
 */

define(['jquery', '../common', 'layer', 'page/common_search', 'datetimepicker'], function ($, COMMON, layer, COMMON_SEARCH) {

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

            //保存按钮事件绑定
            $('#saveBtn').click(function () {
                //id(判断 添加或更改的条件)
                var id = $('#id').val();
                //厂家编码
                var supplier_code = $('#supplier_code').val();
                if (supplier_code == '') {
                    $("#supplier_code").focus();
                    layer.tips('请填写供应商编码！', '#supplier_code');
                    return null;
                }
                //供应商
                var supplier = $('#supplier').val();
                if (supplier == '') {
                    $("#supplier").focus();
                    layer.tips('请填写供应商信息！', '#supplier');
                    return null;
                }

                var layerConfirm = layer.confirm("是否确认保存？",
                    {
                        btn: ['确认', '取消'] //按钮
                    }, function () {
                        //税率
                        var tax_rate = $('#tax_rate').val();
                        //地址
                        var address = $('#address').val();
                        //城市
                        var city = $('#city').val();
                        //省份
                        var province = $('#province').val();
                        //联系人
                        var contacts = $('#contacts').val();
                        //联系方式
                        var contact_information = $('#contact_information').val();
                        var map = {};
                        map.id = id;
                        map.supplier = supplier;
                        map.supplier_code = supplier_code;
                        map.tax_rate = tax_rate;
                        map.address = address;
                        map.city = city;
                        map.province = province;
                        map.contacts = contacts;
                        map.contact_information = contact_information;
                        map = JSON.stringify(map);

                        COMMON.WS.restful("supplierMaintenance/saveValue", "post", map, true, function (data) {
                            if (data.save == 'false') {
                                layer.close(layerConfirm);
                                layer.tips('' + data.name + '', '#supplier_code');
                            } else {
                                //将供应商编码制成不可编辑
                                $('#supplier_code').attr("readonly", true);
                                //将供应商编码给予ID区分修改或新增
                                $('#id').val($('#supplier_code').val());
                                layer.msg('' + data.name + '');
                            }
                        });
                    }
                );
            });
            //重置按钮事件绑定
            $('#reset').click(function () {
                $('#formId')[0].reset();
                $('#supplier_code').attr("readonly", false);
            });
            //查看按钮事件绑定
            $('#selectBtn').click(function () {
                var map = {
                    //查询条件
                    searchValue: '',
                    //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                    readonly: false,
                    //自定义显示前两列列名
                    colName: '厂家编码,供应商',
                    //表实体类
                    searchTable: 'CSupplier',
                    //searchCol：id,供应商编码、供应商、税率、地址、城市、省份、联系人、联系方式
                    searchCol: 'supplierCode,supplier,taxRate,' +
                    'address,city,province,contacts,contactInformation'
                };
                //查询组件
                COMMON_SEARCH.OPEN_PAGE.openPage(map, function (HashMap) {
                    //修改条件(不为空时修改)
                    $('#id').val(HashMap.supplierCode);
                    //供应商编码
                    $('#supplier_code').attr("readonly", true);
                    $('#supplier_code').val(HashMap.supplierCode);
                    //供应商名称
                    $('#supplier').val(HashMap.supplier);
                    //税率
                    $('#tax_rate').val(HashMap.taxRate);
                    //地址
                    $('#address').val(HashMap.address);
                    //城市
                    $('#city').val(HashMap.city);
                    //省份
                    $('#province').val(HashMap.province);
                    //联系人
                    $('#contacts').val(HashMap.contacts);
                    //联系方式
                    $('#contact_information').val(HashMap.contactInformation);
                });
            });
        }

        //返回入口
        return {
            "init": init
        };
    }
);
