import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const onStartBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
let timerId = null;

const flatpickrEl = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        let chosenDate = selectedDates[0].getTime();
        const currentDate = new Date().getTime();
        if (chosenDate < currentDate) {
            alert("Please choose a date in the future");
            onStartBtn.setAttribute("disabled", "disabled");
        }
        else {
            onStartBtn.removeAttribute("disabled");
        }
  },
}
)

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function dateTime() {

    const chosenDate = flatpickrEl.selectedDates[0].getTime();
    const currentDate = new Date().getTime();
    const differentDate = chosenDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(differentDate);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

     if (differentDate <= 0) {
         clearInterval(timerId);
         daysEl.textContent = 0;
         hoursEl.textContent = 0;
         minutesEl.textContent = 0;
         secondsEl.textContent = 0;
    }
}


function timerStart() {
    dateTime();
    timerId = setInterval(() => dateTime(), 1000);
   
}

onStartBtn.addEventListener('click', timerStart);
