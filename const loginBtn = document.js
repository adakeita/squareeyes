const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

const loginBtns = document.getElementById('login-btns');
const loggedinBtns = document.getElementById('loggedin-btns');

let userIsLoggedIn = false;
if (localStorage.getItem("currentUser")) {
    userIsLoggedIn = true;
}

if (loginBtns && loggedinBtns) {
  if (userIsLoggedIn) {
    loginBtns.classList.add('hidden');
    loggedinBtns.classList.remove('hidden');
  } else {
    loginBtns.classList.remove('hidden');
    loggedinBtns.classList.add('hidden');
  }
}

function authenticate(isSignUp) {
  // ...
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}