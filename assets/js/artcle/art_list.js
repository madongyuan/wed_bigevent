$(function () {
    //1. 搜索引擎
    template.defaults.imports.dataFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1,//默认页码值
        pagesize: 2,//每页显示多少条数据
        cate_id: '',//文章分类的ID
        state: '',
    };

    //2. 初始化文章列表
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                var str = template('tpl-table', res)
                $('tbody').html(str)
                // 分页
                renderPage(res.total)
            }
        })
    }
    //3. 初始化文章分类
    var form = layui.form
    // 封装
    initCate()//调用函数
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name="cate_id"]').html(htmlStr)
                form.render()//赋值的数据和渲染的数据没有关联
            }
        })
    }
    // 4.筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取
        var state = $("[name=state]").val()
        var cate_id = $("[name=cate_id]").val()
        // 赋值
        q.cate_id = cate_id
        q.state = state
        // 初始化文章列表
        initTable()
    })
    // 5.分页
    var laypage = layui.laypage
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,//每页显示多少数据
            curr: q.pagenum,//当前页面
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],//分页模块显示
            limits: [2, 3, 5, 10],//每项显示多少条数据的选择器

            jump: function (obj, first) { //obj所有参数所在的对象，first是否第一次初始化分页
                //  改变当前页
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // 不是第一次初始化，就调用初始化列表功能
                if (!first) {
                    // 初始化文章列表
                    initTable()
                }
            }
        });
    }

    var layer = layui.layer;
    $("tbody").on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')

        layer.confirm('是否确认删除?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                $.ajax({
                    method: 'GET',
                    url: '/my/article/delete/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        //获取成功，重新渲染页面的数据
                        initTable()
                        layer.msg('恭喜您，获取文章成功')
                        if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
                        initTable()
                    }
                })
                layer.close(index);
            });
    })


})