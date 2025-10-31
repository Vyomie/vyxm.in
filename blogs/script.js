document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blogList");

  const pdfs = [
    "projectile_with_spin.pdf",
    "effective_microscopic_de_broglie_waves.pdf",
    "probabilistic_approach_to_goldbach’s_conjecture.pdf"
  ];

  const imageExtensions = [".webp", ".png", ".jpg"];

  function findValidImage(baseFile, callback) {
    let index = 0;

    function tryNext() {
      if (index >= imageExtensions.length) {
        callback(null); // No image found
        return;
      }

      const img = new Image();
      const ext = imageExtensions[index];
      const src = `blog-pdfs/${baseFile}${ext}`;
      img.src = src;

      img.onload = () => callback(src);
      img.onerror = () => {
        index++;
        tryNext();
      };
    }

    tryNext();
  }

  pdfs.forEach(file => {
    const baseName = file.replace(".pdf", "").replace(/_/g, " ");
    const title = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    const baseFile = file.replace(".pdf", "");
    const pdfPath = `blog-pdfs/${file}`;

    findValidImage(baseFile, imageSrc => {
      const card = document.createElement("div");
      card.className = "blog-card";

      card.innerHTML = `
        ${imageSrc ? `<img src="${imageSrc}" alt="${title}" />` : ""}
        <div class="title">${title}</div>
      `;

      card.onclick = () => window.open(pdfPath, "_blank");
      blogList.appendChild(card);
    });
  });
});
