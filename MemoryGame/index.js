var originalImageSrc = "img/hu-tao-genshin.gif";
var alternativeImageSrc = "img/Raiden.png";
var isOriginalImage = true;

function toggleImage() {
  if (isOriginalImage) {
    showMessage("Kenapa kamu Pencet? Kan dosa aku!!");
    replaceImage(alternativeImageSrc, "Please kembali ke gambar asli");
  } else {
    switchImage();
  }
  isOriginalImage = !isOriginalImage;
}
function showMessage(message) {
  alert(message);
}

function replaceImage(src, title) {
  document.getElementById("mainImage").src = src;
  document.getElementById("mainImage").title = title;
}

function switchImage() {
  alert("Fiuh, akhirnya kembali!");
  replaceImage(originalImageSrc, "Pencet Lagi Untuk Kembali!!");
}
