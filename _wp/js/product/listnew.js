/**
* 제작 : 웹퍼블릭(http://webpublic.co.kr)
* 웹퍼블릭 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/

$(document).ready(function(){
    const swiper = new Swiper('.xans-product-listnew .swiper-container', {
        slidesPerView: 2.5, // 한 번에 보여지고 하는 슬라이드의 개수를 입력합니다. (기본값이 auto 일 경우 수정하지 않습니다.)
        spaceBetween: 15, // 슬라이드 간격 지정 (px)
        breakpoints: {
			540 : {
				slidesPerView: 2.8, // 한 번에 보여지고 하는 슬라이드의 개수를 입력합니다. (기본값이 auto 일 경우 수정하지 않습니다.)
				spaceBetween: 18, // 슬라이드 간격 지정 (px)
			},
			768 : {
				slidesPerView: 3.5, // 한 번에 보여지고 하는 슬라이드의 개수를 입력합니다. (기본값이 auto 일 경우 수정하지 않습니다.)
				spaceBetween: 18, // 슬라이드 간격 지정 (px)
			},
			1025 : {
				slidesPerView: 4.5, // 한 번에 보여지고 하는 슬라이드의 개수를 입력합니다. (기본값이 auto 일 경우 수정하지 않습니다.)
				spaceBetween: 18, // 슬라이드 간격 지정 (px)
			},
		},
        speed: 600, // 슬라이드 애니메이션 속도 (1000 = 1초)
        roundLengths :true,
        on: {
			init: function () {
				$(this.el).closest('.wp-stand-by').removeClass('wp-stand-by');
			},
        },
        scrollbar: {
            el: '.xans-product-listnew .swiper-scrollbar',
            hide: false,
            draggable :true,
        }
    });
});