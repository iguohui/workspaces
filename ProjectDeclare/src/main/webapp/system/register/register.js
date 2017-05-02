$(function () {
    var $form = $("#form-register");
    $form.ajaxForm();
    $form.validate({
        submitHandler: function () {
            $.ajax({
                url: $.fn.baseURL + "/usermanger/adduser.do",
                async: true,
                type: "POST",
                data: $form.serialize(),
                success: function (data) {
                    var user_name = $form.find("[name=user_name]").val();
                    var password = $form.find("[name=password]").val();
                    $("#register").html("");
                    $("#register").append("<h3>恭喜您注册成功！</h3>");
                    $.fn.loginIn(user_name,password,function () {
                        window.location=$.fn.baseURL+"/index.html";
                    });
                },
                error: function () {
                    alert("保存失败");
                }
            });
        },
        ignore: "[name=email]",

        rules: {
            "user_name": {
                required: true,
                minlength: 3,
                remote:{
                    url: $.fn.baseURL+"/usermanger/checkusername.do",
                    type: "post",
                    dataType: 'json',
                    data: {
                        'user_name': function(){return $('input[name="user_name"]').val();}
                    }
                }
            },
            password: {
                required: true,
            },
            password1: {
                equalTo: "#password",
            },
            sex:{
                required:true,
            }
        },
        messages: {
            "user_name": {
                required: "帐号不能为空！",
                minlength: "长度不能小于{0}！",
                remote:"用户名已经存在！",
            },
            password: {
                required: "密码不能为空！",
            },
            url: {
                url: "请输入正确的网址！",
            },
            password1: {
                equalTo: "两次密码输入不一致！",
            },
            sex:{
                required:"性别不能为空！",
            }
        }
    });
});

