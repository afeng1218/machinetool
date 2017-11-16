/**
 * requireJs模式载入入口
 * Created by xiezhichao on 2016/1/7.
 * Changed by GuoFeng on 2016/1/21
 */
(function () {
    //配置引入的库
    require.config({
        baseUrl: "js",
        paths: {
            "jquery": "lib/jquery.min",
            jqueryMigrate: 'lib/jquery-migrate-1.4.1.min',
            bootstrap: 'lib/bootstrap.min',
            jqueryBackstretch: 'lib/jquery.backstretch.min',
            jqueryBase64: 'lib/jquery.base64',
            jqueryResize: 'lib/jquery.resize',
            bootstrapTreeView: 'lib/bootstrap-treeview',
            datetimepicker: 'lib/bootstrap-datetimepicker.min',
            canvas: 'lib/canvas-to-blob.min',
            fileinput: 'lib/fileinput',
            fileinput2: 'lib/fileinput2',
            fileinput3: 'lib/fileinput3',
            prismjs: 'lib/prismjs',
            fsvs: 'lib/fsvs',
            retina: 'lib/retina-1.1.0.min',
            layer: 'lib/layer/layer',
            tableExport: 'lib/tableExport',
            jqueryCookie: 'lib/jquery.cookie',
            jQueryPrint: 'lib/jQuery.print',
            chartBundle:'lib/chart/Chart.bundle'
        },
        shim: {
            "bootstrap": {
                deps: ['jquery'],
                exports: 'bootstrap',
            },
            "datetimepicker": {
                deps: ['bootstrap'],
                exports: 'datetimepicker',
            },
            "jqueryBackstretch": {
                deps: ['jquery'],
                export: 'jqueryBackstretch',
            },
            "jqueryMigrate": {
                deps: ['jquery'],
                exports: 'jqueryMigrate',
            },
            "jquerySwipe": {
                deps: ['jquery'],
                exports: 'jquerySwipe',
            },
            "retina": {
                exports: 'retina',
            },
            "bootstrapTreeView": {
                deps: ['jquery', 'jqueryResize'],
                exports: 'bootstrapTreeView',
            },
            "fileinput": {
                deps: ['jquery', 'canvas'],
                exports: 'fileinput',
            },
            "fileinput2": {
                deps: ['jquery', 'canvas'],
                exports: 'fileinput2'
            },
            "prismjs": {
                exports: 'prismjs'
            },
            "fsvs": {
                exports: 'fsvs'
            },
            "jqueryResize": {

                deps: ['jquery'],
                export: 'jqueryResize'
            },
            "jqueryBase64": {

                deps: ['jquery'],
                export: 'jqueryBase64'
            },
            "jqueryCookie": {
                deps: ['jquery'],
                export: 'jqueryCookie'
            },
            "layer": {
                deps: ['jquery'],
                export: 'layer'
            },
            "tableExport": {
                export: 'tableExport'
            },
            "jQueryPrint": {
                deps: ['jquery'],
                export: 'jQueryPrint'
            },
            "jqueryMigrate": {
                deps: ['jquery'],
                export: 'jqueryMigrate'
            }

        },
        map: {
            '*': {
                'css': 'lib/css.min'
            }
        }
    });
    //工具方法
    var help = {};
    help.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
            return null;
        }
    }
    help.getFilenameReg = /(.*\/){0,}([^\.]+).*/ig;
    help.getFilename = function () {
        var url = document.URL;
        return url.replace(help.getFilenameReg, '$2');
    }
    help.getPageName = function () {
        var pageName = help.getUrlParam("pageName");
        if (pageName == null || pageName === "") {
            pageName = help.getFilename();
        }
        return pageName;
    }
    //执行页面初始化
    require(["page/" + help.getPageName()], function (page) {

        //初始化页面
        console.info('Page is ready!');
        //调用页面初始化方法
        page.init();
        //初始化bootstrap
        require(['bootstrap'], function () {
            console.info("bootstrap loaded!");
        });
    });
})(this);