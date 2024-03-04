document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/posts/userPosts')
        .then(response => response.json())
        .then(posts => {
            const userPostContainer = document.getElementById('user-post-container');
            posts.forEach(post => {
                const userPostElement = document.createElement('div');
                userPostElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>`;
            userPostContainer.appendChild(userPostElement);
        });
    })
    .catch(err => console.log(err));
});