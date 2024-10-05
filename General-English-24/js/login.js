document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Define the API endpoint
        const apiEndpoint = 'https://app.dushmanthaacademy.com/user/login';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);

            // Optionally store a token or redirect
            // localStorage.setItem('token', result.token);
            window.location.href = 'index.html'; // Redirect to a different page on success
        } catch (error) {
            console.error('Error:', error);
            // Optionally show an error message to the user
        }
    });
});
