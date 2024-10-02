/**
* 메인 - 요즘 주목받는 제품
* 제작 : 웹퍼블릭
* 버전 : 2.0
* 최종업데이트 : 2024.10.02
* 웹퍼블릭에서 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/
$(document).ready(function(){
    if (WP_SETUP.메인페이지.랭킹.표시여부 == `off`) {
        $('.v-ranking').remove();
        return;
    }
    prodRanking.init({
        AUTO_SLIDE_INTERVAL : 3000,
        RANKING_CUT_SIZE : 5,
    });
});

const prodRanking = (function(){
    const def = {
        AUTO_SLIDE_INTERVAL : 3000,
        RANKING_CUT_SIZE : 5,
    }

    const init = (options) => {
        $.extend(def, options);
        var rankingSize = $('.ranking-list .pagination .prod-name').length;
        var sliceCount = Math.ceil(rankingSize / def.RANKING_CUT_SIZE);

        var prodSwiper = new Swiper('.ranking-list .prod .swiper-container', {
            speed : 600,
            loop: true,
            spaceBetween: 10,
            slidesPerView: 1,
            breakpoints: {
                1025 : {
					direction: 'vertical',
                }
            },
            on: {
                init: function () {
                    (WP_SETUP.메인페이지.랭킹.타이틀) ? $('.v-ranking .title').text(WP_SETUP.메인페이지.랭킹.타이틀) : $('.v-ranking .title').remove();
                    (WP_SETUP.메인페이지.랭킹.서브타이틀) ? $('.v-ranking .sub-title').text(WP_SETUP.메인페이지.랭킹.서브타이틀) : $('.v-ranking .sub-title').remove();
                    $(this.el).closest('.wp-stand-by').removeClass('wp-stand-by');
                    $('.ranking-list .pagination .prod-name:eq(0)').addClass('active');
                }
            },
        });

        new Promise(function (resolve, reject) {
            for (var i = 0; i < sliceCount; i++) {
                $('.ranking-list .pagination .prod-name').slice(def.RANKING_CUT_SIZE * (i * 1), def.RANKING_CUT_SIZE * (i + 1)).wrapAll('<div class="swiper-slide"></div>');
                resolve();
            }
        }).then(function (result) {
            $('.ranking-list .pagination .prod-name').each(function (index) {
                $(this).attr('slide-no', index);
                $(this).children('span').attr('data-idx', (index + 1));
            });

            const updateActiveSlide = function (target) {
                $('.ranking-list .pagination .prod-name.active').removeClass('active');
                $(target).addClass('active');

                var slideNo = $(target).attr('slide-no');
                slideNo = parseInt(slideNo);
                prodSwiper.slideTo((slideNo + 1));

                clearInterval(pnTimer);
                pageLoop();
            };

            var pnSwiper = new Swiper('.ranking-list .pagination .swiper-container', {
                loop: false,
                breakpoints: {
                    1025 : {
                        direction: 'vertical',
                    }
                },
                on: {
                    init: function () {
                        $(this.el).closest('.wp-stand-by').removeClass('wp-stand-by');
                        $('.ranking-list .pagination .prod-name:eq(0)').addClass('active');
                    },
                    slideChangeTransitionStart: function () {
                        updateActiveSlide('.ranking-list .pagination .swiper-slide-active .prod-name:eq(0)');
                    }
                },
                slidesPerView: 'auto',
            });

            $(document).on('click', '.ranking-list .pagination .prod-name', function () {
                updateActiveSlide(this);
            });

            prodSwiper.on('slideChange', function () {
                $('.ranking-list .pagination .prod-name.active').removeClass('active');
                $('.ranking-list .pagination .prod-name[slide-no=' + (this.realIndex) + ']').addClass('active');

                var currentPage = Math.floor(this.realIndex / def.RANKING_CUT_SIZE);

                if (currentPage != pnSwiper.realIndex) {
                    pnSwiper.slideTo(currentPage);
                }

                clearInterval(pnTimer);
                pageLoop();
            });

            var pnTimer;
            var pageLoop = function () {
                pnTimer = setInterval(function () {
                    var slideNo = $('.ranking-list .pagination .prod-name.active').attr('slide-no');
                    slideNo = parseInt(slideNo) + 1;
                    $('.ranking-list .pagination .prod-name.active').removeClass('active');

                    // 마지막 위치일 경우 0으로 초기화 첫페이지로 이동
                    if ($('.ranking-list .pagination .prod-name[slide-no=' + slideNo + ']').length == 0) {
                        slideNo = 0;
                        pnSwiper.slideTo(slideNo);
                    }

                    $('.ranking-list .pagination .prod-name[slide-no=' + slideNo + ']').addClass('active');
                    prodSwiper.slideTo(slideNo + 1);

                    $(this).addClass('active');
                }, def.AUTO_SLIDE_INTERVAL);
            };

            pageLoop();
        });
    }
    return {
		init : function(options){
			init(options);
		}
	}
})();
