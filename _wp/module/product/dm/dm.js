/**
* 배송시간알리미
* 제작 : 웹퍼블릭
* 버전 : 2.1
* 최종업데이트 : 2024.10.17

 🔖 웹퍼블릭 콘텐츠 라이선스 고지

 1) 이 코드는 오직 웹퍼블릭 디자인 스킨에서만 사용하실 수 있습니다.
 2) 주석 제거 시 해당 코드를 사용하실 수 없습니다.
 3) 대한민국 저작권법 제97조에 의거하여 금지되어 있습니다.
 4) 이를 위반할 경우 저작권법에 의해 법적 책임을 질 수 있으며 발각 시 절대 관용은 없습니다.
*/

$(document).ready(function(){
    
    if (WP_SETUP.상세페이지.배송시간알리미.표시여부.toLowerCase() == 'on'){
        
        let 개별시간, 숨김여부;
        if (!WP_CORE().util.getProdNo()) return; // 상품번호 조회하여 없으면 종료
     
        // 개별 시간 설정
        const prod_time_data = WP_SETUP.상세페이지.배송시간알리미.상품별_시간_설정.filter(function(obj){
        	return obj.상품번호 == WP_CORE().util.getProdNo();
        });
        
        if (prod_time_data.length > 0){
        	개별시간 = prod_time_data[0].시간;
        }
        
        // 숨김 여부 설정
        const prod_disp_data = WP_SETUP.상세페이지.배송시간알리미.상품별_숨김_설정.filter(function(obj){
        	return obj.상품번호 == WP_CORE().util.getProdNo();
        });
        if (prod_disp_data.length > 0) return;
       
		// init
        dm.init({limit: 개별시간 || WP_SETUP.상세페이지.배송시간알리미.배송마감시간});
    }
});

/*******************************************************************************************/

/*******************************************************************************************/
var dm = (function($){
    var defs = {
        limit : '11:00:00'
    }
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var msg1, msg2, msg3
    var serverDate;
    var timer;

    var _init = function(options){

        $.extend(defs, options);

        Date.prototype.format = function(f) {
            if (!this.valueOf()) return " ";

            var weekName = ["일", "월", "화", "수", "목", "금", "토"];
            var d = this;

            return f.replace(/(yyyy|yy|MM|M|dd|d|E|hh|mm|ss|a\/p)/gi, function($1) {
                switch ($1) {
                    case "yyyy": return d.getFullYear();
                    case "yy": return (d.getFullYear() % 1000).zf(2);
                    case "MM": return (d.getMonth() + 1).zf(2);
                    case "M": return (d.getMonth() + 1);
                    case "dd": return d.getDate().zf(2);
                    case "d": return d.getDate();
                    case "E": return weekName[d.getDay()];
                    case "HH": return d.getHours().zf(2);
                    case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                    case "mm": return d.getMinutes().zf(2);
                    case "ss": return d.getSeconds().zf(2);
                    case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                    default: return $1;
                }
            });
        };

        String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
        String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
        Number.prototype.zf = function(len){return this.toString().zf(len);};


        $.ajax({
            type: 'GET',
            cache: false,
            url: '/exec/front/manage/async?module=member&p',
            async : false,
            complete: function (req, textStatus) {
                var dateString = req.getResponseHeader('Date');
                if (dateString.indexOf('GMT') === -1) {
                    dateString += ' GMT';
                }
                serverDate = new Date(dateString);
                //serverDate = new Date("2022/07/15 13:59:50")
                timer = setInterval(_proc, 1000);
            }
        });
    }

    var _pad = function(n, width){
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    var _proc = function(){

        // 차 주 월요일 계산
        var nextWeekMonday = serverDate.getDate() - serverDate.getDay() + ((serverDate.getDay() == 0 ? 1 : 8) + 0);

        // 마지막 일 구하기 위한 Date
        var lastDate = new Date(serverDate.format('yyyy'), serverDate.format('M'), 0);
        var lastDay = parseInt(lastDate.format('dd')); // 마지막 일

        // 차 주 월요일에 대한 결과 (HTML 출력용)
        var nextWeekMondayMsg;

        var temp = nextWeekMonday - lastDay; // 차 주 월요일이 해당 마지막 일과의 차이를 계산

        // 차 주 월요일이 다음달로 넘어갈 경우
        if (temp > 0){
            lastDate.setDate(lastDate.getDate() + temp);
            nextWeekMondayMsg = lastDate.format('M/d(E)');
        }
        // 해당 월의 마지막 일 기준으로 차 주 월요일이 당 월에 포함되어 있을 경우
        else {
            nextWeekMondayMsg = serverDate.format('M') + '/' + nextWeekMonday + '(월)';
        }

        // 제한 시간 Date (14:00)
        var limitDate = new Date(serverDate.format("yyyy/MM/dd") + ' ' + defs.limit);

        // 요일
        var week = serverDate.getDay();
        var isTimeover = (limitDate <= serverDate); // 기준 시간을 넘었을 경우 true 반환

        // 다음 날
        var nextDate = new Date(serverDate.format('yyyy/MM/dd'));
        nextDate.setDate(nextDate.getDate() + 1);
        var nextDayMsg = nextDate.format('M/d(E)');

        // 평일 기준
        if (week > 0 && week < 6){
            // 지정된 시간을 오버했을 경우
            if (isTimeover){
                msg1 = '오늘 출발 ' + defs.limit.substr(0,5) + ' 마감';
                msg2 = '지금 주문 시 <span>내일' + nextDayMsg + '</span> 에 발송됩니다';

                // 금요일인 경우
                if (week == 5){
                    msg1 = '다음 주 월요일 가장 빠르게 출발할게요!';
                    msg2 = '지금 주문 시 <span>다음 주 '+ nextWeekMondayMsg +'</span> 에 발송됩니다.';
                }

                $('.dm').removeClass('active');
                clearInterval(timer);
            }

            // 제한 시간에 아직 도달하지 못했을 경우 (배송 가능한 경우)
            else {
                var days, hours, minutes, seconds;

                var endDistance = limitDate - serverDate;
                if(endDistance > 0){
                    var distance = endDistance;
                    days = Math.floor(distance / _day);
                    hours = Math.floor((distance % _day) / _hour);
                    minutes = Math.floor((distance % _hour) / _minute);
                    seconds = Math.floor((distance % _minute) / _second);
                }

                msg1 = '오늘 출발 상품';
                msg2 = '<span>'+ (_pad(hours,2) + ':' + _pad(minutes,2) + ':' + _pad(seconds,2)) +'</span> 내에 결제 시 오늘 바로 발송됩니다.';

                $('.dm').addClass('active');
            }
        }
        
        // 주말
        if (week == 0 || week == 6){
			msg1 = '오늘 출발 휴무일';
            msg2 = '지금 주문 시 <span>다음 주 '+ nextWeekMondayMsg +'</span> 에 발송됩니다.';

            $('.dm').removeClass('active');
            clearInterval(timer);
        }

        $('.dm .msg1').empty().html(msg1);
        $('.dm .msg2').empty().html(msg2);

        if($('.dm').hasClass('displaynone')){
        	$('.dm').removeClass('displaynone');
        }

        serverDate.setSeconds(serverDate.getSeconds() + (_second / 1000)); // 1초 추가
    }

	return {
    	init : function(options){
        	_init(options);
        }
    }
})($);