
/*==========================================================================================================

    🔖 웹퍼블릭 쇼핑몰 설정 화면 🔖

    - 이 화면에서 쇼핑몰의 다양한 기능을 설정할 수 있습니다.
    - 배너를 포함하고 있는 경우 배너매니저를 통해 노출여부를 설정합니다.
    - 설정 후 [저장] 버튼을 눌러야 적용됩니다.


    ## [중요] 수정 참고 사항 ##

    **** 처음일 경우 아래 내용을 반드시 읽어주세요. ****

    - 각 항목 뒤의 값은 백틱(` `) 사이에 입력합니다.
      ex) 색상(항목명) : `내용 입력`,

      Q. 백틱은 키보드 어디를 눌러야 하나요?
        > 키보드 esc 하단 물결(~) 을 쉬프트(shift) 키 없이 누르시면 됩니다.

    - 백틱(` `) 안에 다시 백틱(`)을 넣으면 오류가 발생합니다.
    - 백틱(` `) 안에서 쌍따옴표(") 와 따옴표(') 모두 사용 가능합니다.


    ## 문제 발생 시 해결 방법 ##

    - 수정 도중 문제가 발생한 경우 아래 방법으로 복구할 수 있습니다.
    - 방법 1: /_wp/setup_backup.js 내용을 복사하여 이곳에 붙여넣으면 초기 상태로 복구됩니다.
    - 방법 2: 관리자 화면의 백업/복구 메뉴에서 백업된 디자인을 복구할 수 있습니다.

==========================================================================================================*/


const WP_SETUP = {

    // ============================================================================
    // 색상
    //
    // - 쇼핑몰의 색상을 설정합니다.
    // - 색상은 HEX코드(#000000) 형태와 `orange, yellow` 와 같은 형태 모두 지원합니다.
    // - [ 그라디언트 지원 ] 으로 표시된 영역은 색상을 하나만 설정할 경우 단색으로 노출됩니다.
    //   예시1) 그라디언트 적용 시 [`#743bf9` ,`#f3675c`, `#17a3e7`]
    //   예시2) 단색 적용 시 [`#743bf9`]
    // ============================================================================

    색상: {

        헤더영역: {

            // 회원가입 포인트 말풍선 색상을 설정합니다. (비회원에서만 노출됩니다)
            회원가입_포인트_말풍선: `#f3675c`,

            // 상단 오른쪽 장바구니 아이콘에 표시되는 장바구니 카운트의 배경색을 지정합니다.
            장바구니_카운트_배경: `#f3675c`,

            // 브라우저 상단에 스크롤 위치를 표시해주는 프로그레스바의 색상을 지정합니다.
            스크롤_와처: `#f3675c`,
        },

        상품목록: {

            // 상품 목록의 할인율(%) 의 색상을 지정합니다.
            할인율: `#f3675c`,

            // `폰트 색상`은 관리자 > `상품정보표시 설정`을 통해 가능합니다.
        },

        하단영역: {

            // 하단 타이틀 영역의 색상을 지정합니다.
            타이틀: `#888888`,

            // 하단 컨텐츠 영역의 색상을 지정합니다.
            컨텐츠: `#000000`,

            // 하단 배경 색상을 지정합니다.
            배경: `#f8f8f8`,
        },

        상세페이지: {

            // 상세페이지 바로구매 버튼 색상을 지정합니다.
            구매버튼: `#f3675c`,

            // 상세페이지 할인율(%) 색상을 지정합니다.
            할인율: `#f3675c`,

            // 간략설명에 b 태그로 강조한 영역의 색상을 지정합니다.
            간략설명_강조_표시: `#fb9804`,

            // 배송알리미 [ 그라디언트 지원 ]
            // - 무료배송 프로그레스바 색상을 지정합니다.
            배송알리미_프로그레스바: [`#f3aa5c`, `#f3675c`],
        },

        타임세일: {

            // 타임세일 > 타이머 [ 그라디언트 지원 ]
            // - 타이머의 배경색을 변경합니다.
            타이머_배경: [`#f3aa5c`, `#f3675c`],
        },

        게시판: {

            // 카테고리로 등록한 탭의 활성화 시 배경색을 지정합니다. (이벤트/자주묻는질문)
            카테고리_배경: `#f3675c`,

            // 리뷰의 별(평점) 색상을 지정합니다.
            리뷰: {
                별: `#eac100`,
            }
        },

        // 버튼 포인트 컬러
        버튼_포인트_컬러: `#f3675c`,

        로딩: {

            // 로딩 아이콘 색상을 지정합니다.
            첫번째: `#f3675c`,
            두번째: `#f3aa5c`,
        },
    },



    // ============================================================
    // 폰트
    //
    // - 쇼핑몰의 폰트를 설정합니다.
    // ============================================================

    폰트: {

        // 구글폰트를 호출하여 사용할 수 있습니다.
        // 구글폰트 바로가기 : https://fonts.google.com/

        // 구글폰트 표시여부
        // - on  : 지정된 폰트를 우선으로 적용합니다.
        // - off : 샘플몰과 동일한 폰트(pretendard)를 적용합니다.
        // ※ 활성화 시 폰트 로딩으로 인해 1초 미만의 지연이 발생합니다.
        구글폰트_표시여부: `off`,

        // 구글폰트 목록
        // - 폰트 명을 확인하여 `구글폰트_목록` 에 넣어주세요.
        // - 입력하실 때에는 띄어쓰기와 대소문자에 주의해주세요.
        구글폰트_목록: [
            { name: `Gowun Batang` }, // 구글폰트_표시여부를 `on` 하면 해당 폰트가 적용됩니다.
        ],

        // - 상품 목록의 기본 항목에 대한 사이즈를 설정합니다.
        // - 표시(노출) 설정은 `쇼핑몰 설정 > 상품 설정 > 상품 보기 설정 > 상품 정보 표시 설정` 에서 설정해주세요.
        // - 아래 사이즈 설정에 없는 부분은 `상품 정보 표시 설정`의 폰트 사이즈를 통해 설정이 가능합니다.
        목록: {

            PC: {
                제목: `17px`,
                요약설명: `14px`,
                소비자가: `14px`,
                판매가: `16px`,
                할인판매가: `16px`,
                할인율: `16px`,
            },

            M: {
                제목: `13px`,
                요약설명: `13px`,
                소비자가: `13px`,
                판매가: `13px`,
                할인판매가: `13px`,
                할인율: `13px`,
            },
        },

        // 상품 상세 기본 항목에 대한 사이즈를 설정합니다. (이외 설정은 상품 목록과 동일합니다)
        상세: {

            PC: {
                제목: `25px`,
                요약설명: `15px`,
                소비자가: `15px`,
                판매가: `21px`,
                할인판매가: `21px`,
                할인율: `21px`,
            },

            M: {
                제목: `17px`,
                요약설명: `14px`,
                소비자가: `14px`,
                판매가: `20px`,
                할인판매가: `20px`,
                할인율: `20px`,
            },
        },
    },



    // ============================================================
    // 로고
    //
    // - 로고의 사이즈 설정를 설정합니다.
    // ============================================================

    로고: {

        // [PC_가로폭] PC 버전일 때 로고의 가로폭을 설정합니다.
        PC_가로폭: `140px`,

        // [PC_스크롤시] PC 버전에서 스크롤 시 노출되는 로고의 가로폭을 설정합니다.
        PC_스크롤시: `95px`,

        // [M_가로폭] 모바일 버전 로고의 가로폭을 설정합니다.
        M_가로폭: `95px`,
    },



    // ============================================================
    // 회원가입 말풍선(헤더영역)
    //
    // - 로그인 전 회원가입 상단에 표시되는 말풍선을 설정합니다.
    // - 회원가입 시 적립될 포인트 금액을 입력하세요.
    // - 실제 적립금 지급은 관리자에서 설정합니다.
    //   (쇼핑몰 설정 > 고객 설정 > 회원 정책 설정 > 적립금 설정 내 '회원가입 적립금 설정')
    // ============================================================

    회원가입_말풍선: {

        // [표시여부]
        // on: 표시함, off: 숨김
        표시여부: `on`,

        // 말풍선에 표시될 문구를 입력합니다.
        문구: `+5,000P`,
    },



    // ============================================================
    // 고정 메뉴 링크 설정
    //
    // 고정메뉴의 표시여부 및 링크를 설정합니다.
    // ============================================================

    고정메뉴: {

        // [표시여부]
        // on: 표시함, off: 숨김

        // [링크주소] 도메인을 제외한 나머지 주소를 입력합니다.
        //  - 도메인은 http 또는 https로 시작해서 .com, .net. co.kr 등으로 끝나는 영역을 의미합니다.
        //  -  ex) https://test.cafe24.com, https://naver.com, https://webpublic.co.kr
        //
        // 입력예 : `/brand/index.html`

        브랜드스토리: {
            표시여부: `on`,
            링크주소: `/brand/`
        },

        타임특가: {
            표시여부: `on`,
            링크주소: `/timesale/`
        },

        리뷰: {
            표시여부: `on`,
            링크주소: `/board/review/list.html?board_no=4`
        },

        이벤트: {
            표시여부: `on`,
            링크주소: `/board/gallery/list.html?board_no=8&category_no=1`
        },

        멤버십: {
            표시여부: `on`,
            링크주소: `/membership.html`
        },

        커뮤니티: {
            표시여부: `on`,
            링크주소: `/board/free/list.html?board_no=1`
        }
    },



    // ============================================================
    // 상품 분류 - 경로 재설정
    //
    // - 상품 분류로 등록한 분류 클릭 시 지정한 페이지로 이동할 때 사용합니다.
    // - 사용하지 않을 경우 안의 {} 영역을 주석처리 또는 삭제합니다.
    // - 반드시 [] 는 유지해주셔야 오류가 발생하지 않습니다.
    // ============================================================

    상품분류_링크_재설정: [

        // ⬇️ 아래는 43 번 카테고리를 갤러리로 이동하는 예제입니다.

        {
            // 분류번호: `43`,
            // 링크: `/board/gallery/list.html?board_no=8&category_no=1`,
        },
    ],



    // ============================================================
    // 최근검색어(검색창)
    //
    //  - 상단 검색창 활성화 시 하단에 최근검색어 노출 여부를 설정합니다.
    // ============================================================

    최근검색어: {

        // on: 표시함, off: 숨김
        표시여부: `on`,

        // 최근 검색어 목록에 최대 몇개 표시할지 설정합니다.
        노출개수: 10,
    },



    // ============================================================
    // 푸터(하단영역) 정보 설정
    // ============================================================

    푸터: {

        고객센터: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 쇼핑몰 대표 번호를 입력합니다.
            // - 추가 시 전화번호 한 줄을 복사하여 아래에 추가하세요.
            // - 전화번호 삭제 시 내용만 삭제하세요.
            // - [ ] 는 유지해주셔야 합니다.
            대표번호: [
                `1644-1234`,
                //`1644-0002`,
            ],

            // CS 운영시간을 입력합니다.
            // `평일 .. 휴무입니다. ` 의 글자를 수정하여 사용하세요.
            운영시간: `
                평일 : 09:00 ~ 17:30
                점심시간 : 12:00 ~ 13:00
                주말 및 공휴일은 휴무입니다.
		    `
        },

        계좌정보: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 은행 계좌 정보를 입력합니다.
            // 여러개 등록이 가능하며 ` {...}, ` 영역을 복사하여 추가 가능합니다.
            // 삭제하실 경우 {...} 부분을 삭제 또는 주석 처리 해주시면 됩니다. (매뉴얼 참조)

            계좌목록: [
                {
                    은행: `국민`,
                    계좌번호: `123456-12-000001`,
                    예금주: `예금주 : 주식회사 바이센트`,
                },
                {
                    은행: `신한`,
                    계좌번호: `000000-00-000000`,
                    예금주: `예금주 : OOO`,
                },
            ],
        },

        교환반품: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 교환반품주소를 입력합니다.
            주소: `서울특별시 강남구 도산대로 123`,
        },

        에스크로: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 사용하고 계신 PG사의 정보를 입력합니다.
            텍스트: `[KG 에스크로 가입사실 확인]`,
            링크주소: `https://www.inicis.com/`
        }

        // `SNS 아이콘` 영역은 `관리자 > 앱 > 웹퍼블릭 배너매니저`를 통해 설정이 가능합니다.

    },



    // ============================================================
    // 퀵메뉴 설정 (우측 하단)
    // ============================================================

    퀵메뉴: {

        // [최근본상품 표시 여부]
        // on: 표시함, off: 숨김
        최근본상품_표시여부: `on`,


        // [최상단으로_이동_표시여부] 최상단(⬆️) 으로 내리는 버튼의 표시 여부
        // on : 표시함, off : 숨김
        최상단으로_이동_표시여부: `on`,


        // [최하단으로_이동_표시여부] 최하단(⬇️) 으로 내리는 버튼의 표시 여부
        // on : 표시함, off : 숨김
        최하단으로_이동_표시여부: `off`,


        // 퀵메뉴 위치를 설정합니다.
        포지션: {

            // 브라우저 하단으로부터 지정한 px 만큼 거리가 조정됩니다.
            기본값: {
                pc: `20px`,
                m: `20px`,
            },

            // 상세페이지에서는 위치를 따로 지정합니다. 기본값과 동일할 경우 0px로 설정하세요.
            상세페이지: {
                pc: `20px`,
                m: `55px`,
            },

            // 네이버 앱(모바일)에서의 퀵메뉴 위치를 설정합니다.
            // 앱에 기본으로 최상위로 이동 버튼이 있어 최상단/최하단 이동 버튼은 자동으로 숨김 처리됩니다.
            네이버앱: `55px`,

        },

        // [카카오채널],[네이버톡톡] 영역은 `관리자 > 앱 > 웹퍼블릭 배너매니저`를 통해 설정이 가능합니다.
    },



    // ============================================================
    // 할인율
    //
    // - 할인율(%) 의 노출여부를 설정합니다.
    // * 모든 페이지에 일괄 적용됩니다. (메인, 상세, 타임특가 ..)
    // ============================================================

    할인율: {

        // on: 표시함, off: 숨김
        표시여부: `on`,
    },



    // ============================================================
    // 스크롤 와처
    //
    // - 브라우저 상단에 스크롤 위치를 표시해주는 프로그레스 바(pregress bar)를 설정합니다.
    // ============================================================

    스크롤_와처: {

        // on : 표시함, off : 숨김
        표시여부: `on`,
    },



    // ============================================================
    // 로딩 설정
    // ============================================================

    로딩: {

        // on : 표시함, off : 숨김
        표시여부: `on`,

        // 로딩 지연 시간을 설정합니다.
        // 화면 전환 효과 200 (0.2초)가 기본 포함되어 있습니다.
        //
        // ex) 딜레이를 100(0.2초) 설정 시 화면전환 효과 시간까지 포함하여
        //     실제 화면 표시 되는 시간은 약 0.3초가 소요됩니다.
        딜레이: `100`,
    },



    메인페이지: {

        // ============================================================
        // 메인 팝업
        //
        //  - 지정된 시간에 노출될 수 있도록 시간을 설정할 수 있습니다.
        // ============================================================

        메인팝업: {

            // `표시여부` 는 `관리자 > 앱 > 웹퍼블릭 배너매니저`를 통해 설정이 가능합니다.

            // 닫힘상태 유지일을 설정합니다.
            // 타이머 시작 ~ 종료 사이일 중 사용자가 `0일간 보지않기`를 클릭하였을 때 지정한 일수 이 후에 다시 팝업이 노출됩니다.
            닫기일수: `1`,

            // 닫기 버튼의 텍스트를 설정합니다.
            닫기버튼: {
                왼쪽_텍스트: `오늘은 그만 볼래요`,
                오른쪽_텍스트: `팝업닫기`
            }
        },


        // ============================================================
        // 메인 슬라이드 배너 (배너매니저)
        //
        //  ※ 배너그룹명: [메인] 슬라이드
        // ============================================================

        메인슬라이드: {

            // 슬라이드 애니메이션 전환 효과를 설정합니다. (효과는 fade, slide, flip, coverflow 중 선택하여 입력)
            이펙트: `fade`,

            // 슬라이드의 자동 재생 기능을 활성화합니다.
            자동재생: {

                // 자동재생여부를 설정합니다.
                // on : 자동, off: 수동
                자동재생여부: `on`,

                // 슬라이드가 멈춰있는 시간을 입력하세요. (100 = 0.1초, 1000 = 1초)
                // * 해당 기능은 [자동재생여부] 가 `on` 인 상태에서만 유효합니다.
                대기시간: `3000`,

                // 사용자가 슬라이드를 움직였을 때 자동 재생 유지 여부를 설정하세요.
                // on : 자동재생 유지, off : 자동재생 해제
                인터렉션: `on`,
            },

            // 페이지네이션 설정입니다
            페이지네이션: {

                // 노출 여부를 설정합니다.
                // on : 표시함, off: 숨김
                표시여부: `on`,

                // 스타일을 지정합니다.
                // `bullets`  설정 시 ● ○ ○
                // `progressbar` 설정 시 __________
                // `fraction` 설정 시 1 / 3  (현재페이지 / 총 페이지)
                스타일: `progressbar`,
            },

            // `이전 / 다음` 화살표의 표시 여부를 설정합니다.
            // on : 표시함, off: 숨김
            화살표: `on`,

        },


        // ============================================================
        // 타임특가 (슬라이드 상품진열)
        // ============================================================

        타임특가: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `타임특가`,
            서브타이틀: `지금이 쇼핑찬스! 놓치면 후회하는 특가상품`,

            // 시계 아이콘 표시여부를 설정합니다.
            // on: 표시함, off: 숨김
            시계아이콘: `on`,

            // 한 번에 보여질 슬라이드 진열 수를 설정합니다.
            // -  PC(PC), 테블릿(TABLET), 모바일(M) 해상도에 맞는 진열 개수를 설정하세요.
            진열개수: {
                PC: `4`,
                TABLET: `2.8`,
                M: `1.7`,
            },

            // 슬라이드의 자동 재생 기능을 활성화합니다.
            자동재생: {

                // 자동재생여부를 설정합니다.
                // on : 자동, off: 수동
                자동재생여부: `on`,

                // 슬라이드가 멈춰있는 시간을 입력하세요. (100 = 0.1초, 1000 = 1초)
                // * 해당 기능은 [자동재생여부] 가 `on` 인 상태에서만 유효합니다.
                대기시간: `3000`,

                // 사용자가 슬라이드를 움직였을 때 자동 재생 유지 여부를 설정하세요.
                // on : 자동재생 유지, off : 자동재생 해제
                인터렉션: `on`,
            },
        },



        // ============================================================
        // 배너 (1x1) (배너매니저)
        //
        //  - 배너그룹명: [메인] 배너 (1x1)
        //  ※ 표시여부, 텍스트 등은 `관리자 > 앱 > 웹퍼블릭 배너매니저`를 통해 설정이 가능합니다
        // ============================================================

        띠배너_1X1: {

            // 슬라이드 애니메이션 전환 효과를 설정합니다. (효과는 fade, slide, coverflow 중 선택하여 입력)
            이펙트: `fade`,

            // 슬라이드의 자동 재생 기능을 활성화합니다.
            자동재생: {

                // 자동재생여부를 설정합니다.
                // on : 자동, off: 수동
                자동재생여부: `on`,

                // 슬라이드가 멈춰있는 시간을 입력하세요. (100 = 0.1초, 1000 = 1초)
                // * 해당 기능은 [자동재생여부] 가 `on` 인 상태에서만 유효합니다.
                대기시간: `3000`,

                // 사용자가 슬라이드를 움직였을 때 자동 재생 유지 여부를 설정하세요.
                // on : 자동재생 유지, off : 자동재생 해제
                인터렉션: `on`,
            },

        },



        // ============================================================
        // 베스트셀러 (슬라이드 상품진열)
        // ============================================================

        베스트셀러: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `베스트셀러`,
            서브타이틀: `바이센트의 베스트 아이템을 만나보세요!`,

            // 한 번에 보여질 슬라이드 진열 수를 설정합니다.
            // -  PC(PC), 테블릿(TABLET), 모바일(M) 해상도에 맞는 진열 개수를 설정하세요.
            진열개수: {
                PC: `4`,
                TABLET: `2.8`,
                M: `1.7`,
            },

            // 슬라이드의 자동 재생 기능을 활성화합니다.
            자동재생: {

                // 자동재생여부를 설정합니다.
                // on : 자동, off: 수동
                자동재생여부: `off`,

                // 슬라이드가 멈춰있는 시간을 입력하세요. (100 = 0.1초, 1000 = 1초)
                // * 해당 기능은 [자동재생여부] 가 `on` 인 상태에서만 유효합니다.
                대기시간: `3000`,

                // 사용자가 슬라이드를 움직였을 때 자동 재생 유지 여부를 설정하세요.
                // on : 자동재생 유지, off : 자동재생 해제
                인터렉션: `on`,
            },

        },



        // ============================================================
        // 라인업 제품 (배너매니저 + 상품진열)
        //
        //  - 배너그룹명: [메인] 라인업제품
        //  ※ 표시여부, 텍스트 등은 `관리자 > 앱 > 웹퍼블릭 배너매니저`를 통해 설정이 가능합니다
        // ============================================================

        라인업제품: {

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `라인업 제품`,
            서브타이틀: `라인업 카테고리 제품들을 확인해보세요`,

            // - PC(PC), 테블릿(TABLET), 모바일(M) 해상도에 맞는 진열 개수를 설정하세요
            // - 상품진열이 3 개이므로 각 항목은 3 이하로 입력해주세요.
            진열개수: {
                PC: `3`,
                TABLET: `1.9`,
                M: `1.3`
            },
        },



        // ============================================================
        // 뜨고있는제품 (상품진열)
        // ============================================================

        상품진열1: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `뜨고 있는 제품`,
            서브타이틀: `입소문으로 꾸준히 사랑받는 제품`,

            // 한 줄에 몇 개의 상품을 노출할지 설정합니다.
            // PC의 경우 3 ~ 5, 모바일의 경우 1 ~ 3 범위 내에서 설정이 가능합니다.
            진열개수: {
                PC: `4`,
                M: `2`,
            },
        },



        // ============================================================
        // 이벤트 배너 (배너매니저)
        //
        //  - 배너그룹명: [메인] 이벤트 배너
        //  ※ 표시여부, 텍스트 등은 `관리자 > 앱 > 웹퍼블릭 배너매니저`를 통해 설정이 가능합니다
        // ============================================================

        이벤트배너: {

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `이벤트`,
            서브타이틀: `진행중인 이벤트를 놓치지 마세요`,

            // 슬라이드의 자동 재생 기능을 활성화합니다.
            자동재생: {

                // 자동재생여부를 설정합니다.
                // on : 자동, off: 수동
                자동재생여부: `on`,

                // 슬라이드가 멈춰있는 시간을 입력하세요. (100 = 0.1초, 1000 = 1초)
                // * 해당 기능은 [자동재생여부] 가 `on` 인 상태에서만 유효합니다.
                대기시간: `3000`,

                // 사용자가 슬라이드를 움직였을 때 자동 재생 유지 여부를 설정하세요.
                // on : 자동재생 유지, off : 자동재생 해제
                인터렉션: `on`,
            },
        },


        // ============================================================
        // MD's Pick (상품진열 + 배너매니저)
        //
        //  - 배너그룹명: [메인] 배너 (MD's pick)
        //  ※ 표시여부, 텍스트 등은 `관리자 > 앱 > 웹퍼블릭 배너매니저`를 통해 설정이 가능합니다
        // ============================================================

        배너MD: {

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `MD’s Pick`,
            서브타이틀: `함께 나누고 싶은 특별한 기획전`,

        },



        // ============================================================
        // 신상품 영역 (상품진열)
        // ============================================================

        상품진열2: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `신상품`,
            서브타이틀: `누구보다 빠르게 주목해야 할 신상`,

            // 한 줄에 몇개의 상품이 노출할지 설정합니다.
            // PC의 경우 3 ~ 5, 모바일의 경우 1 ~ 4 범위 내에서 설정이 가능합니다.
            진열개수: {
                PC: `4`,
                M: `2`,
            },
        },


        // ============================================================
        // 추가상품진열1 (상품진열)
        // ============================================================

        상품진열3: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `추가상품진열1`,
            서브타이틀: `서브타이틀을 입력해 주세요.`,

            // 한 줄에 몇 개의 상품을 노출할지 설정합니다.
            // PC의 경우 3 ~ 5, 모바일의 경우 1 ~ 4 범위 내에서 설정이 가능합니다.
            진열개수: {
                PC: `3`,
                M: `2`,
            },
        },


        // ============================================================
        // 추가상품진열2 (상품진열)
        // ============================================================

        상품진열4: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `추가상품진열2`,
            서브타이틀: `서브타이틀을 입력해 주세요.`,

            // 한 줄에 몇 개의 상품을 노출할지 설정합니다.
            // PC의 경우 3 ~ 5, 모바일의 경우 1 ~ 2 범위 내에서 설정이 가능합니다.
            진열개수: {
                PC: `3`,
                M: `2`,
            },
        },


        // ============================================================
        // 리뷰 영역
        // ============================================================

        리뷰: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `포토리뷰`,
            서브타이틀: `고객님들이 직접 작성한 리뷰를 확인해보세요`,
        },


        // ============================================================
        // 공지사항(게시판) 영역
        // ============================================================

        공지게시판: {

            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 타이틀, 서브타이틀을 입력합니다.
            // 내용이 없을 경우는 텍스트를 삭제해주세요.
            타이틀: `공지사항`,
        },


        // ============================================================
        // 메인 하단팝업 (배너매니저)
        //  - 사용자에게 깜짝 이벤트와 같은 형식의 광고를 표시할 때 사용하는 기능입니다.
        // - 표시여부는 `관리자 > 앱 > 웹퍼블릭 배너매니저` `[메인] 하단광고팝업` 그룹를 통해 설정이 가능합니다.
        // ============================================================

        하단팝업: {

            // [연속표시] 최하단으로 이동하였을 경우 표시 여부를 설정합니다.
            // on  : 무조건 최하단에 스크롤이 도달할 경우 표시합니다.
            // off : 최초 1회 노출됩니다. 브라우저를 종료한 후 다시 접속하면 노출됩니다.
            연속표시: `off`,
        },
    },



    상세페이지: {

        탭: {

            // 탭 메뉴 영역의 표시 여부를 설정합니다.
            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 탭의 진열 순서 및 노출 여부 설정합니다.
            // 진열 순서 변경은 항목을 위/아래로 이동해주세요.
            // 숨기고자 하는 탭은 주석처리(//) 또는 해당 줄을 삭제해주세요.
            // 설정이 어려우실 경우 매뉴얼을 한 번 확인해주세요.
            진열: [
                `prdDetail`, // 제품상세
                `prdReview`, // 리뷰
                `prdInfo`,   // 상품구매안내
                `prdQnA`,    // Q&A
            ]
        },


        // ============================================================
        // 무료배송알리미 설정
        //
        //  - 아래 지정한 금액을 기준으로 무료배송 여부를 표시합니다.
        // ============================================================

        무료배송알리미: {

            // 무료배송알리미의 표시 여부를 설정합니다.
            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 무료배송알리미에서 사용할 배송비를 [숫자]만 입력합니다.
            배송비: `3000`,

            // 무료배송알리미에서 사용할 무료배송금액를 [숫자]만 입력합니다.
            무료배송금액: `50000`,
        },


        // ============================================================
        // 구매수량알리미 설정 (오늘 00명이 주문했어요!)
        //
        //  - 판매자가 지정한 최소값과 최대값의 범위의 숫자가 시간이 지남에 따라 자동으로 증가하며 노출됩니다.
        //
        //  [ 주의사항 ]
        //  - 해당 데이터는 실제 상품 데이터가 아닙니다.
        //    구매를 촉진하기 위한 마케팅 기능으로 실데이터 연동이 필요하신 분은 off 해주시기 바랍니다.
        // ============================================================

        구매수량알리미: {

            // 노출상품 목록에 있는 상품들은 구매수량알리미가 표시됩니다.
            // 각 상품별로 최대 / 최소값을 지정할 수 있습니다.
            // 숨기고자 하실 경우 노출상품 데이터만 지워주세요.

            노출상품: [
                // { 상품번호: `35`, 최소값: `103`, 최대값: `199` },
                // { 상품번호: `36`, 최소값: `113`, 최대값: `130` },
            ],

            // 구매수량이 갱신되는 업데이트시간 시간을 설정합니다. `분` 단위로 입력하세요.
            업데이트시간: `15`, // (분)
        },


        // ============================================================
        // 배송시간알리미 설정
        //
        //  - 배송마감시간을 표시합니다.
        // ============================================================

        배송시간알리미: {

            // 배송시간알리미의 표시 여부를 설정합니다.
            // on: 표시함, off: 숨김
            표시여부: `on`,

            // 배송이 마감되는 시간을 시:분 포맷으로 입력합니다. (24시간 형식)
            // - 입력 예 : 마감이 오후 3시 30분일 경우 15:30 과 같이 입력합니다.
            // - 특정상품에 개별로 시간을 설정할 경우, 관리자의 상품정보에서 [배송알리미 개별 시간 설정] 에 시:분(24시간 형식) 으로 입력해주세요. (아래 배송마감시간 형식과 동일하게)
            배송마감시간: `15:00`,

            // 특정 상품에만 노출을 하지 않고자 할 경우, 관리자의 상품정보에서 [배송알리미 개별 숨김 여부] 에 "Y" 를 넣어주세요.

        },


        // ============================================================
        // 장바구니알리미 설정
        //
        //  - 해당 상품을 담은 고객의 수를 실시간으로 표시합니다.
        //  - 데이터는 30초 마다 갱신되며 최대 5분 유지됩니다.
        // ============================================================

        장바구니알리미: {

            // 장바구니알리미 표시 여부를 설정합니다.
            // on: 표시함, off: 숨김
            // 참고: 회원 전용 폐쇄몰에서는 이용이 불가합니다.

            표시여부: `on`,
        },

        // ============================================================
        // 카카오톡 API 키 설정
        //
        //  - `상세페이지 > 공유하기 > 카카오톡 공유하기` 시 사용되는 키입니다.
        //  - key 발급: 카카오개발자센터(https://developers.kakao.com/)
        // ============================================================

        kakaoAPI: `48b9c827ddeea9f0b9539e777ba45930`,

    },



    // ============================================================
    // 리뷰 스타일 설정
    //
    //  - 리뷰 목록과 상세페이지의 리뷰 스타일을 변경합니다.
    //  * 메인페이지 하단 리뷰는 갤러리형으로 변경되지 않습니다.
    // ============================================================

    리뷰: {

        // 리뷰게시판의 목록 스타일을 설정합니다.
        목록페이지: {

            // [버튼표시]
            //  이미지 / 리스트 형을 선택하는 버튼의 노출여부를 지정합니다.
            //
            // - 버튼표시 설정이 `on` 인 경우
            //   > 해당 설정의 우선순위는 사용자가 선택한 스타일 1순위, 관리자가 설정한 스타일이 2순위가 됩니다.
            //
            // - 버튼표시 설정이 `off` 인 경우
            // - 관리자가 설정한 스타일이 우선 적용됩니다.
            버튼표시: `on`,


            // 목록 출력 개수 설정
            // "관리자 > 게시판관리 > 리뷰게시판(id:4) 에서 [페이지당목록수] 를 변경해주세요.

            // 리뷰 게시판 목록의 형태를 갤러리와 리스트 형태 중 선택할 수 있습니다.
            // 입력 예: gall (갤러리 형), list (리스트 형)
            스타일: `gall`,
        },


        // ============================================================
        // 상세페이지
        // ============================================================

        상세페이지: {

            // 상세 출력 개수 설정
            // "관리자 > 게시판관리 > 리뷰게시판(id:4) 에서 [상품상세정보 -> 페이지당목록수] 를 변경해주세요.

            // 리뷰 게시판 목록의 형태를 갤러리와 리스트 형태 중 선택할 수 있습니다.
            // 입력 예: gall (갤러리 형), list (리스트 형)
            스타일: `list`,
        }
    },



    // ============================================================
    // 장바구니
    // ============================================================

    장바구니: {

        // 장바구니 페이지의 국내배송상품 , 해외배송상품 탭 영역의 표시여부를 설정합니다.
        탭: `off`,
    }
}