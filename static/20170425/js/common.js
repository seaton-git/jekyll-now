/**
 * Created by seaton on 2017/4/26 0026.
 */
$(function () {

    function setPop (type) {
        var _html = "";
        if (type == 1) {
            _html = "<div class='pop-body'>" +
                "<img class='width-all block' src='./images/pop-top1.png' />" +
                "<div class='bg-1 desc-1 '>" +
                "<strong class='block weight-500 text-center font-1 cor-2'>下载顾问工具包，查看全部精彩聊天内容！</strong>" +
                "<p class='desc-2 text-center font-0 cor-1'>亲爱的，下载顾问工具包，使用美容顾问账号登录，更快更省流量的同时，即刻参与直播互动噢！</p>" +
                "<div class='foot text-center'>" +
                "<span class='no-down font-4 cor-8 J-no-download'>暂不下载</span><span class='font-4 cor-7 J-go-download'>立即前往下载</span>" +
                "</div></div></div>";
        } else {
            _html = "<div class='pop-body'>" +
                "<img class='width-all block' src='./images/pop-top2.png' />" +
                "<div class='bg-1 desc-1 '>" +
                "<strong class='block weight-500 text-center font-1 cor-2'>下载顾问工具包，即刻参与聊天活动！</strong>" +
                "<p class='desc-2 text-center font-0 cor-1'>亲爱的，下载顾问工具包，使用美容顾问账号登录，更快更省流量的同时，即刻参与直播互动噢！</p>" +
                "<div class='foot text-center'>" +
                "<span class='no-down font-4 cor-8 J-no-download'>暂不下载</span><span class='font-4 cor-7 J-go-download'>立即前往下载</span>" +
                "</div></div></div>";
        }
        $(".download-pop").html(_html).show();
    }

    $(".J-switch-tab").click(function () { // tab 切换
        var _tab = $(this).attr("data-tab");
        var _line = $(".J-line");
        var _left = ($(this).offset().left - $(this).parent().offset().left) + ($(this).outerWidth() - _line.width()) / 2;
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
        setPop(2);
    });

    $(".download-pop").on("click", ".J-no-download", function () { // 点击暂不下载
        $(".download-pop").empty().hide();
    });

    $(".download-pop").on("click", ".J-go-download", function () { // 点击立即下载
        console.log("click the download");
        $(".download-pop").empty().hide();
    });

    $(".J-close").click(function () { // 关闭下载区域
        $(".download").remove();
    });
});
