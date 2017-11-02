/*自定义RADIO控件*/
define(["jquery"], function($){
    $(document).on('click', '.cus-radio>*', function() {
        $this = $(this).parent();
        var $valueElement = $('#' + $this.attr('name'));

        if($valueElement.val() == $this.attr('value')) {
            //取消点击
            //样式变化
            var $i = $this.find('i');
            $i.removeClass('fa-check-square-o').addClass('fa-square-o');
            //数值变化
            $valueElement.val('');
        }
        else {
            //确定点击
            //样式变化
            var $i = $this.find('i');
            var $radioAllI = $('.cus-radio[name="' + $this.attr('name') + '"]').find('i.fa-check-square-o');
            $radioAllI.removeClass('fa-check-square-o').addClass('fa-square-o');
            $i.removeClass('fa-square-o').addClass('fa-check-square-o');
            //数值变化
            $valueElement.val($this.attr('value'));
        }
    });
});