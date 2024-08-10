/**
* 타임세일
* 제작 : 웹퍼블릭(https://webpublic.co.kr)
* 버전 : 3.6.1
* 최종업데이트 : 2024.05.09
* 웹퍼블릭 개발된 플러그인으로 무단 복제/사용 하실 수 없습니다
* 주석제거 시 플러그인을 사용하실 수 없습니다.
*/
const wpTimer=function(t){let e,n,i=1e3,s=6e4,d=36e5,a=864e5,o=null;const r=function(){t.ajax({type:"GET",url:"/exec/front/manage/async?module=member&p",async:!1,success:function(t,e,n){let i=n.getResponseHeader("Date");-1===i.indexOf("GMT")&&(i+=" GMT"),o=new Date(i)},error:function(){o=new Date,console.warn("Failed to fetch server time. Using local time")}})},l=function(){return"/product/detail.html"==location.pathname.toLowerCase()||t("meta[name=design_html_path]").length>0&&"/product/detail.html"==t("meta[name=design_html_path]").attr("content").toLowerCase()},c=function(){if(t(".timesale-active .prdList__item .discountPeriod").length<=0)return void clearInterval(e);let i=!1;t(".timesale-active .prdList__item .discountPeriod").each((function(e){const s=t(this).closest(".prdList__item");if(!(s.find(".prd_price_sale").length<=0&&s.find(".optimum_discount_price").length<=0&&s.find(".prd_price_sale_css").length<=0&&s.find(".product_price_sale_login_css").length<=0&&s.find(".optimum_discount_price_css").length<=0)){if(0==i&&(o.setSeconds(o.getSeconds()+1),i=!0),s.find(".wp-timer").length<=0){let t='\n\t\t\t<div class="wp-timer">\n\n\t\t\t\t<div class="state"></div>\n\n\t\t\t\t<div class="day wp-time">00</div>\n\n\t\t\t\t<div class="hour wp-time">00</div><span class="sep-hour">:</span>\n\n\t\t\t\t<div class="minute wp-time">00</div> <span class="sep-min">:</span>\n\n\t\t\t\t<div class="second wp-time">00</div>\n\n\t\t\t</div>\n\n\t\t\t';"append"==n.timer.position?s.find(n.timer.target).append(t):s.find(n.timer.target).prepend(t)}m(s,t(this))}}))},p=function(){let n=!1;const i=t(".xans-product-detail.timesale-active"),s=t(".grp_product_detail .prd_promotion_date_css .period").length>0?t(".grp_product_detail .prd_promotion_date_css .period"):t(".prd_promotion_date_css .period");if(!(i.find(".prd_price_sale").length<=0&&i.find(".optimum_discount_price").length<=0&&i.find(".prd_price_sale_css").length<=0&&i.find(".product_price_sale_login_css").length<=0&&i.find(".optimum_discount_price_css").length<=0))if(s.length<=0)clearInterval(e);else{if(0==n&&(o.setSeconds(o.getSeconds()+1),n=!0),i.find(".wp-timer").length<=0){let t='\n\t\t\t<div class="wp-timer">\n\n\t\t\t\t<div class="state"></div>\n\n\t\t\t\t<div class="day wp-time">00</div>\n\n\t\t\t\t<div class="hour wp-time">00</div><span class="sep-hour">:</span>\n\n\t\t\t\t<div class="minute wp-time">00</div> <span class="sep-min">:</span>\n\n\t\t\t\t<div class="second wp-time">00</div>\n\n\t\t\t</div>\n\n\t\t\t';i.find(".headingArea").before(t)}m(i,s)}},m=function(e,n){let i="",s="",d=0;n.find(".content p").each((function(){t(this).text().includes("~")&&(i=t(this).text().split("~")[0].trim(),s=t(this).text().split("~")[1].trim())})),l()&&n.text().includes("~")&&(i=n.text().split("~")[0].trim(),s=n.text().split("~")[1].trim()),i=i.replaceAll("-","/"),s=s.replaceAll("-","/"),i=new Date(i),s=new Date(s);let a=i-o,r=s-o;return a>0?(d=a,void _(e,d,u.WAIT)):r<0?l()?void location.reload():(e.find(".wp-timer").remove(),void n.remove()):r>0?(e.addClass("promition-active"),d=r,void _(e,d,u.RUN)):void 0},u={RUN:"wp-running",WAIT:"wp--wait"},_=function(t,e,n){let o=Math.floor(e/a),r=Math.floor(e%a/d),l=Math.floor(e%d/s),c=Math.floor(e%s/i);t.find(".wp-timer").addClass(n),t.find(".day").text(o),t.find(".hour").text(f(r,2)),t.find(".minute").text(f(l,2)),t.find(".second").text(f(c,2))},f=function(t,e){return(t+="").length>=e?t:new Array(e-t.length+1).join("0")+t};return{init:function(i){!function(i){n=t.extend({timer:{target:".thumbnail",position:"append"}},i),r(),t(".timesale-active").length>0&&(e=l()?setInterval(p,1e3):setInterval(c,1e3))}(i)}}}($);
wpTimer.init();