/**
 * Created by guofeng on 2016/5/26.
 */
define(["jquery", "common", "layer", 'page/common_search', "lib/jquery.form", "datetimepicker", "fileinput3"], function ($, COMMON, layer,COMMON_SEARCH) {

    function add(parameter_name,suggested_cutting_par,describeName){
        //grid
        var grid = $('#purchaseTable tbody');
        //行
        var ds = $('#purchaseTable tbody tr');

        //参数名不能为空！
        if (ds.eq(ds.length-1).children("td").eq(1).html() == "" && parameter_name=="") {
            ds.eq(ds.length-1).children("td").eq(1).click();
            layer.tips('请填写参数名！', ds.eq(ds.length-1).children("td").eq(1));
            return null;
        }

        grid.append('<tr name="newTr" style="height: 35px;">' +
            '<td style="width:8%;padding-top:5px;">' +
            '<a href="javascript:void(0)">' +
            '<span class="glyphicon glyphicon-remove" onclick="(function(e){' +
            'var tr = $(e).parent().parent().parent();' +
            'tr.remove();})(this);"></span>' +
            '</a>' +
            '</td>' +
            '<td class="add" style="width:30%;padding:0px;">'+parameter_name+'</td>' +
            '<td class="add" style="width:30%;padding:0px;">'+suggested_cutting_par+'</td>' +
            '<td class="add" style="width:30%;padding:0px;">'+describeName+'</td>' +
            '</tr>');
        $('#purchaseTable tbody tr td.add').click(function () {
            if (this.newTd == true || this.newTd == undefined) {
                var this_ = this;
                this_.newTd = false;
                var row = $(this_).html();
                $(this_).css({"width": "30%", "padding-top": "0px"});
                $(this_).html('<input type="text" class="form-control" value="' + row + '">');
                $('#purchaseTable tbody tr td input').select();
                $('#purchaseTable tbody tr td input').blur(function () {
                    $(this_).css({"width": "30%", "padding-top": "5px"});
                    $(this_).html($(this).val());
                    this_.newTd = true;
                });
            }
        });
    };

    function rest(){
        $('#picture_form')[0].reset();
        $('#code').attr("readonly", false);
        $('#purchaseTable tbody tr').remove();
        $('#imgPreview').remove();
    }

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

        //设置表格有效高度
        var height = window.screen.height / 2.4;
        $('.table-body').css("height", (height - 33) + "px");
        $('#images_').css("height", height + "px");

        /*类型选择*/
        $('#purchaseState').click(function () {
            $('#purchaseState ul').toggle();
            $('#purchaseState ul li').click(function (e) {
                var v = $(this).children("span").eq(0).html();
                $('#type_').val(v);
                v = $(this).children("span").eq(1).html();
                $('#type_id').val(v);
            });
        });
        //新增行
        $('#purchaseTable_add').click(function () {
            add("","","");
        });
    };

    //保存
    $('#saveBtn').click(function () {
        //编码不能为空
        if ($('#code').val() == "") {
            $("#code").focus();
            layer.tips('请填写编码！', '#code');
            return null;
        }
        //描述不能为空
        if ($('#category').val() == "") {
            $("#category").focus();
            layer.tips('请填写描述！', '#category');
            return null;
        }
        //类型不能为空
        if ($('#type_').val() == "") {
            $("#type_").focus();
            layer.tips('请选择类型！', '#type_');
            return null;
        }
        var f = document.getElementById("picture").files;
        //大小 字节
        if(f[0]!=undefined && f[0].size > 716800){
            layer.msg("图片大小不允许超过700kb，请重新选择图片！");
            return null;
        };
        //grid
        var ds = $('#purchaseTable tbody tr');
        var parameter_name = "";
        var suggested_cutting_par = "";
        var describeName = "";
        for (var i = 0; i < ds.length; i++) {
            parameter_name += ds.eq(i).children("td").eq(1).html() + "|";
            suggested_cutting_par += ds.eq(i).children("td").eq(2).html() + "|";
            describeName += ds.eq(i).children("td").eq(3).html() + "|";
        }
        //将末尾的“|”去掉 -- 参数名
        if (parameter_name != "") {
            parameter_name = parameter_name.substring(0, parameter_name.length - 1);
        }
        //将末尾的“|”去掉 -- 参数值
        if(suggested_cutting_par != ""){
            suggested_cutting_par = suggested_cutting_par.substring(0, suggested_cutting_par.length - 1);
        }
        //将末尾的“|”去掉 -- 描述
        if(describeName != ""){
            describeName = describeName.substring(0, describeName.length - 1);
        }
        var upload = ({
            id:                     $('#code').val(),
            category:               $('#category').val(),
            type_:                  $('#type_id').val(),
            parameter_name:         parameter_name,
            suggested_cutting_par:  suggested_cutting_par,
            describeName:           describeName,
            type_name:              $('#type_').val()
        });
        //保存
        COMMON.WS.restful("categorySettings/save", "post", JSON.stringify(upload), true, function (map) {
            if (map.result == 'SUCCESS') {
                $('#code').attr("readonly", true);
                //上传
                if($('#picture').val()!='') {//如果没有选择上传图片则不提交
                    $('#id').val($('#code').val());
                    var uploadImg = new FormData($("#picture_form")[0]);
                    COMMON.WS.ajax("categorySettings/upload", "post", uploadImg, true, function (data) {
                        if (data == -1) {
                            layer.msg('图片上传失败！');
                        } else if (data == 0) {
                            layer.msg('图片上传失败！请选择正确的图片格式！');
                            return null;
                        }
                    });
                }
                layer.msg('保存成功！');
            } else {
                layer.msg('保存失败！');
            }
        });
    });

    //重置
    $('#reset').click(function () {
        rest();
    });
    //删除
    $('#removeBtn').click(function () {
        alert("删除");
    });
    //查看
    $('#selectBtn').click(function () {

        var map = {
            //查询条件
            searchValue: '',
            //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
            readonly: false,
            //自定义显示前两列列名
            colName: '编码,描述',
            //searchTable:表实体类
            searchTable: 'CParameterModel',
            //searchCol：编码、描述、参数名、默认值
            searchCol: 'id,category,typeName,parameterName,suggestedCuttingPar,describeName,picture,type'
        };
        //查询组件
        COMMON_SEARCH.OPEN_PAGE.openPage(map, function (HashMap) {

            rest();
            $('#code').val(HashMap.id);
            $('#category').val(HashMap.category);
            $('#type_').val(HashMap.typeName);
            $('#type_id').val(HashMap.type);
            if(HashMap.picture!=''&&HashMap.picture!=undefined){

                //如果当前有图片，清空
                if ($('#imgPreview').length > 0) {
                    $('#imgPreview').remove();
                }
                $('#materialParDiv').prepend(
                    '<div id="imgPreview" class="col-md-12 col-nopadding ">' +
                    '<img src="uploadImg/' + HashMap.picture + '" class="file-preview-image" ' +
                    'style="width: ' + (Number($("#images_").width()) - 30) + 'px;height:' + (Number($("#images_").height()) - 80) + 'px;"/>' +
                    '<div id="imgPreviewClose" class="close fileinput-remove">x</div>' +
                    '</div>');
                /*图片选择按钮click事件*/
                $('#picture').click(function () {
                    if ($('#imgPreview').length > 0) {
                        $('#imgPreview').remove();
                    }
                });
                //点击关闭图片
                $('#imgPreviewClose').click(function () {
                    var lay = layer.confirm('是否确认删除此图片？', {
                        btn: ['删除', '取消'] //按钮
                    }, function () {
                        var id = $('#code').val();
                        COMMON.WS.restful("categorySettings/removeImages", "post", id, true, function (map) {
                            if (map.result != 'SUCCESS') {
                                layer.msg('图片删除失败！');
                                return null;
                            //删除成功
                            }else {
                                layer.msg('图片删除成功！');
                            }
                        });
                        $('#imgPreview').remove();
                    });
                });
            }

            if(HashMap.parameterName!=""&&HashMap.parameterName!=undefined) {
                var parameterName = HashMap.parameterName.split("|");
                var suggestedCuttingPar = HashMap.suggestedCuttingPar.split("|");
                var describeName = HashMap.describeName.split("|");
                if (parameterName.length > 0) {
                    for (var i = 0; i < parameterName.length; i++) {
                        if (parameterName[i] == undefined) {
                            parameterName[i] = "";
                        }
                        if (suggestedCuttingPar[i] == undefined) {
                            suggestedCuttingPar[i] = "";
                        }
                        if (describeName[i] == undefined) {
                            describeName[i] = "";
                        }
                        add(parameterName[i], suggestedCuttingPar[i], describeName[i]);
                    }
                }
            }
            $('#code').attr("readonly", true);
        });

    });
    return {
        'init': init
    }
});