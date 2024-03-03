// fetch posts and display them on the homepage

document.addEventListener('DOMContentLoaded', (event) => {
    fetch('/api/posts')
    .then(response => response.json())
    .then(posts => {
        const postContainer = document.getElementById('post-container');
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>`;
                postContainer.appendChild(postElement);
            });
        })
        .catch(err => console.log(err));

});
    