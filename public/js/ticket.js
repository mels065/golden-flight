const toggleButton = $('.toggle-button')[0]
const navbarLinks = $('.navbar-links-dropdown')[0]
const ticketLink = $('.my-tickets-dropdown')[0]
const logoutLink = $('.no-button-dropdown')[0] 
const searchLink = $('.search-dropdown')[0]

toggleButton.addEventListener('click', (e) => {
 e.preventDefault();
 
 ticketLink.classList.toggle('active');
 logoutLink.classList.toggle('active');
 searchLink.classList.toggle('active');
  
})

const ticketFormHandler = async(event) => {
  event.preventDefault();

  try {
    const baggage = document.querySelector('.baggage').checked;
    const roundtrip = document.querySelector('.roundTrip').checked;
    const order_date = document.querySelector('.ticketDate').innerHTML;
    const flight_id = event.target.dataset.flightid;
    
    const response = await fetch('/api/ticket/book', {
      method: 'POST',
      body: JSON.stringify({ baggage, roundtrip , order_date, flight_id}),
      headers: { 'Content-Type': 'application/json' },
    
    })

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.assign('/mytickets');
    } else {
      alert((await response.json()).message);
    }
  } catch (err) {
    alert(err.message);
  }
}


  document
  .querySelector('.ticket-info')
  .addEventListener('submit', ticketFormHandler);
  