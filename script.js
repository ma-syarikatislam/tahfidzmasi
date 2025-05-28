const API_URL = 'https://api.sheetbest.com/sheets/72879d20-b475-43c9-bdf4-753eda724467';

document.addEventListener('DOMContentLoaded', () => {
    const pengujiSelect = document.getElementById('penguji');
    const kelasSelect = document.getElementById('kelas');
    const siswaSelect = document.getElementById('siswa');
    const suratSelect = document.getElementById('surat');
    const keteranganSelect = document.getElementById('keterangan'); // Tambahan
    const form = document.getElementById('penilaianForm');

    let dataSheet = []; // Simpan semua data dari sheet

    // Fungsi untuk mengisi dropdown
    const isiDropdown = (selectElement, data, valueKey, textKey) => {
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueKey];
            option.textContent = item[textKey];
            selectElement.appendChild(option);
        });
    };
    // Ambil data dari API
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            dataSheet = data;

            // Ambil data penguji unik
            const pengujiOptions = [...new Set(data.map(item => item.Penguji))];
            pengujiSelect.innerHTML = '<option value="" disabled selected>Pilih Penguji</option>';
            isiDropdown(pengujiSelect, pengujiOptions.map(p => ({Penguji: p})), 'Penguji', 'Penguji');

            // Ambil data kelas unik
            const kelasOptions = [...new Set(data.map(item => item.Kelas))];
            kelasSelect.innerHTML = '<option value="" disabled selected>Pilih Kelas</option>';
            isiDropdown(kelasSelect, kelasOptions.map(k => ({Kelas: k})), 'Kelas', 'Kelas');

            // Ambil data surat unik
            const suratOptions = [...new Set(data.map(item => item.Surat))];
            suratSelect.innerHTML = '<option value="" disabled selected>Pilih Surat</option>';
            isiDropdown(suratSelect, suratOptions.map(s => ({Surat: s})), 'Surat', 'Surat');

            // Ambil data keterangan unik (tambahan)
            const keteranganOptions = [...new Set(data.map(item => item.Keterangan).filter(k => k && k.trim() !== ''))];
            keteranganSelect.innerHTML = '<option value="" disabled selected>Pilih Keterangan</option>';
            isiDropdown(keteranganSelect, keteranganOptions.map(k => ({Keterangan: k})), 'Keterangan', 'Keterangan');
        })
        .catch(error => console.error('Error fetching data:', error));

    // Event listener untuk kelas
    kelasSelect.addEventListener('change', () => {
        const kelasTerpilih = kelasSelect.value;
        siswaSelect.innerHTML = '<option value="" disabled selected>Pilih Siswa</option>';

        // Filter siswa berdasarkan kelas
        const siswaFiltered = dataSheet.filter(item => item.Kelas === kelasTerpilih);
        const siswaOptions = [...new Set(siswaFiltered.map(item => item.Nama))];
        isiDropdown(siswaSelect, siswaOptions.map(s => ({Nama: s})), 'Nama', 'Nama');
    });

    // Event listener untuk form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const penguji = pengujiSelect.value;
        const kelas = kelasSelect.value;
        const siswa = siswaSelect.value;
        const surat = suratSelect.value;
        const keterangan = keteranganSelect.value; // Ambil dari dropdown keterangan

        if (!penguji || !kelas || !siswa || !surat || !keterangan) {
            alert("Mohon lengkapi semua data!");
            return;
        }

        // Contoh aksi setelah submit: tampilkan data di alert
        alert(
            `Data Penilaian:\n` +
            `Penguji: ${penguji}\n` +
            `Kelas: ${kelas}\n` +
            `Siswa: ${siswa}\n` +
            `Surat: ${surat}\n` +
            `Keterangan: ${keterangan}`
        );

        // Reset form setelah submit
        form.reset();
        siswaSelect.innerHTML = '<option value="" disabled selected>Pilih kelas dulu</option>';
        keteranganSelect.innerHTML = '<option value="" disabled selected>Pilih Keterangan</option>';
    });
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

});
