document.addEventListener('DOMContentLoaded', function () {
    // Periksa status login
    if (!isUserLoggedIn()) {
        redirectToLogin();
    }

    // Fungsi untuk reset timer logout
    function resetLogoutTimer() {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(logout, 15 * 60 * 1000); // 15 menit
    }

    // Fungsi untuk logout
    function logout() {
        localStorage.removeItem('isLoggedIn');
        redirectToLogin();
    }

    // Fungsi untuk memeriksa status login
    function isUserLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    // Fungsi untuk mengarahkan ke halaman login
    function redirectToLogin() {
        window.location.href = 'login.html';
    }

    // Tambahkan event listener untuk aktivitas pengguna
    let logoutTimer;
    window.onload = resetLogoutTimer;
    document.onmousemove = resetLogoutTimer;
    document.onkeydown = resetLogoutTimer; // Gunakan onkeydown sebagai pengganti onkeypress

    // Tambahkan event listener untuk tombol logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            logout();
        });
    }
});

// Fungsi logout di luar event listener DOMContentLoaded
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}
