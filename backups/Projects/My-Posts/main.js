async function main() {
  try {
    const POST_API =
      "https://script.google.com/macros/s/AKfycbxJZbr9ZasslW2vEUw6-WBzWoMse-r25vEYaRF-dT4PjWDmxC55HsSL6kmPiLs6MoBQ/exec";

    const response = await fetch(POST_API, { method: "GET" });
    const posts = await response.json();

    const post_id = document.getElementById("drawPosts");
    let item = (name, size, url) => {
      return `<div class="rigth"><a href="${url}">${name}</a></div>`;
    };

    let draw_output;
    for (let i = 0; i < posts.length; i++) {
      let post = await posts[i];
      draw_output += `${(await item)(await post.name, await post.size, await post.directUrl)}`;
      console.log(post);
    }
    post_id.innerHTML = await draw_output;
  } catch (error) {
    console.error(error);
  }
}

main();

// {
//     "name": "IMG_20260501_061404_668.jpg",
//     "id": "15KRHH34a2rutxfQVp6Zzm4QbvdMG3FwL",
//     "size": 1571200,
//     "directUrl": "https://drive.google.com/uc?export=view&id=15KRHH34a2rutxfQVp6Zzm4QbvdMG3FwL"
// }
