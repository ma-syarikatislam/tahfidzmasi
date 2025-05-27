const button = document.getElementById("submitBtn");

function showModal(message) {
  document.getElementById("modal-message").innerText = message;
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

button.addEventListener("click", function(e) {
  e.preventDefault();

  const penguji = document.getElementById("penguji").value.trim();
  const kelas = document.getElementById("kelas").value.trim();
  const siswa = document.getElementById("siswa").value.trim();
  const surat = document.getElementById("surat").value.trim();
  const keterangan = document.getElementById("keterangan").value.trim();
  const catatan = document.getElementById("catatan").value.trim();

  if (!penguji || !kelas || !siswa || !surat || !keterangan) {
    showModal("Mohon isi semua kolom wajib.");
    return;
  }

  button.disabled = true;
  button.textContent = "Mengirim...";

  const data = { penguji, kelas, siswa, surat, keterangan, catatan };

  fetch("https://script.google.com/macros/s/AKfycbyIphTTBpsdYpSx8o4JqcsIRPv7-g-V_aUWBM-gJZ_KHWsTMQT_6XrbUNJl14GEVpXA/exec", {
    method: "POST",
    body: new URLSearchParams(data),
  })
  .then(response => response.text())
  .then(result => {
    showModal("Data berhasil dikirim!");

    document.getElementById("penguji").value = "";
    document.getElementById("kelas").value = "";
    document.getElementById("siswa").value = "";
    document.getElementById("surat").value = "";
    document.getElementById("keterangan").value = "";
    document.getElementById("catatan").value = "";

    button.disabled = false;
    button.textContent = "Kirim";
  })
  .catch(error => {
    showModal("Gagal mengirim data.");
    console.error(error);
    button.disabled = false;
    button.textContent = "Kirim";
  });
});
