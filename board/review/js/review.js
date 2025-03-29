/**
* 리뷰
* 제작 : 웹퍼블릭
* 버전 : 2.3
* 최종업데이트 : 2024.10.18

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

let wpReview = (function ($) {
    let instance;
    const defs = {
        arrReviewData: [],
        openReview: '.open-review',
        closeReview: '.close-review',
        contMore: '.cont__more',
        contMaxLine: 2,
        iframePage: '/board/review/read.html',
        iframeId: 'wpReviewFrame',
        items: '.review_list_grp li[data-review-no]',
        starOption: {
            totalStars: 5,
            starShape: 'rounded',
            activeColor: 'red',
            emptyColor: 'lightgray',
            starSize: 15,
            strokeWidth: 0,
            useGradient: false,
            minRating: 0,
            readOnly: true,
        },
        bestReivewLimit : 5,
        fetchTimeout: 5000,
    };

    const _articleData = []; // 게시글 정보
    const textOverFlown = function () {
        setTimeout(function () {
            $(defs.items).each(function (i, item) {
                $(this).find('.content .cont__more').addClass('displaynone');
                if ($(this).find('.content .cont').hasOverflown()) {
                    $(this).find('.content .cont__more').removeClass('displaynone');
                }
            });
        }, 0);
    }

    // 초기 실행
    const init = function (options) {

        // 인증코드 체크
        if ($(base64Decode('bWV0YVtuYW1lPW1hZGUtYnld')).attr(base64Decode('Y29kZQ==')) !== base64Decode('ODJERjFFQkQwNTg2')
            || $(base64Decode('bWV0YVtuYW1lPW1hZGUtYnld')).attr(base64Decode('Y29udGVudA==')) !== base64Decode('7Ju57Y2867iU66at')
            || $(base64Decode('bWV0YVtuYW1lPW1hZGUtYnld')).attr(base64Decode('c2l0ZQ==')) !== base64Decode('aHR0cHM6Ly93ZWJwdWJsaWMuY28ua3I')) {
            return;
        }
        
        $.extend(true, defs, options);

        /**
         * defs.skinPath
         * 
         * fetch 부분에 백틱(`)으로 주소를 감싸면 카페24에서 주소 자동 변환은 하지 않으나
         * 암호화 시 다시 ' 로 변환되는 문제가 있어 '' 형태로 변경함
         * 결론: fetch에는 skinPath를 적용하면 안됨
         */

        defs.skinPath = WP_CORE().util.extractSkinPath(); // 스킨 경로 설정

        // 텍스트 오버플로우 체크 (더보기v 기능 사용)
        $.fn.hasOverflown = function () {
            let res;
            let cont = $('<div class="wp-text-overflow">' + this.text() + '</div>').css("display", "table")
            .css("z-index", "-1").css("position", "absolute")
            .css("white-space", 'nowrap')
            .css("font-family", this.css("font-family"))
            .css("font-size", this.css("font-size"))
            .css("font-weight", this.css("font-weight"))
            .appendTo(this);
            res = (cont.width() > this.width() * defs.contMaxLine);
            cont.remove();
            return res;
        }

        // 읽기 페이지 전용
        if (location.pathname.includes('/board/review/read.html')) {
            addEvent('read');
            reviewTypeCheck();
            if (WP_SETUP.폰트.구글폰트_표시여부 == 'off') loadCompleted();
            prodInfoException();
            loginStatusDisp();
            addNavigationButtons();
        }

        // 수정 페이지 전용
        if (location.pathname.includes('modify.html')) {
            let pageMode = getParamUrl('page_mode');
            $('body').addClass(pageMode);
        }

        /* 리뷰 댓글 삭제 페이지 접근 체크
           -> 리턴 시 이전에 보고 있던 read 페이지로 이동할 수 있도록 return 주소 변경
        */
        if (location.pathname.toLowerCase().includes('comment_del')) {
            $('#return_url').val($('#return_url').val().replace('/board/review?', '/board/review/read.html?'));
        }

        // 리뷰 삭제 시 창 닫기 / 새로고침
        if (document.referrer.toLowerCase().includes('/board/del/')) {
            closeIframe('D');
        }

        // `더보기` 버튼 위치 이동 (로딩 완료 후 하지 않으면 넓이 계산이 정상적으로 안됨)
        $(window).on('load', function () {
            textOverFlown();
        });

        /*비동기 호출*/
        let promises = [];
        $(defs.items).each(function (i, item) {
            const promise = (async function () {
                // 레이어 방식 사용 시 주석 제거
                const idx = item.dataset.reviewNo;
                const target = this;
                await getReviewDataJSON(idx, this).then(function () {
                    getAttachImageListItem(idx, target);
                });
            }).bind(this)();
            promises.push(promise);
        });

        Promise.all(promises).then(function () {
            addEvent('list');
        });
    }

    // 이전 / 다음의 번호 반환
    function findAround(data, key, target) {
        if (data.length == 0) return;
        const index = data.indexOf(key);

        if (index === -1) {
            return null;
        }

        let prev_no, next_no;
        if (target == 'prev') {
            prev_no = index > 0 ? data[index - 1] : null;
            return prev_no;
        }

        if (target == 'next') {
            next_no = index < data.length - 1 ? data[index + 1] : null;
            return next_no;
        }
    }

    // 이전 / 다음 버튼 표시
    const addNavigationButtons = function () {
        let review_no = getParamUrl('no');
        if (!review_no) board = $('#BoardDelForm #no').val();
        if (!review_no) return;

        // list.html 과 read.html의 데이터 공유를 위해 세션 사용
        var data = [];
        if (sessionStorage.getItem('review_index_list')) {
            data = JSON.parse(sessionStorage.getItem('review_index_list'));
        }

        // 이전 다음 없으면 버튼 영역 제거
        if (data.length <= 0) return;

        review_no = parseInt(review_no);
        const read_url = '/board/review/read.html?board_no=4&is_loaded=T&no=';

        let prev_no = findAround(data, review_no, 'prev');
        let next_no = findAround(data, review_no, 'next');

        $('.prev-button').add('.next-button').removeClass('displaynone');
        if (prev_no) {
            $('.prev-button a').attr('href', read_url + prev_no);
            $('.prev-button').addClass('on');
        }
        if (next_no) {
            $('.next-button a').attr('href', read_url + next_no);
            $('.next-button').addClass('on');
        }
    }

    // 로그인 상태에 따른 표시상태 설정
    const loginStatusDisp = function () {
        // 로그아웃 상태
        if ($('.is-status-logoff').length > 0) {
            $('.review-logoff').removeClass('displaynone');
        } else {
            $('.review-logon').removeClass('displaynone');
        }
    }

    // 페이지 로드 시 서버에서 게시글 정보 호출
    const getReviewDataJSON = function (idx) {
        return WP_CORE().util.fetchWithTimeout('/exec/front/board/product/4?no=' + idx + '&board_no=4', {}, defs.fetchTimeout)
            .then(response => response.json())
            .then(json => {
            _articleData.push(json);
        }).catch(err => {
            console.log(err);
        });
    }

    const getAttachImageListItem = function (idx, target) {
        if (idx) {
            const d = getArticleData(idx);
            if (d[0]) {
                const contentImg = d[0].read.content_image;
                if (contentImg) {
                    if (contentImg) {
                        $(target).find('.thumb-attach').append(contentImg);
                        $(target).find('.thumb-attach br').remove();
                        $(target).find('.thumb-attach img').wrap('<span></span>');
                    }
                }
            }
        }
    }

    // 게시글 조회
    const getArticleData = function (idx) {
        return _articleData.filter(function (d) {
            return d.no == idx;
        });
    }

    // 읽기 - 상품 정보가 없을 때 해당 영역 제거
    const prodInfoException = function () {
        if ($('.information .prod-name').text().trim().length <= 0) {
            $('.prod-info').remove();
        }
    }

    // 읽기 - 페이지 로딩 완료 시 로딩 아이콘 숨김 및 아이프레임 노출
    const loadCompleted = function () {
        if (getParamUrl('is_loaded') && getParamUrl('is_loaded') == 'T') {
            $('.review_read_grp').css('transition', 'none');
        }
        $('.review-loading').hide();
        $('.review_read_grp').addClass('active');
    }

    // 포토리뷰 여부 체크
    const reviewTypeCheck = function () {
        if ($('#reviewPhotos img').length > 0) {
            $('body').addClass('thumb');
            $('#btnModify').attr('href', $('#btnModify').attr('href') + '&page_mode=thumb');
            $('#reviewPhotos br').remove();

            // 이미지 스타일 제거
            $('#reviewPhotos img').each(function () {
                $(this).removeAttr('style');
            });

            // 이미지가 2개 이상일 경우 슬라이드 적용
            if ($('#reviewPhotos img').length == 1) {
                $('#reviewPhotos').addClass('single');
            } else {
                $('#reviewPhotos').wrap('<div class="review-photos swiper-container"></div>');
                $('#reviewPhotos').addClass('swiper-wrapper');
                $('#reviewPhotos img').wrap('<div class="swiper-slide"></div>');
                $('#reviewPhotos').after('<div class="swiper-pagination"></div>');

                let swiper = new Swiper('.review-photos.swiper-container', {
                    slidesPerView: 1,
                    spaceBetween: 5,
                    loop: true,
                    pagination: {
                        el: '.review-photos .swiper-pagination',
                        type: 'fraction',
                        clickable: true,
                    },
                    on: {
                        init: function () {
                            let t_idx = getParamUrl('t_idx');
                            if (t_idx) {
                                t_idx = parseInt(t_idx) - 1;
                                this.slideToLoop(t_idx, 0);
                            }
                        },
                    },
                });
            }
        } else {
            $('body').addClass('list');
            $('#btnModify').attr('href', $('#btnModify').attr('href') + '&page_mode=list');
            $('#reviewPhotos').remove();
        }
    }

    // 리뷰 접근 권한 체크
    const articleAuthCheck = function (idx, data) {
        if (data.is_secret) {
            alert('접근 권한이 없습니다.');
            closeIframe();
            return;
        }
        addIframe(idx);
    }

    // 공통 - 이벤트 추가
    const addEvent = function (page = 'list') {

        // 읽기 페이지
        if (page == 'read') {
            // 차단 / 신고 / 추천 버튼 클릭 시 창 닫힘 방지
            $('.review_read_grp a[href="#none"]').on('click', function (e) { e.preventDefault() });

            // 컨텐츠 영역 클릭 시 닫기 이벤트 방지
            $('.review_read_grp').on('click', function (e) {
                e.stopPropagation();
            });

            $('.back-panel').on('click', function () {
                closeIframe();
            });

            $(window).on('popstate', function () {
                closeIframe();
            });

            history.pushState({}, '', '');
            $('body').backDetect(function () {
                closeIframe();
            });

            // 리뷰 썸네일 표시 위치 변경
            setTimeout(function () {
                reviewCloseMover();
                let observer = new MutationObserver(function (mutations) {
                    reviewCloseMover();
                });
                let config = { attributes: true };
                $('html').each(function () {
                    observer.observe(this, config);
                });
            }, 0);

            function reviewCloseMover() {
                $target = $('.review_read_grp .close-review');
                if ($('html').hasClass('res-mobile')) {
                    $('.review_read_grp .section_title').append($target);
                }
                if ($('html').hasClass('res-pc')) {
                    $('.review_read_grp .section_title').after($target);
                }
            }

            // 평점 표시
            let rate = $('.article-rate').data('rate') && $('.article-rate').data('rate') > 0 ? $('.article-rate').data('rate') : 0;
            defs.starOption.initialRating = rate;
            $('.article-rate').starRating(defs.starOption);

            return;
        }

        // 목록 전용 이벤트
        if (page == 'list') {
            $(defs.contMore).on('click', function (e) {
                $(this).toggleClass('expand');
                $(this).closest('.item').find('.content .cont').toggleClass('clamp');
            });

            // 목록 - 리뷰 열기 클래스 이벤트
            $(document).on('click', defs.openReview, function (e) {
                e.preventDefault();
                const idx = $(this).closest('[data-review-no]').data('review-no');

                // 이전 / 다음 리뷰 목록 SAVE
                var review_index_list = [];
                let closest_parent = $(this).closest('[data-review-no]');
                let reivew_items = closest_parent.siblings().add(closest_parent); // 형제 요소들과 자신을 선택
                reivew_items.each(function () {
                    if(!$(this).hasClass('swiper-slide-duplicate')){ // 복제 슬라이드가 있을 경우 제외
                        review_index_list.push($(this).data('review-no'));
                    }
                });
                sessionStorage.setItem('review_index_list', JSON.stringify(review_index_list));
                if (idx) {
                    const d = getArticleData(idx);
                    if (d[0]) {
                        articleAuthCheck(idx, d[0]);
                    } else {
                        // 포토리뷰 모아보기에서 클릭 시 해당 글이 현재 리뷰 목록에 없을 때 서버에서 호출
                        getReviewDataJSON(idx).then(function (data) {
                            articleAuthCheck(idx, data);
                        });
                    }
                }
                return false;
            });

            var review_timer = null;
            var lastWidth = $(window).width(); // 초기 가로 사이즈 저장

            $(window).resize(function () {
                var currentWidth = $(window).width(); // 현재 가로 사이즈 확인

                if (currentWidth !== lastWidth) { // 가로 사이즈가 변했을 때만 실행
                    lastWidth = currentWidth; // 현재 가로 사이즈를 저장
                    clearTimeout(review_timer);
                    review_timer = setTimeout(function () {
                        textOverFlown(); // 텍스트 `더보기` 리사이즈 대응
                    }, 200);
                }
            });

            $(document).on('click', '.list--type > li', function (e) {
                textOverFlown();
            });

            // 목록 - 작은 썸네일 클릭 시
            $(document).on('click', '.thumb-attach span', function (e) {
                e.preventDefault();
                const idx = $(this).closest('[data-review-no]').data('review-no');
                const thumb_idx = $(this).index() + 1;

                // 이전 / 다음 리뷰 목록 save
                var review_index_list = [];
                $(this).closest('.review__list').find('li[data-review-no]').each(function () {
                    review_index_list.push($(this).data('review-no'));
                });
                sessionStorage.setItem('review_index_list', JSON.stringify(review_index_list));

                if (idx) {
                    addIframe(idx, thumb_idx);
                }
                return false;
            });

            let image_load_tasks = []; // 이미지 로드 상태 저장
            
            // 목록 - 썸네일 체크
            $(defs.items).each(function () {
                const $this_thumb = $(this).find('.thumb-review:eq(0)'); // 썸네일 가져오기
                const $this_small_thumb = $(this).find('.small-thumb-review:eq(0)');
                const $this = $(this);
                const d = getArticleData($(this).data('review-no')).at(0);
                const const_html = (d) ? d.read.content : '';
                const regex = /<img [^>]*src=['"]([^'"]+)[^>]*>/i;
                const match = regex.exec(const_html);

                if ($this.find('.prod_name .name').text().trim().length <= 0) {
                    $this.find('.prod_name .name').empty().append('상품 정보가 없습니다.')
                    $this.find('.prod_thumb a').attr('href', 'javascript:;');
                }

                // 평점 표시
                let rate = $this.find('.article-rate').data('rate') && $this.find('.article-rate').data('rate') > 0 ? $this.find('.article-rate').data('rate') : 0;
                $this.find('.article-rate').starRating($.extend(defs.starOption, { initialRating: rate }));

                // 목록 타입에서는 왼쪽에 상품 이미지를 기본으로 설정
                if ($('.review__list .list').length > 0) {
                    // 상품 이미지로 대체
                    var is_img_loaded = loadImage($this_thumb.data('prod-img')).then(img => $this_thumb.attr('src', img.src))
                    .catch(err => {
                        // 상품 이미지도 없을 경우 에러 이미지로 대체
                        $this_thumb.attr('src', defs.skinPath + $this_thumb.data('error-img'));
                    }).finally(() => {
                        // 성공 여부와 상관없이 무조건 실행
                        $(this).children('.item').addClass('active');
                    });
                    image_load_tasks.push(is_img_loaded);
                    
                } else {

                    // 내용에 이미지가 있을 경우
                    if (match && match[1]) {
                        const smart_store_src = match[1];
                        $this_thumb.attr('src', smart_store_src);
                        $(this).children('.item').addClass('active');
                    } else {
                        // 첨부 이미지가 있을 경우 첨부 이미지 노출
                        var is_img_loaded = loadImage($this_thumb.attr('src')).catch(err => {
                            // 첨부 이미지가 없을 경우 상품 이미지로 대체
                            return loadImage($this_thumb.data('prod-img')).then(img => $this_thumb.attr('src', img.src))
                                .catch(err => {
                                // 상품 이미지도 없을 경우 에러 이미지로 대체
                                $this_thumb.attr('src', defs.skinPath + $this_thumb.data('error-img'));
                            });
                        }).finally(() => {
                            $(this).children('.item').addClass('active');
                        });
                        image_load_tasks.push(is_img_loaded);
                    }
                }

                // 작은 상품 썸네일
                var is_img_loaded = loadImage($this_small_thumb.attr('src')).catch(err => {
                    $this.find('.product_wrap a').attr('href', '#none');
                    $this_small_thumb.attr('src', defs.skinPath + $this_small_thumb.data('error-img'));
                });
                image_load_tasks.push(is_img_loaded);
            });
            
            // 이미지가 모두 로드 되었을 때 최종 점검
            Promise.all(image_load_tasks).then(function() {
                //$('.review__list').find('.item:not(.active)').addClass('active');
            });

            $('#detailTab #prdReview .point[data-rate]').each(function () {
                const rate = $(this).data('rate');
                $(this).starRating($.extend(defs.starOption, { initialRating: rate }));
            });
        }
    }

    // 공통 - 이미지 로드 체크
    const loadImage = (url) => new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', (err) => reject(err));
        img.src = url;
    });

    // 목록 - 아이프레임 추가
    const addIframe = function (idx, thumb_idx) {
        // 중복 실행 방지
        if ($('html').hasClass('review-active')) return;

        let params = "?board_no=4&no=" + idx;
        if (thumb_idx) params += "&t_idx=" + thumb_idx;

        const iframeHTML = "<div class=\"" + defs.iframeId + "Wrap\">" +
              "<iframe border=\"0\" scrolling=\"no\" frameborder=\"0\" id=\"" + defs.iframeId + "\" src=\"" + defs.iframePage + params + "\"></iframe>" +
              "</div>";
        $('html').append(iframeHTML).addClass('review-active');
    }

    // 읽기 - 프레임 닫기
    const closeIframe = function (proc = '') {

        // 게시글 삭제 후 아이프레임이 안닫히는 현상으로 스크롤 안되는 문제로 인해 예외처리 - 페이지 리로드 처리
        if (proc == 'D') parent.location.reload();

        $('html', parent.document).removeClass('review-active');
        $("." + defs.iframeId + "Wrap", parent.document).remove();
    }

    // URL 파라미터 추출
    const getParamUrl = function (sKey, url) {
        if (!url) url = location.href;
        let sQueryString = url.substring(url.indexOf('?') + 1);
        let aParam = {};

        if (sQueryString) {
            let aFields = sQueryString.split("&");
            let aField = [];
            for (let i = 0; i < aFields.length; i++) {
                aField = aFields[i].split('=');
                aParam[aField[0]] = aField[1];
            }
        }

        aParam.page = aParam.page ? aParam.page : 1;
        return sKey ? aParam[sKey] : aParam;
    }

    function calculateScoreRatios(scores) {
        const scoreCounts = {};
        const totalReviews = scores.length;

        scores.forEach(score => {
            if (scoreCounts[score]) {
                scoreCounts[score] += 1;
            } else {
                scoreCounts[score] = 1;
            }
        });

        const scoreRatios = {};
        for (const score in scoreCounts) {
            scoreRatios[score] = (scoreCounts[score] / totalReviews * 100).toFixed(0) + '%';
        }

        return scoreRatios;
    }
    
    // 사용자 지정 베스트 리뷰
    function appendBestReview() {
        
        // 입력한 게시글의 아이디의 유효성 체크
        function convertToNumberArray(input) {
            // 입력값이 숫자, 콤마, 공백으로만 구성되어 있는지 확인
            const validPattern = /^[0-9,\s]+$/;

            // 유효성 검사
            if (!validPattern.test(input)) {
                return []; // 유효하지 않은 경우 빈 배열 반환
            }

            // 콤마와 공백을 기준으로 분리 후 숫자로 변환
            return input.split(',').map(num => Number(num.trim()));
        }
        
        function reviewWrapHTML() {
            return `
				<div class="best-review-swiper">
                    <div class="swiper-container">
                        <ul class="swiper-wrapper"></ul>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
				</div>
			`;
        }

        function bestReviewItemHTML(idx, img_src, rate, subject, cont, writer, write_date, hit_count) {
            return `
				<li class="swiper-slide" data-review-no="${idx}">
					<div class="item open-review">
                        <div class="thumb"><img src="${img_src}" /></div>
                        <div class="info">
                            <div class="article-rate">${rate}</div>
                            <div class="subject">${subject}</div>
                            <div class="cont">${cont}</div>
                            <div class="writer">${writer}</div>
                            <div class="write_date">${write_date}</div>
                            <div class="hit_count">${hit_count}</div>
                        </div>
					</div>
               </li>
			`;
        }
        
        if (!WP_CORE().util.getProdNo()) return; // 상품번호 조회하여 없으면 종료

        let arr_ids = WP_SETUP.상세페이지.베스트_리뷰.filter(function(obj){
            return obj.상품번호 == WP_CORE().util.getProdNo();
        });

        if (arr_ids.length == 0) return; // 베스트리뷰 설정 조회하여 없으면 종료
        arr_ids = convertToNumberArray(arr_ids[0].글번호); // 베스트리뷰 글 번호 리스트 호출(31,22,13,34)

        let arr_items = []; // li 영역 저장 배열
        const processReviews = async () => { // 해당 상품에 지정된 베스트리뷰 글 수집
            for (let i = 0; i < arr_ids.length; i++) {
                
                if (defs.bestReivewLimit <= i) {
                	break;
                } 
                    
                const review_no = arr_ids[i];
                let arr_article = _articleData.filter(function(obj) {
                    return obj.no == review_no;
                });

                let article;
                if (arr_article.length > 0) {
                    article = arr_article[0];
                } else {
                    try {
                        const response = await WP_CORE().util.fetchWithTimeout('/exec/front/board/product/4?no='+review_no+'&board_no=4',{}, defs.fetchTimeout);
                        if (!response.ok) throw new Error('network error');
                        article = await response.json();
                        
                        // 중복 데이터 추가 방지
                        if (_articleData.filter(obj => obj.no == article.no).length == 0) {
                            _articleData.push(article);
                        }
                    } catch (error) {
                        console.error(`BestReview Failed to fetch review ${review_no}:`, error.message);
                        continue; // 타임아웃 또는 fetch 실패 시 현재 반복을 건너뜀
                    }
                }

                const parser = new DOMParser();
                const doc = parser.parseFromString(article.read.content_image, 'text/html');
                if (!doc.querySelector('img')) {
                    console.error(`해당 게시 글이 없거나 이미지가 포함되어 있지 않습니다 (${review_no})`);
                    continue;
                }
                const img_src = doc.querySelector('img').src;

                arr_items.push(bestReviewItemHTML(
                    review_no,
                    img_src,
                    article.read.point_count,
                    article.read.subject,
                    WP_CORE().util.removeTags(article.read.content),
                    WP_CORE().util.removeParentheses(article.read.writer),
                    article.read.write_date,
                    WP_CORE().util.formatNumber(article.read.hit_count),
                ));
            }
        };

        // 비동기 작업을 실행하고 완료될 때까지 대기
        processReviews().then(() => {
            $('.best-review-widget').each(function() {
                if (arr_items.length > 0){
                    $(this).append(reviewWrapHTML());
                    $(this).find('.swiper-wrapper').append(arr_items);
                    $(this).find('.article-rate').each(function() {
                        var rate = $(this).text();
                        $(this).empty().starRating($.extend(defs.starOption, { initialRating: rate }));
                    });

                    var $this = $(this);
                    const swiper = new Swiper($(this).find('.swiper-container')[0], {
                        speed: 500,
                        spaceBetween: 10,
                        slidesPerView: 1,
                        loop: ($this.find('.swiper-container .swiper-slide').length <= 1) ? false : true,
                        observer: true,
                        observeParents: true,
                        autoplay: $(window).width() <= 768 ? { delay: 2500 } : false,
                        navigation: {
                            nextEl: $this.find('.swiper-button-next')[0],
                            prevEl: $this.find('.swiper-button-prev')[0],
                        },
                        breakpoints: {
                            768 : {
                                slidesPerView: 2,
                            },
                        }
                    });

                    $(window).resize(function() {
                        // 768px 이상일 때 autoplay 멈춤
                        if ($(window).width() >= 768) {
                            swiper.autoplay.stop(); 
                        } else {
                            swiper.autoplay.start();
                        }
                    });

                    $(this).removeClass('displaynone'); // 베스트 리뷰 표시
                }
            });
        }).catch((err) => {
            console.error(err);
        });
    }

    // 포토리뷰 모아보기
    async function appendPhotoReview(doc, max = 10, fail_allow_cnt = 3) {
        let ok_cnt = 0, fail_cnt = 0;
        const list_items = [];
        let photo_reviews = Array.from(doc.querySelectorAll('li[data-review-no]')).filter(el => !el.classList.contains('displaynone'));
        for (let photo_review of photo_reviews) {
            const review_no = photo_review.getAttribute('data-review-no');
            if (ok_cnt >= max || fail_cnt >= fail_allow_cnt) break;
            try {
                const article = _articleData.filter(function(obj){
                    return obj.no == review_no;
                });
                
                let json;
                if (article.length > 0) {
                    json = article[0];
                }else{
                    try {
                        const response = await WP_CORE().util.fetchWithTimeout('/exec/front/board/product/4?no='+review_no+'&board_no=4',{}, defs.fetchTimeout);
                        if (!response.ok) throw new Error('network error');
                        json = await response.json();
                        
                        // 중복 데이터 추가 방지
                        if (_articleData.filter(obj => obj.no == json.no).length == 0) {
                            _articleData.push(json);
                        }
                    } catch (error) {
                        console.error(`PhotoReivew Failed to fetch review ${review_no}:`, error.message);
                        continue; // 타임아웃 또는 fetch 실패 시 현재 반복을 건너뜀
                    }
                }
                
                const parser = new DOMParser();
                const doc = parser.parseFromString(json.read.content_image, 'text/html');
                const img_src = doc.querySelector('img').src;

                list_items.push(
                    "<li class=\"item swiper-slide\" data-review-no=\"" + json.no + "\">" +
                    "<a href=\"javascript:;\" class=\"open-review\"><img src=\"" + img_src + "\" /></a>" +
                    "</li>\n"
                );
                ok_cnt++;
            } catch (error) {
                fail_cnt++;
            }
        }

        const initSwiper = (target) => {
            const swiper = new Swiper(target, {
                on: {
                    init: function () {
                        this.el.closest('.wp-stand-by').classList.remove('wp-stand-by');
                    },
                },
                speed: 500,
                spaceBetween: 10,
                slidesPerView: 'auto',
                loop: false,
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-container.pt-review-container .swiper-pagination',
                    type: 'progressbar',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-container.pt-review-container .swiper-button-next',
                    prevEl: '.swiper-container.pt-review-container .swiper-button-prev',
                },
            });
        }

        const result_html =
              "<div class=\"swiper-container pt-review-container wp-stand-by\">" +
              "<ul class=\"photo-review-list swiper-wrapper\">" +
              list_items.join('') +
              "</ul>" +
              "<div class=\"swiper-pagination pagination\"></div>" +
              "<div class=\"swiper-button-next\"></div>" +
              "<div class=\"swiper-button-prev\"></div>" +
              "</div>";

        if (!window.Swiper) {
            const swiper_script = document.createElement('script');
            swiper_script.src = '/_wp/js/swiper.min.js';
            swiper_script.onload = initSwiper;
            document.head.appendChild(swiper_script);
        }

        const photo_widgets = document.querySelectorAll('.photo_review_widget');
        if (photo_widgets.length > 0 && list_items.length > 0) {
            for (let i = 0; i < photo_widgets.length; i++) {
                const photo_widget = document.querySelectorAll('.photo_review_widget')[i];
                photo_widget.insertAdjacentHTML('beforeend', result_html);
                photo_widget.classList.remove('displaynone');

                const container = photo_widget.querySelector('.swiper-container');

                if (!photo_widget.classList.contains('no-swiper')) {
                    initSwiper(container);
                    continue;
                }

                photo_widget.querySelectorAll('.open-review').forEach(element => {
                    element.classList.remove('open-review');
                    element.setAttribute('href', '#prdReview');
                });

                container.classList.remove('wp-stand-by');

                var pagination = container.querySelector('.swiper-container .swiper-pagination');
                if (pagination) {
                    pagination.remove();
                }

                var nextButton = container.querySelector('.swiper-container .swiper-button-next');
                if (nextButton) {
                    nextButton.remove();
                }

                var prevButton = container.querySelector('.swiper-container .swiper-button-prev');
                if (prevButton) {
                    prevButton.remove();
                }
            }
        }
    }

    function appendReviewAVG(review_points, target) {
        let result = 0;
        const targetEl = document.querySelector(target);
        if (review_points.length > 0) {
            let sum = review_points.reduce((a, b) => (a + b));
            result = (sum / review_points.length).toFixed(1);
            targetEl.insertAdjacentHTML('afterend', `<point>${result}</point>`);
        }

        defs.starOption.initialRating = result;
        defs.starOption.starSize = 18;
        $(targetEl).starRating(defs.starOption);
        return result;
    }
                        
    async function getProdReviewPointByDetail(target = '.review-avg', limit_page_size = 0) {
        const review_points = [];
        defs.product_no = WP_CORE().util.getProdNo();
        if (!defs.product_no) return;

        const response = await WP_CORE().util.fetchWithTimeout('/board/review/dp.html?link_product_no='+defs.product_no,{}, defs.fetchTimeout);
        if (!response.ok) throw new Error('network error');
        const result = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(result, 'text/html');

        $(doc).find('li[data-review-no]').each(function () {
            defs.arrReviewData.push($(this).data('review-no'));
        });

        doc.querySelectorAll('[data-rate-point]').forEach(pointEl => {
            let review_point = parseInt(pointEl.getAttribute('data-rate-point'));
            if (review_point === 0) review_point = 5; // 리뷰 포인트가 0점일 경우 5점으로 변환 처리
            review_points.push(review_point);
        });

        if (review_points.length > 0) {
            await appendPhotoReview(doc, 20); // 포토리뷰 모아보기 호출(첨부가 있는 글 / 최대 20개)
            const review_ratio = appendReviewAVG(review_points, target);
            $('.review_highlight .review__rating .rate').text(review_ratio);
            
            const score_ratio = calculateScoreRatios(review_points);
            $.each(score_ratio, function (i, v) {
                $(".review_highlight .review__graph .rate" + i + " .gauge .percentile").css('height', v);
                $(".review_highlight .review__graph .rate" + i + " .txt .percentile").text(v);
            });
            $('.detail-review-box').removeClass('wp-stand-by');
        } else {
            $('.detail-review-box').remove();
        }
        
        appendBestReview(); // 사용자가 지정한 베스트 리뷰 호출

        return result;
    }

    return {
        getInstance: function (options) {
            if (!instance) {
                init(options);
                instance = getProdReviewPointByDetail();
            }
            return instance;
        },
        getReviewData: function () {
            return defs.arrReviewData;
        },
        close: function () {
            closeIframe();
        },
        loadCompleted
    }
})($);

$(function () {
    const root_styles = getComputedStyle(document.documentElement);
    let star_color = root_styles.getPropertyValue('--review_star_color').trim() || `#eac100`;
    star_color = star_color.replaceAll("'", "");
    wpReview.getInstance({
        starOption: {
            activeColor: star_color,
        },
    });
});