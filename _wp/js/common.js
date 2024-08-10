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

$(document).ready(function () {
    setReviewLink();
    copyright();
    addClassByBrowserModeEvent();
    eToggle();
    boardSearchDateAll();
});

$(window).on('load', function () {
    if (document.querySelector('.thumbnail')) {
        setDefaultImage('.thumbnail img');
        setDefaultImage('.thumb img');
    }
});

/**
 *  상품 섬네일 로드되지 않을 경우, 기본값 설정
 */
function setDefaultImage(element) {
    document.querySelectorAll(element).forEach(function (item) {
        var $img = new Image();
        $img.onerror = function () {
            item.src = "//img.echosting.cafe24.com/thumb/img_product_big.gif";
        }
        $img.src = item.src;
    });
};

// 스크롤 이동
const pageScroll = function (d) {
    if ($('html, body').is(':animated')) { return };

    if (d == 'up') {
        $('html, body').stop().animate({ scrollTop: 0 }, 'slow');
    } else if (d == 'down') {
        var btmTop = $(document).height() - $(window).height();
        $('html, body').stop().animate({ scrollTop: btmTop }, 'slow');
    }
}

// 외부 js/css 호출
const importExternalFile = (src, type = 'SCRIPT') => new Promise((resolve, reject) => {
    let file = document.createElement(`${type}`);

    if (type == 'SCRIPT') {
        file.type = 'text/javascript';
        file.src = `${src}?d=${Date.now()}`;
    }

    if (type == 'CSS') {
        file.type = 'text/css';
        file.rel = 'stylesheet';
        file.href = `${src}?d=${Date.now()}`;
    }

    document.body.append(file);

    file.addEventListener('load', () => resolve(file));
    file.addEventListener('error', (err) => reject(err));
});

const boardSearchDateAll = function () {
    if ($('#search_date').length > 0) {
        $('#search_date option[value=all]').prop('selected', true);
    }
}

const eToggle = function () {
    $('.eToggle .title').on('click', function () {
        $(this).closest('.eToggle').toggleClass('selected');
    });
}

var intersectionObserver = function () {
    $('.wp-effect').each(function (i, v) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
            isLoop: 'F',
        }

        let rootMargin = $(this).data('root-margin'), threshold = $(this).data('threshold'), isLoop = $(this).data('is-loop');
        $.extend(options, { rootMargin: rootMargin, threshold: threshold, isLoop: isLoop });

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (options.isLoop === 'F' && entry.isIntersecting) {
                    entry.target.classList.toggle("wp-completely", true);
                    observer.unobserve(entry.target);
                }

                if (options.isLoop === 'T') {
                    entry.target.classList.toggle("wp-completely", entry.isIntersecting);
                }
            })
        }, options)

        observer.observe(this)
    });
}

// 해상도별 기기 체크 이벤트
var addClassByBrowserModeEvent = function () {
    const mq = window.matchMedia('(max-width: 1024px)');
    addClassByBrowserMode(mq);
    mq.addEventListener('change', function () {
        addClassByBrowserMode(mq);
    });
}

// 해상도별 기기 체크
var addClassByBrowserMode = function (mq) {
    if (mq.matches) {
        $('html').addClass('res-mobile');
        $('html').removeClass('res-pc');
    } else {
        $('html').removeClass('res-mobile');
        $('html').addClass('res-pc');
    }
}

// 카피라이트
var copyright = function () {
    if ($("body").length > 0) {
        if ($("body").attr("id") == "popup") { return; }
        var style = 'padding:5px 10px; font-family:Verdana; font-size:11px; background:#AAA; color: #fff; border-radius:5px;font-style:italic';
        var _0x9af4 = ["\x25\x63\x20\x23\x23\x20\x4D\x41\x44\x45\x20\x42\x59\x20\x57\x45\x42\x50\x55\x42\x4C\x49\x43\x20\x28\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x65\x62\x70\x75\x62\x6C\x69\x63\x2E\x63\x6F\x2E\x6B\x72\x29\x20\x23\x23", "\x6C\x6F\x67"]; console[_0x9af4[1]](_0x9af4[0], style)
    }
}

// 카테고리 경로 재설정
var cateOverride = function () {
    $('.cate-override a').each(function () {
        var _self = $(this);
        var cateNo = getParamUrl('cate_no', $(this).attr('href'));

        if (cateNo) {
            $.each(setLink, function (i, v) {
                if (parseInt(cateNo) == parseInt(i)) {
                    _self.attr('href', v);
                }
            });
        }
    });
}

// 리뷰 경로 재설정
var setReviewLink = function () {
    $('.xans-layout-boardinfo a').each(function () {
        var href = $(this).attr('href');
        if (href.indexOf('?') > -1) {
            if (getParamUrl('board_no', href) == '4') {
                $(this).attr('href', href.replace('/product/', '/review/'));
            }

            if (getParamUrl('board_no', href) == '3') {
                $(this).attr('href', href.replace('/free/', '/faq/'));
            }
        }
    })
}

// 쿠키 생성
var createCookie = function (name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

// 쿠키 읽기
var readCookie = function (name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

// 쿠키 삭제
var eraseCookie = function (name) {
    createCookie(name, "", -1);
}

function base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function base64Decode(str) {
    return decodeURIComponent(escape(atob(str)));
}

// URL 파라미터 추출
var getParamUrl = function (sKey, url) {
    if (!url) url = location.href;
    var sQueryString = url.substring(url.indexOf('?') + 1);
    var aParam = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField = [];
        for (var i = 0; i < aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
}