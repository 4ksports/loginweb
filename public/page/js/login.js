document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah submit form secara default

    // Ambil nilai username dan password dari form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validasi username dan password
    if (validateLogin(username, password)) {
        // Set status login ke localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Arahkan ke halaman index.html
        window.location.href = 'index.html';
    } else {
        // Tampilkan pesan kesalahan
        displayErrorMessage('Username atau password salah.');
    }
});

// Fungsi untuk validasi login
function validateLogin(username, password) {
    return username === 'admin' && password === '1234';
}

// Fungsi untuk menampilkan pesan kesalahan
function displayErrorMessage(message) {
    const loginMessage = document.getElementById('loginMessage');
    loginMessage.textContent = message;
    loginMessage.style.color = 'red';
}