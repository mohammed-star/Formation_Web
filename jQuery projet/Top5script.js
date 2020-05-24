$(function () {
        var $mainMenuItems = $("#main-menu ul").children("li"),
            totalMainMeniItems = $mainMenuItems.length,
            openIndex = 2,

            init = function () {
                bindEvents();
                if (validIndex(openIndex)){
                    animateItem($mainMenuItems.eq(openIndex),true,700);
                    var textanimed = $mainMenuItems.eq(openIndex).find("p");
                    textanimed.hide();
                    $("#j1").fadeIn(600,function () {$("#j2").fadeIn(600,function () {$("#j3").fadeIn(600);});});


                    /*
                    $textanimed.hide();
                    $textanimed.show(1000);

                    var $TEXTanimed = $mainMenuItems.eq(openIndex).find(".description");
                    $TEXTanimed.append("<p>p1</p>");
                    $TEXTanimed.append("<p>p2</p>");
                    $TEXTanimed.append("<p>p3</p>");*/
                }
            },
            bindEvents = function(){
                $mainMenuItems.children(".images").click(function () {
                    var newIndex = $(this).parent().index();
                    checkAndAnimateItem(newIndex);
                });

                $(".button").hover(
                    function () {
                        $(this).addClass("hovered");
                    },
                    function () {
                        $(this).removeClass("hovered");
                    }
                    );
                $(".button").click(function () {
                    var newIndex = $(this).index();
                    checkAndAnimateItem(newIndex);
                });
            },
            validIndex = function(indexToCheck){
                return (indexToCheck >= 0) && (indexToCheck < totalMainMeniItems);
            },
            animateItem = function($item,toOpen,speed){
                var $colorimage = $item.find(".color"),
                itemParam = toOpen ? {width: "420px"}: {width: "140px"},
                colorImageParam = toOpen ? {left: "0px"}: {left: "140px"};

                $colorimage.animate(colorImageParam,speed);
                $item.animate(itemParam,speed);
            };

            checkAndAnimateItem = function(inexTocheckandAnimate){
                if (openIndex === inexTocheckandAnimate){
                    animateItem($mainMenuItems.eq(inexTocheckandAnimate),false,250);
                    openIndex = -1;
                }else {
                    if (validIndex(inexTocheckandAnimate)){
                        animateItem($mainMenuItems.eq(openIndex),false,250);
                        openIndex = inexTocheckandAnimate;
                        animateItem($mainMenuItems.eq(openIndex),true,250);
                        switch (openIndex) {
                            case 0:
                                var textanimed = $mainMenuItems.eq(openIndex).find("p");
                                textanimed.hide();
                                $("#s1").fadeIn(600,function () {$("#s2").fadeIn(600,function () {$("#s3").fadeIn(600);});});
                                break;
                            case 1:
                                var textanimed = $mainMenuItems.eq(openIndex).find("p");
                                textanimed.hide();
                                $("#n1").fadeIn(600,function () {$("#n2").fadeIn(600,function () {$("#n3").fadeIn(600);});});
                                break;
                            case 2:
                                var textanimed = $mainMenuItems.eq(openIndex).find("p");
                                textanimed.hide();
                                $("#j1").fadeIn(600,function () {$("#j2").fadeIn(600,function () {$("#j3").fadeIn(600);});});
                                break;
                            case 3:
                                var textanimed = $mainMenuItems.eq(openIndex).find("p");
                                textanimed.hide();
                                $("#r1").fadeIn(600,function () {$("#r2").fadeIn(600,function () {$("#r3").fadeIn(600);});});
                                break;
                            case 4:
                                var textanimed = $mainMenuItems.eq(openIndex).find("p");
                                textanimed.hide();
                                $("#m1").fadeIn(600,function () {$("#m2").fadeIn(600,function () {$("#m3").fadeIn(600);});});
                                break;
                        }
                    }
                }
            }
            init();

});