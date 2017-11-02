/**
 * Created by GuoFeng on 2016/4/18.
 */
define(['jquery', '../common', 'layer','page/common_search', 'bootstrap', 'datetimepicker'], function ($, COMMON, layer, common_search) {

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
                
                //采购人员
                var buyer = $('#buyer').val();
                if (buyer==''){
                    $("#buyer").focus();
                    layer.tips('请填写采购员姓名！', '#buyer');
                    return null;
                }

                var layerConfirm = layer.confirm("是否确认保存？",
                    {
                        btn: ['确认', '取消'] //按钮
                    }, function () {
                        //说明
                        var explain_text = $('#explain_text').val();

                        //后台将要接受得到数据
                        var map = {};
                        map.id = id;
                        map.buyer = buyer;
                        map.explain_text = explain_text;

                        //将map转换为JSON格式
                        map = JSON.stringify(map);

                        COMMON.WS.restful("purchaseBuyer/saveValue", "post", map, true, function (data) {
                            if(data.save=='false'){
                                layer.close(layerConfirm);
                                layer.tips(''+data.name+'', '#buyer');
                            }else{
                                layer.msg(''+data.name+'');
                            }
                        });
                    }
                );
            });
            //重置按钮事件绑定
            $('#reset').click(function (){
                $('#formId')[0].reset();
            });
            //查看按钮事件绑定
            $('#selectBtn').click(function () {
                var map = {
                    //查询条件
                    searchValue:'',
                    //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                    readonly: false,
                    //colName:自定义显示前两列列名
                    colName: '采购员,说明',
                    //searchTable：表的实体类
                    searchTable : 'CBuyer',
                    //searchCol：唯一ID、采购员、说明
                    searchCol   : 'id,buyer,explainText'
                };
                common_search.OPEN_PAGE.openPage(map,function(e){
                    $('#id').val(e.id);
                    $('#buyer').val(e.buyer);
                    $('#explain_text').val(e.explainText);
                });
            });
        };

        //返回入口
        return {
            "init": init
        };
    }
);
