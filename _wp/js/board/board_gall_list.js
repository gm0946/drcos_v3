$(function () {
    var boardNo = getParamUrl('board_no');
    var boardCateNo = getParamUrl('category_no');

    if (!boardNo) {
        if (location.pathname.indexOf('board') > -1) {
            if (location.pathname.substring(location.pathname.indexOf('board'), location.pathname.length).split('/').length > 0) {
                boardNo = location.pathname.substring(location.pathname.indexOf('board'), location.pathname.length).split('/')[2];
            }
        }

        if (location.pathname.indexOf('article') > -1) {
            if (location.pathname.substring(location.pathname.indexOf('article'), location.pathname.length).split('/').length > 0) {
                boardNo = location.pathname.substring(location.pathname.indexOf('article'), location.pathname.length).split('/')[2];
            }
        }
    }

    if (boardNo == 8) {

        // 이벤트 기간
        $('.boardList .subject').each(function(){
            if ($(this).find('p').length > 0)
                $(this).after($(this).find('p').addClass('event-period'));
        });

        let li = '';
        if ($('#board_category option').length <= 0) return;
        $('#board_category option').each(function (i, el) {
            let filename_tail = '';
            if ($(this).text().trim().includes('당첨자 발표')) {
                filename_tail = '2'; // 리스트로 이동
            }
            li += `<li><a href="/board/gallery/list${filename_tail}.html?board_no=8&category_no=${$(this).val()}">${$(this).text()}</a></li>`;
        });
        $('.ev-board-tab').append(`<ul>${li}</ul>`).removeClass('displaynone');
        (boardCateNo) ? $('.ev-board-tab li:eq(' + boardCateNo + ')').addClass('selected') : $('.ev-board-tab li:eq(0)').addClass('selected');
    } else {
        // 일반 게시판은 옵션 선택이 기본 스타일로 노출
        $('.boardSort').removeClass('displaynone');
        $('.ev-board-tab').remove();
    }
});