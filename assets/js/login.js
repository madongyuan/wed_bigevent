//入口函数
$(function () {
    // 1. 显示隐藏切换
    // 点击去注册账号,隐藏登录区域,显示注册区域
    $("#link_reg").on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录,隐藏注册区域,显示登录区域
    $("#link_login").on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 2. 自定义校验规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $(".reg-box input[name=password]").val();
            if (value !== pwd) {
                return "两次密码输入不一致!"
            }
        }
    })

    //3. 注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        //阻止表单提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理代码
                layer.msg('注册成功');
                //手动切换到登录表单
                $('#link_login').click();
                //重置form表单
                $('#form_reg')[0].reset();
            }
        })
    });
 
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
          url: '/api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
          }
        })
    })

})
