/*
 * 제작 : 웹퍼블릭 (https://webpublic.co.kr)
 *
 * ※ 웹퍼블릭 콘텐츠 라이선스 고지 ※
 *
 * 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 * 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 * 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 * 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
 */

let wpReview = (function ($) {
    const defs = {
        openReview: '.open-review',
        closeReview: '.close-review',
        contMore: '.cont__more',
        contMaxLine: 2,
        iframePage: '/board/review/read.html',
        iframeId: 'wpReviewFrame',
        items: '.review_list_grp li[data-review-no]',
        star_options: {
            totalStars: 5,
            starShape: 'rounded',
            activeColor: 'red',
            emptyColor: 'lightgray',
            starSize: 15,
            strokeWidth: 0,
            useGradient: false,
            minRating: 0,
            readOnly: true,
        }
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

        // 텍스트 오버플로우 체크 (더보기v 기능 사용)
        $.fn.hasOverflown = function () {
            let res;
            let cont = $('<div class="asdf">' + this.text() + '</div>').css("display", "table")
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
                // const idx = item.dataset.reviewNo;
                // const target = this;
                // await getReviewDataJSON(idx, this).then(function () {
                //     getAttachImageListItem(idx, target);
                // });
            }).bind(this)();

            promises.push(promise);
        });

        Promise.all(promises).then(function () {
            addEvent('list');
        });
    }

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

        let data = [];
        if (typeof parent.wpReviewModule == 'function') {
            data = parent.wpReviewModule.getReviewData();
        } else {
            $('.review__list', parent.document).find('li[data-review-no]').each(function () {
                data.push($(this).data('review-no'));
            });
        }
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
        return new Promise((resolve, reject) => {
            $.get('/exec/front/board/product/4?no=' + idx + '&board_no=4', function (json) {
                let d = JSON.parse(json);
                _articleData.push(d);
                resolve(d);
            })
        })
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
            defs.star_options.initialRating = rate;
            $('.article-rate').starRating(defs.star_options);

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

                const read_href = $(this).closest('.item').data('read-href');
                if (read_href)
                    location.href = read_href;

                /* 레이어 방식 사용 시 주석 제거
                const idx = $(this).closest('li[data-review-no]').data('review-no');
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
                */
                return false;
            });

            var review_timer = null;
            $(window).resize(function () {
                clearTimeout(review_timer);
                review_timer = setTimeout(function () {
                    textOverFlown(); // 텍스트 `더보기` 리사이즈 대응
                }, 200);
            });

            $(document).on('click', '.list--type > li', function (e) {
                textOverFlown();
            });

            // 목록 - 작은 썸네일 클릭 시
            $(document).on('click', '.thumb-attach span', function (e) {
                e.preventDefault();
                const idx = $(this).closest('li[data-review-no]').data('review-no');
                const thumb_idx = $(this).index() + 1;
                if (idx) {
                    addIframe(idx, thumb_idx);
                }
                return false;
            });

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
                $this.find('.article-rate').starRating($.extend(defs.star_options, { initialRating: rate }));

                // 목록 타입에서는 왼쪽에 상품 이미지를 기본으로 설정
                if ($('.review__list .list').length > 0) {
                    // 상품 이미지로 대체
                    loadImage($this_thumb.data('prod-img')).then(img => $this_thumb.attr('src', img.src))
                        .catch(err => {
                            // 상품 이미지도 없을 경우 에러 이미지로 대체
                            $this_thumb.attr('src', $this_thumb.data('error-img'));
                        });
                } else {
                    // 스마트스토어 이미지가 있을 경우
                    if (match && match[1]) {
                        const smart_store_src = match[1];
                        $this_thumb.attr('src', smart_store_src);
                    } else {
                        // 첨부가 없을 경우
                        loadImage($this_thumb.attr('src')).catch(err => {
                            // 상품 이미지로 대체
                            loadImage($this_thumb.data('prod-img')).then(img => $this_thumb.attr('src', img.src))
                                .catch(err => {
                                    // 상품 이미지도 없을 경우 에러 이미지로 대체
                                    $this_thumb.attr('src', $this_thumb.data('error-img'));
                                });
                        });
                    }
                }

                // 작은 상품 썸네일
                loadImage($this_small_thumb.attr('src')).catch(err => {
                    $this.find('.product_wrap a').attr('href', '#none');
                    $this_small_thumb.attr('src', $this_small_thumb.data('error-img'));
                });
            });

            // 
            $('#detailTab #prdReview .point[data-rate]').each(function () {
                const rate = $(this).data('rate');
                $(this).starRating($.extend(defs.star_options, { initialRating: rate }));
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

        let params = `?board_no=4&no=${idx}`;
        if (thumb_idx) params += '&t_idx=' + thumb_idx;

        const iframeHTML = `<div class="${defs.iframeId}Wrap">
								<iframe border="0" scrolling="no" frameborder="0" id="${defs.iframeId}" src="${defs.iframePage}${params}"></iframe>
							</div>`;
        $('html').append(iframeHTML).addClass('review-active');
    }

    // 읽기 - 프레임 닫기
    const closeIframe = function (proc = '') {

        // 게시글 삭제 후 아이프레임이 안닫히는 현상으로 스크롤 안되는 문제로 인해 예외처리 - 페이지 리로드 처리
        if (proc == 'D') parent.location.reload();

        $('html', parent.document).removeClass('review-active');
        $(`.${defs.iframeId}Wrap`, parent.document).remove();
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

    return {
        init: function (options) {
            init(options);
        },
        close: function () {
            closeIframe();
        },
        loadCompleted
    }
})($);

$(function () {
    wpReview.init({
        star_options: {
            shape: 'rounded',
            activeColor: WP_SETUP.색상.게시판.리뷰.별,
            emptyColor: 'lightgray',
            starSize: 15,
        }
    });
});