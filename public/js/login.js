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

  const emailValidate = async (event) => {
    event.preventDefault();


      const email = document.querySelector('#email-login').value.trim();

      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true);
      } else {
        alert(" Invalid email address entered! Please enter a valid email address. ");
      }
  };

  const passwordValidate = async (event) => {
    // 6 to 20 characters has to contain atleast numeric, on uppercase and one lowercase.
    event.preventDefault();

    const password = document.querySelector('#password-login').value.trim();
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    
    if (password.match(passw))
    {
      alert(" Password accepted! ")
      return true;
    } else {
      alert(" Please input a valid password! ")
      return false;
    }
  };

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

