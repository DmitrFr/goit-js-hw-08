import throttle from 'lodash.throttle';

const formEl = document.querySelector('form');
const localStorageKeyName = 'feedback-form-state';
const formData = {};

const onInputText = function (evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(localStorageKeyName, JSON.stringify(formData));
};

const onFormSubmit = function (evt) {
  evt.preventDefault();
  evt.target.reset();
  localStorage.removeItem(localStorageKeyName);
};

const populateInputs = function () {
  const savedMessage = JSON.parse(localStorage.getItem(localStorageKeyName));
  console.log(savedMessage);
  if (savedMessage) {
    formEl.elements.email.value = savedMessage.email;
    formEl.elements.message.value = savedMessage.message;
  }
};

formEl.addEventListener('input', throttle(onInputText, 500));
formEl.addEventListener('submit', throttle(onFormSubmit, 500));
populateInputs();

//stringify objektu , a pri perezagruzke sdelat parce
//pri pustom forma pokazyvaet null
