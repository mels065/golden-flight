async function cancelFlightHandler(event) {
    const id = event.target.dataset.ticketid;

    const response = await fetch(
        `/api/ticket/cancel/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Ticket was not cancelled');
    }
}

document.querySelectorAll('.cancel-flight').forEach(btn => btn.addEventListener('click', cancelFlightHandler));
