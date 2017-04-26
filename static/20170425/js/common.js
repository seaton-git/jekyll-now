/**
 * Created by seaton on 2017/4/26 0026.
 */
$(function () {

    $(".J-switch-tab").click(function () { // tab 切换
        var _tab = $(this).attr("data-tab");
        var _line = $(".J-line");
        var _left = $(this).offset().left + ($(this).outerWidth() - _line.width()) / 2;
        if (_tab != 2) {
            _line.animate({left: _left}, "fast");
            $(this).addClass("cor-7").siblings().removeClass("cor-7");
            $(".tab-" + _tab).show().siblings().hide();
            _tab == 1 ? $(".input-comment").show() : $(".input-comment").hide();
        } else {
            console.log("redirection link");
        }
    });

    $(".J-send-comment").click(function () { // 点击 献花 按钮
        var _comment = $(".-i-comment").val();

        // 执行操作

        $(".-i-comment").val('').blur();
        console.log(_comment);
    });

    $(".J-download").click(function () { // 点击下载，激活下载窗口
        $(".download-pop").show();
    });

    $(".J-no-download").click(function () { // 点击暂不下载
        $(".download-pop").hide();
    });

    $(".J-go-download").click(function () { // 点击立即下载
        console.log("click the download");
        $(".download-pop").hide();
    });

    $(".J-close").click(function () { // 关闭下载区域
        $(".download").remove();
    });
});
