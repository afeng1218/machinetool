define(["jquery","css!../../css/date-range.css"], function($){
    (function() {
        var Calendar, DAYS, DatePicker, MONTHS, TEMPLATE;

        DAYS = ['日', '一', '二', '三', '四', '五', '六'];

        MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

        TEMPLATE = "<div class=\"drp-popup sesol-picker\">\n   <div class=\"drp-calendars\">\n    <div class=\"drp-calendar drp-calendar-start\">\n      <div class=\"drp-month-picker\">\n        <div class=\"drp-arrow\"><</div>\n        <div class=\"drp-month-title\"></div>\n        <div class=\"drp-arrow drp-arrow-right\">></div>\n      </div>\n      <ul class=\"drp-day-headers\"></ul>\n      <ul class=\"drp-days\"></ul>\n  </div>\n  <div class=\"drp-tip\"></div>\n</div>";

        DatePicker = (function() {
            function DatePicker($select) {
                this.$select = $select;
                this.$datePicker = $(TEMPLATE);
                this.$select.attr('tabindex', '-1').before(this.$datePicker);
                this.isHidden = true;
                this.customOptionIndex = 0;
                this.initBindings();
                this.setDefault($select.val());
            }

            DatePicker.prototype.initBindings = function() {
                var self;
                self = this;
                this.$select.on('focus mousedown', function(e) {
                    var $select;
                    $select = this;
                    setTimeout(function() {
                        return $select.blur();
                    }, 0);
                    return false;
                });
                this.$datePicker.click(function(evt) {
                    return evt.stopPropagation();
                });
                $('body').click(function(evt) {
                    if (evt.target === self.$select[0] && self.isHidden) {
                        return self.show();
                    } else if (!self.isHidden) {
                        return self.hide();
                    }
                });
            };

            DatePicker.prototype.hide = function() {
                this.isHidden = true;
                return this.$datePicker.hide();
            };

            DatePicker.prototype.show = function() {
                this.isHidden = false;
                return this.$datePicker.show();
            };

            DatePicker.prototype.showCustomDate = function() {
                var text;
                text = this.formatDate(this.startDate());
                return this.$select.val(text);
            };

            DatePicker.prototype.formatDate = function(d) {
                return "" + (d.getFullYear().toString()) + "/" + (d.getMonth() + 1) + "/" + (d.getDate());
            };

            DatePicker.prototype.setDefault = function() {
                var curDate;

                curDate = new Date();
                this.calendar = new Calendar(this, this.$datePicker.find('.drp-calendar:first-child'), curDate);
                return this.draw();
            };

            DatePicker.prototype.startDate = function() {
                return this.calendar.date;
            };

            DatePicker.prototype.draw = function() {
                return this.calendar.draw();
            };

            return DatePicker;

        })();

        Calendar = (function() {
            function Calendar(datePicker, $calendar, date) {
                var self;
                this.datePicker = datePicker;
                this.$calendar = $calendar;
                this.date = date;
                self = this;
                this.date.setHours(0, 0, 0, 0);
                this._visibleMonth = this.month();
                this._visibleYear = this.year();
                this.$title = this.$calendar.find('.drp-month-title');
                this.$dayHeaders = this.$calendar.find('.drp-day-headers');
                this.$days = this.$calendar.find('.drp-days');
                this.$dateDisplay = this.$calendar.find('.drp-calendar-date');
                $calendar.find('.drp-arrow').click(function(evt) {
                    if ($(this).hasClass('drp-arrow-right')) {
                        self.showNextMonth();
                    } else {
                        self.showPreviousMonth();
                    }
                    return false;
                });
            }

            Calendar.prototype.showPreviousMonth = function() {
                if (this._visibleMonth === 1) {
                    this._visibleMonth = 12;
                    this._visibleYear -= 1;
                } else {
                    this._visibleMonth -= 1;
                }
                return this.draw();
            };

            Calendar.prototype.showNextMonth = function() {
                if (this._visibleMonth === 12) {
                    this._visibleMonth = 1;
                    this._visibleYear += 1;
                } else {
                    this._visibleMonth += 1;
                }
                return this.draw();
            };

            Calendar.prototype.setDay = function(day) {
                this.setDate(this.visibleYear(), this.visibleMonth(), day);
                return this.datePicker.showCustomDate();
            };

            Calendar.prototype.setDate = function(year, month, day) {
                this.date = new Date(year, month - 1, day);
                return this.datePicker.draw();
            };

            Calendar.prototype.draw = function() {
                var day, _i, _len;
                this.$dayHeaders.empty();
                this.$title.text("" + (this.visibleYear()) + "年 " + (this.nameOfMonth(this.visibleMonth())));
                for (_i = 0, _len = DAYS.length; _i < _len; _i++) {
                    day = DAYS[_i];
                    this.$dayHeaders.append($("<li>" + (day.substr(0, 2)) + "</li>"));
                }
                this.drawDateDisplay();
                return this.drawDays();
            };

            Calendar.prototype.dateIsSelected = function(date) {
                return date.getTime() === this.date.getTime();
            };

            Calendar.prototype.dayClass = function(day, firstDayOfMonth, lastDayOfMonth) {
                var classes, date;
                date = new Date(this.visibleYear(), this.visibleMonth() - 1, day);
                classes = '';
                if (this.dateIsSelected(date)) {
                    classes = 'drp-day-selected';
                }
                if ((day + firstDayOfMonth - 1) % 7 === 0 || day === lastDayOfMonth) {
                    classes += ' drp-day-last-in-row';
                }
                return classes;
            };

            Calendar.prototype.drawDays = function() {
                var firstDayOfMonth, i, lastDayOfMonth, self, _i, _j, _ref;
                self = this;
                this.$days.empty();
                firstDayOfMonth = this.firstDayOfMonth(this.visibleMonth(), this.visibleYear());
                lastDayOfMonth = this.daysInMonth(this.visibleMonth(), this.visibleYear());
                for (i = _i = 1, _ref = firstDayOfMonth - 1; _i <= _ref; i = _i += 1) {
                    this.$days.append($("<li class='drp-day drp-day-empty'></li>"));
                }
                for (i = _j = 1; _j <= lastDayOfMonth; i = _j += 1) {
                    this.$days.append($("<li class='drp-day " + (this.dayClass(i, firstDayOfMonth, lastDayOfMonth)) + "'>" + i + "</li>"));
                }
                return this.$calendar.find('.drp-day').click(function(evt) {
                    var day;
                    if ($(this).hasClass('drp-day-disabled')) {
                        //return false;
                    }
                    day = parseInt($(this).text(), 10);
                    if (isNaN(day)) {
                        return false;
                    }
                    self.datePicker.hide();
                    return self.setDay(day);
                });
            };

            Calendar.prototype.drawDateDisplay = function() {
                return this.$dateDisplay.text([this.year(), this.month(), this.day()].join('/'));
            };

            Calendar.prototype.month = function() {
                return this.date.getMonth() + 1;
            };

            Calendar.prototype.day = function() {
                return this.date.getDate();
            };

            Calendar.prototype.dayOfWeek = function() {
                return this.date.getDay() + 1;
            };

            Calendar.prototype.year = function() {
                return this.date.getFullYear();
            };

            Calendar.prototype.visibleMonth = function() {
                return this._visibleMonth;
            };

            Calendar.prototype.visibleYear = function() {
                return this._visibleYear;
            };

            Calendar.prototype.nameOfMonth = function(month) {
                return MONTHS[month - 1];
            };

            Calendar.prototype.firstDayOfMonth = function(month, year) {
                return new Date(year, month - 1, 1).getDay() + 1;
            };

            Calendar.prototype.daysInMonth = function(month, year) {
                month || (month = this.visibleMonth());
                year || (year = this.visibleYear());
                return new Date(year, month, 0).getDate();
            };

            return Calendar;

        })();

        $.fn.datePicker = function() {
            return new DatePicker(this);
        };
    }).call(this);
});
