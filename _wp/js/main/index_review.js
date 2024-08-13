/**
* 메인 리뷰
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
    WP_CORE().util.replaceCodeToText('.index_board_review .section-title .title', '{#title}', WP_SETUP.메인페이지.리뷰.타이틀);
    WP_CORE().util.replaceCodeToText('.index_board_review .section-title .sub-title', '{#sub_title}', WP_SETUP.메인페이지.리뷰.서브타이틀);
    if (WP_SETUP.메인페이지.리뷰.표시여부 == 'on') {
        $('.index_board_review').removeClass('wp-stand-by');
    } else {
        $('.index_board_review').remove();
        return;
    }
});