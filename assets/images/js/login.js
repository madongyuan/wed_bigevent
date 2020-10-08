$(function () {
    $('#reg').on('click', function () {
        $('.login').hide()
        $('.reg').show()
    })
    $('#login').on('click', function () {
        $('.login').show()
        $('.reg').hide()
    })
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, "密码必须是6-16位，且不能输入空格"
        ],
        repwd: function (value) {
            var pwd = $('.reg input[name = password]').val()
            if (value !== pwd) {
                return "两次密码输入不一致"

            }
        }
    });

    $('#form_reg').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "http://ajax.frontend.itheima.net/api/reguser",
            data: {
                username :$('.reg [name = username]').val(),
                password :$('.reg [name = password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                     return //alert(res.message)
                }
                // alert(res.message)
            }
        })
    })

    var layer = layui.layer;
    $('#form_login').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您，登陆成功")
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})