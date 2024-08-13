/**
* 타임특가 (상품진열)
* 제작 : 웹퍼블릭
* 버전 : 1.2
* 최종업데이트 : 2024.08.04

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(document).ready(function () {

    WP_CORE().util.replaceCodeToText('.index_prd_400 .section-title .title', '{#title}', WP_SETUP.메인페이지.타임특가.타이틀);
    WP_CORE().util.replaceCodeToText('.index_prd_400 .section-title .sub-title', '{#sub_title}', WP_SETUP.메인페이지.타임특가.서브타이틀);

    if (WP_SETUP.메인페이지.타임특가.표시여부 == 'off') {
        $('.index_prd_400').remove();
        return;
    }

    if (WP_SETUP.메인페이지.타임특가.시계아이콘 == 'on') {
        $('.index_prd_400 .ico_time').removeClass('displaynone');
    }

    const slides = $('.index_prd_400 .swiper-slide');
    const swiper = new Swiper('.index_prd_400 .swiper-container', {
        on: {
            init: function () {
                $('.index_prd_400 .section-title').append($(this.$el).find('h3').removeClass('displaynone'));
                var self = this;
                $(self.el).closest('.wp-stand-by').removeClass('wp-stand-by');
            },
        },
        slidesPerView: WP_SETUP.메인페이지.타임특가.진열개수.M,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        speed: 500,
        loop: slides.length > WP_SETUP.메인페이지.타임특가.진열개수.M,
        freeMode: true,
        autoplay: (WP_SETUP.메인페이지.타임특가.자동재생.자동재생여부 == 'on') ? {
            delay: WP_SETUP.메인페이지.타임특가.자동재생.대기시간,
            disableOnInteraction: (WP_SETUP.메인페이지.타임특가.자동재생.인터렉션 == 'on') ? false : true,
        } : false,
        pagination: {
            el: '.index_prd_400 .swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.index_prd_400 .swiper-button-next',
            prevEl: '.index_prd_400 .swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: WP_SETUP.메인페이지.타임특가.진열개수.TABLET,
                spaceBetween: 15,
                loop: slides.length > WP_SETUP.메인페이지.타임특가.진열개수.TABLET,
            },
            1025: {
                slidesPerView: WP_SETUP.메인페이지.타임특가.진열개수.PC,
                spaceBetween: 18,
                freeMode: false,
                loop: slides.length > WP_SETUP.메인페이지.타임특가.진열개수.PC
            },
        },
    });
});