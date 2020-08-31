'use strict';

(function () {
const body = document.body;
const header = document.querySelector('.header');


function onJSLoad () {

}
onJSLoad();


function removeLinksText () {
  const headerLinks = document.querySelectorAll('.header__contacts-wrapper > a');

  headerLinks.forEach((link) => {
    link.textContent = '';
  });
}

function buttonTextChange () {
  const previewLink = document.querySelector('.preview__link');

  previewLink.textContent = 'Бесплатная консультация';
}

function textClamp (strokeHeight) {
  const aboutTextes = document.querySelectorAll('.about__text-wrapper p');

  aboutTextes.forEach((paragraph) => {
    $clamp(paragraph, {clamp: strokeHeight});
  })
}

function moveFooterText () {
  const footerYearsText = document.querySelector('.footer__years-wrapper');
  const footerLogo = document.querySelector('.footer__logo');

  footerLogo.after(footerYearsText);
}


function onTabletWidth () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    removeLinksText();
    textClamp(4);
    moveFooterText();
  }
}
onTabletWidth();

function onMobileWidth () {
  if (window.matchMedia('(max-width: 767px)').matches) {
    buttonTextChange();
    textClamp(8);
  }
}
onMobileWidth();


function onDOMLoaded () {
  const telInputs = document.querySelectorAll('input[type="tel"]');
  const nameInputs = document.querySelectorAll('input[name="Name"]');

  telInputs.forEach((telInput) => {
    telInput.value = JSON.parse(localStorage.getItem('phoneNumber'));
  })
  nameInputs.forEach((nameInput) => {
    nameInput.value = JSON.parse(localStorage.getItem('Name'));
  })
}


function DOMLoaded () {
  document.addEventListener('DOMContentLoaded', onDOMLoaded);
}
DOMLoaded();


function smoothAnimationForAnchors () {
  const anchors = document.querySelectorAll('a[href*="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockId = anchor.getAttribute('href');

      document.querySelector('' + blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}
smoothAnimationForAnchors();


function numberMaskSet() {
  const telInput = document.querySelectorAll('.form input[type="tel"]');

  telInput.forEach(function (it) {
    Inputmask("+7 999 999 99 99", {
      placeholder: '',
      showMaskOnHover: false,
      showMaskOnFocus: false
    }).mask(it);
  });
}
numberMaskSet();


function accordion () {
  const accordion = document.querySelector('.footer__inner-wrapper');
  const titles = accordion.querySelectorAll('.footer__inner-wrapper h3');
  const footerNav = accordion.querySelector('.nav');
  const footerContacts = accordion.querySelector('.contacts__list');
  const lists = [footerNav, footerContacts];


  titles.forEach((title) => {
    title.addEventListener('click', (evt) => {
      if (evt.target !== title) {
        return;
      }
      evt.preventDefault();

      let accordionItem = title.parentElement;

      lists.forEach((list) => {
        if ((!accordionItem.contains(list)) && (list.classList.contains('show'))) {
          list.parentElement.classList.remove('show');
          list.classList.remove('show');
        }
        if (accordionItem.contains(list)) {
          accordionItem.classList.toggle('show');
          list.classList.toggle('show');
        }
      })
    })
  })
}
accordion();


const feedback = document.querySelector('.feedback');

function formValidityCheck (currentFormWrapper) {
  const currentForm = currentFormWrapper.querySelector('form');
  currentForm.setAttribute('novalidate', 'novalidate');

  currentForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (formInputsValidityCheck(currentForm)) {
      const currentTelInputValue = currentForm.querySelector('input[type="tel"]').value;
      const currentNameInputValue = currentForm.querySelector('input[name="Name"]').value;

      currentForm.reset();
      localStorage.setItem('phoneNumber', JSON.stringify(currentTelInputValue));
      localStorage.setItem('Name', JSON.stringify(currentNameInputValue));
    }
  });
}
formValidityCheck(feedback);

function formInputsValidityCheck (currentForm) {
  const name = currentForm.querySelector('input[name="Name"]');
  const phone = currentForm.querySelector('input[type="tel"]');
  const question = currentForm.querySelector('textarea[name="Question"]');
  // const mail = currentForm.querySelector('input[type="email"]');
  const check = currentForm.querySelector('input[type="checkbox"]');
  const nameValue = name.value.trim();
  const phoneValue = phone.value.trim();
  const questValue = question.value.trim();
  // const mailValue = mail.value.trim();
  let phoneValueSplited;
  let isNameValid = false;
  let isPhoneValid = false;
  let isQuestValid = false;
  // let isMailValid = true;
  let isChecked = false;

  if (phoneValue) {
    phoneValueSplited = phoneValue.split('+')[1].split(' ').join('').trim();
  }

  if (nameValue !== '') {
    isNameValid = true;
    setSuccessFor(name);
  } else {
    setErrorFor(name, 'Данные не верны');
  }

  if (phoneValue && phoneValueSplited.length !== 11) {
    setErrorFor(phone, 'Данные не верны');
  } else if (phoneValue === '') {
    setErrorFor(phone, 'Данные не верны');
  } else {
    isPhoneValid = true;
    setSuccessFor(phone);
  }

  // if (!mailValue.includes('@') || mailValue === '') {
  //   isMailValid = false;
  //   setErrorFor(mail, 'Данные не верны');
  // } else {
  //   setSuccessFor(mail);
  // }
  //

  if (!questValue === '') {
    isQuestValid = true;
    setSuccessFor(question);
  } else {
    setErrorFor(question, 'Данные не верны');
  }

  if (check.checked) {
    isChecked = true;
    setSuccessFor(check);
  } else {
    setErrorFor(check, 'У вас нет выбора)');
  }

  return isPhoneValid && isQuestValid && isNameValid && isChecked;
}


function setErrorFor (input, message) {
  const inputControl = input.parentElement;
  const small = inputControl.querySelector('small');
  inputControl.classList.add('form__input-control--error');
  small.textContent = message;
}


function setSuccessFor (input) {
  const inputControl = input.parentElement;
  inputControl.classList.remove('form__input-control--error');
}
})();
