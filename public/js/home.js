const updateCustomerInfo = async (event) => {
    event.preventDefault();

const firstName = document.querySelector('.firstName').value.trim();
const lastName = document.querySelector('.lastName').value.trim();
const address = document.querySelector('.address').value.trim();
const city = document.querySelector('.city').value.trim();
const state = document.querySelector('.state').value.trim();
const postalCode = document.querySelector('.postalCode').value.trim();
const country = document.querySelector('.country').value.trim();
console.log(firstName, lastName, address, city, state, postalCode, country);
  
    if (firstName && lastName && address && city && state && postalCode && country) {
      const response = await fetch('/api/customer/update', {
        method: 'PUT',
        body: JSON.stringify({ firstName, lastName, address, city, state, postalCode, country}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/search');
      } else {
        alert(response.statusText);
      }
    }
  };


  document
  .querySelector('.customer-info')
  .addEventListener('submit', updateCustomerInfo);