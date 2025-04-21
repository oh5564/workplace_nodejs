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
module의 경우 바로 참조되지만 default의 경우 default 안에 저장되어있다
