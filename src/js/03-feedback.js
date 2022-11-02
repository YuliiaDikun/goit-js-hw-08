const trottle = require('lodash.throttle');
const formEl = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', trottle(formEvent, 500));

formEl.addEventListener('submit', e => {
  e.preventDefault();
  consoleFormValues();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  formEl.reset();
});

function formEvent(e) {
  e.preventDefault();

  const formValue = {
    email: formEl.elements.email.value,
    message: formEl.elements.message.value,
  };

  setLocalStorage(LOCALSTORAGE_KEY, formValue);
}

function setLocalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function getLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function consoleFormValues() {
  console.log(getLocalStorage(LOCALSTORAGE_KEY));
}

function updateFormInput() {
  const localStorageValues = getLocalStorage(LOCALSTORAGE_KEY);
  if (localStorageValues) {
    formEl.elements.email.value = localStorageValues.email;
    formEl.elements.message.value = localStorageValues.message;
  }
}

updateFormInput();
