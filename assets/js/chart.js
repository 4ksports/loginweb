const voucherCtx = document.getElementById('voucherChart').getContext('2d');
const salesCtx = document.getElementById('salesChart').getContext('2d');

const voucherChart = new Chart(voucherCtx, {
    type: 'bar',
    data: {
        labels: ['Voucher A', 'Voucher B', 'Voucher C', 'Voucher D', 'Voucher E'],
        datasets: [{
            label: 'Jumlah Voucher',
            data: [120, 150, 180, 90, 70],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const salesChart = new Chart(salesCtx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Sales',
            data: [300, 400, 300, 500, 400, 600, 700],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});