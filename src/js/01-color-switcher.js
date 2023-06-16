const refs = {
    onButtonStart: document.querySelector('button[data-start]'),
    onButtonStop: document.querySelector('button[data-stop]'),
    bodyBg: document.querySelector('body'),
}

const TIMER = 1000;
let timerID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


refs.onButtonStart.addEventListener('click', colorChangeStart);

function colorChangeStart() {
  refs.onButtonStart.setAttribute("disabled", "disabled");
  refs.onButtonStop.removeAttribute("disabled");
  timerID = setInterval(() => {
      let bgColor = getRandomHexColor();
      refs.bodyBg.style.backgroundColor = bgColor;
    }, TIMER);
}

refs.onButtonStop.addEventListener('click', colorChangeStop);

function colorChangeStop() {
  clearInterval(timerID);
  refs.onButtonStop.setAttribute("disabled", "disabled");
  refs.onButtonStart.removeAttribute("disabled");
}
