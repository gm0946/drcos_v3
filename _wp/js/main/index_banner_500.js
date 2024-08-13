/**
* 메인 500 배너
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
    const swiper = new Swiper('.index_ban_500 .swiper-container', {
        slidesPerView: 1.2,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        loop: false,
        on: {
            init: function () {
                $(this.el).closest('.wp-stand-by').removeClass('wp-stand-by');
            },
        },
        pagination: {
            el: '.index_ban_500 .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.index_ban_500 .swiper-button-next',
            prevEl: '.index_ban_500 .swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2.2,
                spaceBetween: 15,
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 18,
            }
        }
    });
});