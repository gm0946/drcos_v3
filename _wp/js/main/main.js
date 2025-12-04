/**
* 메인페이지 전용 스크립트
* 제작 : 웹퍼블릭
* 버전 : 2.0
* 최종업데이트 : 2024.10.12

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(function () {
    WP_CORE({ page: 'main' });

    // 샘플몰 전용코드 V.2.0 으로 변경되면서 위치 이동
    if (location.href.includes('ecudemo')) {
        if (WP_CORE().util.getParamUrl('type')
            && WP_CORE().util.getParamUrl('type') == 'b') {
            $('.index_ban_100.type_b').removeClass('displaynone');
        } else {
            $('.index_ban_100.type_a').removeClass('displaynone');
        }

        // 모바일에서 팝업 숨김 처리
        if ($('div[id^="popup_"] iframe').length > 0) {
            let timer = null;
            const mobileHidePopup = function(mq){
                if (mq.matches) {
                    $('div[id^="popup_"]').addClass('displaynone');
                } else {
                    $('div[id^="popup_"]').removeClass('displaynone').addClass('wp-stand-by');
                    $('div[id^="popup_"] iframe')[0].contentWindow.location.reload();
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        $('div[id^="popup_"]').removeClass('wp-stand-by');
                    },400);
                }
            }
            const mq = window.matchMedia('(max-width: 1024px)');
            addClassByBrowserMode(mq);
            mq.addEventListener('change', function () {
                mobileHidePopup(mq);
            });
            mobileHidePopup(mq);
        }
    }else{
        $('.index_ban_100').removeClass('displaynone');
    }
});