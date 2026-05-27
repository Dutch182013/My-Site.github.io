const POST_API =
  "https://script.google.com/macros/s/AKfycbxJZbr9ZasslW2vEUw6-WBzWoMse-r25vEYaRF-dT4PjWDmxC55HsSL6kmPiLs6MoBQ/exec";
const POST_ID = document.getElementById("drawPosts");

async function setResponse(setAPI_URL) {
  return await fetch(setAPI_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html = "";
      data.forEach((post) => {
        html += `<div class="left"><iframe class="img" src="${post.directUrl}" frameborder="0"></iframe></div>`;
        html += `<div class="right">`;
        html += `<p class="text">${post.name}</p>`;
        html += `<a href="${post.directUrl}" target="_blank">View Image</a>`;
        html += `</div>`;
      });
      return html;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}

async function main() {
  try {
    POST_ID.innerHTML = await setResponse(POST_API);
  } catch (error) {
    console.log(error);
  }
}

main();

// {
// https://drive.google.com/uc?export=view&id=
//     "name": "IMG_20260501_061404_668.jpg",
//     "id": "15KRHH34a2rutxfQVp6Zzm4QbvdMG3FwL",
//     "size": 1571200,
//     "directUrl": "https://drive.google.com/uc?export=view&id=15KRHH34a2rutxfQVp6Zzm4QbvdMG3FwL"
// }
