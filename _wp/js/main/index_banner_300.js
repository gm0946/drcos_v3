/**
* 메인 300 배너
* 제작 : 웹퍼블릭
* 버전 : 1.0
* 최종업데이트 : 2024.07.14

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(document).ready(function () {
    const swiper = new Swiper('.index_ban_300 .swiper-container', {
        effect: WP_SETUP.메인페이지.띠배너_1X1.이펙트,
        fadeEffect: {
            crossFade: true
        },
        slidesPerView: 1,
        loop: true,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        speed: 500,
        autoplay: (WP_SETUP.메인페이지.띠배너_1X1.자동재생.자동재생여부 == 'on') ? {
            delay: WP_SETUP.메인페이지.띠배너_1X1.자동재생.대기시간,
            disableOnInteraction: (WP_SETUP.메인페이지.띠배너_1X1.자동재생.인터렉션 == 'on') ? false : true,
        } : false,
        on: {
            init: function () {
                $('.index_ban_300').closest('.wp-stand-by').removeClass('wp-stand-by');
            },
            slideChangeTransitionStart: function () {
                $('.index_ban_300').find('.swiper-slide').removeClass('selected').promise().done(function () {
                    $('.index_ban_300').find('.swiper-slide-active').addClass('selected');
                });
            },
            touchEnd: function () {
                if (!$('.index_ban_300').find('.swiper-slide-active').hasClass('selected')) {
                    setTimeout(function () {
                        $('.index_ban_300').find('.swiper-slide-active').addClass('selected');
                    }, 0);
                }
            },
        },
        pagination: {
            el: '.index_ban_300 .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.index_ban_300 .swiper-button-next',
            prevEl: '.index_ban_300 .swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            1025: {
                slidesPerView: 1,
                spaceBetween: 18,
            }
        }
    });
});