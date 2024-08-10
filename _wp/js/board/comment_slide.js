$(document).ready(function(){
    // 댓글 슬라이드 컨테이너 영역 추가
    $('#container .boardComment').after('<div class="attach-image-slide displaynone"></div>');

    // 댓글 슬라이드 닫기
    $(document).on('click', '.attach-image-slide .commentimagelist-close', function(){
        $('.attach-image-slide').addClass('displaynone');
        $('.attach-image-slide').empty();
    });

    // 슬라이드 생성
    $(document).on('click', '.xans-board-commentimagelist img', function(){
        let eq = $(this).closest('li').index();
        let clone = $(this).closest('ul').clone();
        clone.find('li').addClass('swiper-slide');
        clone.find('img').attr('style','');
        clone.addClass('swiper-wrapper');
        let swiper_html = $('<div class="swiper-container"></div>').append(clone);
        swiper_html.append('<div class="swiper-pagination"></div>\n<div class="swiper-button-prev"></div>\n<div class="swiper-button-next"></div>\n<div class="commentimagelist-close"></div>');
        $('.attach-image-slide').empty().append(swiper_html);

        const swiper = new Swiper('.attach-image-slide .swiper-container', {
            slidesPerView: 1,
            loop : true,
            spaceBetween: 0, 
            speed: 600, 
            grabCursor: true,
            pagination: {
                el: '.attach-image-slide .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.attach-image-slide .swiper-button-next',
                prevEl: '.attach-image-slide .swiper-button-prev',
            },
            on: {
                init: function () {
                    this.slideTo(eq + 1);
                    $('.attach-image-slide').removeClass('displaynone');
                },
                slideChange : function(){
                	console.log($(this.$el).find('.swiper-slide-active').length);
                }
            },
        });
    });
});
