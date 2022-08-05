## 1. 프로젝트 설계

### 1.1 요구사항 설정
  패캠 토이프로젝트의 일환으로 실시간 채팅 서비스를 간단한 형태로 제작할 것이다. 인증처리 없이 채팅 내역은 데이터베이스에 저장하고, 이를 활용할 수 있도록 한다.

### 1.2 Frontend
  - Pug : Template engine
  - TailwindCSS : CSS framework, CDN(content delivery network, 콘텐츠 전송 네트워크)으로 링크를 가져와서 사용.

### 1.3 Backend
  - Web Socket : 서버-클라이언트가 실시간으로 정보를 주고받을 수 있는 통신 프로토콜(웹 표준에 의하면 2015년부터 완벽하게 사용하게 되었고 모든 브라우저에서 지원하지 않았을 때는 socket IO나 특수한 방식으로 사실상 polling방식으로 처리하였다고 함.), Live networking
  - Koa : express를 만들었던 팀이 atomic하게 미니멀한 형태로 필요한 메서드만 담은 웹 프레임워크를 제작하였다. 미니멀을 지향하는 현 시대의 관점으로 보면, 좀 더 현대적(?)인 프레임워크
  - MongoDB : 채팅 기록을 브로드캐스팅하게 채팅 창에 존재하는 모든 client에게 동일한 정보를 전달하도록 함.


## 2. 구현 특이사항
  - DB에 접근하기 위해서는 user id와 pw가 필수적인데, DB 관련 환경변수를 직접 노출해서 사용하지 않는다. 개인적인 값들은 '비공개'하여 node에서 관리할 필요가 있다.
  #### 환경변수 설정 방법
  1) npm의 dotenv 패키지를 설치한다.
  ```bash
    npm install dotenv
  ```
  2) root에 .env 파일 생성
  3) .env 파일에 ex) MONGO_PASSWORD = coco 로 환경변수를 생성한다.
  4) .js파일에서 require('dotenv').config()를 선언.
  5) 변수를 할당해서 사용한다.


## 3. 구현 결과
  - 구현된 결과는 페이지가 업데이트 되어도 db 데이터를 그대로 출력한다.
  - User는 새창에서 진입할 때도 broadcast 방식으로 동일한 채팅 내용을 확인할 수 있다.