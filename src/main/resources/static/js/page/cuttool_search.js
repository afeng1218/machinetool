/**
 * Created by CJS on 2016/3/22.
 */
define(['jquery', 'common', 'layer'], function ($, COMMON, layer) {

    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    /*获取物料查询页面的父页面pageName，选择不同的js事件处理*/
    var pageName = $('#pageName', parent.document).val();
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

        /*延时关闭窗口方法*/
        function closeMyself() {

            parent.layer.close(index);
        }

        $('#timeOutClose').click(function () {

            setInterval(closeMyself, 10);
        });

        /*刀具定义页面*/
        if ('cuttoolDefinition' == pageName||'cuttoolPanel'==pageName) {

            //报废
            $('#cutooolsearch_isScrap').click(function () {
                $('#cutooolsearch_isScrap ul').toggle();
            });

            $('#cutooolsearch_isScrap ul li').click(function (event) {
                var t1 = $(event.target).text();
                $('#cx_isScrap').val(t1);
            });
            //启用
            $('#cutooolsearch_isEnable').click(function () {
                $('#cutooolsearch_isEnable ul').toggle();
            });

            $('#cutooolsearch_isEnable ul li').click(function (event) {
                var t1 = $(event.target).text();
                $('#cx_isEnable').val(t1);
            });


            /*show cuttool_function list()加载功能列表;*/
            init_cuttool_fun_list();
            function init_cuttool_fun_list() {
                $.ajax({
                    type: "get",
                    url: "parametermodel/showList0",
                    dataType: "json",
                    success: function (tt) {
                        var json = eval(tt); //数组
                        $('#cx_cuttool_function ul').html('');
                        $.each(json, function (index, item) {
                            //循环获取数据
                            var category = json[index].category;
                            var _addHtml = '<li>' + category + '</li>';
                            $('#cx_cuttool_function ul').append(_addHtml);
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert("加载功能列表"+errorThrown);
                    }
                });
            }

            /*show cuttool_type list();加载类型列表*/
            init_cuttool_type_list();
            function init_cuttool_type_list() {
                $.ajax({
                    type: "get",
                    url: "parametermodel/showList1",
                    dataType: "json",
                    success: function (tt) {
                        var json = eval(tt); //数组
                        $('#cx_cuttool_type ul').html('');
                        $.each(json, function (index, item) {
                            //循环获取数据
                            var category = json[index].category;
                            var _addHtml = '<li>' + category + '</li>';
                            $('#cx_cuttool_type ul').append(_addHtml);
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert("加载类型列表"+errorThrown);
                    }
                });
            }

            //功能下拉
            $('#cx_cuttool_function').click(function () {
                $('#cx_cuttool_function ul').toggle();
            });

            $('#cx_cuttool_function ul').click(function (event) {
                var t1 = $(event.target).text();
                var type = 0;
                $('#cx_function').val(t1);
                show_funpic(t1, type);
            });

            //类型下拉
            $('#cx_cuttool_type').click(function () {
                $('#cx_cuttool_type ul').toggle();
            });

            $('#cx_cuttool_type ul').click(function (event) {
                var t2 = $(event.target).text();
                var type = 2;
                $('#cx_type').val(t2);
                show_typepic(t2, type);
            });

            function show_funpic(t1, type) {
                $.ajax({
                    type: "get",
                    url: "parametermodel/getPicname",
                    data: {category: t1, type: type},
                    dataType: "text",
                    success: function (data) {
                        $("#search_fun_img").html('<img src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:250px;height: auto;">');
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        layer.msg("图片加载失败");
                    }
                });
            }

            function show_typepic(t2, type) {
                $.ajax({
                    type: "get",
                    url: "parametermodel/getPicname",
                    data: {category: t2, type: type},
                    dataType: "text",
                    success: function (data) {
                        $("#search_type_img").html('<img src="uploadImg/' + data + '" alt="" class="img-thumbnail" style="width:250px;height: auto;">');
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        layer.msg("图片加载失败");
                    }
                });
            }

            /*查询结果*/
            $('#cuttoolSearchBtn').click(function () {
                //var height = $(parent.document.body).height();
                layer.open({
                    type: 2,
                    title: '刀具汇总结果',
                    shadeClose: false,
                    shade: false,
                    //maxmin: true,
                    area: ['100%','100%'],
                    content: ['cuttool_search_result.html']
                });
            });

            $(document).find('iframe').bind('change', function () {

                parent.layer.close(index);
            });
        }

    }

    return {
        'init': init
    }
});