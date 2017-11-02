/**
 * Created by SunJun on 2016/3/21. 通用物料版本定义页面js
 */
define(['jquery', 'common', 'layer'], function ($, COMMON, layer) {

    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引

    /*添加行方法*/
    function addtr(no, versionNo, explain, startDate) {

        $('#versionTable').append(
            '<tr data-no="' + no + '">' +
            '<td> ' +
            '<label class="radio-inline" style="padding-left: 0;">' +
            '<input type="checkbox" class="rowCheckBox"/> ' + no + '' +
            '</label>' +
            '</td>' +
            '<td class="versionNo">' + versionNo + '</td>' +
            '<td class="versionExplain">' + explain + '</td>' +
            '<td class="startDate" style="width: 250px;">' + startDate + '</td>' +
            '<td>' +
            '<span style="cursor: pointer;" class="glyphicon glyphicon-ok versionChoose" data-version="' + versionNo + '"/>' +
            '</td>' +
            '</tr>'
        );
    }

    /*重新排序*/
    function resort() {

        var versionTable = $('#versionTable tbody tr');
        for (var i = 0; i < versionTable.length; i++) {

            versionTable.eq(i).attr('data-no', i + 1);
            versionTable.eq(i).find('td').eq(0).find('label').html('<input type="checkbox" class="rowCheckBox"/>' + (i + 1));
        }
    }

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();

        /*初始化表格数据*/
        if ($('#versionTable tbody', parent.document).length > 0) {

            /*获取父页面的物料版本数据*/
            $('#versionTable').append($('#versionTable tbody', parent.document).html());
        }
        /*版本添加按钮*/
        $(document).on('click', '#addtr', function () {

            var flag = 0;
            var versionTable = $('#versionTable tbody tr');
            var no = versionTable.length + 1;

            if (versionTable.length > 0) {

                /*检查版本正确定*/
                var lastTr = versionTable.eq(no - 2).find('td');
                var versionNo = lastTr.eq(1);
                var versionExeption = lastTr.eq(2);
                if (versionNo.text() == '' || versionNo.text() == 'null') {

                    layer.tips('请输入正确的版本编号！', versionNo, {tipsMore: true});
                    flag = 1
                }
                if (versionExeption.text() == '' || versionExeption == 'null') {

                    layer.tips('请输入正确的版本描述！', versionExeption, {tipsMore: true});
                    flag = 1;
                }

            }

            if (flag == 0) {

                /*添加行*/
                $('#versionTable').append('<tr data-no="' + no + '">' +
                    '<td style="padding: 0;height: 34px;"> ' +
                    '<label class="radio-inline" style="padding-left: 0;">' +
                    '<input type="checkbox" class="rowCheckBox"/> ' + no + '' +
                    '</label>' +
                    '</td>' +
                    '<td style="padding: 0;height: 34px;" class="versionNo clickTd"></td>' +
                    '<td style="padding: 0;height: 34px;" class="versionExplain clickTd"></td>' +
                    '<td style="padding: 0;height: 34px;" class="startDate" style="width: 250px;">' + new Date().Format('yyyy-MM-dd hh:mm:ss') + '</td>' +
                    '<td style="padding: 0;height: 34px;">' +
                    '<span style="cursor: pointer;" class="glyphicon glyphicon-ok versionChoose" data-version=""/>' +
                    '</td>' +
                    '<td class="default" style="display: none;">0</td>' +
                    '</tr>');

            }

        });
        /*版本选择事件*/
        $(document).on('click', '.versionChoose', function (e) {

            var versionData = $(e.target).parent().parent().find('td').eq(1).text();
            if (versionData == 'null' || versionData == '') {

                layer.msg('请选择正确的版本！');

            } else {

                $('#versionId', parent.document).val(versionData);
                /*设置默认版本*/
                $('.default').text(0);
                var td = $(e.target).parent().parent().find('td').eq(5);
                td.text(1);

                /*设置父页面table值 实现保存版本信息*/
                if ($('#versionTable tbody tr', parent.document).length > 0) {

                    $('#versionTable tbody tr', parent.document).remove();
                }
                $('#versionTable', parent.document).append($('#versionTable tbody').html());


                parent.layer.close(index);
            }

        });
        /*物料版本编号和版本描述tdclick事件监听*/
        $(document).on('click', '.clickTd', function (e) {

            if ($('#input').length == 0) {

                var v = $(e.target);
                v.html('<input id="input" class="form-control" value="' + v.text() + '"/>');
                /*获取焦点*/
                $('#input').focus();
            }

        });
        /*输入框失去焦点事件监听*/
        $(document).on('blur', '#input', function () {

            var flag = 0;
            var table = $('#versionTable tbody tr');
            /*检查是否重复*/
            var v = $('#input');
            var tr = v.parent().parent();
            if (v.val() == '' || v.val() == 'null') {

                v.parent().html('');

            } else {

                if (v.parent().hasClass('versionNo')) {

                    for (var i = 0; i < table.length; i++) {

                        if (v.val() == table.eq(i).find('td').eq(1).text() &&
                            table.eq(i).attr('data-no') != tr.attr('data-no')) {

                            flag = 1;
                            layer.tips('版本编号重复！', v);
                            v.focus();
                            break;

                        }

                    }

                    if (flag == 0) {

                        v.parent().html(v.val());
                    }

                } else if (v.parent().hasClass('versionExplain')) {

                    for (var i = 0; i < table.length; i++) {

                        if (v.val() == table.eq(i).find('td').eq(2).text() &&
                            table.eq(i).attr('data-no') != tr.attr('data-no')) {

                            flag = 1;
                            layer.tips('版本描述重复！', v);
                            v.focus();
                            break;

                        }

                    }

                    if (flag == 0) {

                        v.parent().html(v.val());
                    }

                }

            }

        });
        /*全选 反选 全部选checkbox*/
        $('#serialNumber').change(function () {

            if ($('#serialNumber').prop('checked') == true) {

                $('.rowCheckBox').prop('checked', true);
            } else {

                $('.rowCheckBox').prop('checked', false);
            }
        });
        /*删除按钮监听事件*/
        $('#versionDelBtn').click(function () {

            var allCheckBox = $('.rowCheckBox');
            var length = allCheckBox.length;
            var flag = 0;
            for (var i = 0; i < length; i++) {

                var item = allCheckBox[i];
                if (item.checked == true) {

                    flag = 1;
                    break;
                }
            }
            if (flag == 1) {

                layer.confirm('是否确认删除？', {
                        btn: ['确认', '取消'] //按钮
                    }, function () {

                        for (var i = 0; i < length; i++) {

                            var item = allCheckBox[i];
                            if (item.checked == true) {
                                var tr = $(item).parent().parent().parent();
                                /*如果是默认版本清空主页面默认版本*/
                                if (tr.find('td').eq(5).text() == 1) {

                                    $('#versionId', parent.document).val('');
                                }
                                /*删除行*/
                                tr.remove();
                            }
                        }
                        /*重新排序*/
                        resort();
                        layer.msg('删除成功！', {icon: 1});

                    }
                );

            }

        });
        /*物料版本窗口关闭事件*/
        $('#materialVersionClose').click(function () {

            /*设置父页面table值*/
            if ($('#versionTable tbody', parent.document).length > 0) {

                $('#versionTable tbody', parent.document).remove();
            }
            $('#versionTable', parent.document).append($('#versionTable tbody').html());

            parent.layer.close(index);
        });

    }

    return {
        'init': init
    }

});