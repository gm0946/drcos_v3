/**
* 메인슬라이드 100 배너
* 제작 : 웹퍼블릭
* 버전 : 1.3.4
* 최종업데이트 : 2024.09.30

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(document).ready(function () {
    const swiper = new Swiper('.index_ban_100 .swiper-container', {
        spaceBetween: 10,
        speed: 800,
        centeredSlides: true,
        grabCursor: true,
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        loop: ($('.index_ban_100 .swiper-slide').length <= 1) ? false : true,
        autoplay: (WP_SETUP.메인페이지.메인슬라이드.자동재생.자동재생여부 == 'on') ? {
            delay: WP_SETUP.메인페이지.메인슬라이드.자동재생.대기시간,
            disableOnInteraction: (WP_SETUP.메인페이지.메인슬라이드.자동재생.인터렉션 == 'on') ? false : true,
        } : false,
        pagination: (WP_SETUP.메인페이지.메인슬라이드.페이지네이션.표시여부 == 'on') ? {
            clickable: true,
            el: '.index_ban_100 .swiper-pagination',
            type: WP_SETUP.메인페이지.메인슬라이드.페이지네이션.스타일,
        } : false,
        navigation: (WP_SETUP.메인페이지.메인슬라이드.화살표 == 'on') ? {
            nextEl: '.index_ban_100 .swiper-button-next',
            prevEl: '.index_ban_100 .swiper-button-prev',
        } : false,
        on: {
            init: function () {
                if (WP_SETUP.메인페이지.메인슬라이드.페이지네이션.표시여부 == 'off')
                    $('.index_ban_100 .swiper-pagination').remove();
                if (WP_SETUP.메인페이지.메인슬라이드.화살표 == 'off')
                    $('.index_ban_100 .swiper-button-prev').add('.index_ban_100 .swiper-button-next').remove();
                if ($('.index_ban_100 .swiper-slide').length <= 1)
                    $('.index_ban_100 .swiper-slide').addClass('wp-completely');
                $('.index_ban_100').closest('.wp-stand-by').removeClass('wp-stand-by');
            },
            slideChangeTransitionEnd: function () {
                $('.index_ban_100').find('.swiper-slide').removeClass('wp-completely');
                $('.index_ban_100').find('.swiper-slide-active').addClass('wp-completely');
            },
        },
    });
});