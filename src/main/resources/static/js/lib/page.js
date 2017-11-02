/*分页控件*/
/*自定义SELECT控件*/
define(["jquery","css!../../css/page.css"],function($) {
	var methods = {
		init: function(options_) {
    		return this.each(function() {
    			var $this = $(this);
    	    	var _defaults = {
    	    		pagesize: 1,					//分页大小
    	    		maxItem: 1,						//内容总数
    	    		currentPage: 1,					//当前页
    	    		maxShowPage: 5,					//最大显示页码数
    	    		currentPageFunc: function(page_) {},	//点击页码事件
    	    		prevPageFunc: function(page_) {},	//点击上一页事件
    	    		nextPageFunc: function(page_) {}		//点击下一页事件
    	    	}
    	    	var settings = $.extend({}, _defaults, options_);
    	    	
    	    	$this.empty();
    	    	//排错
    	    	if(settings.pagesize == 0 || settings.maxItem < 1) {
    	    		return $this;
    	    	}
    	    	var currentPage = settings.currentPage < 1 ? 1 : settings.currentPage;
    	    	var minItemIndex = (settings.currentPage - 1) * settings.pagesize + 1;
    	    	var maxItemIndex = minItemIndex + settings.pagesize - 1;
    	    	maxItemIndex = maxItemIndex > settings.maxItem ? settings.maxItem : maxItemIndex;
    	    	var allPage = parseInt((settings.maxItem - 1) / settings.pagesize) + 1;
    	    	var startPage = 1;
    	    	if(allPage > settings.maxShowPage) {
    	    		startPage = currentPage - parseInt(settings.maxShowPage / 2);
    	    		startPage = startPage < 1 ? 1 : startPage;
    	    		startPage = (allPage - startPage + 1) < settings.maxShowPage ? (allPage - settings.maxShowPage + 1) : startPage;
    	    	}
    	    	var endPage = startPage + settings.maxShowPage - 1;
    	    	endPage = endPage > allPage ? allPage : endPage;
    	    	
    	    	var pageHtml = '<span class="sesol-page-label">展示' + minItemIndex + '-' + maxItemIndex + '条记录</span>';
    	    	pageHtml 	+= '<div class="sesol-page-detail">';
                pageHtml 	+= '	<div class="page-prev cursor-pointer">';
                pageHtml 	+= '		<i class="glyphicon glyphicon-chevron-left"></i>';
            	pageHtml	+= '			<span>上一页</span>';
                pageHtml 	+= '	</div>';
                for(var pageIndex = startPage; pageIndex <= endPage; pageIndex++) {
                	var curFlag = pageIndex == currentPage ? ' cur' : '';
                	pageHtml+= '	<div class="page-num cursor-pointer' + curFlag + '">' + pageIndex + '</div>';
                }
                pageHtml 	+= '	<div class="page-next cursor-pointer">';
                pageHtml 	+= '		<span>下一页</span>';
                pageHtml 	+= '		<i class="glyphicon glyphicon-chevron-right"></i>';
                pageHtml 	+= '	</div>';
                pageHtml 	+= '</div>';
                $this.append(pageHtml);
                
                $this.find('.page-num').click(function() {
                	var currentPage = parseInt($(this).text());
                	if(currentPage == settings.currentPage) {
                		return false;
                	}
                	settings.currentPageFunc(currentPage);
                	$this.sesolPage({
                		pagesize: settings.pagesize,
	    	    		maxItem: settings.maxItem,
	    	    		currentPage: currentPage,
	    	    		maxShowPage: settings.maxShowPage,
	    	    		currentPageFunc: settings.currentPageFunc,
	    	    		prevPageFunc: settings.prevPageFunc,
	    	    		nextPageFunc: settings.nextPageFunc
                	});
                });
                $this.find('.page-prev').click(function() {
                	var prevPage = settings.currentPage - 1;
                	if(prevPage < 1) {
                		return false;
                	}
                	settings.prevPageFunc(prevPage);
                	$this.sesolPage({
                		pagesize: settings.pagesize,
	    	    		maxItem: settings.maxItem,
	    	    		currentPage: prevPage,
	    	    		maxShowPage: settings.maxShowPage,
	    	    		currentPageFunc: settings.currentPageFunc,
	    	    		prevPageFunc: settings.prevPageFunc,
	    	    		nextPageFunc: settings.nextPageFunc
                	});
                });
                $this.find('.page-next').click(function() {
                	var nextPage = settings.currentPage + 1;
                	if(nextPage > allPage) {
                		return false;
                	}
                	settings.nextPageFunc(nextPage);
                	$this.sesolPage({
                		pagesize: settings.pagesize,
	    	    		maxItem: settings.maxItem,
	    	    		currentPage: nextPage,
	    	    		maxShowPage: settings.maxShowPage,
	    	    		currentPageFunc: settings.currentPageFunc,
	    	    		prevPageFunc: settings.prevPageFunc,
	    	    		nextPageFunc: settings.nextPageFunc
                	});
                });
                
                return $this;
    		});
		}
	}
    $.fn.sesolPage = function() {
		var method = arguments[0];
		 
        if(methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if( typeof(method) == 'object' || !method ) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.pluginName' );
            return this;
        }
 
        return method.apply(this, arguments);
    }
});
