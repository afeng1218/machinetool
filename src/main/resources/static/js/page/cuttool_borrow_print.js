/**
 * Created by CJS on 2016/3/22.
 */
define(['jquery', 'common', 'tableExport'], function ($, COMMON, layer) {

    function init() {

        $("#ewmId").attr("src",$('#pintUrl', parent.document).val());

        //打印按钮
        $("#pintShow").click(function(){
            $(this).hide();
            window.print();
            parent.layer.close(parent.printIfrname);
            parent.printIfrname=null;
        });
    };
    return {
        'init': init
    };
});