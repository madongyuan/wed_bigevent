var qwd = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (base) {
    base.url = qwd + base.url;
    // 2.对需要权限的借口配置头信息
    // 必须开头是/my/
    if (base.url.indexOf("/my/") !== -1) {
        base.headers = {
            //Authorization请求头身份认证
            Authorization:localStorage.getItem("token") || ''
        }
    }
    // 拦截所有响应，判断身份认证信息
    base.complete = function (res) {
        // console.log(res.responseJSON); 
        var obj = res.responseJSON;
        if (obj.status === 1 && obj.message === "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = "/login.html"
        }
    }
})