## Thunder-market

### 서비스 소개

<img src="https://user-images.githubusercontent.com/75718898/163774624-70d7e30f-a41a-4b5b-8030-18ec795f012c.png" alt="메인화면"/>
<a href="https://jkp-thunder-market.herokuapp.com">published</a>

> 중고 거래를 할 수 있도록 도와주는 웹 앱

### 기술 스택

> React, TypeScript, Styled-components, Express, mongoDB

### 주요 기능

<h4>회원가입, 로그인</h4>
  <img width="600px" src="https://user-images.githubusercontent.com/75718898/163774207-43c2c983-c06f-4fd1-8faa-bac7353eacec.png" alt="회원가입" />

<h4>상품 업로드</h4>
  <img width="600px" src="https://user-images.githubusercontent.com/75718898/163773901-46a69a32-989d-40eb-8bff-f40fcb45cf4d.png" alt="맥 미니"/>

<h4>프로필 사진 업데이트, 소개글 작성, 상품 정렬, 상점 후기, 팔로잉, 찜</h4>

<h4>최근 본 상품 목록</h4>
  <img width="600px" src="https://user-images.githubusercontent.com/75718898/163774823-8ece9e98-2d48-45c8-9270-48e22534b0f9.png" alt="최근본상품">

<h4>light/dark 모드</h4>
  <img width="600px" src="https://user-images.githubusercontent.com/75718898/163775033-d55dfa4a-5226-47e2-bf34-2345b4a6f0fd.png" alt="토글 모드" />

### TroubleShooting

<h5>서버  에러 나면 서버가 전부 다운되던 문제</h5>

> 원인 ? <br>
> 노드의 메인 스레드는 하나 뿐이므로 메인스레드가 에러로 인해 멈추면 프로세스 자체가 멈춘다.  
> 즉, 전체 서버가 멈춘다.  
> 따라서 에러 처리 방법은 중요하고, 에러 로그가 기록되더라도 작업은 계속 진행 될 수 있게 해야 한다.  
> 해결 ? <br>
> try/catch 문으로 감싸기!

<h5>로그아웃 했을 때 쿠키에 토큰값 삭제해줬는데도 적용이 안되던 문제</h5>

> 원인 ?<br>
> 쿠키에 값을 삭제해주고 브라우저에서 참조하려면 새로고침을 해줘야한다.
> 따라서 react router 를 사용해서 redirect 하는 것이 아닌
> window.location.replace("/"); 를 사용해줘야 한다.

### 개선해야 할 점

> 번개 톡 페이지 추가하기.  
> 쓸데 없는 리렌더링 방지하기 => 렌더링 최적화  
> React 컴포넌트 가독성 높이기 & 컴포넌트 더 체계적으로 정리하기

### 버전

- ver 1.0
