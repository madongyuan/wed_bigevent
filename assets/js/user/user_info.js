$(function () {
    // 1.自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if(value.length > 6) {
                return '昵称长度为1-6之间!';
            }
       }

    })
 
    initUserInfo()
    // 2.初始化用户信息
    var layer = layui.layer
    // 封装函数
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //渲染
                form.val('formUserInfo',res.data)
            }
      })
    };

    // 重置表单
    // 给form事件绑定用事件用reset，给button绑定事件用click
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，修改用户信息成功')
                // 调用父框架的全局方法
                window.parent.getUserInfo()
            }
        })
    })
})