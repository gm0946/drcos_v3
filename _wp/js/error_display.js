// 에러 발생 시 로딩 기능 오프 및 메세지 표시
window.addEventListener('load', function () {
    setTimeout(function () {
        if (document.querySelector('#wrap').classList.contains('wp-stand-by')) {
            console.error('로딩 최대 시간이 지나 화면을 표시합니다');
            document.querySelector('#wrap').classList.remove('wp-stand-by');
            document.querySelector('#wrap').style.opacity = 1;
            document.querySelectorAll('.wp-effect').forEach(function (el) {
                el.classList.remove('wp-stand-by');
                el.classList.add('wp-completely');
            });
        }
    }, 5000); // 최대 5초 뒤에는 화면 표시
});