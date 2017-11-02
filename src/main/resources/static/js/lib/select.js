/*自定义SELECT控件*/
define(["jquery"], function($){
    (function() {
        function bindLiClick($this_) {
            $this_.find('ul>li').click(function() {
                var $li = $(this);
                var $ul = $li.parent();
                var $input = $ul.prevAll('input[type="text"]');
                var $inputValue = $ul.prevAll('input[type="hidden"]');
                var $select = $ul.parent();
                var $changeBtn = $this_.find('.changeBtn');
                $ul.hide();
                $input.val($li.text());
                $inputValue.val($li.attr('value'));
                $select.attr('value', $li.attr('value'));
                $changeBtn.click();
            });
            //默认选中
            if($this_.find('ul>li[selected]').length > 0) {
                $this_.find('ul>li[selected]').click();
            }
            else {
                $this_.find('ul>li:eq(0)').click();
            }
        }
        var methods = {
            init: function(options_) {
                var $allCus = this;
                return this.each(function() {
                    var $this = $(this);
                    var $changeBtn = $this.find('.changeBtn');
                    var _defaults = {
                    }
                    var settings = $.extend({}, _defaults, options_);

                    //显示-隐藏
                    $this.find('input,.cus-select-btn').click(function() {
                        var $ul = $(this).nextAll('ul');
                        if($ul.filter(':visible').length == 0) {
                            $allCus.find('ul').hide();
                            $ul.show();
                        }
                        else {
                            $allCus.find('ul').hide();
                        }
                        return false;
                    });
                    //选择内容方法
                    bindLiClick($this);
                    return $this;
                });
            },
            update: function() {
                return this.each(function() {
                    var $this = $(this);
                    var $changeBtn = $this.find('.changeBtn');
                    //选择内容方法
                    bindLiClick($this);
                    return $this;
                });
            },
            change: function(fallback_) {
                return this.each(function() {
                    var $this = $(this);
                    var $changeBtn = $this.find('.changeBtn');

                    if(typeof(fallback_) == 'function') {
                        if($changeBtn.length == 0) {
                            $this.append('<div class="changeBtn hidden"></div>');
                            $changeBtn = $this.find('.changeBtn');
                        }
                        $changeBtn.on('click', function() {
                            fallback_($this);
                        });
                    }
                });
            },
            unchange: function() {
                return this.each(function() {
                    var $this = $(this);
                    var $changeBtn = $this.find('.changeBtn');

                    //重置change方法
                    $changeBtn.off('click');
                });
            },
            disable: function() {
                return this.each(function() {
                    var $this = $(this);
                    $this.find('input,.cus-select-btn').off('click');
                });
            },
            enable: function() {
                var $allCus = $('.cus-select');
                return this.each(function() {
                    var $this = $(this);
                    $this.find('input,.cus-select-btn').off('click').click(function() {
                        var $ul = $(this).nextAll('ul');
                        if($ul.filter(':visible').length == 0) {
                            $allCus.find('ul').hide();
                            $ul.show();
                        }
                        else {
                            $allCus.find('ul').hide();
                        }
                        return false;
                    });
                });
            },
            get: function() {
                return this.each(function() {
                    var $this = $(this);
                    return $this.attr('value');
                });
            },
            set: function(value_) {
                return this.each(function() {
                    var $this = $(this);
                    $this.find('li[value="' + value_ + '"]').click();
                    return $this;
                });
            }
        }
        $.fn.cusSelect = function() {
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
    })();
    //$('.cus-select').cusSelect();
    /*$('.cus-select').cusSelect('change', function(data) {
     console.log(data);
     });*/
});