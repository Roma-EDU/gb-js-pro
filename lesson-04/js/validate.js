class Validator {
    constructor(form, invalidClass = 'invalid', errorMsgClass = 'error-msg') {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя должно содержать только буквы',
            phone: 'Телефон должен строго соответствовать шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };

        this.form = form;
        this.invalidClass = invalidClass;
        this.errorMsgClass = errorMsgClass;
    }

    validateForm() {
        let isValid = true;

        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorMsgClass}`)];
        for (let error of errors){
            error.remove();
        }

        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields){
            if (!this._isValidate(field)) {
                isValid = false;
            }
        }

        return isValid;
    }

    _isValidate(field){
        if (this.patterns[field.name]) {
            this._watchField(field);

            if (!this.patterns[field.name].test(field.value)) {
               field.classList.add(this.invalidClass);
               this._addErrorMsg(field);
               return false;
            }
        }
        return true;
    }

    _addErrorMsg(field){
        let error = `<p class="${this.errorMsgClass}">${this.errors[field.name]}</p>`;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }

    _watchField(field){
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorMsgClass}`);
            if (this.patterns[field.name].test(field.value)){
                field.classList.remove(this.invalidClass);
                if (error) {
                    error.remove();
                }
            } else {
                field.classList.add(this.invalidClass);
                if (!error){
                    this._addErrorMsg(field);
                }
            }
        })
    }
}