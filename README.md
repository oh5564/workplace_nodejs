25.04.21

콜백함수 우선순위

process.nextTick, Promise
 다른 콜백들보다 우선시되기 때문에 마이크로테스크라고 부름

setTimeout(콜백함수, 밀리초) - 밀리초 이후에 콜백함수 실행
setInterval (콜백함수, 밀리초) - 주어진 밀리초마다 콜백함수 반복 실행
setImmediate(콜백함수) - 즉시 실행

clearTimeout(아이디)  setTimeout 취소
cealrInterval(아이디) setInterval 취소
cealrImmediate (아이디) setImmediate 취소

setImmediate 보다 setTimeout(,0)이 더 빨리 실행됨

다이내믹 import 는 promise 라 await을 붙인다
export default 와 module expots는 다르게 저장되어있다
exports 와 module exports 는 같이 쓸 수 없다
module의 경우 바로 참조되지만 default의 경우 default 안에 저장되어있다

html에서 <a> 태그는 기본적으로 클릭시 해당 url로 get 요청을 보낸다


25.04.22

Ajax 자바스크립트와 xml 형식을 이용한 비동기적 정보 교환 기법
?? 연산자 null, undefined만 뒤로 넘어간다
c?.d c가 null이면 스킵 ?.
path.join 절대경로 무시
hash는 되둘릴수 없다

동기로 4개의 파일을 읽는것과 비동기로 4개의 파일을 읽는데 순서를 지키는것의 차이점은
요청이 여러번 있을때 동기의 경우 하나하나 다 해결되야 다음으로 넘어가지만 비동기의 경우 백그라운드에서 한꺼번에 처리가 된다


25.04.23

http 301,302- 리다이렉트


25.04.24

노드 패키지들의 버전은 SemVer 방식의 버전 넘버링을 따른다
a.b.c - a (major), b (minor), c(patch)  
앞에 ^가 붙으면 minor 버전까지만 업데이트
앞에 ~가 붙으면 patch 버전까지만 업데이트


25.04.25

몽고디비 upsert : 있으면 수정하고 없으면 생성하라 (update문의 옵션) updateOne(조건,수정할내용, {upsert:true})

몽구스 / 시퀄라이즈
스키마 / 모델

몽구스 polulate - ObjectId를 자동으로 객체로 바꿔준다


25.04.30

10.5 - get /posts/my , get /posts/hashtag/:title 라우터 추가, api 이용하는 코드 추가
10.6 - 사용량 제한 (express-rate-limit) 구현, deprecated 미들웨어 추가 (오래된 버전 or 사용하면 안되는 라우터에 붙여줌)
10.7 - 브라우저와 서버의 도메인이 일치하지 않으면 기본적으로 요청이 차단되는데 이 문제를 cors 라고 부른다 서버에서 cors 패키지를 설치한후 추가해준다
서버측에서 도메인 모델로 클라이언트의 도메인과 호스트가 일치하는것이 있는지 검사후 cors를 허용해서 다음 미들웨어로 보내고 없다면 cors없이 next를 호출해서 모든 클라이언트의 요청을 허용하는것을 방지한다


25.05.12

coress-env 동적으로 process.env(환경 변수)를 변경할 수 있음, 모든 운영체제에서 동일한 방법으로 환경 변수를 변경 할수 있게됨
sanitize-html XSS(Cross Site Scripting)공격을 막기 위한 패키지 (XSS - 악의적인 사용자가 사이트에 스크립트를 삽입하는 공격)
csurf CSRF(Cross Site Request Forgery)공격을 막기 위한 패키지 (CSRF - 사용자가 의도치 않게 공격자가 의도한 행동을 하게 만드는 공격) ex) 특정 페이지에 방문할 때 저절로 로그아웃되거나 게시글이 써지는 현상
pm2 서버가 에러로 꺼졌을때 서버를 다시 켜줌, 멀티 프로세싱
winston 로그를 파일에 저장시켜줌
helmet hpp 서버의 각종 취약점을 보완해주는 패키지
connect-redis 멀티 프로세스 간 세션 공유를 위해 레디스와 익스프레스를 연결해주는 패키지, 세션 아이디와 실제 사용자 정보를 db에 저장하는데 이때 사용하는게 redis 이다
 require 할 때 session을 인수로 넣어서 호출한다 connect-redis는 express-sesssion에 의존성이 있다
콜백함수 우선순위

process.nextTick, Promise
 다른 콜백들보다 우선시되기 때문에 마이크로테스크라고 부름

setTimeout(콜백함수, 밀리초) - 밀리초 이후에 콜백함수 실행
setInterval (콜백함수, 밀리초) - 주어진 밀리초마다 콜백함수 반복 실행
setImmediate(콜백함수) - 즉시 실행

clearTimeout(아이디)  setTimeout 취소
cealrInterval(아이디) setInterval 취소
cealrImmediate (아이디) setImmediate 취소

setImmediate 보다 setTimeout(,0)이 더 빨리 실행됨

다이내믹 import 는 promise 라 await을 붙인다
export default 와 module expots는 다르게 저장되어있다
exports 와 module exports 는 같이 쓸 수 없다
module의 경우 바로 참조되지만 default의 경우 default 안에 저장되어있다

html에서 <a> 태그는 기본적으로 클릭시 해당 url로 get 요청을 보낸다


25.04.22

Ajax 자바스크립트와 xml 형식을 이용한 비동기적 정보 교환 기법
?? 연산자 null, undefined만 뒤로 넘어간다
c?.d c가 null이면 스킵 ?.
path.join 절대경로 무시
hash는 되둘릴수 없다

동기로 4개의 파일을 읽는것과 비동기로 4개의 파일을 읽는데 순서를 지키는것의 차이점은
요청이 여러번 있을때 동기의 경우 하나하나 다 해결되야 다음으로 넘어가지만 비동기의 경우 백그라운드에서 한꺼번에 처리가 된다


25.04.23

http 301,302- 리다이렉트


25.04.24

노드 패키지들의 버전은 SemVer 방식의 버전 넘버링을 따른다
a.b.c - a (major), b (minor), c(patch)  
앞에 ^가 붙으면 minor 버전까지만 업데이트
앞에 ~가 붙으면 patch 버전까지만 업데이트


25.04.25

몽고디비 upsert : 있으면 수정하고 없으면 생성하라 (update문의 옵션) updateOne(조건,수정할내용, {upsert:true})

몽구스 / 시퀄라이즈
스키마 / 모델

몽구스 polulate - ObjectId를 자동으로 객체로 바꿔준다


25.04.30

10.5 - get /posts/my , get /posts/hashtag/:title 라우터 추가, api 이용하는 코드 추가
10.6 - 사용량 제한 (express-rate-limit) 구현, deprecated 미들웨어 추가 (오래된 버전 or 사용하면 안되는 라우터에 붙여줌)
10.7 - 브라우저와 서버의 도메인이 일치하지 않으면 기본적으로 요청이 차단되는데 이 문제를 cors 라고 부른다 서버에서 cors 패키지를 설치한후 추가해준다
서버측에서 도메인 모델로 클라이언트의 도메인과 호스트가 일치하는것이 있는지 검사후 cors를 허용해서 다음 미들웨어로 보내고 없다면 cors없이 next를 호출해서 모든 클라이언트의 요청을 허용하는것을 방지한다


25.05.12

coress-env 동적으로 process.env(환경 변수)를 변경할 수 있음, 모든 운영체제에서 동일한 방법으로 환경 변수를 변경 할수 있게됨
sanitize-html XSS(Cross Site Scripting)공격을 막기 위한 패키지 (XSS - 악의적인 사용자가 사이트에 스크립트를 삽입하는 공격)
csurf CSRF(Cross Site Request Forgery)공격을 막기 위한 패키지 (CSRF - 사용자가 의도치 않게 공격자가 의도한 행동을 하게 만드는 공격) ex) 특정 페이지에 방문할 때 저절로 로그아웃되거나 게시글이 써지는 현상
pm2 서버가 에러로 꺼졌을때 서버를 다시 켜줌, 멀티 프로세싱
winston 로그를 파일에 저장시켜줌
helmet hpp 서버의 각종 취약점을 보완해주는 패키지
connect-redis 멀티 프로세스 간 세션 공유를 위해 레디스와 익스프레스를 연결해주는 패키지, 세션 아이디와 실제 사용자 정보를 db에 저장하는데 이때 사용하는게 redis 이다
 connect-redis는 express-sesssion에 의존성이 있다
