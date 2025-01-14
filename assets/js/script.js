
// Fungsi untuk toggle sidebar vouchers ikon
document.addEventListener('DOMContentLoaded', function () {
    var toggles = document.querySelectorAll('.toggle-submenu');

    toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            var submenu = this.nextElementSibling;
            var icon = this.querySelector('.submenu-icon');

            if (submenu.style.display === 'none' || submenu.style.display === '') {
                submenu.style.display = 'block';
                icon.classList.remove('fa-angle-down');
                icon.classList.add('fa-angle-up');
            } else {
                submenu.style.display = 'none';
                icon.classList.remove('fa-angle-up');
                icon.classList.add('fa-angle-down');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    var links = document.querySelectorAll('#sidebar a');

    links.forEach(function (link) {
        if (link.getAttribute('href').includes(page)) {
            link.classList.add('active');
        }
    });
});
