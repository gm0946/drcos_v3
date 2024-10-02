/**
* 메인 - 탭
* 제작 : 웹퍼블릭
* 버전 : 2.0
* 최종업데이트 : 2024.10.02
* 웹퍼블릭에서 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/

$(document).ready(function(){
    
    const mainPageTab = WP_SETUP.메인페이지.탭;

    // 탭 표시 여부 확인
    if (mainPageTab.표시여부 === 'off') {
        $('.index_prd_tab').remove();
        return;
    }

    // 타이틀 및 서브타이틀 설정
    $('.index_prd_tab .title').text(mainPageTab.타이틀 || '').toggle(!!mainPageTab.타이틀);
    $('.index_prd_tab .sub-title').text(mainPageTab.서브타이틀 || '').toggle(!!mainPageTab.서브타이틀);

    // 탭 설정 함수
    function setupTab(tabIndex, tabData, tabClass) {
        const tabSlide = $(`.index_prd_tab .tabs .swiper-slide:eq(${tabIndex})`);
        const tabContent = $(`.index_prd_tab .${tabClass}`).closest('.tab-content');

        if (tabData.노출여부 === 'on') {
            tabSlide.text(tabData.타이틀 || '');
        } else {
            tabSlide.addClass('displaynone');
            tabContent.addClass('displaynone');
        }
    }

    // 각 탭 설정
    setupTab(0, mainPageTab.탭1, 'md-tab1');
    setupTab(1, mainPageTab.탭2, 'md-tab2');
    setupTab(2, mainPageTab.탭3, 'md-tab3');

    // 표시되지 않는 탭 및 콘텐츠 제거
    $('.index_prd_tab .tabs .swiper-slide.displaynone').remove();
    $('.index_prd_tab .tab-content.displaynone').remove();

    // 첫 번째 탭 선택 상태로 설정
    $('.index_prd_tab .tabs .swiper-slide:eq(0)').addClass('selected');

    // 탭이 남아 있는지 확인하여 처리
    if ($('.index_prd_tab .tab-content').length > 0) {
        $('.index_prd_tab').removeClass('wp-stand-by');
    } else {
        $('.index_prd_tab').remove();
    }
    
    const swiper_tabs = new Swiper('.index_prd_tab .swiper-container.tabs', {
        on: {
            init: function () {
                $(this.el).closest('.wp-stand-by').removeClass('wp-stand-by');
            },
            breakpoints: {
                1025 : {
                    allowTouchMove: false,
                },
            },
        },
        slidesPerView: 'auto', 
        spaceBetween: 0, 
        loop : false,
    });

    // 탭 활성화
    let setActiveTab = function (index) {
        const tab_contents = $('.index_prd_tab .tab-content');
        tab_contents.each(function (i) {
            if (i === index) {
                $(this).css('display', 'block');
                $('.swiper-slide').eq(i).addClass('active');
            } else {
                $(this).css('display', 'none');
                $('.swiper-slide').eq(i).removeClass('active');
            }
        });
    }

    let curr_pos = 0; // 현재 위치
    let tabArrowMove = function(direction){
        let tabs_len = $('.index_prd_tab .tabs .swiper-slide').length - 1; // 총 탭 개수
        if (direction == 'prev'){
        	if (curr_pos === 0) return;
            curr_pos--;
            setActiveTab(curr_pos);
            $('.index_prd_tab .tabs .swiper-slide').removeClass('selected');
            $('.index_prd_tab .tabs .swiper-slide').eq(curr_pos).addClass('selected');
        }

        if (direction == 'next'){
            curr_pos++;
            if (tabs_len < curr_pos) {
                curr_pos = tabs_len;
                return;
            }
            setActiveTab(curr_pos);
            $('.index_prd_tab .tabs .swiper-slide').removeClass('selected');
            $('.index_prd_tab .tabs .swiper-slide').eq(curr_pos).addClass('selected');
        }
    }

    $('.index_prd_tab .tabs .swiper-slide').click(function(){
    	let index = $(this).index();
        curr_pos = index;
        setActiveTab(index);
        $('.index_prd_tab .tabs .swiper-slide').removeClass('selected');
        $('.index_prd_tab .tabs .swiper-slide').eq(index).addClass('selected');
        if (swiper_tabs) swiper_tabs.slideTo(index);
    });

    setActiveTab(0);

    const swiper_tab1 = new Swiper('.md-tab1 .swiper-container', {
        on: {
            init: function () {
                $(this.el).closest('.wp-stand-by').removeClass('wp-stand-by');
            },
        },
        speed : 500,
        loop: false,

        // 기본 값 (모바일 시)
        slidesPerView: 2.5, // 한 번에 보여질 슬라이드 개수
        spaceBetween: 15, 	// 모바일 설정 - 슬라이드 간격 지정 (px단위)
        observer: true,
        observeParents: true,
        breakpoints: {
            1025 : {
                // PC 설정
                slidesPerView: 4,
                spaceBetween: 25,
            },
        },
        /*
        autoplay: {
            delay: 3500, // 자동재생 시 딜레이(1000 = 1초)
            // disableOnInteraction: false, // 조작 여부에 상관없이 계속 자동재생
        },
        */
        pagination: {
            el: '.md-tab1 .swiper-pagination',
            type: 'progressbar',
            clickable: true,
        },
        navigation: {
            nextEl: '.md-tab1 .swiper-button-next',
            prevEl: '.md-tab1 .swiper-button-prev',
        },
    });

    const swiper_tab2 = new Swiper('.md-tab2 .swiper-container', {
        speed : 500,
        loop: false,

        // 기본 값 (모바일 시)
        slidesPerView: 2.5, // 한 번에 보여질 슬라이드 개수
        spaceBetween: 15, 	// 모바일 설정 - 슬라이드 간격 지정 (px단위)
        observer: true,
        observeParents: true,
        breakpoints: {
            1025 : {
                // PC 설정
                slidesPerView: 4,
                spaceBetween: 25,
            },
        },
        /*
        autoplay: {
            delay: 3500, // 자동재생 시 딜레이(1000 = 1초)
            // disableOnInteraction: false, // 조작 여부에 상관없이 계속 자동재생
        },
        */
        pagination: {
            el: '.md-tab2 .swiper-pagination',
            type: 'progressbar',
            clickable: true,
        },
        navigation: {
            nextEl: '.md-tab2 .swiper-button-next',
            prevEl: '.md-tab2 .swiper-button-prev',
        },
    });

    const swiper_tab3 = new Swiper('.md-tab3 .swiper-container', {
        speed : 500,
        loop: false,

        // 기본 값 (모바일 시)
        slidesPerView: 2.5, // 한 번에 보여질 슬라이드 개수
        spaceBetween: 15, 	// 모바일 설정 - 슬라이드 간격 지정 (px단위)
        observer: true,
        observeParents: true,
        breakpoints: {
            1025 : {
                // PC 설정
                slidesPerView: 4,
                spaceBetween: 25,
            },
        },
        /*
        autoplay: {
            delay: 3500, // 자동재생 시 딜레이(1000 = 1초)
            // disableOnInteraction: false, // 조작 여부에 상관없이 계속 자동재생
        },
        */
        pagination: {
            el: '.md-tab3 .swiper-pagination',
            type: 'progressbar',
            clickable: true,
        },
        navigation: {
            nextEl: '.md-tab3 .swiper-button-next',
            prevEl: '.md-tab3 .swiper-button-prev',
        },
    });
});