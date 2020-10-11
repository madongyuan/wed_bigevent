$(function () {
    var form = layui.form;
    var layer = layui.layer;
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    initEditor()
    // 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)

    $("#btnChooseImage").on('click', function () {
    $("#coverFile").click()
})
    $("#coverFile").change(function (e) {
        var file = e.target.files[0];
        if (file == undefined) {
            return;
        }
        var newImgURL = URL.createObjectURL(file)
        $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
    })
    var state = '已发布';
    $('#btnSave2').on('click', function () {
        state = '草稿'
    })
          
    $("#form-pub").on('submit', function (e) {
        e.preventDefault()
        // 创建FormData对象，收集数据
        var fd = new FormData(this)
        // 放入状态
        fd.append('state', state)
        // 放入图片
        $image.cropper('getCroppedCanvas', {//创建一个Canvas画布
            width: 400,
            height:280
        })
            // 将Canvas画布内容，转换为文件对象
            .toBlob(function (blob) {
                // 得到对象，进行后续操作
                fd.append('cover_img', blob)
                // 发送ajax要在toBlob函数里
                // 文章发布 
               publishArticle(fd)
        })
    })
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 去除bug
                layer.msg('恭喜您，添加文章成功，跳转中...')
                setTimeout(function () {
                    window.parent.document.querySelector('#art_list').click()
                },1500)
            }
        })
    }
})