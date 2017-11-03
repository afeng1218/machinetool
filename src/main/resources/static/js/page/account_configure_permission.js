/**
 * Created by GuoFeng on 2016/6/1.
 */
define(['jquery', 'common', 'layer', 'page/common_search', 'bootstrapTreeView'], function ($, COMMON, layer, commonSearch) {


    /*当前用户名*/
    var username = $('#hiddenName', parent.document).val().trim();
    /*页面名称*/
    var pageName = $('#pageName').val().trim();

    /*保存所有的菜单*/
    var allMenu = [];
    /*系统菜单*/
    var menu = [];
    /*用户菜单*/
    var userMenu = [];


    /*treeView 菜单配置*/
    var options = {
        'state.expanded': false,//展开节点
        'bootstrap2': false,
        'showTags': false,//显示标签
        'levels': 2//节点最大层级
    };

    function getAllMenu() {

        /**
         * 系统菜单获取
         */
        COMMON.WS.local('accountConfigurePermission/getAllMenu', 'get', '', true, function (data) {

            /*节点数据*/
            var systemMenu = data.authorityTree[0];
            /*设置配置 中的菜单数据*/
            options.data = systemMenu;
            /*加载菜单*/
            $('#systemMenu').treeview(options);
            $('#systemMenu').treeview('collapseAll');
            /*保存所有菜单数据*/
            allMenu = systemMenu;
            menu = systemMenu;

        });
    }

    function init() {

        /**
         * layer config
         */
        COMMON.LAYER_CONFIG.config();
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

        /*设置菜单高度*/
        $('#systemMenu').css('height', screen.height / 2);
        $('#accountMenu').css('height', screen.height / 2);

        /*设置选择按钮垂直高度*/
        var height = ($('#systemMenuScroll').height() / 2) - ($('#content').height() / 2);
        $('#content').css('margin-top', height);

        /**
         * 获取所有菜单
         */
        getAllMenu();
    }

    /**
     * 从系统菜单中删除某一项用户菜单
     * @param menu
     * @param text
     * @returns {*}
     */
    function deleteFromTree(menu, text) {

        for (var i = 0; i < menu.length; i++) {

            var nodeText = menu[i]['text'];

            /**
             * 修改用户菜单中的审批权限信息为1 并且设置两个数据为同种格式
             * 之后判断两个是否相等
             */
            $('#hiddenAccountMenu').html(text);
            $('#hiddenAccountMenu input').eq(1).val(1);
            text = $('#hiddenAccountMenu').html();

            $('#hiddenAccountMenu').html(nodeText);
            $('#hiddenAccountMenu input').eq(1).val(1);
            nodeText = $('#hiddenAccountMenu').html();

            /**
             * 如果该节点存在子节点 继续遍历 寻找菜单页相同的菜单项
             */
            if (menu[i].hasOwnProperty('nodes')) {

                if (menu[i]['nodes'].length == 0) {

                    /*删除没有节点的父菜单*/
                    menu.splice(i, 1);
                    /*返回删除过后的系统菜单*/
                    return menu;

                }

                menu[i]['nodes'] = deleteFromTree(menu[i]['nodes'], text);
                /**
                 * 如果节点下面的子节点全部删除 就把父节点也删除
                 */
                if (menu[i]['nodes'].length == 0) {

                    menu.splice(i, 1);
                    /**
                     * 删除一项之后索引必须减一
                     */
                    i--;
                }

            } else {

                /**
                 * 删除系统所有菜单中的该用户已经拥有的菜单
                 */
                if (text == nodeText) {

                    /*删除与用户菜单中的相同菜单项 对象*/
                    menu.splice(i, 1);
                    /*返回删除过后的系统菜单*/
                    return menu;

                }

            }

        }
        /*如果在这个节点下面的菜单中没有找到相同项直接返回*/
        return menu;

    }

    /**
     * 从系统菜单中删除用户菜单信息
     * @param node
     */
    function deleteNodes(node) {

        /*有子节点 继续遍历 寻找最后的子节点 删除之*/
        if (node.hasOwnProperty('nodes')) {

            var length = node['nodes'].length;
            for (var j = 0; j < length; j++) {

                deleteNodes(node['nodes'][j]);
            }

            /*如果没有子节点说明就是最后一层菜单目录 直接在系统菜单中删除对应项*/
        } else {

            menu = deleteFromTree(menu, node['text']);

        }

    }

    /**
     * 向菜单数据中添加一个节点
     */
    function addToTree(menu, nodeText, parentNodeText) {

        var length = menu.length;

        if (parentNodeText != null) {

            for (var i = 0; i < length; i++) {

                /**
                 * 如果该节点存在子节点 继续遍历 寻找菜单页相同的菜单项
                 */
                if (menu[i].hasOwnProperty('nodes')) {

                    var vtext = menu[i]['text'];

                    /**
                     * 修改用户菜单中的审批权限信息为1 并且设置两个数据为同种格式
                     * 之后判断两个是否相等
                     */
                    $('#hiddenAccountMenu').html(vtext);
                    $('#hiddenAccountMenu input').eq(1).val(1);
                    vtext = $('#hiddenAccountMenu').html();

                    $('#hiddenAccountMenu').html(parentNodeText);
                    $('#hiddenAccountMenu input').eq(1).val(1);
                    parentNodeText = $('#hiddenAccountMenu').html();

                    /**
                     * 判断是否找到父节点
                     */
                    if (vtext == parentNodeText) {

                        /*向父节点中添加*/
                        menu[i]['nodes'].push({
                            text: nodeText
                        });
                        /*返回删除过后的系统菜单*/
                        return menu;

                    }
                    /*继续循环*/
                    menu[i]['nodes'] = addToTree(menu[i]['nodes'], nodeText, parentNodeText);

                }

            }

        } else {

            menu.push(nodeText);

        }
        return menu;
    }

    /*用户名失去焦点事件*/
    $('#name').blur(function () {

        var name = $('#name').val().trim();
        if (name.indexOf('%') != -1 || name == '') {

            /*清空用户名*/
            $('#name').val('');
            /*清空用户权限树*/
            $('#accountMenu').html('');

        } else {

            var map = {
                popMenu: false,
                searchValue: name,
                searchTable: 'CRegist',
                searchCol: 'name,organization',
                searchColNum: '0,1'
            };

            commonSearch.OPEN_PAGE.openPage(map, function (result) {

                if (result.length == 0) {

                    layer.tips('用户名不存在！', $('#name'));
                    /*清空用户权限树*/
                    $('#accountMenu').html('');

                    userMenu = [];
                    getAllMenu();

                } else {

                    search();
                }

            });

        }
    });

    /**
     * 查询方法
     */
    function search() {

        var name = $.trim($('#name').val());
        if (name == '') {

            layer.tips('请输入用户名！', $('#name'));

        } else if (name == username) {

            layer.tips('不能配置自己的权限信息！', $('#name'));
            $('#name').val('');

        } else {

            var searchValue = {
                popMenu: false,
                searchValue: $('#name').val(),
                searchTable: 'CRegist',
                searchCol: 'name,organization',
                searchColNum: '0,1'
            };
            commonSearch.OPEN_PAGE.openPage(searchValue, function (_data) {

                if (_data.length > 0) {

                    var uploadValue = {
                        username: name
                    };
                    COMMON.WS.local('main/authority', 'get', uploadValue, true, function (data) {

                        userMenu = data.authorityTree[0];

                        if (userMenu == null || userMenu == '') {

                            /*清空用户权限树*/
                            $('#accountMenu').html('');

                            userMenu = [];
                            getAllMenu();

                        }

                        /**
                         * 用户菜单加载
                         */
                        options.data = userMenu;
                        /*加载查询用户的菜单*/
                        $('#accountMenu').treeview(options);
                        $('#accountMenu').treeview('collapseAll');

                        /**
                         * 从所有菜单中删除用户菜单已有的菜单信息
                         */
                        /*重置menu*/
                        menu = allMenu;

                        /*从系统菜单中删除用户菜单信息*/
                        var length = userMenu.length;//用户菜单的外层菜单数
                        /*遍历用户外层菜单*/
                        for (var i = 0; i < length; i++) {

                            /*获取用户的菜单节点的所有节点数据*/
                            var node = userMenu[i];
                            /*从系统菜单中删除用户已有的节点信息*/
                            deleteNodes(node);

                        }

                        /**
                         * 显示删之后的系统菜单信息
                         * @type {string}
                         */
                        options.data = menu;
                        $('#systemMenu').treeview(options);
                        $('#systemMenu').treeview('collapseAll');


                    });

                } else {

                    layer.tips('用户不存在！', $('#name'));
                }

            });

        }
    }

    /*查询按钮事件监听*/
    $('#searchBtn').click(function () {

        search();

    });

    /**
     * 遍历用户菜单封装节点信息
     * @param treeData
     */
    function getUserTree(treeData, returnData) {

        for (var i = 0; i < treeData.length; i++) {

            if (!treeData[i].hasOwnProperty('nodes')) {

                $('#hiddenAccountMenu').html(treeData[i].text);
                /**
                 * 数据封装
                 */
                returnData.push({
                    nodeId: $('#hiddenAccountMenu input').eq(2).val(),
                    authority: $('#hiddenAccountMenu input').eq(1).val()
                });

            } else {

                getUserTree(treeData[i].nodes, returnData);
            }
        }

    }

    /*保存按钮事件监听*/
    $('#saveBtn').click(function () {

        if ($('#name').val() == '') {

            layer.msg('请输入用户名！');
            $('#accountMenu').html('');

        } else {

            var saveConfirm = layer.confirm('是否确认保存？', {
                btn: ['确认', '取消']
            }, function () {

                /*用户菜单信息保存*/
                var userTreeNode = [];
                getUserTree(userMenu, userTreeNode);
                var uploadTreeData = {
                    username: $('#name').val(),
                    userTreeNode: userTreeNode
                };
                var uploadJSON = JSON.stringify(uploadTreeData);
                COMMON.WS.restful('accountConfigurePermission/saveUserMenu', 'post', uploadJSON, true, function (data) {

                    if (data.result == 'true') {

                        layer.msg('保存成功！');

                    } else {

                        layer.msg(data.result);
                    }
                });

            });

        }

    });

    /*输入框enter事件监听*/
    $('#name').keydown(function (e) {

        var searchName = $('#name').val();
        var v = e.keyCode;
        if (v == 13) {

            /*有百分号就弹出查询页面*/
            if (searchName.indexOf('%') != -1) {

                var map = {
                    popMenu: true,          //是否弹出页面 如果是false 则直接返回查询结果(默认是true)
                    //查询条件
                    searchValue: searchName,
                    //查询条件是否可编辑(false/true)可编辑/不可编辑;默认false
                    readonly: false,
                    //自定义显示前两列列名
                    colName: '姓名,组织',
                    //searchTable:表实体类
                    searchTable: 'CRegist',
                    //searchCol：物料编码、物料描述、物料类别、物料单位
                    searchCol: 'name,organization',
                    searchColNum: '0,1'
                };

                commonSearch.OPEN_PAGE.openPage(map, function (result) {

                    if (result == null || result == '') {

                        layer.tips('用户名不存在！', $('#name'));
                        /*清空用户权限树*/
                        $('#accountMenu').html('');

                        userMenu = [];
                        getAllMenu();

                    } else {

                        $('#name').val(result.name);
                        /*用户存在查询*/
                        search();
                    }

                });


            } else {

                /*用户存在查询*/
                search();

            }
        }

    });

    /**
     * 菜单添加删除
     */
    function treeToAdd(selectedTree, node, toAddTree, toAddTreeId, state) {

        /**
         * 系统菜单删除
         */
        /*获取父节点*/
        var parentNode = selectedTree.getNode(node[0].parentId);
        /*所有兄弟节点*/
        var siblings = selectedTree.getSiblings(node);
        /*删除选中节点*/
        selectedTree.removeNode(node);
        /**
         * 从系统菜单数据中删除节点数据
         */
        if (state == true) {

            menu = deleteFromTree(menu, node[0].text);
        } else {

            userMenu = deleteFromTree(userMenu, node[0].text);
        }

        /*判断同级有没有其他的节点*/
        if (siblings.length == 0) {

            selectedTree.removeNode(parentNode);
            /**
             * 从系统菜单数据中删除节点数据
             */
            if (state == true) {

                menu = deleteFromTree(menu, parentNode.text);
            } else {

                userMenu = deleteFromTree(userMenu, parentNode.text);
            }

        }
        selectedTree.expandAll();
        selectedTree.collapseAll();

        /*还有兄弟节点的话*/
        if (siblings.length != 0) {

            selectedTree.expandNode(parentNode);
        }


        /**
         * 用户菜单添加
         */
        /*用户菜单添加*/
        /*查找用户菜单总有没有这个父节点*/
        var userParentNodes = toAddTree.findNodes(parentNode.text);

        /**
         * 设置权限信息
         */
        $('#hiddenAccountMenu').html(node[0].text);
        if ($('#addAuthority').prop('checked')) {

            $('#hiddenAccountMenu input').eq(1).val(1);
        } else {

            $('#hiddenAccountMenu input').eq(1).val(0);
        }
        node[0].text = $('#hiddenAccountMenu').html();

        /**
         *添加节点
         */
        if (userParentNodes.length == 0) {

            var addNode = {
                text: parentNode.text,
                nodes: [{text: node[0].text}],
            };
            if (state == true) {

                userMenu = addToTree(userMenu, addNode, null)
            } else {

                menu = addToTree(menu, addNode, null)
            }

        } else {

            if (state == true) {

                userMenu = addToTree(userMenu, node[0].text, parentNode.text);
            } else {

                menu = addToTree(menu, node[0].text, parentNode.text);
            }

        }
        /**
         * 删除之后重新加载用户树
         */
        if (state == true) {

            options.data = userMenu;
        } else {

            options.data = menu;
        }
        $('#' + toAddTreeId).treeview(options);
        toAddTree = $('#' + toAddTreeId).treeview(true);
        toAddTree.collapseAll();
        userParentNodes = toAddTree.findNodes(parentNode.text);
        toAddTree.expandNode(userParentNodes[0]);
    }

    /**
     * 添加用户菜单项按钮监听
     */
    $('#addMenu').click(function () {

        /**
         * 获取节点树
         **/
        var sysTemTree = $('#systemMenu').treeview(true);
        var userTree = $('#accountMenu').treeview(true);
        var treeId = 'accountMenu';
        /*获取选中节点*/
        var node = sysTemTree.getSelected();
        node.selected = false;
        if (node.length > 0) {

            treeToAdd(sysTemTree, node, userTree, treeId, true);

        } else {

            layer.msg('请选择需要添加的菜单！');
        }

    });

    /*移除用户菜单项按钮监听*/
    $('#deleteMenu').click(function () {


        /**
         * 获取节点树
         **/
        var sysTemTree = $('#systemMenu').treeview(true);
        var userTree = $('#accountMenu').treeview(true);
        var treeId = 'systemMenu';
        /*获取选中节点*/
        var node = userTree.getSelected();
        node.selected = false;
        if (node.length > 0) {

            treeToAdd(userTree, node, sysTemTree, treeId, false);

        } else {

            layer.msg('请选择需要去除的用户菜单！');
        }

    });

    return {
        'init': init
    }

});