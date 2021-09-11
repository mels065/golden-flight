async function cancelFlightHandler(event) {
    try {
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
            alert((await response.json()).message);
        }
    } catch (err) {
        alert(err.message);
    }
}

document.querySelectorAll('.cancel-flight').forEach(btn => btn.addEventListener('click', cancelFlightHandler));
