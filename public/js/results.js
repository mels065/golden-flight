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