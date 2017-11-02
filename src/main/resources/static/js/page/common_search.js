/**
 * Created by SunJun on 2016/4/15.
 *
 * 查询配置
 * var searchVal = {
 *  TODO 是否弹出页面 如果是false 则直接返回查询结果(默认是true)
 *  popMenu: true,
 *  TODO 查詢條件
 *  searchValue: '',
 *  TODO ajax同步还是异步 true/false(默认是true)
 *  async:'',
 *  TODO 查询条件是否可编辑 (默认是false)
 *  readonly: false,
 *  TODO 查询表实体类（必填项，最多两项（但是后面的表不作为查询条件查询列默认最后一个））
 *  searchTable: 'A',
 *  TODO 查询哪几列数据（必填项）逗号隔开 可以为一个或多个（默认查询两个），查询字段大于或等于两个，查询条件根据前两个字段查询
 *  searchCol: 'a,b,c',
 *  TODO 查询条件加在哪几个字段（0，2）从第一个字段开始两个
 *  searchColNum:'0,2'
 *  TODO 自定义显示前两列列名 必须和查询列实体类列名前两列对应(默认 编号、描述)
 *  colName: '编号,描述'
 *  TODO 追加条件 添加额外约束
 *  addLimit:[{'colName':'val','colValue':'val'},
 *            {'colName':'val','colValue':'val'},
 *            {'colName':'val','colValue':'val'}]
 * };
 */
define(['jquery', 'common', 'layer'], function ($, COMMON, layer) {

    var openPage;

    /*通用查询方法*/
    function search(searchValue, async, dblclick) {

        /*转成JSON数据上传*/
        var uploadVal = JSON.stringify(searchValue);

        /*查询列长度*/
        var col = searchValue.searchCol.split(',');
        var colLength = col.length;
        /*替换.为_*/
        var replaceCol = new Array();
        for (var i = 0; i < colLength; i++) {

            replaceCol.push(col[i].replace('.', '_'));
        }

        COMMON.WS.restful('commonSearchPage/commonSearch', 'post', uploadVal, async, function (data) {

            /*清空表格*/
            $('#searchTable tbody').remove();

            for (var i = 0; i < data.length; i++) {

                $('#searchTable').append('<tr class="commonTr" style="cursor: pointer;"></tr>');
                var lastTr = $('#searchTable tbody tr:last');

                for (var j = 0; j < colLength; j++) {

                    if (j > 1) {

                        lastTr.append('<td class="' + replaceCol[j] + '" style="display: none;">' + data[i][replaceCol[j]] + '</td>');

                    } else {

                        lastTr.append('<td class="' + replaceCol[j] + '" style="width: 50%;">' + data[i][replaceCol[j]] + '</td>');
                    }
                }


            }

            /*绑定双击事件*/
            $('.commonTr').bind('dblclick', function (e) {

                var tr = $(e.target).parent();
                var result = {};
                for (var i = 0; i < colLength; i++) {

                    result[col[i]] = tr.find('.' + replaceCol[i]).text();
                }
                /*回调函数返回查询结果*/
                dblclick(result);
                /*关闭layer*/
                layer.close(openPage);
            });

        });
    }

    var COMMON_SEARCH_PAGE = {

        OPEN_PAGE: new function () {

            var OPEN_PAGE = this;
            this.openPage = function (searchValue, fallBack) {

                /**
                 * 获取ajax是同步还是异步
                 */
                var async = true;
                if (searchValue.hasOwnProperty('async') && searchValue.async == false) {

                    async = false;
                }

                /**
                 * 是否弹出页面
                 * @type {boolean}
                 */
                var popMenu = searchValue.popMenu;

                /*不弹出查询页面*/
                if (popMenu == false) {

                    var uploadVal = JSON.stringify(searchValue);
                    COMMON.WS.restful('commonSearchPage/commonSearch', 'post', uploadVal, async, function (data) {

                        fallBack(data);
                        return;
                    });

                    /*弹出查询页面*/
                } else {

                    var openWindow = '<div style="width: 100%;margin-right: 0;">' +
                        '<div class="account-nav-title bg-449dd7">' +
                        '<span>通用查询页面</span>' +
                        '</div>' +
                        '<div style="margin-top: 10px;align: center center;">' +
                        '<div class="col-md-2 text-right" style="padding-right: 0;padding-top: 5px;">' +
                        '<span>查询内容</span>' +
                        '</div>' +
                        '<div class="col-md-4">' +
                        '<input id="commonSearchValue" type="text" class="form-control" placeholder="输入查询内容"/>' +
                        '</div>' +
                        '<div class="col-md-2 col-md-offset-1">' +
                        '<div class="sesol-btn txt-fff bg-449dd7" id="commonSearchBtn">查询</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="margin-top-20">' +
                        '<div class="col-md-11" style="margin-left: 20px;margin-top: 10px;">' +
                        '<!-- 标题 -->' +
                        '<div style="padding-right:17px;">' +
                        '<table class="table table-bordered text-center" id="commonSearchTableHead">' +
                        '<thead>' +
                        '<tr>' +
                        '<td style="width: 50%;">编号</td>' +
                        '<td style="width: 50%;">描述</td>' +
                        '</tr>' +
                        '</thead>' +
                        '</table>' +
                        '</div>' +
                        '<!-- 标题 end-->' +
                        '<!-- 内容 -->' +
                        '<div class="table-body" id="commonSearchTableBody">' +
                        '<table class="table table-bordered text-center table-hover" id="searchTable">' +
                        '</table>' +
                        '</div>' +
                        '<!-- 内容 end-->' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    openPage = layer.open({
                        type: 1,
                        title: false,//不现实表题
                        shade: false,
                        shadeClose: true,
                        cancel:function(){
                            fallBack(false);
                        },
                        //maxmin: true, 开启最大化最小化按钮
                        area: ['85%', '75%'],
                        content: openWindow
                    });

                    /*输入框获取查询内容*/
                    $('#commonSearchValue').val(searchValue.searchValue);

                    /*输入框获取焦点*/
                    $('#commonSearchValue').focus();

                    /*设置table高度*/
                    $('#commonSearchTableBody').css('height', screen.height / 3);

                    /*查询按钮click事件*/
                    $('#commonSearchBtn').click(function () {

                        var searchVal = $('#commonSearchValue').val().trim();
                        if (searchVal == '') {

                            searchVal = '%';
                        }
                        /*设置查询值*/
                        searchValue.searchValue = searchVal;
                        /**
                         * 查询
                         */
                        search(searchValue, async, fallBack);

                    });
                    /*输入框enter事件*/
                    $('#commonSearchValue').keydown(function (e) {

                        if ('13' == e.keyCode) {

                            var searchVal = $('#commonSearchValue').val().trim();
                            if (searchVal == '') {

                                searchVal = '%';
                            }
                            /*设置查询值*/
                            searchValue.searchValue = searchVal;
                            /**
                             * 查询
                             */
                            search(searchValue, async, fallBack);

                        }
                    });

                    /*设置输入框是否可编辑*/
                    var readonly = searchValue.readonly;
                    if (readonly == true) {

                        $('#commonSearchValue').attr('readonly', true);
                    }

                    /*设置自定义表格头*/
                    if (searchValue.hasOwnProperty('colName')) {

                        var colName = searchValue.colName.split(',');
                        var head = $('#commonSearchTableHead').find('td');
                        head.eq(0).text(colName[0]);
                        head.eq(1).text(colName[1]);
                    }

                    /*默认进入查询*/
                    $('#commonSearchBtn').click();

                }

            };
        },
    };

    return COMMON_SEARCH_PAGE;
});