/**
* 브랜드 > 하위 게시판 타이틀 메뉴 출력
*/

$(function(){
    let board_no;
    if (iBoardNo){
        board_no = iBoardNo;
    }else{
        if (getParamUrl('board_no')){
            board_no = getParamUrl('board_no');
        }else{
            if (location.pathname.indexOf('board') > -1) {
                board_no = location.pathname.substring(location.pathname.indexOf('board'), location.pathname.length).split('/')[2];
            }
        }
    }

	board_no = parseInt(board_no, 10);
	$('.board--menu > li a').each(function(){
		if(board_no == getParamUrl('board_no', $(this).attr('href'))){
			$(this).addClass('active');
			return false;
		}
	});

});