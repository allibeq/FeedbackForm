"use strict";
const modalWindow = document.getElementById("modalWindow");

const open = document
  .getElementById("openWindow")
  .addEventListener("click", () => {
    modalWindow.classList.add("show");
  });
const close = document
  .getElementById("closeButton")
  .addEventListener("click", () => {
    modalWindow.classList.remove("show");
  });
document.addEventListener("DOMContentLoaded", function () {
  const email = document.querySelector(".emailInput");
  const phone = document.querySelector(".phoneInput");
  const form = document.getElementById("form");
  form.addEventListener("submit", sendForm);

  async function sendForm(e) {
    e.preventDefault();

    let error = validateInput(form);
  }

  function validateInput(form) {
    let formReq = document.querySelectorAll(".requiredElem");

    formReq.forEach((element) => {
      addClassError(element);
    });

    let name = formReq[0];
    let email = formReq[1];
    let phone = formReq[2];
    let comment = formReq[3];

    for (let id = 0; id < formReq.length; id++) {
      const element = formReq[id];

      if (element.id === "email" && element.value !== "") {
        if (emailValidate(element)) {
          removeClassError(element);

          if (phoneValidate(phone)) {
            removeClassError(phone);
          } else if (phone.value === "") {
            removeClassError(phone);
          }
        }
      } else if (element.id === "phone" && element.value !== "") {
        if (phoneValidate(element)) {
          removeClassError(element);
          if (emailValidate(email)) {
            removeClassError(email);
          } else if (email.value === "") {
            removeClassError(email);
          }
        }
      } else if (element.value !== "") {
        removeClassError(element);
      }
    }
  }
});

function addClassError(elements) {
  elements.classList.add("errorClass");
}
function removeClassError(elements) {
  elements.classList.remove("errorClass");
}
function emailValidate(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value);
}
function phoneValidate(phone) {
  return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(
    phone.value
  );
}
