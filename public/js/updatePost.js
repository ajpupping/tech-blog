document.getElementById('updatePostForm').addEventListener('submit', function(event){
    event.preventDefault();

    const form = event.target;
    const postId = form.getAttribute('data-post-id'); 
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else if (!response.headers.get('Content-Type').includes('application/json')) {
            // If the response isn't JSON, throw an error or handle accordingly
            throw new Error('Received non-JSON response from server.');
        } else {
            // Safely attempt to parse the JSON
            return response.json();
        }
    })
    .then(data => {
        console.log('Success:', data);
        window.location.href = '/dashboard';
    })
    .catch((error) => {
        // Handle any errors that occurred during fetch or JSON parsing
        console.error('Error:', error);
    });
});
