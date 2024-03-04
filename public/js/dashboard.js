document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach((button) => {
            button.addEventListener('click', function (event) {
                const postId = event.target.getAttribute('data-id');
                fetch(`/api/posts/${postId}`, {
                    method: 'DELETE',
                })
                .then((response) => {
                    if (response.ok) {
                        document.querySelector(`.post[data-id=${postId}`).remove();
                    } else {
                        alert('Post could not be deleted');
                    }
                })
                .catch((error) => console.error('Error:', error));
            })
        });
    });
