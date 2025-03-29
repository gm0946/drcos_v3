/**
* 메인 - 메인슬라이드 영역
* 제작 : 웹퍼블릭
* 버전 : 2.0
* 최종업데이트 : 2024.10.12

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(document).ready(function () {
    const swiper = new Swiper('.index_ban_100 .swiper-container', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        spaceBetween: 0,
        speed: 800,
        grabCursor: true,
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        loop: ($('.index_ban_100 .swiper-slide').length <= 1) ? false : true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            clickable: true,
            el: '.index_ban_100 .swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.index_ban_100 .swiper-button-next',
            prevEl: '.index_ban_100 .swiper-button-prev',
        },
        on: {
            init: function () {
                if ($('.index_ban_100 .swiper-slide').length <= 1)
                    $('.index_ban_100 .swiper-slide').addClass('wp-completely');
            },
            slideChangeTransitionStart: function () {
                $('.index_ban_100').find('.swiper-slide').removeClass('wp-completely').promise().done(function () {
                    $('.index_ban_100').find('.swiper-slide-active').addClass('wp-completely');
                });
            },
            touchEnd: function () {
                if (!$('.index_ban_100').find('.swiper-slide-active').hasClass('wp-completely')) {
                    setTimeout(function () {
                        $('.index_ban_100').find('.swiper-slide-active').addClass('wp-completely');
                    }, 0);
                }
            },
        },
    });
});