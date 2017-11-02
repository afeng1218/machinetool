/**
 * Created by CJS on 2016/3/22.
 */
define(['jquery', 'common','layer','tableExport'], function ($,COMMON,layer) {

    var pIndex = parent.layer.getFrameIndex(window.name); //获取窗口索引
    var index = layer.getFrameIndex(window.name);
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

        /*设置table body高度*/
        $('.table-body').css('height', (screen.height*3) / 5);

        var searchVals = {};
        searchVals.employeeCardNo = $('#employee_no',parent.document).val();
        searchVals.workshop = $('#workshop',parent.document).val();
        searchVals.borrowedName = $('#person_name',parent.document).val();
        searchVals.workshopSection = $('#work_section',parent.document).val();
        searchVals.team = $('#team',parent.document).val();
        searchVals.productionLine = $('#production_line',parent.document).val();
        searchVals.equipmentName = $('#equipment',parent.document).val();
        searchVals.classification = $('#borrower_class',parent.document).val();
        searchVals.organization = $('#organization',parent.document).val();
        var value = JSON.stringify(searchVals);
        COMMON.WS.restful('borrower/blurSearch', 'post', value, true, function (data) {
                if (data == null) {
                    return;
                }
                $('#borrowReturnHeadTable').find('tbody').html('');
                var json = eval(data);
                $.each(json, function (index, item) {
                    if(item.allowBorrowNumber==null){
                        var allowBorrowNumber="";
                    }else{
                        var allowBorrowNumber=item.allowBorrowNumber;
                    }
                    if(item.workshop==null){
                        var workshop="";
                    }else{
                        var workshop=item.workshop;
                    }
                    if(item.workshopSection==null){
                        var workshopSection="";
                    }else{
                        var workshopSection=item.workshopSection;
                    }
                    if(item.team==null){
                        var team="";
                    }else{
                        var team=item.team;
                    }
                    if(item.productionLine==null){
                        var productionLine="";
                    }else{
                        var productionLine=item.productionLine;
                    }
                    if(item.classification==null){
                        var classification="";
                    }else{
                        var classification=item.classification;
                    }
                    if(item.createTime==null){
                        var createTime="";
                    }else{
                        var createTime=COMMON.LOCAL_DATE.getLocalDate(item.createTime);
                    }
                    if(item.organization==null){
                        var organization="";
                    }else{
                        var organization=item.organization;
                    }
                    $('#borrowReturnHeadTable').find('tbody').append('<tr class="tr" style="height: 30px">' +
                        '<td style="padding: 0;width: 10%;">' + item.employeeCardNo + '</td>' +
                        '<td style="padding: 0;width: 10%;">' + item.borrowedName + '</td>' +
                        '<td style="padding: 0;width: 10%;">' + workshop + '</td>' +
                        '<td style="padding: 0;width: 10%;">' + workshopSection + '</td>' +
                        '<td style="padding: 0;width: 10%;">' + team + '</td>' +
                        '<td style="padding: 0;width: 10%;">' + productionLine + '</td>' +
                        '<td style="padding: 0;width: 10%;">' + item.equipmentName + '</td>' +
                        '<td style="padding: 0;width: 10%;">' + organization + '</td>' +
                        '<td style="padding: 0;width: 10%;">' + classification + '</td>' +
                        '<td style="padding: 0;width: 10%;">' + createTime + '</td>' +
                        '</tr>');
                });
        });

        //单击行
        $(document).on('click', '.tr', function (e) {
            $(".tr").css("background-color","#fff");
            $(".tr").removeClass('select');
            var item = $(e.target).parent();
            item.css("background-color","#FFE4C4");
            item.addClass('select');
        });

        //双击行
        // $('.tr').bind('dblclick', function () {});
        //查看借用者信息
        $(document).on('click', '#viewBtn', function (e) {
            var eno=$(".select").find('td').eq(0).text();
            var ename=$(".select").find('td').eq(1).text();
            var workshop=$(".select").find('td').eq(2).text();
            var section=$(".select").find('td').eq(3).text();
            var team=$(".select").find('td').eq(4).text();
            var productLine=$(".select").find('td').eq(5).text();
            var equipment=$(".select").find('td').eq(6).text();
            var organization=$(".select").find('td').eq(7).text();
            var classfy=$(".select").find('td').eq(8).text();
            $('#employee_no', parent.document).val(eno);
            $('#employee_no', parent.document).attr('readonly', 'readonly');
            $('#workshop', parent.document).val(workshop);
            $('#person_name', parent.document).val(ename);
            $('#work_section', parent.document).val(section);
            $('#team', parent.document).val(team);
            $('#production_line', parent.document).val(productLine);
            $('#equipment', parent.document).val(equipment);
            $('#borrower_class', parent.document).val(classfy);
            $('#organization', parent.document).val(organization);
            parent.layer.close(pIndex);
        });
        
    }

    return {
        'init': init
    }
});