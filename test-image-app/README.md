# TEST IMAGE APP

### 프로젝트 개요

- 키워드로 검색해서 나온 이미지를 원하는 사이즈로 리사이징해서 반환하는 서버


### 주요 기술 스택

  - unsplash-js / 저작권 FREE 이미지 사이트 API
    [unsplash-github](https://github.com/unsplash/unsplash-js)
  - node-fetch / API 사용 및 이미지 가져옴
    [node-fetch-github](https://github.com/node-fetch/node-fetch)
  - sharp / 이미지 리사이징
    [Sharp](https://github.com/lovell/sharp)


### 주요 이슈 

  #### node-fetch version 업데이트에 따른 require() 에러

  - node-fetch의 package.json을 보면 type이 module로 설정되어 있다. 따라서 ES 자바스크립트 파일이 ES 모듈로 작성되어 있어도 모듈의 타입을 CommonJS 모듈로 정의했다면 모듈을 가져와서 default 프로퍼티에 넣어서 새 객체로 감싸서 정의한다.
  - 그런데 이게 동작하지 않았다. 따라서 다음 Error를 발생시켰다.


  - [ERR_REQUIRE_ESM] :  타 모듈에서 가져온 객체가 undefined 혹은 {default: /* ... */}와 같은 형태의 객체가 되어 에러발생
  - CJS(CommonJS) 와 ESM(ES Module)는 다르게 실행됨
    *- CJS ; 동적*
    *- ESM ; 정적*
  - [왜 CommonJS와 ES Modules는 함께 쓸 수 없는가 | 내 라이브러리에서 ESM과 CJS를 동시에 지원하는법](https://roseline.oopy.io/dev/translation-why-cjs-and-esm-cannot-get-along)
  

  - npm 문서를 확인하면 다음을 알 수 있다.
  - [node-fetch](https://www.npmjs.com/package/node-fetch)
  
    > node-fetch from v3 is an ESM-only module - you are not able to import it with require().
    > If you cannot switch to ESM, please use v2 which remains compatible with CommonJS. 
    > Critical bug fixes will continue to be published for v2.

  ```
  npm install node-fetch@2
  ```

  - node-fetch 패키지를 불러올 때 C:/Users/JH/Desktop/workspaces/test-app/node_modules/node-fetch/@types/index
  - node-fetch@2는 "C:/Users/JH/AppData/Local/Microsoft/TypeScript/4.7/node_modules/@types/node-fetch/index"
    이므로 경로가 다르게 설정되어 있음을 알 수 있다.