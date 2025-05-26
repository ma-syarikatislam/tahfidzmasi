  document.querySelector("button").addEventListener("click", function(e) {
    e.preventDefault();

    const data = {
      penguji: document.getElementById("penguji").value,
      kelas: document.getElementById("kelas").value,
      siswa: document.getElementById("siswa").value,
      surat: document.getElementById("surat").value,
      keterangan: document.getElementById("keterangan").value,
      catatan: document.getElementById("catatan").value,
    };

    fetch("https://script.google.com/macros/s/AKfycbyIphTTBpsdYpSx8o4JqcsIRPv7-g-V_aUWBM-gJZ_KHWsTMQT_6XrbUNJl14GEVpXA/exec", {
      method: "POST",
      body: new URLSearchParams(data),
    })
    .then(response => response.text())
    .then(result => {
      alert("Data berhasil dikirim!");
    })
    .catch(error => {
      alert("Gagal mengirim data.");
      console.error(error);
    });
  });
