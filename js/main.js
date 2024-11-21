import {setFormValue, submitSignUpForm, validateEmail, validatePassword, validateRepeatPassword, getValidationStatus} from "./utils.js"


////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определён в библиотеке стилей materialize
//const password = document.getElementById('password');
//password.classList.add("valid")
//password.classList.remove("valid")

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
//console.log("Document")
//console.log(document)

// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
// }

////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания


// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_id = 'password'
const password_repeat_id = 'password_repeat';
const email_id = 'email'

const sign_in_link_id = 'sign_in_link'
const sign_up_link_id = 'sign_up_link'
const sign_up_form_id = 'sign_up_form'
const sign_up_btn_id = 'sign_up_btn'
const sign_in_form_id = 'sign_in_form'

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваиваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

const first_name = document.getElementById(first_name_id);
first_name.oninput = (e) => {
  setFormValue(first_name_id, e.target.value)
  checkFormValidity();
}  // Установить значение без валидации

const last_name = document.getElementById(last_name_id);
last_name.oninput = (e) => {
  setFormValue(last_name_id, e.target.value);
  checkFormValidity();
};

const email = document.getElementById(email_id);
email.oninput = (e) => {
  setFormValue(email_id, e.target.value, validateEmail)
  checkFormValidity();
} // Установить значение с валидацией

const password = document.getElementById(password_id);
password.oninput = (e) => {
  setFormValue(password_id, e.target.value, validatePassword);
  checkFormValidity();
}

const password_repeat = document.getElementById(password_repeat_id);
password_repeat.oninput = (e) => {
  setFormValue(password_repeat_id, e.target.value, validateRepeatPassword);
  checkFormValidity();
}

const onPasswordChange = (e) => {
  if (!validatePassword(password.value)) {
    password.classList.remove("valid")
    password.classList.add("invalid")
  } else {
    password.classList.remove("invalid")
    password.classList.add("valid")
  }
  onRepeatPasswordChange(e);
}

const onRepeatPasswordChange = (e) => {
  if (password.value !== password_repeat.value) {
    password_repeat.classList.remove("valid")
    password_repeat.classList.add("invalid")
  } else {
    password_repeat.classList.remove("invalid")
    password_repeat.classList.add("valid")
  }
}

password.addEventListener('change', onPasswordChange)
password_repeat.addEventListener('change', onRepeatPasswordChange)

function checkFormValidity() {
  const isValid = getValidationStatus();
  const submitButton = document.getElementById(sign_up_btn_id);
  submitButton.disabled = !isValid;
  console.log('Form is valid:', isValid);
}

// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становится невидимым

// Селекторы для полей авторизации
const emailSignIn = document.getElementById("login_email");
const passwordSignIn = document.getElementById("login_password");
const sign_in_btn_id = 'sign_in_btn'

const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = "none"
  document.getElementById(sign_in_form_id).style.display = ""
}

const switch_to_sign_up = document.getElementById(sign_up_link_id);
switch_to_sign_up.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = ""
  document.getElementById(sign_in_form_id).style.display = "none"
}

// Функция для проверки валидности полей авторизации
function checkSignInValidity() {
  const isValid = validateEmail(emailSignIn.value) && validatePassword(passwordSignIn.value);
  const submitButton = document.getElementById(sign_in_btn_id);
  submitButton.disabled = !isValid;
}

// Обработчики для полей
emailSignIn.oninput = checkSignInValidity;
passwordSignIn.oninput = checkSignInValidity;

const sign_up_btn = document.getElementById(sign_up_btn_id);
const sign_in_btn = document.getElementById(sign_in_btn_id);

sign_up_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  submitSignUpForm()
}
sign_in_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  submitSignUpForm()
}
