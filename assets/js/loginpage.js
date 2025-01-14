document.addEventListener('DOMContentLoaded', function () {
    // Periksa status login
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }

    // Fungsi untuk reset timer logout
    function resetLogoutTimer() {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(logout, 15 * 60 * 1000); // 15 menit
    }

    // Fungsi untuk logout
    function logout() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }

    // Tambahkan event listener untuk aktivitas pengguna
    window.onload = resetLogoutTimer;
    document.onmousemove = resetLogoutTimer;
    document.onkeypress = resetLogoutTimer;
});

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}