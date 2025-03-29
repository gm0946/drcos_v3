/**
* dp.js
* 제작 : 웹퍼블릭
* 버전 : 2.2
* 최종업데이트 : 2024.10.16

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

const wpReviewModule = (function () {
    let instance;
    const d = {
        arr_review_data: [],
        star_options: {
            totalStars: 5,
            starShape : 'rounded',
            activeColor: 'red',
            emptyColor: 'lightgray',
            starSize: 15,
            strokeWidth: 0,
            useGradient: false,
            minRating: 0,
            readOnly: true,
        }
    };

    const decodedAttributeName = base64Decode('bWV0YVtuYW1lPSJtYWRlLWJ5Il0=');
    const element = document.querySelector(decodedAttributeName);
    const codeAttribute = element.getAttribute(base64Decode('Y29kZQ=='));
    const dataAttribute = element.getAttribute(base64Decode('Y29udGVudA=='));
    const siteAttribute = element.getAttribute(base64Decode('c2l0ZQ=='));

    if (
        codeAttribute !== base64Decode('ODJERjFFQkQwNTg2') ||
        dataAttribute !== base64Decode('7Ju57Y2867iU66at') ||
        siteAttribute !== base64Decode('aHR0cHM6Ly93ZWJwdWJsaWMuY28ua3I')
    ) {
        return;
    }

    const product_no = document.querySelector('meta[property="product:productId"]').getAttribute('content');

    function extractPath(url) {
        const shopAndSkinMatch = url.match(/\/shop\d+\/(skin)-[a-zA-Z0-9]+\//);
        if (shopAndSkinMatch) {
            return shopAndSkinMatch[0];
        }

        const skinMatch = url.match(/\/(skin)-[a-zA-Z0-9]+\//);
        if (skinMatch) {
            return skinMatch[0];
        }

        const shopMatch = url.match(/\/shop\d+\//);
        if (shopMatch) {
            return shopMatch[0];
        }

        return '/';
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

    async function appendPhotoReview(doc, max = 10, fail_allow_cnt = 3) {
        let ok_cnt = 0, fail_cnt = 0;
        const list_items = [];
        let photo_reviews = Array.from(doc.querySelectorAll('li[data-review-no]')).filter(el => !el.classList.contains('displaynone'));
        for (let photo_review of photo_reviews) {
            if (ok_cnt >= max || fail_cnt >= fail_allow_cnt) break;
            try {
                const response = await fetch(`${extractPath(window.location.href)}exec/front/board/product/4?no=${photo_review.getAttribute('data-review-no')}&board_no=4`);
                if (!response.ok) throw new Error('network error');
                const json = await response.json();
                const parser = new DOMParser();
                const doc = parser.parseFromString(json.read.content_image, 'text/html');
                const img_src = doc.querySelector('img').src;
                
                list_items.push(`
					<li class="item swiper-slide" data-review-no="${json.no}">
						<a href="javascript:;" class="open-review"><img src="${img_src}" /></a>
					</li>
					\n`);
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
            `<div class="swiper-container pt-review-container wp-stand-by">
                <ul class="photo-review-list swiper-wrapper">
                    ${list_items.join('')}
                </ul>
                <div class="swiper-pagination pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>`;

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
                    element.setAttribute('href','#prdReview');
                });
                
                container.classList.remove('wp-stand-by');
                container.querySelector('.swiper-container .swiper-pagination')?.remove();
                container.querySelector('.swiper-container .swiper-button-next')?.remove();
                container.querySelector('.swiper-container .swiper-button-prev')?.remove();
            }
        }
    }

    function appendReviewAVG(review_points, target) {
		let result = 0;
		const targetEl = document.querySelector(target);
        if (review_points.length > 0){
            let sum = review_points.reduce((a, b) => (a + b));
            result = (sum / review_points.length).toFixed(1);
            targetEl.insertAdjacentHTML('afterend', `<point>${result}</point>`);
        }
                
        d.star_options.initialRating = result;
        $(targetEl).starRating(d.star_options);
        return result;
    }

    function getReviewData() {
        return fetch(extractPath(window.location.href) + 'board/review/dp.html?link_product_no=' + product_no)
            .then(response => response.text())
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    }

    async function getProdReviewPointByDetail(target = '.review-avg', limit_page_size = 0) {
        const review_points = [];

        const data = await getReviewData();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        $(doc).find('li[data-review-no]').each(function () {
            d.arr_review_data.push($(this).data('review-no'));
        });
        
        doc.querySelectorAll('[data-rate-point]').forEach(pointEl => {
            let review_point = parseInt(pointEl.getAttribute('data-rate-point'));
            if (review_point === 0) review_point = 5; // 리뷰 포인트가 0점일 경우 5점으로 변환 처리
            review_points.push(review_point);
        });

		const review_ratio = appendReviewAVG(review_points, target);
        if (review_points.length > 0) {
            const score_ratio = calculateScoreRatios(review_points);
            appendPhotoReview(doc, 20); // 첨부가 있는 글 최대 20개 호출

            $('.review_highlight .review__rating .rate').text(review_ratio);

            $.each(score_ratio, function (i, v) {
                $(`.review_highlight .review__graph .rate${i} .gauge .percentile`).css('height', v);
                $(`.review_highlight .review__graph .rate${i} .txt .percentile`).text(v);
            });
            $('.detail-review-box').removeClass('wp-stand-by');
        }else{
            $('.detail-review-box').remove();
        }

        return data;
    }

	function init(options){
		$.extend(true, d, options);
	}

    return {
        getInstance: function (options) {
            if (!instance) {
				init(options);
                instance = getProdReviewPointByDetail()
            }
            return instance;
        },
        getReviewData : function(){
            return d.arr_review_data;
        }
    };
})();

$(document).ready(async function () {
    const root_styles = getComputedStyle(document.documentElement);
    let star_color = root_styles.getPropertyValue('--review_star_color').trim() || `#eac100`;
    star_color = star_color.replaceAll("'","");
                
    window.wpReviewModule = wpReviewModule; // read.html 에서 사용을 위해 글로벌에 추가
    await wpReviewModule.getInstance({
        star_options : {
            shape : 'rounded',
            activeColor: star_color,
            emptyColor: 'lightgray',
            starSize: 18,
        }
	});
});