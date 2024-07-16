function file_img(fileName, leigthNumber) {
    return `
    <img src="images/Pictures/${fileName + leigthNumber}.jpg" width="${window.innerWidth / 5}" height="${window.innerWidth / 5}" style="border-radius: 100%;">
    `;
}

img_output = ""
imgnumber = 9;
for (let i = 0; i < imgnumber; i++) {
  img_output += file_img("p", i)
}

let document_img_file = document.getElementById(`draw-img-file`);
document_img_file.innerHTML = img_output;