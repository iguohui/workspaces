(function ($) {
    $.fn.baseURL = "http://localhost:8083/ProjectDeclare";

    //写cookies
    $.fn.setCookie = function (name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    //读取cookies
    $.fn.getCookie = function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            var result = unescape(arr[2]);
            if(typeof(result) == "undefined" || result == "undefined"){
                return null;
            }
            return result;
        } else {
            return null;
        }
    }


    //这是有设定过期时间的使用示例：
    //s20是代表20秒
    //h是指小时，如12小时则是：h12
    //d是天数，30天则：d30
    $.fn.setCookie = function (name, value, time) {
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    function getsec(str) {
        var str1 = str.substring(1, str.length) * 1;
        var str2 = str.substring(0, 1);
        if (str2 == "s") {
            return str1 * 1000;
        }
        else if (str2 == "h") {
            return str1 * 60 * 60 * 1000;
        }
        else if (str2 == "d") {
            return str1 * 24 * 60 * 60 * 1000;
        }
    }


    //删除cookies
    $.fn.delCookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = $.fn.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }

    /**
     * 用户名和密码正确
     */
    $.fn.loginIn = function (user_name, password, callBack) {
        $.ajax({
            url: $.fn.baseURL + "/usermanger/getLoginUser.do",
            data: (function () {
                var data = new Object();
                data.user_name = user_name;
                data.password = password;
                return data;
            })(),
            type: "POST",
            success: function (data) {
                user_name = data.userName;
                password = data.password;
                var user_id = data.userId;
                $.fn.setCookie("user_name", user_name, "h1");
                $.fn.setCookie("password", password, "h1");
                $.fn.setCookie("user_id", user_id, "h1");
                callBack.call(this, data);
            }
        });
    }

    /**
     * 用户名和密码正确
     */
    $.fn.loginOut = function (callBack) {
        $.fn.delCookie("user_name");
        $.fn.delCookie("password");
        $.fn.delCookie("user_id");
        callBack.call(this);
    }

    $.fn.jumpToHome = function () {
        window.location = "index.html";
    }

    $.fn.uuid =function (){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

})(jQuery);