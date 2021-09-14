const toggleButton = $('.toggle-button')[0]
const navbarLinks = $('.navbar-links-dropdown')[0]
const ticketLink = $('.my-tickets-dropdown')[0]
const logoutLink = $('.no-button-dropdown')[0] 

toggleButton.addEventListener('click', (e) => {
 e.preventDefault();
 
 ticketLink.classList.toggle('active');
 logoutLink.classList.toggle('active');
  
})

function searchHandler(event) {
    const availableTags = [
        "Detroit (DTW)",
        "New York (JFK)",
        "San Francisco (SFO)",
        "Chicago (ORD)",
        "Dallas (DFW)"
    ];

    const departingCity = document.querySelector('[name="departingCity"]').value.trim();
    const arrivingCity = document.querySelector('[name="arrivingCity"]').value.trim();
    const departingDate = document.querySelector('[name="departingDate"]').value.trim();

    if (!availableTags.includes(departingCity)) {
        alert('Departing city must be a valid airport');
        event.preventDefault();
    } else if (!availableTags.includes(arrivingCity)) {
        alert('Arriving city must be a valid airport');
        event.preventDefault();
    } else if (departingCity === arrivingCity) {
        alert('Arriving and departing cities cannot be the same');
        event.preventDefault();
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(departingDate)) {
        alert('The departing date is not formatted properly (mm/dd/yyyy)');
        event.preventDefault();
    }
}

document.querySelector('.search-form').addEventListener(
    'submit',
    searchHandler
);
