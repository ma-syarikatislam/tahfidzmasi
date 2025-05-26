
let globalSiswaPerKelas = {};
const button = document.getElementById("submitBtn");

window.onload = function () {
  fetch("https://script.google.com/macros/s/AKfycbyLKa6zxgig3ski587KmlHD6iXt7NX1HsNwumelFAlh5vJtSJqM80n2iPMbHvznJUpc6w/exec")
    .then(res => res.json())
    .then(data => {
      isiDropdown("penguji", data.penguji);
      isiDropdown("kelas", data.kelas);
      isiDropdown("surat", data.surat);
      isiDropdown("keterangan", data.keterangan);
      globalSiswaPerKelas = data.siswaPerKelas;

      document.getElementById("kelas").addEventListener("change", function () {
        const kelasTerpilih = this.value;
        const siswaKelas = globalSiswaPerKelas[kelasTerpilih] || [];
        isiDropdown("siswa", siswaKelas);
      });

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

  fetch("https://script.google.com/macros/s/AKfycbyLKa6zxgig3ski587KmlHD6iXt7NX1HsNwumelFAlh5vJtSJqM80n2iPMbHvznJUpc6w/exec", {
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
