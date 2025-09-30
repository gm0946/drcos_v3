/**
* 메인 - From Our Socials
* 제작 : 웹퍼블릭
* 버전 : 1.1
* 최종업데이트 : 2025.09.30

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(document).ready(function(){
    const COUNT = 12; // 출력 개수
    
    $('.index_socials .item:gt('+ (COUNT - 1) +')').remove();
   
    $('.index_socials .item').each(function() {
        
        const src = $(this).find('a').data('img-src');
        $(this).find('a:eq(0)').append(`<img src="${src}" class="thumbnail" />`);
        
        var href = $(this).find('a').attr('href');
        if (!href) return; // href가 없으면 스킵
        
        if (href.includes('instagram.com')) {
            // 인스타그램
            $(this).find('a').attr('target', '_blank');
            $(this).addClass('insta');
        } else if (href.includes('youtube.com/shorts')) {
            // 유튜브 쇼츠
            $(this).addClass('shorts');
        } else if (href.includes('youtube.com') || href.includes('youtu.be')) {
            // 일반 유튜브
            $(this).addClass('youtube');
        } else if (href.includes('vimeo.com')) {
            // 비메오일 때 동작
            $(this).addClass('vimeo');
        } else {
            // 그 외
            $(this).find('a').attr('target', '_blank');
        }
    });

    $('.index_socials .item a').on('click', function(e){
        var $li = $(this).closest('li');
        var classes = ['shorts', 'youtube', 'vimeo'];
        var href = $(this).attr('href');
        var videoId, iframe_url, add_class = '';
        
        if (classes.some(cls => $li.hasClass(cls))) {
            e.preventDefault();
            $('#socialPopup').remove();

            // 유튜브 쇼츠
            if (href.includes('youtube.com/shorts/')) {
                videoId = href.split('youtube.com/shorts/')[1].split('?')[0];
                add_class = 'yshorts';

            // 유튜브 일반
            } else if (href.includes('youtube.com/watch?v=')) {
                videoId = new URL(href).searchParams.get('v');

            // youtu.be 단축 URL
            } else if (href.includes('youtu.be/')) {
                videoId = href.split('youtu.be/')[1].split('?')[0];

            // 비메오
            } else if (href.includes('vimeo.com/')) {
                videoId = href.split('vimeo.com/')[1].split(/[?#]/)[0];
            }

            if (href.includes('youtube.com') 
                || href.includes('youtu.be') 
                || href.includes('youtube.com/shorts')) {
				iframe_url = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
            } else if (href.includes('vimeo.com')) {
				iframe_url = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
            }
            
            $('body').append(`
				<div id="socialPopup" class="${add_class}">
					<div class="box">
                        <iframe src="${iframe_url}" allow="autoplay; encrypted-media" allowfullscreen></iframe>
						<div class="pop-close"></div>
					</div>
				</div>
			`);
        }
    });
    
    $(document).on('click', '#socialPopup .pop-close', function(){
    	$('#socialPopup').hide();
    });
});