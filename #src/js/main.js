$(document).ready(function () {
    $(".town__select").length && ($(".town__select").niceSelect(), $(".town__select").on("change", function () { if ($(".search").hasClass("active")) { var a = $(".search").offset().left - $(".nav-bar__navigation").offset().left; $(".nav-bar__right > .search .search-form").css({ width: a - 52 + "px" }) } })); $(".product__slider").length && $(".product__slider").slick({ dots: !0 }); $(".header__nav-bar .town__select.nice-select .list").length && $(".header__nav-bar .town__select.nice-select .list").mCustomScrollbar({ theme: "dark-3" });
    $(".header-menu__inner").length && $(".header-menu__inner").mCustomScrollbar({ theme: "dark-3" }); $(".header__menu .town__select.nice-select .list").length && $(".header__menu .town__select.nice-select .list").mCustomScrollbar({ theme: "dark-3" }); if ($(".nav-bar__submenu")) { var b = !1; $(window).on("click", function (a) { var d = $(".nav-bar__submenu"); $(".nav-bar__left .nav-bar__link").hasClass("active") && b && !d.is(a.target) && 0 === d.has(a.target).length && ($(".nav-bar__link").removeClass("active"), b = !1) }) } $(".header__menu").length && ($(".header__menu .nav-bar__link").on("click",
        function () { $(this).toggleClass("active") }), $(".nav-bar__left .nav-bar__link").on("click", function () { $(this).hasClass("active") ? setTimeout(function () { b = !1 }, 50) : setTimeout(function () { b = !0 }, 50); $(this).toggleClass("active") }), $(".nav-bar__right .nav-bar__link").on("click", function () { $(this).hasClass("active"); setTimeout(function () { }, 50); $(this).toggleClass("active") })); $(".search") && ($(window).on("resize", function () {
            if ($(".search").hasClass("active")) {
                var a = $(".nav-bar__right > .search").offset().left -
                    $(".nav-bar__navigation").offset().left; $(".nav-bar__right > .search .search-form").css({ width: a - 52 + "px" })
            }
        }), $(".search-open").on("click", function () { var a = $(this).parent().offset().left - $(".nav-bar__navigation").offset().left; $(".nav-bar__right > .search .search-form").css({ width: a - 52 + "px" }); $(".nav-bar__right > .search").addClass("active") }), $(".search-close").on("click", function () { $(".search").removeClass("active"); $(".search-form").css({ width: "0px" }) })); document.addEventListener("touchmove", function (a) {
            a =
                a.originalEvent || a; 1 < a.scale && a.preventDefault()
        }, !1); $("#phone").length && $("#phone").mask("+9(999) 999-9999"); $("#phone1").length && $("#phone1").mask("+9(999) 999-9999"); $.validator.setDefaults({ submitHandler: function (a) { $(a).hasClass("on-succes") && ($(a).addClass("succes"), $(a).find("button").text("\u0423\u0441\u043f\u0435\u0448\u043d\u043e")) } }); $(".questions__form").length && $(".questions__form").validate({ rules: { username: { required: !0 }, phone1: { required: !0, minlength: 10 }, text: { required: !0 } } }); if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            var c =
                0; $(".nice-select.town__select").hover(function () { c++; 1 == c % 2 && $(this).addClass("open") }); $(".nav-bar__submenu-link").hover(function () { c++; 1 == c % 2 && $(this).addClass("active") }); $(".nav-bar__right ul.list").mouseleave(function () { $(".nice-select.town__select.open").removeClass("open") }); $(".nav-bar__submenu").mouseleave(function () { $(".nav-bar__link.nav-bar__submenu-link.active").removeClass("active") })
        } var e = window.navigator.userAgent; !/chrome/i.test(e) && /webkit|safari|khtml/i.test(e) && $("html").addClass("safari");
    if ($(".burger__menu")) $(".burger__menu").on("click", function () { $(".header__inner").toggleClass("active"); $("body").toggleClass("menu"); $("body").hasClass("menu") && $("html, body").animate({ scrollTop: 0 }, 200) }); document.documentElement.style.setProperty("--vh", .01 * window.innerHeight + "px"); window.addEventListener("resize", function () { document.documentElement.style.setProperty("--vh", .01 * window.innerHeight + "px") }, { passive: !0 }); $(".search-form") && $(".search-form").validate({ rules: { search: { required: !0 } } });
    $(".search-form-mobile").length && $(".search-form-mobile").validate({ rules: { search: { required: !0 } } }); $(".consultation__form").length && $(".consultation__form").validate({ rules: { username: { required: !0 }, phone: { required: !0, minlength: 10 } } })



  
    // $(document).on('click', '.slick-cloned', function (e) {
    //     var $slides = $(this)
    //         .parent()
    //         .children('.slick-slide:not(.slick-cloned)');

    //     $slides
    //         .eq(($(this).attr("data-slick-index") || 0) % $slides.length)
    //         .trigger("click.fb-start", { $trigger: $(this) });

    //     return false;
    // });

    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
});


