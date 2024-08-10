/**
* 상단 배너 플러그인
* 제작 : 웹퍼블릭(http://webpublic.co.kr)
* 디자인퍼블릭에서 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/
$(document).ready(function(){
    if ($('#tbanner .swiper-slide').length  <= 1) return;
    var tbanner = new Swiper('#tbanner',{
        direction: 'vertical',
        speed: 600, // 슬라이드 애니메이션 속도 (1000 = 1초)
        autoplay : {
            delay:3000, // 자동재생 시 딜레이(1000 = 1초)
            disableOnInteraction: false, // true: 사용자 조작 시 자동 재생 멈춤 false : 조작 여부에 상관없이 자동재생 상태 유지
        },
        loop:true, // 반복 여부 (true : 맨 끝 슬라이드 도착 시 이어서 처음으로 이동합니다, false : 맨 끝 슬라이드 도착 시 더 이상 이동하지 않습니다)
        grabCursor: true,
        roundLengths : true,
    });
});