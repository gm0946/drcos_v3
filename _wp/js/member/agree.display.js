$(document).ready(function(){
	// 전체동의 설명 토글
	$('.agreeArea').each(function(){
		var $this = $(this);
		$(this).find('.more').click(function(e){
			e.preventDefault();
			$($this).toggleClass('selected');
		});
	});
});