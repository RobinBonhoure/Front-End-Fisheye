// DOM Elements
const validation = document.querySelector(".bground2");
const closeButton = document.querySelector("#close-modal");
const firstInput = document.getElementById("first");
const lastInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const crossValidate = document.querySelector("#cross-validate");
// const closeModalButton = document.querySelector("#close-modal_button");

// VAR
let data = [];
// MESSAGES D ERREUR AFFICHES OU NON
let errorMsgFirstPrinted = false;
let errorMsgLastPrinted = false;
let errorMsgEmailPrinted = false;
let errorMsgMessagePrinted = false;

// UN CHAMP A T IL UNE ERREUR
let noError = true;

// submit form
function validate(event) {
    event.preventDefault();

    // get all form data
    data = Object.fromEntries(new FormData(document.querySelector('form')).entries());

    checkFirst(data.first);
    checkLast(data.last);
    checkEmail(data.email);
    checkMessage(data.message);
    getData();
}

// check first
function checkFirst(input) {
    // RECUPERE REGEX ET MESSAGE ERREUR DU JSON
    let regex = eval(jsonObj.first['regex']);
    let errorMessage = jsonObj.first['errorMessage'];
    // NO ERROR
    if (regex.test(String(input).toLowerCase()) && input.replace(/\s/g, '').length) {
        if (errorMsgFirstPrinted) {
            document.querySelector(".error-first").remove();
            errorMsgFirstPrinted = false;
        }
    } else { //ERROR
        noError = false;
        if (!errorMsgFirstPrinted) { // affichage du message d'erreur si il n'est pas déjà affiché
            let errorMsgFirst = document.createElement("span");
            errorMsgFirst.className = "error-message error-first";
            errorMsgFirst.innerHTML = `${errorMessage}`;
            printError(firstInput, errorMsgFirst);
            errorMsgFirstPrinted = true;
        }
    }
}

// check last
function checkLast(input) {
    let regex = eval(jsonObj.last['regex']);
    let errorMessage = jsonObj.last['errorMessage'];
    if (regex.test(String(input).toLowerCase()) && input.replace(/\s/g, '').length) {
        if (errorMsgLastPrinted) {
            document.querySelector(".error-last").remove();
            errorMsgLastPrinted = false;
        }
    } else {
        noError = false;
        if (!errorMsgLastPrinted) { // affichage du message d'erreur si il n'est pas déjà affiché
            let errorMsgLast = document.createElement("span");
            errorMsgLast.className = "error-message error-last";
            errorMsgLast.innerHTML = `${errorMessage}`;
            printError(lastInput, errorMsgLast);
            errorMsgLastPrinted = true;
        }
    }
}

// check email
function checkEmail(input) {
    let regex = eval(jsonObj.email['regex']);
    let errorMessage = jsonObj.email['errorMessage'];
    if (regex.test(String(input).toLowerCase())) {
        if (errorMsgEmailPrinted) {
            document.querySelector(".error-email").remove();
            errorMsgEmailPrinted = false;
        }
    } else {
        noError = false;
        if (!errorMsgEmailPrinted) { // affichage du message d'erreur si il n'est pas déjà affiché
            let errorMsgEmail = document.createElement("span");
            errorMsgEmail.className = "error-message error-email";
            errorMsgEmail.innerHTML = `${errorMessage}`;
            printError(emailInput, errorMsgEmail);
            errorMsgEmailPrinted = true;
        }
    }
}

// check message
function checkMessage(input) {
    let errorMessage = jsonObj.message['errorMessage'];
    if (input.length) {
        if (errorMsgMessagePrinted) {
            document.querySelector(".error-msg").remove();
            errorMsgMessagePrinted = false;
        }
    } else {
        noError = false;
        if (!errorMsgMessagePrinted) { // affichage du message d'erreur si il n'est pas déjà affiché
            let errorMsgMessage = document.createElement("span");
            errorMsgMessage.className = "error-message error-msg";
            errorMsgMessage.innerHTML = `${errorMessage}`;
            printError(messageInput, errorMsgMessage);
            errorMsgMessagePrinted = true;
        }
    }
}

// print error messages
function printError(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// get all informations
function getData() {
    if (noError) {
        jsonObj.first.value = data.first;
        jsonObj.last.value = data.last;
        jsonObj.email.value = data.email;
        jsonObj.message.value = data.message;
        console.log([jsonObj.first.value, jsonObj.last.value, jsonObj.email.value, jsonObj.message.value])
        document.querySelector('form').reset();
        closeModal();
        // validation.style.display = "initial";
    } else {
        noError = true;
    }
}

// display modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

// close modal event
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// ACCESSIBILITE

// CHANGE WITH KEYBOARD
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return;
    }
  
    switch (event.key) {
      case "Escape":
        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";
      default:
        return;
    }
  }, true);



let jsonObj = {
    'first': {
        'value': '',
        'regex': /^[A-zÀ-ú\-\’ ]{2,}$/,
        'errorMessage': 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    }
    ,
    'last': {
        'value': '',
        'regex': /^[A-zÀ-ú\-\’ ]{2,}$/,
        'errorMessage': 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    }
    ,
    'email': {
        'value': '',
        'regex': /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        'errorMessage': 'Veuillez entrer une adresse mail valide.',
    }
    ,
    'message': {
        'value': '',
        'regex': '',
        'errorMessage': 'Veuillez entrer un message.',
    }
};