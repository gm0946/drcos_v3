$(document).ready(function(){

	if (getParamUrl('status') == 'complete' && document.referrer.length > 0){
		alert('문의가 정상적으로 접수되었습니다.\n담당자가 최대한 빠른 연락 드리도록 하겠습니다.');
		location.href = '/index.html';
	}

	// 상담요청 버튼
	$('#wpFormWrite').click(function(e){
		e.preventDefault();

		var f = new FormUtil(document.getElementById('boardWriteForm'));

		if (f.success()){

            $('#wpFormWrap').find('select').each(function(){
                $(this).children('option:selected').addClass('selected');
            });

			var formClone = $('#wpFormWrap').clone();

			formClone.find('.displaynone, .attach-file').remove(); // 숨김처리 항목 제거

			// text
			formClone.find('input[type=text],input[type=password]').each(function(){
				if ($(this).attr('id') == 'revenue'){
					if ($('#revenue').val().length > 0){
						$(this).closest('li').text($(this).val() + '만원');
					}else{
						$(this).closest('li').text('');
					}
				}else{
					$(this).closest('li').text($(this).val());
				}
			});

			// textarea
			formClone.find('textarea').each(function(){
				$(this).closest('li').html($(this).val().replace(/(\n|\r\n)/g, '<br>'));
			});

			// radio
			formClone.find('input[type=radio]').each(function(){
				$(this).closest('li').text($(this).filter(':checked').val());

			});

			// checkbox
			formClone.find('input[type=checkbox]').each(function(){
				$(this).closest('li').text($(this).filter(':checked').val());
			});

			// select
            formClone.find('select').each(function(){
                $(this).closest('li').text(jQuery11(this).children('option.selected').val());
            });

			if (confirm('문의 글을 등록하시겠습니까?')) {

				if ($('#content_TEXTAREA').length > 0){
					$('#content_TEXTAREA').val('<div class="wp-form-wrap" id="wpFormWrap">'+formClone.html()+('</div>'));
				}else{
					$('#subject').val('['+$('#writer').val()+'] 님의 문의 글이 접수되었습니다');
					if ($('#postcode1').length > 0){
						if ($('#postcode1').val().length > 0){
							formClone.find('#addrBox').empty().html($('#postcode1').val() + '<br>' + $('#addr1').val() + '<br>' + $('#addr2').val());
						}
					}
					$('#move_write_after').val('/inquiry/index.html?status=complete');
					if ($('#password').length > 0){
						$('#password').val(Math.random().toString(36).substr(2,11));
					}
					applyContentToFroala('<div class="wp-form-wrap wp-detail" id="wpFormWrap">'+formClone.html()+('</div>'));
				}
				BOARD_WRITE.form_submit('boardWriteForm');
			}
		}
	});
});
