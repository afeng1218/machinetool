/**
 * Created by GuoFeng on 2016/1/22.
 */
define(["jquery", "layer", "lib/jquery.cookie", "lib/Math.uuid"], function ($, layer) {

    var COMMON = {
        WS: new function () {
            var WS = this;
            this.localAjax = function (_url, _requestType, _data, _isAsync, _dataType, _success_fallback) {

                $.ajax({
                    url: _url,
                    type: _requestType,
                    data: _data,
                    async: _isAsync,
                    dataType: _dataType,
                    success: function (data) {

                        _success_fallback(data);
                        return;
                    }
                });
            };
            this.local = function (_url, _requestType, _data, _isAsync, _success_fallback) {

                $.ajax({
                    url: _url,
                    type: _requestType,
                    data: _data,
                    async: _isAsync,
                    dataType: "json",
                    cache: false,
                    success: function (data) {

                        _success_fallback(data);
                        return;
                    }
                });
            };
            //图片信息上传
            this.ajax = function (_url, _requestType, _data, _isAsync, _success_fallback) {
                $.ajax({
                    url: _url,
                    type: _requestType,
                    data: _data,
                    async: _isAsync,
                    dataType: "json",
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        _success_fallback(data);
                        return;
                    }
                });
            };
            //设置发送服务器编码类型
            this.restful = function (_url, _requestType, _data, _isAsync, _success_fallback) {

                $.ajax({
                    url: _url,
                    type: _requestType,
                    data: _data,
                    cache: false,
                    dataType: "json",
                    contentType: "application/json;charset=UTF-8",
                    processData: false,
                    async: _isAsync,
                    success: function (data) {

                        _success_fallback(data);
                        return;
                    }
                });
            };
            //获取数据text
            this.apiText = function (_url, _requestType, _data, _isAsync, _success_fallback) {

                $.ajax({
                    url: _url,
                    type: _requestType,
                    data: _data,
                    async: _isAsync,
                    dataType: "text",
                    cache: false,
                    success: function (data) {

                        _success_fallback(data);
                        return;
                    }
                });
            };
        },
        LOCAL_TIME: new function (nS) {

            var LOCAL_TIME = this;
            this.getLocalTime = function (nS) {

                return (new Date(parseInt(nS)).Format('yyyy-MM-dd hh:mm:ss'));

            }

        },
        LOCAL_DATE: new function (nS) {

            var LOCAL_DATE = this;
            this.getLocalDate = function (nS) {

                return (new Date(parseInt(nS)).Format('yyyy-MM-dd'));

            }
        },
        ECODE: new function () {

            var ECODE = this;
            this.Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode: function (e) {
                    var t = "";
                    var n, r, i, s, o, u, a;
                    var f = 0;
                    e = this._utf8_encode(e);
                    while (f < e.length) {
                        n = e.charCodeAt(f++);
                        r = e.charCodeAt(f++);
                        i = e.charCodeAt(f++);
                        s = n >> 2;
                        o = (n & 3) << 4 | r >> 4;
                        u = (r & 15) << 2 | i >> 6;
                        a = i & 63;
                        if (isNaN(r)) {
                            u = a = 64
                        } else if (isNaN(i)) {
                            a = 64
                        }
                        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                    }
                    return t
                },
                decode: function (e) {
                    var t = "";
                    var n, r, i;
                    var s, o, u, a;
                    var f = 0;
                    e = e.toString().replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    while (f < e.length) {
                        s = this._keyStr.indexOf(e.charAt(f++));
                        o = this._keyStr.indexOf(e.charAt(f++));
                        u = this._keyStr.indexOf(e.charAt(f++));
                        a = this._keyStr.indexOf(e.charAt(f++));
                        n = s << 2 | o >> 4;
                        r = (o & 15) << 4 | u >> 2;
                        i = (u & 3) << 6 | a;
                        t = t + String.fromCharCode(n);
                        if (u != 64) {
                            t = t + String.fromCharCode(r)
                        }
                        if (a != 64) {
                            t = t + String.fromCharCode(i)
                        }
                    }
                    t = this._utf8_decode(t);
                    return t
                },
                _utf8_encode: function (e) {
                    e = e.toString().replace(/\r\n/g, "\n");
                    var t = "";
                    for (var n = 0; n < e.length; n++) {
                        var r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r)
                        } else if (r > 127 && r < 2048) {
                            t += String.fromCharCode(r >> 6 | 192);
                            t += String.fromCharCode(r & 63 | 128)
                        } else {
                            t += String.fromCharCode(r >> 12 | 224);
                            t += String.fromCharCode(r >> 6 & 63 | 128);
                            t += String.fromCharCode(r & 63 | 128)
                        }
                    }
                    return t
                },
                _utf8_decode: function (e) {
                    var t = "";
                    var n = 0;
                    var r = c1 = c2 = 0;
                    while (n < e.length) {
                        r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r);
                            n++
                        } else if (r > 191 && r < 224) {
                            c2 = e.charCodeAt(n + 1);
                            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                            n += 2
                        } else {
                            c2 = e.charCodeAt(n + 1);
                            c3 = e.charCodeAt(n + 2);
                            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                            n += 3
                        }
                    }
                    return t
                }
            }
        },
        RANDOM: new function () {

            var RANDOM = this;
            this.getRandom = function (count) {

                var result = '';
                for (var i = 0; i < count; i++) {

                    result += parseInt(Math.floor(Math.random() * 10));
                }
                return result;
            }
        },
        LAYER_CONFIG: new function () {
            var LAYER_CONFIG = this;
            this.config = function () {

                /*layer config*/
                layer.config({
                    path: 'js/lib/layer/'
                });
            }
        },
        HELP: new function () {
            var HELP = this;
            HELP.getUrlParam = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return decodeURIComponent(r[2]);
                    return null;
                }
            }
            HELP.getFilenameReg = /(.*\/){0,}([^\.]+).*/ig;
            HELP.getFilename = function () {
                var url = document.URL;
                return url.replace(this.getFilenameReg, '$2');
            }
            HELP.getPageName = function () {
                var pageName = this.getUrlParam("pageName");
                if (pageName == null || pageName === "") {
                    pageName = this.getFilename();
                }
                return pageName;
            }
        },
    };
    return COMMON;
});
Date.prototype.toLocaleString=function(){//日期格式 单位毫秒
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.toString().replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
