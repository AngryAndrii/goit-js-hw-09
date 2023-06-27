'use strict';

//
import Notiflix from 'notiflix';

let form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  let amount = Number(form.elements.amount.value);
  let delayStep = Number(form.elements.step.value);
  let delay = Number(form.elements.delay.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(data =>
        Notiflix.Notify.success(
          `Fulfilled promise ${data.position} in ${data.delay} `
        )
      )
      .catch(data =>
        Notiflix.Notify.failure(
          `Rejected promise ${data.position} in ${data.delay} `
        )
      );
    delay += delayStep;
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
