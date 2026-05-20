let wrapper = document.querySelector(".wrapper");
let loginLink = document.querySelector(".login-link");
let registerLink = document.querySelector(".register-link");
let iconClose = document.querySelector(".close__button");
let btnPopup = document.querySelector(".floating__button");
const loginForm = document.querySelector(".form-box.login form");
const registerForm = document.querySelector(".form-box.register form");



btnPopup.addEventListener('click', () => {
    wrapper.classList.add('open');
});
   
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('open');
});

if (registerLink && wrapper) {
  registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
  });
}

if (loginLink && wrapper) {
  loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailInput = registerForm.querySelector('#regEmail');
    const passwordInput = registerForm.querySelector('#regPassword');
    const usernameInput = registerForm.querySelector('#regUsername');

    if (!emailInput || !passwordInput || !usernameInput) {
      console.error('Register inputs not found in form');
      alert('Помилка форми реєстрації: поля не знайдено');
      return;
    }

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const usernameValue = usernameInput.value.trim();

    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
            username: usernameValue,
        })
    });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Server error:', response.status, errText);
        alert(`Помилка сервера: ${response.status}`);
        return;
    }
    const data = await response.json();

    if (registerForm) registerForm.reset();
    if (wrapper) {
      wrapper.classList.remove('active');
      wrapper.classList.remove('open');
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailValue = document.getElementById('userEmail').value.trim();
    const passwordValue = document.getElementById('userPassword').value.trim();

    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
        })
    });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Server error:', response.status, errText);
        alert(`Помилка сервера: ${response.status}`);
        return;
    }
    const data = await response.json();

    if (loginForm) loginForm.reset();
    if (wrapper) {
      wrapper.classList.remove('active');
      wrapper.classList.remove('open');
    }
  });
}
/*
function MyFunction() {
   element = document.getElementById('test1');
   element.style.color = 'blue'

}

  let element = document.querySelectorAll('p')
  element.forEach(e => {
    e.style.color = 'red'
  });


function function1() {
  const element1 = document.querySelector('.pop__h1');
  element1.style.color = 'red';
}

function MyFunction() {
  let element = document.getElementById('test1')
  element.style.color = 'blue'
  element.style.paddingTop = '50px'
}
  
*/