// 入口函数
$(function () {
    // 获取用户信息
    getUserInfo()

    $('#btnLogout').on('click', function () {
        // 带图标的询问
        layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.删除本地存储中的token
            localStorage.removeItem('token')
            // 2.页面跳转
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
// 位置在入口函数外，后面代码用这个方法，要求方法是一个全局函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization:localStorage.getItem("token") || ''
        // },
        success: function (res) {
            console.log(res);
            // 判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功，渲染用户信息
            renderAvatar(res.data)
        },
        complete: function (res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = "/login.html"
            }
        }
    })
}
// 渲染用户头像函数
function renderAvatar(user) {
    // 1.用户名 
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 2.用户头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.user-avatar').hide()
    } else {
        // 没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.user-avatar').show().html(text);

    }

}