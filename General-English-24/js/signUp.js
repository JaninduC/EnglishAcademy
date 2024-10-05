document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Define the API endpoint
        const apiEndpoint = 'https://app.dushmanthaacademy.com/user/signup';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.log(response)
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);

            // Optionally redirect or show a success message
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error:', error);
            // Optionally show an error message
        }
    });
});
