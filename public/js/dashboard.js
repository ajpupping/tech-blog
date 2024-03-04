document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/posts/userPosts')
        .then(response => response.json())
        .then(posts => {
            const userPostContainer = document.getElementById('user-post-container');
            posts.forEach(post => {
                const userPostElement = document.createElement('div');
                userPostElement.setAttribute('data-post-id', post.id); // Set a data attribute to identify the post
                userPostElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button class="delete-btn" data-id="${post.id}">Delete</button>
                    <button class="update-btn" data-id="${post.id}">Update</button>`; // Added delete and update buttons
                userPostContainer.appendChild(userPostElement);
            });
        })
        .then(() => {
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function(event){
                    const postId = event.target.getAttribute('data-id');
                    fetch(`/api/posts/${postId}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if(response.ok) {
                            document.querySelector(`[data-post-id="${postId}"]`).remove(); // Corrected selector to remove the entire post element
                        } else {
                            alert('Post could not be deleted');
                        }
                    });
                });
            });

            const updateButtons = document.querySelectorAll('.update-btn');
            updateButtons.forEach(button => {
                button.addEventListener('click', function(event){
                    const postId = event.target.getAttribute('data-id');
                    window.location.href = `/posts/update/${postId}`; // Redirect to the update post page
                });
            });
        })
        .catch(err => console.log(err));
});
