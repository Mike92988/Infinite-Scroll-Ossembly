const postContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;


//Get posts from API
async function getPosts() {
    const res = await fetch(`https://api.ossembly.io/v1/feeds/60a576a65a34390a6cd13a63?reviews&page=${page}`, {
      method: "GET",
      headers:{ 'siteid': '60ae9fe8ddbd8c24a0886edd'}
    })

    const data = res.json();

   
    return data; 
    

}


// Show posts in DOM

async function showPosts() {
    const posts = await getPosts();
    post = posts.data.reviews
    console.log(post);
    

    post.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.rating}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.text}</p>
        </div>
        `;

        postContainer.appendChild(postEl);
    })
}

// Show loader & fetch more posts
function showLoading() {
    loading.classList.add('show');
  
    setTimeout(() => {
      loading.classList.remove('show');
  
      setTimeout(() => {
        page++;
        showPosts();
      }, 300);
    }, 1000);
  }
  
  // Filter posts by input
  function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
  
    posts.forEach(post => {
      const title = post.querySelector('.post-title').innerText.toUpperCase();
      const body = post.querySelector('.post-body').innerText.toUpperCase();
  
      if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
        post.style.display = 'flex';
      } else {
        post.style.display = 'none';
      }
    });
  }
  
  // Show initial posts
  showPosts();
  
  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      showLoading();
    }
  });
  
  filter.addEventListener('input', filterPosts);
  