/**
* detail_product_image.js
* 제작 : 웹퍼블릭
* 버전 : 3.0 (축소이미지 - 가로형)
* 최종업데이트 : 2024.01.13

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
        const img_natural_width = $(target).prop('naturalWidth');
        const img_natural_height = $(target).prop('naturalHeight');
        const zoom_options = {
            zoomType: "window",
            easing: false,
            scrollZoom: 0,
            zoomLevel: 1,
            zoomWindowWidth: (img_natural_width <= 550) ? img_natural_width : 550,
            zoomWindowHeight: (img_natural_height <= 550) ? img_natural_height : 550,
            zoomWindowOffetx: 10,
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
    
    // badge move
    $('.prdImg .swiper-container').append($('.detailArea .prod-badge'));

    // 대표이미지 경로 (해당 이미지만 경로가 다름)
    var big_img = $('.bigImage').data('src'); 
    
    // 첫번째 이미지 대표이미지 주소로 대체 
    $('.prdImg .swiper-container .swiper-slide:eq(0) .ThumbImage').attr('src', big_img);
    $('.prdImg .swiper-container .swiper-slide .ThumbImage').each(function(){
    	var origin_src = $(this).attr('src');
        $(this).attr('src', origin_src.replace('/product/extra/small/', '/product/extra/big/'));
    });

    // big image slide
    const thumb_img_swiper = new Swiper('.prdImg .swiper-container', {
        on: {
            init: function () {
                $('.prdImg .swiper-slide:eq(0)').addClass('selected');
                $('.prdImg .swiper-container').append($('.detailArea .likeButton'));
                $(this.el).closest('.wp-stand-by').removeClass('wp-stand-by');

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
        spaceBetween: 10,
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
        slidesPerView: 'auto',
        spaceBetween: 4,
        loop: false,
        roundLengths: true,
        setWrapperSize: true
    });

    // 옵션에 미리보기 이미지가 있을 경우 이미지도 같이 활성화 처리 (v1.2)
    $('#optionG li[link_image]:not([link_image=""]').on('click', function () {
        const link_image = $(this).attr('link_image');
        if (link_image.length > 0) {
            $('.detailArea .listImg .ThumbImage').each(function (index, v) {
                const src = $(this).attr('src');
                if (src.split('/').pop() == link_image.split('/').pop()) {
                    thumb_img_swiper.slideTo(index, 0);
                    return false;
                }
            });
        }
    });

    $(document).on('click', '.listImg .swiper-slide', function () {
        var index = $(this).index();
        $(this).addClass('selected').siblings().removeClass('selected');
        thumb_img_swiper.slideTo(index, 0);
    });
    
    setDefaultImage('.ThumbImage');
});