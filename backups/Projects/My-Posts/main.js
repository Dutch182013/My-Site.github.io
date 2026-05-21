
const drawPosts = document.getElementById('draw-posts');

fetch('posts.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <span>${post.date}</span>
      `;
      drawPosts.appendChild(postElement);
    });
  })
  .catch(error => console.error('Error fetching posts:', error));