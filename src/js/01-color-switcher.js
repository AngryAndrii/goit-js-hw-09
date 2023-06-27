'use strict';
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timerId;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

document.querySelectorAll('button').forEach(el => {
  el.style.textTransform = 'uppercase';
  el.style.fontWeight = 'bold';
  el.style.margin = '50px';
  el.style.width = '100px';
  el.style.height = '50px';
  el.style.border = '2px solid grey';
  el.style.borderRadius = '20%';
  el.backgroundColor = 'white';
  el.style.color = 'black';
});

function goDisabl(el) {
  el.style.opacity = '.3';
  el.disabled = true;
}

function goActive(el) {
  el.style.backgroundColor = 'white';
  el.style.opacity = '1';
  el.disabled = false;
}

goActive(startButton);
goDisabl(stopButton);

startButton.addEventListener('click', function (ev) {
  goDisabl(ev.target);
  goActive(stopButton);
  paintBody();
});

stopButton.addEventListener('click', function (ev) {
  goDisabl(ev.target);
  goActive(startButton);
  clearInterval(timerId);
});

function paintBody() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}
