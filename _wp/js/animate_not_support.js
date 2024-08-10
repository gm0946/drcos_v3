$(document).ready(function(){
	$(document).on('click', '.animate-not-support .close-msg', function(e){
		e.preventDefault();
		$('.animate-not-support').hide();
	});
});