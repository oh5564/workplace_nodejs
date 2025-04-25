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



