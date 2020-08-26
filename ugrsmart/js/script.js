$(document).ready(function () {

  // let AccordionMenu = function (selector) {
  //   this.colMenu = document.querySelectorAll(`${selector} li`);
  //   let This = this;
  //   this.colMenu.forEach(function (items) {
  //     if (items.querySelector('ul')) {

  //       items.firstElementChild.onclick = function (e) {
  //         e.preventDefault();

  //         let isTrue = this.parentElement.classList.toggle('open');

  //         if (isTrue) {
  //           This.show(this.nextElementSibling);
  //         } else {
  //           This.hide(this.nextElementSibling);
  //         }
  //       }
  //     }
  //   })
  // }

  // // Show an element
  // AccordionMenu.prototype.show = function (elem) {
  //   // Get the natural height of the element
  //   var getHeight = function () {
  //     elem.style.display = 'block'; // Make it visible
  //     var height = elem.scrollHeight + 'px'; // Get it's height
  //     return height;
  //   };

  //   var height = getHeight(); // Get the natural height
  //   elem.style.height = height; // Update the height

  //   setTimeout(function () {
  //     elem.style.height = 'auto';
  //   }, 350);
  // };

  // // Hide an element
  // AccordionMenu.prototype.hide = function (elem) {
  //   // Give the element a height to change from
  //   elem.style.height = elem.scrollHeight + 'px';

  //   // Set the height back to 0
  //   setTimeout(function () {
  //     elem.style.height = '0';
  //   }, 110);

  //   setTimeout(function () {
  //     elem.style.display = '';
  //   }, 700);
  // };


  //  new AccordionMenu('.col-menu');

  // Открытие подменю при нажатии на стрелочку
  var arrow = document.querySelectorAll('.arrow');
  for (i = 0; i < arrow.length; i++) {
    let thisLink = arrow[i].previousElementSibling;
    let subMenu = arrow[i].nextElementSibling;
    let thisArrow = arrow[i];
    // let mobileLink = document.querySelector('.menu__mobile-link');
    thisLink.classList.add('parent');
    arrow[i].addEventListener('click', function () {
      subMenu.classList.toggle('open');
      thisArrow.classList.toggle('active');
      thisLink.classList.toggle('active')
    });
    thisLink.addEventListener('click', function (e) {
      e.preventDefault();
      subMenu.classList.toggle('open');
      thisArrow.classList.toggle('active');
      thisLink.classList.toggle('active')
    });
  }



  // Табы
  $('.card-product__item-tabs .tab').on('click', function (event) {
    var id = $(this).attr('data-id');
    $('.card-product__item-tabs').find('.tab-item').removeClass('active-tab').hide();
    $('.card-product__item-tabs .tabs').find('.tab').removeClass('active');
    $(this).addClass('active');
    $('#' + id).addClass('active-tab').fadeIn();
    return false;
  });


  // Динамический адаптив
  (function () {
    let originalPositions = [];
    let daElements = document.querySelectorAll('[data-da]');
    let daElementsArray = [];
    let daMatchMedia = [];
    //Заполняем массивы
    if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
        const daElement = daElements[index];
        const daMove = daElement.getAttribute('data-da');
        if (daMove != '') {
          const daArray = daMove.split(',');
          const daPlace = daArray[1] ? daArray[1].trim() : 'last';
          const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
          const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
          const daDestination = document.querySelector('.' + daArray[0].trim())
          if (daArray.length > 0 && daDestination) {
            daElement.setAttribute('data-da-index', number);
            //Заполняем массив первоначальных позиций
            originalPositions[number] = {
              "parent": daElement.parentNode,
              "index": indexInParent(daElement)
            };
            //Заполняем массив элементов 
            daElementsArray[number] = {
              "element": daElement,
              "destination": document.querySelector('.' + daArray[0].trim()),
              "place": daPlace,
              "breakpoint": daBreakpoint,
              "type": daType
            }
            number++;
          }
        }
      }
      dynamicAdaptSort(daElementsArray);

      //Создаем события в точке брейкпоинта
      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daBreakpoint = el.breakpoint;
        const daType = el.type;

        daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
        daMatchMedia[index].addListener(dynamicAdapt);
      }
    }
    //Основная функция
    function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
        const el = daElementsArray[index];
        const daElement = el.element;
        const daDestination = el.destination;
        const daPlace = el.place;
        const daBreakpoint = el.breakpoint;
        const daClassname = "_dynamic_adapt_" + daBreakpoint;

        if (daMatchMedia[index].matches) {
          //Перебрасываем элементы
          if (!daElement.classList.contains(daClassname)) {
            let actualIndex = indexOfElements(daDestination)[daPlace];
            if (daPlace === 'first') {
              actualIndex = indexOfElements(daDestination)[0];
            } else if (daPlace === 'last') {
              actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
            }
            daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
            daElement.classList.add(daClassname);
          }
        } else {
          //Возвращаем на место
          if (daElement.classList.contains(daClassname)) {
            dynamicAdaptBack(daElement);
            daElement.classList.remove(daClassname);
          }
        }
      }
      customAdapt();
    }

    //Вызов основной функции
    dynamicAdapt();

    //Функция возврата на место
    function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute('data-da-index');
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace['parent'];
      const indexPlace = originalPlace['index'];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
    }
    //Функция получения индекса внутри родителя
    function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
    }
    //Функция получения массива индексов элементов внутри родителя 
    function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
        const childrenElement = children[i];
        if (back) {
          childrenArray.push(i);
        } else {
          //Исключая перенесенный элемент
          if (childrenElement.getAttribute('data-da') == null) {
            childrenArray.push(i);
          }
        }
      }
      return childrenArray;
    }
    //Сортировка объекта
    function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
        if (a.breakpoint > b.breakpoint) {
          return -1
        } else {
          return 1
        }
      });
      arr.sort(function (a, b) {
        if (a.place > b.place) {
          return 1
        } else {
          return -1
        }
      });
    }
    //Дополнительные сценарии адаптации
    function customAdapt() {
      //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
  }());



  if ($('.trust-us__slider').length > 0) {
    $('.trust-us__slider').slick({
      arrows: false,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 930,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 501,
        settings: {
          slidesToShow: 1,
        },
      }
      ]
    });
  }





  $(".town__select").length && ($(".town__select").niceSelect(), $(".town__select").on("change", function () {
    if ($(".search").hasClass("active")) {
      var a = $(".search").offset().left - $(".nav-bar__navigation").offset().left;
      $(".nav-bar__right > .search .search-form").css({
        width: a - 52 + "px"
      })
    }
  }));
  $(".product__slider").length && $(".product__slider").slick({
    dots: !0
  });
  $(".header__nav-bar .town__select.nice-select .list").length && $(".header__nav-bar .town__select.nice-select .list").mCustomScrollbar({
    theme: "dark-3"
  });
  $(".header-menu__inner").length && $(".header-menu__inner").mCustomScrollbar({
    theme: "dark-3"
  });
  $(".header__menu .town__select.nice-select .list").length && $(".header__menu .town__select.nice-select .list").mCustomScrollbar({
    theme: "dark-3"
  });
  if ($(".nav-bar__submenu")) {
    var b = !1;
    $(window).on("click", function (a) {
      var d = $(".nav-bar__submenu");
      $(".nav-bar__left .nav-bar__link").hasClass("active") && b && !d.is(a.target) && 0 === d.has(a.target).length && ($(".nav-bar__link").removeClass("active"), b = !1)
    })
  }
  $(".header__menu").length && ($(".header__menu .nav-bar__link").on("click",
    function () {
      $(this).toggleClass("active")
    }), $(".nav-bar__left .nav-bar__link").on("click", function () {
      $(this).hasClass("active") ? setTimeout(function () {
        b = !1
      }, 50) : setTimeout(function () {
        b = !0
      }, 50);
      $(this).toggleClass("active")
    }), $(".nav-bar__right .nav-bar__link").on("click", function () {
      $(this).hasClass("active");
      setTimeout(function () { }, 50);
      $(this).toggleClass("active")
    }));
  $(".search") && ($(window).on("resize", function () {
    if ($(".search").hasClass("active")) {
      var a = $(".nav-bar__right > .search").offset().left -
        $(".nav-bar__navigation").offset().left;
      $(".nav-bar__right > .search .search-form").css({
        width: a - 52 + "px"
      })
    }
  }), $(".search-open").on("click", function () {
    var a = $(this).parent().offset().left - $(".nav-bar__navigation").offset().left;
    $(".nav-bar__right > .search .search-form").css({
      width: a - 52 + "px"
    });
    $(".nav-bar__right > .search").addClass("active")
  }), $(".search-close").on("click", function () {
    $(".search").removeClass("active");
    $(".search-form").css({
      width: "0px"
    })
  }));
  document.addEventListener("touchmove", function (a) {
    a =
      a.originalEvent || a;
    1 < a.scale && a.preventDefault()
  }, !1);
  $("#phone").length && $("#phone").mask("+9(999) 999-9999");
  $("#phone1").length && $("#phone1").mask("+9(999) 999-9999");
  $.validator.setDefaults({
    submitHandler: function (a) {
      $(a).hasClass("on-succes") && ($(a).addClass("succes"), $(a).find("button").text("\u0423\u0441\u043f\u0435\u0448\u043d\u043e"))
    }
  });
  $(".questions__form").length && $(".questions__form").validate({
    rules: {
      username: {
        required: !0
      },
      phone1: {
        required: !0,
        minlength: 10
      },
      text: {
        required: !0
      }
    }
  });
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    var c =
      0;
    $(".nice-select.town__select").hover(function () {
      c++;
      1 == c % 2 && $(this).addClass("open")
    });
    $(".nav-bar__submenu-link").hover(function () {
      c++;
      1 == c % 2 && $(this).addClass("active")
    });
    $(".nav-bar__right ul.list").mouseleave(function () {
      $(".nice-select.town__select.open").removeClass("open")
    });
    $(".nav-bar__submenu").mouseleave(function () {
      $(".nav-bar__link.nav-bar__submenu-link.active").removeClass("active")
    })
  }
  var e = window.navigator.userAgent;
  !/chrome/i.test(e) && /webkit|safari|khtml/i.test(e) && $("html").addClass("safari");
  if ($(".burger__menu")) $(".burger__menu").on("click", function () {
    $(".header__inner").toggleClass("active");
    $("body").toggleClass("menu");
    $("body").hasClass("menu") && $("html, body").animate({
      scrollTop: 0
    }, 200)
  });
  document.documentElement.style.setProperty("--vh", .01 * window.innerHeight + "px");
  window.addEventListener("resize", function () {
    document.documentElement.style.setProperty("--vh", .01 * window.innerHeight + "px")
  }, {
    passive: !0
  });
  $(".search-form") && $(".search-form").validate({
    rules: {
      search: {
        required: !0
      }
    }
  });
  $(".search-form-mobile").length && $(".search-form-mobile").validate({
    rules: {
      search: {
        required: !0
      }
    }
  });
  $(".consultation__form").length && $(".consultation__form").validate({
    rules: {
      username: {
        required: !0
      },
      phone: {
        required: !0,
        minlength: 10
      }
    }
  })


  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();




  $(".catalog__filter-btn").click(function () {
    $(".catalog__filter, .catalog__filter-btn").toggleClass(
      "active"
    );
  });

  $(document).on("click", function (e) {
    if (
      $(e.target).closest(".catalog__filter-btn, .catalog__filter")
        .length == 0 &&
      $(".catalog__filter-btn, .catalog__filter").hasClass(
        "active"
      ) &&
      $(e.target).closest(".catalog__filter-btn, .catalog__filter")
        .length == 0
    ) {
      $(".catalog__filter-btn, .catalog__filter").toggleClass(
        "active"
      );
    }
  });



  $('[data-fancybox="certificates-gallery"]').fancybox({
    thumbs: {
      showOnStart: true
    },
    hash: true,
    clickOutside: "close",
  });

  $('[data-fancybox="reviews"]').fancybox({
    thumbs: {
      showOnStart: true
    },
    hash: true
  });

  // Init Slick
  if ($('.our-certificates__slider').length > 0) {
    $(".our-certificates__slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      arrows: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1
        }
      },
      ]
    });
  }

  if ($('.reviews__slider').length > 0) {
    $(".reviews__slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      arrows: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1
        }
      },
      ]
    });
  }
  if ($('.vacancies__slider').length > 0) {
    $(".vacancies__slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      arrows: false,
      //   responsive: [{
      //       breakpoint: 1110,
      //       settings: {
      //         arrows: true,
      //         slidesToShow: 4
      //       }
      //     },
      //     {
      //       breakpoint: 997,
      //       settings: {
      //         slidesToShow: 3
      //       }
      //     },
      //     {
      //       breakpoint: 768,
      //       settings: {
      //         slidesToShow: 2
      //       }
      //     },
      //     {
      //       breakpoint: 375,
      //       settings: {
      //         slidesToShow: 1
      //       }
      //     }
      //   ]
    });
  }



  $(".modal__order").length && $(".modal__order").validate({ rules: { username2: { required: !0 }, phonemodal2: { required: !0, minlength: 10 }, } });

  $("#phonemodal").length && $("#phonemodal").mask("+9(999) 999-9999");

  $(".modal__feedback").length && $(".modal__feedback").validate({ rules: { phonemodal1: { required: !0, minlength: 10 }, } });

  $("#phonemodal1").length && $("#phonemodal1").mask("+9(999) 999-9999");

  $(".modal__resume").length && $(".modal__resume").validate({
    rules: {
      username1: { required: !0 }, phonemodal2: { required: !0, minlength: 10 }, email: {
        regexpEmail: true,
        required: true,
        email: true
      },
    }
  });
  $.validator.addMethod("regexpEmail", function (value, element) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
  },);
  $("#phonemodal2").length && $("#phonemodal2").mask("+9(999) 999-9999");
});


Array.prototype.forEach.call(
  document.querySelectorAll(".file-upload__button"),
  function(button) {
    const hiddenInput = button.parentElement.querySelector(
      ".file-upload__input"
    );
    const label = button.parentElement.querySelector(".file-upload__label");
    const defaultLabelText = "No file(s) selected";

    // Set default text for label
    label.textContent = defaultLabelText;
    label.title = defaultLabelText;

    button.addEventListener("click", function() {
      hiddenInput.click();
    });

    hiddenInput.addEventListener("change", function() {
      const filenameList = Array.prototype.map.call(hiddenInput.files, function(
        file
      ) {
        return file.name;
      });

      label.textContent = filenameList.join(", ") || defaultLabelText;
      label.title = label.textContent;
    });
  }
);
