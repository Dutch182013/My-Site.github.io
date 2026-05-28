const POST_API =
  "https://script.google.com/macros/s/AKfycbxJZbr9ZasslW2vEUw6-WBzWoMse-r25vEYaRF-dT4PjWDmxC55HsSL6kmPiLs6MoBQ/exec";
const POST_ID = document.getElementById("drawPosts");

async function setResponse(setAPI_URL) {
  return await fetch(setAPI_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let html = "";
      let number_post = 0;
      // data.forEach((post) => {
      // html += `<div class="left"><iframe class="img" src="${post.directUrl}" frameborder="0"></iframe></div>`;
      // html += `<div class="right">`;
      // html += `<p class="text">${post.name}</p>`;
      // html += `<a href="${post.directUrl}" target="_blank">View Image</a>`;
      // html += `</div>`;
      // });

      data.forEach((post) => {
        number_post++;
        let rawUrl = post.directUrl;
        let directImageUrl = rawUrl;

        // ตรวจสอบว่าเป็นลิงก์ Google Drive ทั่วไปหรือไม่ ถ้าใช่ให้ดึง FILE_ID ออกมาแปลง
        if (rawUrl.includes("drive.google.com")) {
          const fileIdMatch =
            rawUrl.match(/\/d\/([^/]+)/) || rawUrl.match(/id=([^&]+)/);
          if (fileIdMatch && fileIdMatch[1]) {
            const fileId = fileIdMatch[1];
            // แปลงเป็น Direct Link ที่แท็ก img สามารถแสดงผลได้
            directImageUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
          }
        }
        // นำลิงก์ที่แปลงแล้วไปใส่ในแท็ก img
        html += `<div class="left">`;
        html += `    <img class="img" src="${directImageUrl}" alt="${post.name}" width="400" height="400">`;
        html += `</div>`;
        html += `<div class="right">`;
        html += `    <div class="text">โพสต์ [${number_post}] : ${post.name}</div>`;
        html += `    <a href="${rawUrl}" target="_blank">View Image</a>`;
        html += `</div>`;
      });
      return html;
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
    });
}

async function main() {
  try {
    POST_ID.innerHTML = await setResponse(POST_API);
  } catch (error) {
    console.error("Error fetching posts:", error);
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
