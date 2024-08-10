$(document).ready(function () {
	var board_no = getParamUrl('category_no');
	$('#board_category option').each(function () {
		var isSelected = '';
		if ($(this).val() == board_no) {
			isSelected = 'selected';
		}
		$('#cateList').append('<li class="' + isSelected + '"><a href="/board/faq/list.html?board_no=3&category_no=' + $(this).val() + '">' + $(this).text() + '</a></li>');
	});
	if ($('#cateList li.selected').length <= 0) $('#cateList li:eq(0)').addClass('selected');
});

// 카테고리 토글
$('.xans-board-list .link').click(function (e) {
	e.preventDefault();
	var $this = $(this).closest('.item');
	$('.xans-board-list .item').not($this).find('.content').slideUp('fast', function () {
		$('.xans-board-list .item').not($this).removeClass('active');
	});

	$this.toggleClass('active');
	$this.find('.content').slideToggle('fast');
});