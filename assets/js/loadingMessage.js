// Fungsi untuk menampilkan pesan pemuatan data
function showLoadingMessage() {
    const loadingMessage = document.getElementById("loadingMessage");
    const mainContent = document.getElementById("main-content");

    loadingMessage.style.display = "block"; // Menampilkan pesan pemuatan
    mainContent.style.display = "none"; // Menyembunyikan konten utama
}

// Fungsi untuk menyembunyikan pesan pemuatan data
function hideLoadingMessage() {
    const loadingMessage = document.getElementById("loadingMessage");
    const mainContent = document.getElementById("main-content");

    loadingMessage.style.display = "none"; // Menyembunyikan pesan pemuatan
    mainContent.style.display = "block"; // Menampilkan konten utama
}

// Memanggil fungsi showLoadingMessage saat halaman dimuat
$(document).ready(function() {
    showLoadingMessage();

    // Panggil fungsi untuk mengambil data dan memperbarui tabel
    fetchDataAndUpdateTable();
});
