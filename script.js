'use strict'

document.addEventListener('DOMContentLoaded', function() {
    
    const email = document.querySelector('.emailInput');
    const phone = document.querySelector('.phoneInput');
    const form = document.getElementById('form');
    form.addEventListener('submit', sendForm);

    //запрет на стандартную отправку формы 
    async function sendForm(e) {
        e.preventDefault();

        let error = validateInput(form);

    }

    function validateInput(form){
        let formReq = document.querySelectorAll('.requiredElem');
        let error = 0;

         for(let id = 0; id < formReq.length; id++){
             const elements = formReq[id];
             removeClassError(elements);

             if(email.value.length > 0 || phone.value.length > 0) {
                if(emailValidate()){
                    phone.classList.remove('requiredElem')
                } else if(phoneValidate()) {
                    email.classList.remove('requiredElem')
                } 
                } else {
                    if(elements.value === "") {
                    addClassError(elements);
                    error++;
                    }else if(!emailValidate && !phoneValidate){
                        alert('Проверьте правильность ввода полей!')
                            addClassError(elements);
                            error++;
                        }
             }

         }
    }

    function addClassError(elements) {
       elements.classList.add('errorClass');
    }
    function removeClassError(elements) {
       elements.classList.remove('errorClass');
    }
    function emailValidate(){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value);
    }
    function phoneValidate(){
        return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phone.value);
    }
})