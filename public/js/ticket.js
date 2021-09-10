const ticketFormHandler = async(event) => {
  event.preventDefault();

  const baggage = document.querySelector('.baggage').checked;
  const roundtrip = document.querySelector('.roundTrip').checked;
  const order_date = document.querySelector('.ticketDate').innerHTML;

  console.log(baggage, roundtrip, order_date);
  
  const response = await fetch('/api/ticket/book', {
    method: 'POST',
    body: JSON.stringify({ baggage, roundtrip , order_date}),
    headers: { 'Content-Type': 'application/json' },
  
  })

  if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace('/mytickets');
  } else {
    alert(response.statusText);
  }
}


  document
  .querySelector('.ticket-info')
  .addEventListener('submit', ticketFormHandler);
  