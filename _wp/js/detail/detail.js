/**
* detail.js
* 제작 : 웹퍼블릭
* 버전 : 2.2
* 최종업데이트 : 2025.03.07

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(function () {
    WP_CORE({
        page: 'detail',
        free_shopping: {
            msg: {
                fail: `
                <div class="fail">
                        <span class="frsp--msg1">{#shortfall_price}원</span>
                    더 담으면 <span class="frsp--msg2 delivery_fee">무료배송!</span>
                </div>`,
                success: `
                <div class="success">
                    <span class="frsp--msg1">😄 무료배송</span>
                    <span class="frsp--msg2 delivery_fee">{#delivery_fee}원</span>을 절약했어요.
                </div>`,
            }
        }
    });

    // 네이버페이 또는 카카오페이 활성화 시 클래스 추가
    if ($('#NaverChk_Button').text().trim().length > 0 || $('#appPaymentButtonBox').text().trim().length > 0) {
        $('.naver-kakao-pay').addClass('active');
    }

    // 재입고 알림 신청
    $(document).on('click', '#btn_restock', function (e) {
        e.preventDefault();
        let params = 'product_no=' + WP_CORE().util.getProdNo();
        if ($('#frm_image_zoom').serialize().length > 0) {
            params = $('#frm_image_zoom').serialize();
        }
        window.open('/product/sms_restock_layer.html?' + params, 'sms_restock', 'width=459,height=490,left=100,top=100,resizable=no');
    });

    // 쿠폰 모달 활성화
    $(document).on('click', '.prod_coupon a', function (e) {
        e.preventDefault();
        $("#couponModalContainer").modal({ fadeDuration: 300, fadeDelay: 1.2, top: 50 });
    });

    // 쿠폰 버튼 활성화
    if ($('#couponModalContainer .coupon_list li').length > 0)
        $('.productArea .prod_coupon').removeClass('displaynone');

    // 리뷰 별점 클릭 시 탭 > 리뷰, no-swiper 리뷰 버튼 트리거
    $('.grp_review a[href="#prdReview"]').add('.photo_review_widget.no-swiper').on('click', function (e) {
        e.preventDefault();
        $('.ec-base-tab .menu-inner a[href="#prdReview"]').trigger('click');
    });

    // 추가구성상품 펼쳐보기
    $(document).on('click', '#optionG .add-opt-expand', function () {
        $('#optionG .productSet').addClass('active');
        $(this).remove();
    });

    // 추가구성상품 토글
    $('.additional .btn-toggle').click(function () {
        $(this).toggleClass('active');
        $('.add-opt-expand').toggleClass('displaynone');
        $('.additional .product').toggle();
    });

    // 이벤트 내용 없을 경우 영역 삭제
    $('.eventArea').each(function(){
        if($(this).find('.event').is(':empty')){
            $(this).addClass('displaynone');
        }
    });

    const scrollOptionFixed = function (target) {
        if (!target) target = document;
        if (($('.detailArea').offset().top + $('.detailArea').height()) < $(target).scrollTop()) {
            if (!$('#optionG').hasClass('active')) {
                $('.infoArea').css('height', $('.infoArea').height());
                $('#optionG').addClass('active');
                $('#detailTab .remaining-quantity').addClass('fixed-menu');
                if ($('.infoArea .productSet').length > 0) {
                    $('.wp-opt-box .opt-left').append($('.infoArea .productSet'));
                }
                $('.naver-kakao-pay').appendTo($('.wp-opt-area'));
                $('.wp-opt-area').hide();
            }
        } else {
            if ($('#optionG').hasClass('active')) {
                $('.wp-opt-area').show();
                $('.infoArea').css('height', 'auto');
                $('#optionG').removeClass('active extend');
                $('#detailTab .remaining-quantity').removeClass('fixed-menu');
                if ($('.infoArea .productSet').length > 0) {
                    $('.wp-opt-box .opt-left').after($('.infoArea .productSet'));
                }
                $('.naver-kakao-pay').appendTo($('.wp-opt-box3 .productAction'));
            }
        }
    }
    
    scrollOptionFixed();
    $(window).scroll(function () {
        scrollOptionFixed(this);
    });
    
    let resize_timer;
    $(window).resize(function () {
        scrollOptionFixed();
        clearTimeout(resize_timer);
        resize_timer = setTimeout(function () {
            const html = $('html');
            const optionG_active = $('#optionG.active');

            if (html.hasClass('res-pc') && optionG_active.hasClass('extend')) {
                html.removeClass('scroll--hide');
            }

            if (html.hasClass('res-mobile') && optionG_active.hasClass('extend')) {
                html.addClass('scroll--hide');
            }
        }, 200);
    });

    // 모바일 배경 토글
    $(document).on('click', '.res-mobile #optionG.active.extend', function (e) {
        if ($(e.target).is(this)) {
            $('#optionG .btn-extend').trigger('click');
        }
    });

    let origin_name, prodset_once_toggle = false;
    const is_review_class = 'is-review',
          review_text = '리뷰',
          toggle_text = '제품상세',
          cart_text = '장바구니';
  	
    $('#optionG .btn-extend').on('click', function(e){
        e.preventDefault();
        // 하단 고정 `구매하기` 클릭 시 추가구성상품 창이 접힌상태로 노출됨
        if ($('.res-mobile #optionG').hasClass('active') && prodset_once_toggle == false) {
        	prodset_once_toggle = true;
            $('.productSet .btn-toggle.active').removeClass('active');
            $('.productSet .product').hide();
            $('.productSet .add-opt-expand').addClass('displaynone');
        }
        $('#optionG.active').toggleClass('extend');
        $('html').hasClass('scroll--hide') ? $('html').removeClass('scroll--hide') : $('html').addClass('scroll--hide');
        $('#optionG.active .wp-opt-area').slideToggle(200);
        
        // 옵션 창이 확장되어 있을 경우 텍스트 전환
        if ($('#optionG.active').hasClass('extend')){
            origin_name = $('.actionCartAndReview p').text();
            $('#optionG .wp-opt-box3').removeClass(is_review_class);
            $('.actionCartAndReview p').text(cart_text);
        }else{
            if (origin_name == review_text) $('#optionG .wp-opt-box3').addClass(is_review_class);
        	$('.actionCartAndReview p').text(origin_name);
        }
    });

    // 상품명
    const prod_name = $('#wpDetailInfo .product_name_css td > span').text();

    // 구매하기 - 하단고정 - 옵션확장
    $('.wp-opt-box2').append(`<div id="prodName">${prod_name}</div>`);

    // 구매 / 장바구니 클릭 시 옵션창 오픈
    $('.actionCart, .action-buy, .actionCartAndReview').click(function(e){
        e.preventDefault();
        
        // 옵션 창이 확장 되어 있지 않다면
        if(!$('#optionG .wp-opt-area').is(':visible')) {
            
            // 리뷰 버튼 클릭 시
            if ($(this).hasClass('actionCartAndReview')) {
                if ($(this).find('p').text() == review_text){
                    $('#optionG .wp-opt-box3').removeClass(is_review_class);
                    $('.actionCartAndReview p').text(toggle_text);
                    $('#detailTab [href="#prdReview"]').trigger('click');
                }else{
                    $('#optionG .wp-opt-box3').addClass(is_review_class);
                    $('.actionCartAndReview p').text(review_text);
                    $('#detailTab [href="#prdDetail"]').trigger('click');
                }
                return;
            }
            $('#optionG.active .btn-extend').trigger('click'); // 창 확장
        }else{
            let action_func = $(this).data('action');
            eval(action_func);
        }
    });
});