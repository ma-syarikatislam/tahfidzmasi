const API_URL = "https://script.google.com/macros/s/AKfycbzp8qbrORPNFc5Y1hWQQ_0ZGyW77QyTWwp8-TwMDR2Gl7VLX9l1HZxpdT1i8fOpWXco/exec"; // ganti dengan URL Web App kamu
const SUBMIT_URL = "https://script.google.com/macros/s/AKfycbyIphTTBpsdYpSx8o4JqcsIRPv7-g-V_aUWBM-gJZ_KHWsTMQT_6XrbUNJl14GEVpXA/exec"; // untuk simpan data

let allData = [];

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    allData = data;

    fillSelect('penguji', getUnique(data, 'Nama Penguji'));
    fillSelect('kelas', getUnique(data, 'Kelas'));
    fillSelect('surat', getUnique(data, 'Surat'));
    fillSelect('keterangan', getUnique(data, 'Keterangan'));
  })
  .catch(err => {
    console.error('Gagal mengambil data:', err);
    alert('Gagal mengambil data dari server.');
  });

function fillSelect(id, options) {
  const select = document.getElementById(id);
  select.innerHTML = '<option value="">Pilih</option>';
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}

function getUnique(data, key) {
  return [...new Set(data.map(item => item[key]).filter(Boolean))];
}

document.getElementById('kelas').addEventListener('change', function () {
  const kelas = this.value;
  const siswaFilter = allData
    .filter(item => item['Kelas'] === kelas)
    .map(item => item['Nama Siswa']);
  fillSelect('siswa', [...new Set(siswaFilter)]);
});

// Modal
function showModal(message) {
  document.getElementById("modal-message").innerText = message;
  document.getElementById("modal").style.display = "block";
  document.getElementById("overlay").style.display = "block"; // tampilkan overlay
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none"; // sembunyikan overlay
}


// Submit
const button = document.getElementById("submitBtn");

button.addEventListener("click", function (e) {
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

  fetch(SUBMIT_URL, {
    method: "POST",
    body: new URLSearchParams(data),
  })
    .then(response => response.text())
    .then(result => {
      showModal("Data berhasil dikirim!");

      // reset
      ['penguji', 'kelas', 'siswa', 'surat', 'keterangan', 'catatan'].forEach(id => {
        document.getElementById(id).value = "";
      });

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
