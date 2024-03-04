document.getElementById('updatePostForm').addEventListener('submit', function(event){
    event.preventDefault();

    const form = event.target;
    // get the post id from the form action
    const postId = form.action.split('/').pop(); 
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // redirect to dashboard
        window.location.href = '/dashboard'; 
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
