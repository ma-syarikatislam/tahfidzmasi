
let globalSiswaPerKelas = {};
const button = document.getElementById("submitBtn");

window.onload = function () {
  fetch("https://script.google.com/macros/s/AKfycbyn2TPipGZkeOCotZtSaFunsZrfmrT1HGP1A3iE3P16XQwADurfDy1IXt_B-He5oSW4/exec")
    .then(res => res.json())
    .then(data => {
	.then(res => res.json())
    .then(data => {
      isiDropdown("penguji", data.penguji);
      isiDropdown("kelas", data.kelas);
      globalSiswaPerKelas = data.siswaPerKelas;

      document.getElementById("kelas").addEventListener("change", function () {
        const kelasTerpilih = this.value;
        const siswaKelas = globalSiswaPerKelas[kelasTerpilih] || [];
        isiDropdown("siswa", siswaKelas);
      });

      // trigger awal
      document.getElementById("kelas").dispatchEvent(new Event("change"));
    });
};

function isiDropdown(id, items) {
  const select = document.getElementById(id);
  select.innerHTML = "";
  items.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;
    select.appendChild(opt);
  });
}

button.addEventListener("click", function (e) {
  e.preventDefault();

  const data = {
    penguji: document.getElementById("penguji").value,
    kelas: document.getElementById("kelas").value,
    siswa: document.getElementById("siswa").value,
    surat: document.getElementById("surat").value,
    keterangan: document.getElementById("keterangan").value,
    catatan: document.getElementById("catatan").value,
  };

  button.disabled = true;
  button.textContent = "Mengirim...";

  fetch("https://script.google.com/macros/s/AKfycbzfhrErx2xhn9SmMRkNz5pVa32ALMOzwYxhQ-ZjlmU/exec", {
    method: "POST",
    body: new URLSearchParams(data),
  })
    .then((response) => response.text())
    .then((result) => {
      tampilkanModal("Data berhasil dikirim!");

      button.disabled = false;
      button.textContent = "Kirim";
    })
    .catch((error) => {
      tampilkanModal("Gagal mengirim data.");
      console.error(error);
      button.disabled = false;
      button.textContent = "Kirim";
    });
});
