/**
* 라인업 제품 (상품진열)
* 제작 : 웹퍼블릭
* 버전 : 1.0
* 최종업데이트 : 2024.06.26

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(document).ready(function () {
    if (WP_SETUP.메인페이지.라인업제품.표시여부 == 'off') {
        $('.index_prd_500').remove();
        return;
    }

    WP_CORE().util.replaceCodeToText('.index_prd_500 .section-title .title', '{#title}', WP_SETUP.메인페이지.라인업제품.타이틀);
    WP_CORE().util.replaceCodeToText('.index_prd_500 .section-title .sub-title', '{#sub_title}', WP_SETUP.메인페이지.라인업제품.서브타이틀);

    const swiper_tabs = new Swiper('.index_prd_500 .swiper-container', {
        on: {
            init: function () {
                var self = this;
                setTimeout(function () {
                    $(self.el).closest('.wp-stand-by').removeClass('wp-stand-by');
                }, 500);
            },
        },
        slidesPerView: WP_SETUP.메인페이지.라인업제품.진열개수.M,
        spaceBetween: 10,
        loop: false,
        observer: true,
        observeParents: true,
        scrollbar: {
            el: '.index_prd_500 .swiper-scrollbar',
            hide: false,
            draggable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: WP_SETUP.메인페이지.라인업제품.진열개수.TABLET,
                spaceBetween: 15,
            },
            1025: {
                slidesPerView: WP_SETUP.메인페이지.라인업제품.진열개수.PC,
                spaceBetween: 18,
            },
        },
    });
});