const logInForm = $('.login');
const signUpForm = $('.sign-up');
const signUpLink = $('.sign-up-link');
const logInLink = $('.login-link');

$(document).ready(function() {
  signUpForm.hide();
}); 

  signUpLink.click(function() {
    logInForm.hide();
    signUpForm.show();
  }); 

  logInLink.click(function() {
    signUpForm.hide();
    logInForm.show();
  }); 

  const loginFormHandler = async (event) => {
    event.preventDefault();
  
    try {
      // Collect values from the login form
      const email = document.querySelector('#email-login').value.trim();
      const password = document.querySelector('#password-login').value.trim();
    
      if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/customer/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.assign('/home');
        } else {
          alert((await response.json()).message);
        }
      } else {
        alert('Please provide email and password');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    try {
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
    
      if (email && password) {
        const response = await fetch('/api/customer/register', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.assign('/home');
        } else {
          alert((await response.json()).message);
        }
      } else {
        alert('Please provide email and password');
      }
    } catch (err) {
      alert(err.message);
    }
  };



  document
  .querySelector('.login')
  .addEventListener('submit', loginFormHandler);

  document
  .querySelector('.sign-up')
  .addEventListener('submit', signupFormHandler);
