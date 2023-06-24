import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('input#datetime-picker');

const outDays = document.querySelector('[data-days]');
const outHours = document.querySelector('[data-hours]');
const outMinutes = document.querySelector('[data-minutes]');
const outSeconds = document.querySelector('[data-seconds]');

const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

let date = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0].getTime() < date.getTime()) {
      alert('Please choose a date in the future');
      return;
    }
    startButton.disabled = false;
    startButton.addEventListener('click', () => {
      let a = selectedDates[0].getTime() - date.getTime();
      timerId = setInterval(() => {
        let b = convertMs(a);
        console.log(a);
        console.log(b);
        outDays.innerHTML = b.days;

        outHours.innerHTML = b.hours;

        outMinutes.innerHTML = b.minutes;

        outSeconds.innerHTML = b.seconds;
      }, 1000);
    });
  },
};

flatpickr(input, options);

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
