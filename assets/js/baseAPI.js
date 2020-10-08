var qwd = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (base) {
    base.url = qwd  + base.url
})