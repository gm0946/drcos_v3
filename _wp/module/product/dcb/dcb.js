$(function(){
    $('.card-info .card-detail').wrapAll('<div class="card-content"></div>');

	$(document).on('click', '.card-benefit .quest-mark i, .card-benefit .quest-mark .quest-close', function(){
    	$(this).closest('.quest-mark').toggleClass('active');
        $('html').toggleClass('scroll--hide');
    });

    $(document).on('click', '.card-benefit .quest-detail', function(e){
        if ($(e.target).is(this)) {
            $(this).closest('.quest-mark').toggleClass('active');
            $('html').toggleClass('scroll--hide');
        }
    });
});