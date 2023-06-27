'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('input#datetime-picker');

const outDays = document.querySelector('[data-days]');
const outHours = document.querySelector('[data-hours]');
const outMinutes = document.querySelector('[data-minutes]');
const outSeconds = document.querySelector('[data-seconds]');

const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Ви вибрали дату в минулому, оберіть іншу!');
      return;
    }
    startButton.disabled = false;
    startButton.addEventListener('click', () => {
      timerId = setInterval(() => {
        let date = new Date();
        let remainTime = convertMs(selectedDates[0] - date);
        if (selectedDates[0] - date <= 0) {
          return;
        }

        let outObj = {
          days: outDays,
          hours: outHours,
          minutes: outMinutes,
          seconds: outSeconds,
        };

        Object.keys(outObj).forEach(el => {
          outObj[el].innerHTML = addLeadingZero(remainTime[el]);
        });
      }, 1000);
    });
  },
};

flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
