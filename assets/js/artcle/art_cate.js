$(function () {
    // 1.文章类别列表显示
    initArtCateList()
    // 封装函数
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var str = template('tpl-table', res);
                $('tbody').html(str)
            }
        })
    }
    // 2.添加文章分类列表显示
    var layer = layui.layer;
    $("#btnAdd").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $("#dialog-add").html()
        });
    })
    //    3.提交文章分类添加（事件委托）
    var indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 因为添加成功，需要重新渲染
                initArtCateList()
                layer.msg('恭喜您，文章类别添加成功')
                layer.close(indexAdd)
            }
        })
    })
    // 弹出编辑信息层
    // 4.修改-展示表单
    var indexEdit = null;
    var form = layui.form
    $("tbody").on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $("#dialog-edit").html()
        });
        // 4.2获取id 发送Ajax请求，渲染到页面
        var Id = $(this).attr('data-Id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })
//  4.修改-提交
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('恭喜您，文章类别更新成功')
                layer.close(indexEdit)
            }
        })
    })
    // 5.删除
    $("tbody").on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        initArtCateList()
                        layer.msg('恭喜您，文章类别删除成功');
                        layer.close(index)
                    }
                })
            });
    })
})