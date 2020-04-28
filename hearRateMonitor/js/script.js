// window.addEventListener('DOMContentLoaded', () => {
//     const menu = document.querySelector('.menu'),
//     menuItem = document.querySelectorAll('.menu_item'),
//     hamburger = document.querySelector('.hamburger');

//     hamburger.addEventListener('click', () => {
//         hamburger.classList.toggle('hamburger_active');
//         menu.classList.toggle('menu_active');
//     });

//     menuItem.forEach(item => {
//         item.addEventListener('click', () => {
//             hamburger.classList.toggle('hamburger_active');
//             menu.classList.toggle('menu_active');
//         })
//     })
// })

$(document).ready(function(){
    $('.carousel__inner').slick({
        prevArrow:'<img class="slick-prev" src="icons/left.png" >',
        nextArrow:'<img class="slick-next" src="icons/right.png" >',
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true       
    });

    $(function() {
        
        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__items').removeClass('catalog__items_active').eq($(this).index()).addClass('catalog__items_active');
        });
        
    });


    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__details').eq(i).toggleClass('catalog-item__details_active');
            })
        });
    
    };
    toggleSlide('.catalog-item__more');
    toggleSlide('.catalog-item__back');

    $('[data-modal=orderConsult]').on('click', function(){
        $('.overlay, #consult').fadeIn();

    });

    $('.modal__close').on('click', function() {
        $('.overlay, .modal').fadeOut();

    });

    $('.button_small').each(function(i) {
        $(this).on('click', function () {
            $('#order .modal__subtitle').text($('.catalog-item__title').eq(i).text())
            $('.overlay, #order').fadeIn();
        });
    });

$('form').each(function(i){
    $(this).validate({
        rules: {
          name: "required",
          phone : {
            required: true,
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
            name: "Please specify your name",
            email: {
              required: "We need your email address to contact you",
              email: "Your email address must be in the format of name@domain.com"
            }
          }
      });

});
$('input[name=phone]').mask("+7 (999) 999-99-99")

$('form').submit(function (e) {
    e.preventDefault();
    $.ajax( {
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function(){
        $(this).find("input").val("");
        $('#consult, #order').fadeOut();
        $('.overlay, #thanks').fadeIn();
        $('form').trigger('reset');
    })
    return false
})
// scroll up smothly 
$(window).scroll(function () {
    if ($(this).scrollTop() > 1000) {
        $('.uplink').fadeIn()

    } else {
        $('.uplink').fadeOut()

    }
});

$("a[href=#up]").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

});