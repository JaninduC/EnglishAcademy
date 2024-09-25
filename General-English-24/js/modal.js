document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        $('#exampleModalCenter').modal('hide');
    });
    document.getElementById('saveChangesBtn').addEventListener('click', () => {
        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Call API
        fetch('https://general-english-24-server-production.up.railway.app/user/check-user', {  // Replace with your API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.isExist) {
                    // Navigate to course window or any other action on success
                    window.location.href = 'single.html';  // Replace with your course URL
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                alert('An unexpected error occurred: ' + error.message);
            });
    });
});
