"use strict";
// для того чтобы функция отправки POST запроса работала, открывать страницу локально без хоста
const email = document.querySelector(".emailInput");
const phone = document.querySelector(".phoneInput");
const url = "https://jsonplaceholder.typicode.com/users";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", sendForm);

  async function sendForm(e) {
    e.preventDefault();

    let passes = validateInput(form);
    if (passes === 4) {
      const personsName = document.getElementById("name").value;
      const phoneNumber = phone.value;
      const emailAdress = email.value;
      const message = document.getElementById("message").value;

      const body = {
        name: personsName,
        phoneNumber: phoneNumber,
        emailAdress: emailAdress,
        message: message,
      };

      sendRequest("POST", url, body).catch((err) => console.log(err));

      form.reset();
    }
  }
});
phone.addEventListener("input", (e) => {
  if (e.target.value.length < 2) {
    e.target.value = "+7";
    return;
  }
  let cleanNumber = e.target.value.slice(2).replace(/\D/g, "");
  let match = cleanNumber.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

  let first = match[1];
  let second = match[2];
  let third = match[3];
  let fourth = match[4];

  let res = "+7";
  if (!!first) {
    res = `${res} (${first}`;
  }
  if (!!second) {
    res = `${res}) ${second}`;
  }
  if (!!third) {
    res = `${res}-${third}`;
  }
  if (!!fourth) {
    res = `${res}-${fourth}`;
  }
  e.target.value = res;
});
function sendRequest(method, url, body) {
  const headers = {
    "Content-Type": "application/json",
  };

  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((error) => {
      const e = new Error("Что-то пошло не так");
      e.data = error;
      throw e;
    });
  });
}

function validateInput(form) {
  let formReq = document.querySelectorAll(".requiredElem");
  let errorLabel = document.querySelectorAll(".errorLabel");

  errorLabel.forEach((errLabel) => {
    addClassErrorLabel(errLabel);
  });

  formReq.forEach((element) => {
    addClassError(element);
  });

  let emailLabel = errorLabel[1];
  let phoneLabel = errorLabel[2];
  let email = formReq[1];
  let phone = formReq[2];
  let passes = 0;

  for (let id = 0; id < formReq.length; id++) {
    const element = formReq[id];

    if (element.id === "email" && element.value !== "") {
      if (emailValidate(element)) {
        removeClassError(element);
        removeClassErrorLabel(errorLabel[id]);
        passes++;

        if (phoneValidate(phone)) {
          removeClassError(phone);
          removeClassErrorLabel(phoneLabel);
        } else if (phone.value === "" || phone.value === "+7") {
          removeClassError(phone);
          removeClassErrorLabel(phoneLabel);
          passes++;
        }
      }
    } else if (element.id === "phone" && element.value !== "") {
      if (phoneValidate(element)) {
        removeClassError(element);
        removeClassErrorLabel(errorLabel[id]);
        passes++;
        if (emailValidate(email)) {
          removeClassErrorLabel(emailLabel);
          removeClassError(email);
        } else if (email.value === "") {
          removeClassError(email);
          removeClassErrorLabel(emailLabel);
          passes++;
        }
      }
    } else if (element.value !== "") {
      removeClassError(element);
      removeClassErrorLabel(errorLabel[id]);
      passes++;
    }
  }

  return passes;
}

function addClassErrorLabel(errLabel) {
  errLabel.classList.add("errorLabelClass");
}
function removeClassErrorLabel(errLabel) {
  errLabel.classList.remove("errorLabelClass");
}
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
  return /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/.test(phone.value);
}
