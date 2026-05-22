
async function api_drive(url = "https://script.google.com/macros/s/AKfycbxJZbr9ZasslW2vEUw6-WBzWoMse-r25vEYaRF-dT4PjWDmxC55HsSL6kmPiLs6MoBQ/exec") {
  let output
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      output = data;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  return output
}


function onclick_set(url) {
  window.open(url)
}

class Post {
  constructor() {
    this.posts = []
    this.draw = document.getElementById("draw-posts")
  }
  async createPost(dive = api_drive()) {
    let output = "";
    let group = [];
    for (let data = 0; data < (await dive).length; data++) {
      group.push({
        "name": (await dive)[data].name,
        "link": (await dive)[data].directUrl
      });
      this.posts.push({
        "name": (await dive)[data].name,
        "link": (await dive)[data].directUrl
      });
      output += `<div class="max-width"> ${(await dive)[data].name} <br> <img src="${(await dive)[data].directUrl}" width="100" height="100" style="width:100%;height:100%;" onclick="onclick_set();"></div>`
    }
    this.draw.innerHTML = output
  }
}

async function main() {
  let post = new Post();
  await post.createPost();

  console.log(post.posts);
}

main();