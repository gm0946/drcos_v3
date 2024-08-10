/**
* detail_product_image.js (nancy228 전용)
* 제작 : 웹퍼블릭
* 버전 : 1.1.1
* 최종업데이트 : 2024.07.19
* 업데이트 내용 : 축소이미지를 사용하지 않는 상품이 있어 빈썸네일은 삭제처리 되도록 수정

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(function () {
    // add image zoom
    const addImageZoom = function (target) {
        destroyImageZoom(target);
        if ($('#zoom_image').length <= 0
            || $('#zoom_wrap > p').length <= 0
            || $(window).width() < 1024) {
            return;
        }
        const zoom_options = {
            zoomType: "window",
            easing: false,
            borderSize: 1,
            scrollZoom: 0,
            zoomLevel: 1,
            zoomWindowWidth: 600,
            zoomWindowHeight: 600,
            zoomWindowOffetx: 110,
            borderSize: 1,
            borderColour: '#eeeeee',
            lensBorderColour: '#aaaaaa',
        }
        $(target).elevateZoom(zoom_options);
    }

    // destory image zoom
    function destroyImageZoom(target) {
        $(target).each(function () {
            if ($(this).data('elevateZoom')) {
                $.removeData($(this), 'elevateZoom');
                $('.zoomContainer').remove();
            }
        });
    }

    // 첫 이미지가 빈 썸네일일 경우 삭제
    if ($('.prdImg .swiper-slide:eq(0) img').attr('src').toLowerCase().includes('img_product_small.gif')) {
    	$('.prdImg .swiper-slide:eq(0)').remove();
        $('.listImg .swiper-slide:eq(0)').remove();
    }
    
    // big image slide
    const thumb_img_swiper = new Swiper('.prdImg .swiper-container', {
        on: {
            init: function () {
                $('.prdImg .swiper-slide:eq(0)').addClass('selected');
                $('.prdImg .swiper-container').append($('.detailArea .likeButton'));
                let first_img_height = $('.prdImg .swiper-slide:eq(0) .ThumbImage').height();
                $('.listImg .swiper-container').css('min-height', first_img_height);

                const target_node = document.querySelector("html");
                const config = { attributes: true };
                const callback = (mutationList, observer) => {
                    for (const mutation of mutationList) {
                        if (mutation.type === "attributes") {
                            if ($(mutation.target).hasClass('loaded')) {
                                addImageZoom('.prdImg .swiper-slide img:eq(0)');
                            }
                        }
                    }
                };
                const observer = new MutationObserver(callback);
                observer.observe(target_node, config);
            },
            slideChangeTransitionEnd: function () {
                $('.zoomContainer').remove();
                addImageZoom('.prdImg .swiper-slide.swiper-slide-active img');
            },
            slideChangeTransitionStart: function () {
                add_img_swiper.slideTo(this.activeIndex);
                $(`.listImg .swiper-slide:eq(${this.activeIndex})`).addClass('selected').siblings().removeClass('selected');
            },
            resize: function () {
                ($(window).width() > 1024) ?
                    addImageZoom('.prdImg .swiper-slide.swiper-slide-active img')
                    : destroyImageZoom('.prdImg .swiper-slide img');
            }
        },
        slidesPerView: 1,
        autoHeight: true,
        spaceBetween: 0,
        loop: false,
        roundLengths: true,
        navigation: {
            nextEl: '.prdImg .swiper-button-next',
            prevEl: '.prdImg .swiper-button-prev',
        },
        pagination: {
            el: '.prdImg .swiper-pagination',
            clickable: true,
            type: 'fraction',
        },
    });


    // small image slide
    const add_img_swiper = new Swiper('.listImg .swiper-container', {
        on: {
            init: function () {
                $('.listImg .swiper-slide:eq(0)').addClass('selected');
            }
        },
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 4,
        loop: false,
        roundLengths: true,
        setWrapperSize: true
    });

    $(document).on('click', '.listImg .swiper-slide', function () {
        var index = $(this).index();
        $(this).addClass('selected').siblings().removeClass('selected');
        thumb_img_swiper.slideTo(index);
        add_img_swiper.slideTo(index);
    });

    const resizeListImg = function () {
        $('.listImg .swiper-container').css({
            'height': $('.prdImg .swiper-wrapper').css('height'),
            'minHeight': 'auto',
        });
    }
    let observer = new MutationObserver(function (mutations) {
        resizeListImg();
    });
    let config = { attributes: true };
    observer.observe(document.querySelector('.prdImg .swiper-wrapper'), config);

    resizeListImg();
});