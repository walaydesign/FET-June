var getNum = 0;
var addNum = 1;
var limitSecond = 15;

// 開始遊戲
$(".btn-start").click(function(){
    $(this).parents(".gameInit").fadeOut(300);
    limitTime();
    scrollGame();
})

// 畫面回到正中間
function scrollGame() {
    var gameBoxTop = $(".character").offset().top;
    var gameBoxHeightHalf = $(".character").height() / 2;
    var windowHeightHalf = $(window).height() / 2;
    var scrollTop = gameBoxTop + gameBoxHeightHalf - windowHeightHalf;
    $("html,body").animate({ scrollTop: scrollTop }, parseInt(300));
}

// 倒數10秒
var limitTimeNum;
var limitTimeSecond;
function limitTime() {
    clearInterval(limitTimeNum);
    limitTimeSecond = limitSecond;
    var limitTimeActive = document.getElementById("limitTime");
    limitTimeActive.innerHTML = limitTimeSecond;
    limitTimeNum = window.setInterval(function () {
        limitTimeSecond -= 1;
        limitTimeActive.innerHTML = limitTimeSecond;
        if (limitTimeSecond === 0) {
            clearInterval(limitTimeNum);
            if (getNum < 5) {
                fail();
            }else {
                success();
            }
        }
    }, 1000);
}


// 換角色
function character() {
    if($(".character").hasClass("starteating")) {
        if($(".character").hasClass("step-0")) {
            $(".character").removeClass("step-0").addClass("step-1");
        }else if($(".character").hasClass("step-1")) {
            $(".character").removeClass("step-1").addClass("step-2");
        }else if($(".character").hasClass("step-2")) {
            $(".character").removeClass("step-2").addClass("step-3").removeClass("starteating");
            getNum = getNum + addNum;
            $(".getNum").text(getNum);
            $(".onemore-btn").addClass("valid");
        }else if($(".character").hasClass("step-3")) {
            $(".character").removeClass("step-3").addClass("step-0");
        }
    }
}

$(".character").click(function(){
    character();
})

$(".onemore-btn").click(function(){
    if($(this).hasClass("valid")) {
        $(".character").addClass("starteating");
        character();
        $(this).removeClass("valid");
    }
    if(getNum > 2) {
        $(".character-wrap-1").hide();
        $(".character-wrap-2").show();
    }
})


// 隨機
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


// 失敗
function fail() {
    $(".fail").fadeIn(300);
    var failNum;
    failNumSecond = 3;
    failNum = window.setInterval(function () {
        failNumSecond -= 1;
        if (failNumSecond === 0) {
            clearInterval(failNum);
            $(".fail").fadeOut(300);
            getNum = 0;
            $(".getNum").text(getNum);
            limitSecond = 15;
            limitTime();
            $(".character-wrap-1").show();
            $(".character-wrap-2").hide();
            $(".onemore-btn").removeClass("valid");
            $(".character").removeClass("step-1").removeClass("step-2").removeClass("step-3").addClass("step-0").addClass("starteating");
        }
    }, 1000);
}

// 成功
function success() {
    $(".success").show();
}
