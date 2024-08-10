/**
* 제작 : 웹퍼블릭(http://webpublic.co.kr)
* 웹퍼블릭 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/

$(document).ready(function(){
    const swiper = new Swiper('.review_list_grp .ec-base-table.fixed .swiper-container', {
        slidesPerView: 1.6,
        spaceBetween: 10,
        speed: 600,
        roundLengths :true,
        on: {
			init: function () {
				$(this.el).closest('.wp-stand-by').removeClass('wp-stand-by');
			},
        },
        scrollbar: {
            el: '.review_list_grp .ec-base-table.fixed .swiper-scrollbar',
            hide: false,
            draggable :true,
        },
		autoplay: {
             delay: 2500,
             disableOnInteraction: false,
        },
		navigation: {
            nextEl: '.review_list_grp .ec-base-table.fixed .swiper-button-next',
            prevEl: '.review_list_grp .ec-base-table.fixed .swiper-button-prev',
        },
		breakpoints: {
			640 : {
				slidesPerView: 2.8,
			},
			1025 : {
				slidesPerView: 4,
				spaceBetween: 14,
			},
		},
    });
});