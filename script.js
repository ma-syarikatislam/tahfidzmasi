const API_URL = "https://script.google.com/macros/s/AKfycbzp8qbrORPNFc5Y1hWQQ_0ZGyW77QyTWwp8-TwMDR2Gl7VLX9l1HZxpdT1i8fOpWXco/exec"; // ganti dengan URL Web App kamu

let allData = []; // Menyimpan semua data dari sheet

// Ambil semua data dari Google Sheet
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    allData = data;

    // Isi dropdown penguji, kelas, surat, keterangan
    fillSelect('penguji', getUnique(data, 'Nama Penguji'));
    fillSelect('kelas', getUnique(data, 'Kelas'));
    fillSelect('surat', getUnique(data, 'Surat'));
    fillSelect('keterangan', getUnique(data, 'Keterangan'));
  })
  .catch(err => {
    console.error('Gagal mengambil data:', err);
    alert('Gagal mengambil data dari server.');
  });

// Fungsi isi dropdown
function fillSelect(selectId, options) {
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="">Pilih</option>';
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}

// Fungsi ambil nilai unik dari kolom tertentu
function getUnique(data, key) {
  return [...new Set(data.map(item => item[key]).filter(Boolean))];
}

// Saat kelas dipilih → filter nama siswa
document.getElementById('kelas').addEventListener('change', function () {
  const selectedKelas = this.value;
  const siswaFilter = allData
    .filter(row => row['Kelas'] === selectedKelas)
    .map(row => row['Nama Siswa']);
  fillSelect('siswa', [...new Set(siswaFilter)]);
});

// Kirim data (dummy)
document.getElementById('tahfidzForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Data berhasil dikirim!");
});
