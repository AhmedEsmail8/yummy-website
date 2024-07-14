export class FormValidation {
    constructor() {
        this.name = false;
        this.email = false;
        this.phone = false;
        this.age = false;
        this.password = false;
        this.repassword = false;
    }

    validateName = () => {
        const regex = /^[A-Za-z]{3,}(?: [A-Za-z]{3,})*$/;
        const nameInput = $('#name');
        const valid = regex.test(nameInput.val());
        this.name = valid;
        this.toggleErrorMessage(nameInput, valid);
        this.checkAllInputs();
    };

    validateEmail = () => {
        const emailInput = $('#email');
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = regex.test(String(emailInput.val()).toLowerCase());
        this.email = valid;
        this.toggleErrorMessage(emailInput, valid);
        this.checkAllInputs();
    };

    validatePhone = () => {
        const phoneInput = $('#phone');
        const regex = /^0(10|11|12|15)\d{8}$/;
        const valid = regex.test(phoneInput.val());
        this.phone = valid;
        this.toggleErrorMessage(phoneInput, valid);
        this.checkAllInputs();
    };

    validateAge = () => {
        const ageInput = $('#age');
        const regex = /^(?:[1-9]|[1-9][0-9])$/;
        const valid = regex.test(ageInput.val());
        this.age = valid;
        this.toggleErrorMessage(ageInput, valid);
        this.checkAllInputs();
    };

    validatePassword = () => {
        const passwordInput = $('#password');
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        const valid = regex.test(passwordInput.val());
        this.password = valid;
        this.toggleErrorMessage(passwordInput, valid);
        this.validateRepassword();
        this.checkAllInputs();
    };

    validateRepassword = () => {
        const repasswordInput = $('#repassword');
        const valid = repasswordInput.val() === $('#password').val();
        this.repassword = valid;
        this.toggleErrorMessage(repasswordInput, valid);
        this.checkAllInputs();
    };

    checkAllInputs = () => {
        const allValid = this.name && this.email && this.phone && this.age && this.password && this.repassword;
        $('#submitBtn').toggleClass('disabled', !allValid);
    };

    toggleErrorMessage = (inputElement, isValid) => {
        inputElement.next().toggleClass('d-none', isValid);
    };
}
