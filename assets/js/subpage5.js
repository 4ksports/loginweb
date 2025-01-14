// URL untuk mendapatkan data dari Google Sheets
const sheetDataUrl = 'https://script.google.com/macros/s/AKfycbzc5OmBxPzwSdpDtffPayJdfxKntwoYg8xQQBiOHnWRsMTcjcGax9DMBA6YfKJh6J1c/exec?sheet=Vouchers_E';
// URL untuk memperbarui data di Google Sheets
const sheetUpdateUrl = 'https://script.google.com/macros/s/AKfycbzc5OmBxPzwSdpDtffPayJdfxKntwoYg8xQQBiOHnWRsMTcjcGax9DMBA6YfKJh6J1c/exec?sheet=Vouchers_E';
let tableData = [];

// Fungsi untuk memformat tanggal
function formatDate(dateStr) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', options);
}

// Fungsi untuk menangani respon Ajax
function handleAjaxResponse(jqxhr, textStatus, error) {
    if (textStatus === "success") {
        console.log("Request was successful");
    } else {
        console.error("Request failed with error: ", error);
    }
    // Menggunakan variabel jqxhr jika diperlukan
    console.log("jqxhr details: ", jqxhr);
}

// Fungsi untuk mengambil data dan memperbarui tabel
function fetchDataAndUpdateTable() {
    $.getJSON(sheetDataUrl, function(data) {
        console.log("Data diambil: ", data);
        if (data && data.length > 0) {
            tableData = data;
            const tableHeader = data[0];
            tableHeader.push('Action');

            // Menghancurkan DataTable jika sudah ada untuk menghindari duplikasi
            if ($.fn.DataTable.isDataTable('#data-table')) {
                $('#data-table').DataTable().destroy();
            }

            // Menghapus isi tabel lama
            $('#table-header').empty();
            tableHeader.forEach(header => {
                $('#table-header').append(`<th>${header}</th>`);
            });

            $('#table-body').empty();
            data.slice(1).forEach((row, rowIndex) => {
                let rowHTML = `<tr data-row-index="${rowIndex}">`;
                row.forEach((cell, cellIndex) => {
                    if (cellIndex === 7) {
                        cell = cell || 'pending';
                        rowHTML += `<td class="${cell === 'pending' ? 'status-pending' : 'status-success'}">${cell}</td>`;
                    } else if (cellIndex === 6) {
                        cell = cell || 'inactive';
                        rowHTML += `<td class="user-active-${cell}"><i class="fas fa-circle"></i> ${cell}</td>`;
                    } else if (cellIndex === 4) {
                        rowHTML += `<td>${formatDate(cell)}</td>`;
                    } else {
                        rowHTML += `<td>${cell}</td>`;
                    }
                });

                rowHTML += `<td><button class="beli-button"><i class="fas fa-cart-shopping"></i> Beli</button></td>`;
                rowHTML += '</tr>';
                $('#table-body').append(rowHTML);
            });

            // Inisialisasi DataTables dengan default "Show 10 entries"
            $('#data-table').DataTable({
                "pageLength": 10
            });

            hideLoadingMessage();
        } else {
            alert("Tidak ada data yang ditemukan.");
            hideLoadingMessage();
        }
    }).fail(function(jqxhr, textStatus, error) {
        handleAjaxResponse(jqxhr, textStatus, error);
        hideLoadingMessage();
    });
}

// Event delegation untuk menangani pembelian item
$(document).on('click', '.beli-button', function() {
    const rowIndexOriginal = $(this).closest('tr').data('row-index');
    const rowData = tableData[rowIndexOriginal + 1];
    const modal = document.getElementById("myModal");

    document.getElementById("modal-id").textContent = rowData[0];
    document.getElementById("modal-code1").textContent = rowData[1];
    document.getElementById("modal-code2").textContent = rowData[2];
    document.getElementById("modal-price").textContent = rowData[3];
    document.getElementById("modal-duration").textContent = rowData[5];
    document.getElementById("modal-user-status").textContent = rowData[6];
    document.getElementById("modal-purchase-status").textContent = rowData[7];

    modal.style.display = "block";

    document.getElementById("confirm-btn").onclick = function() {
        modal.style.display = "none";
        document.getElementById("loadingModal").style.display = "block";
        updateStatus(rowIndexOriginal);
    };

    document.getElementById("cancel-btn").onclick = function() {
        modal.style.display = "none";
    };
    document.getElementsByClassName("close")[0].onclick = function() {
        modal.style.display = "none";
    };
});

// Fungsi untuk memperbarui status item
function updateStatus(rowIndex) {
    const row = $(`#data-table tbody tr[data-row-index='${rowIndex}']`);
    const statusCell = row.find('td').eq(7);
    const userActiveCell = row.find('td').eq(6);
    const dateCell = row.find('td').eq(4);
    const currentDate = new Date().toISOString().slice(0, 10);

    if (statusCell.text() === 'pending') {
        statusCell.removeClass('status-pending').addClass('status-success').text('success');
        userActiveCell.removeClass('user-active-inactive').addClass('user-active-active').html('<i class="fas fa-circle"></i> active');
        dateCell.text(formatDate(currentDate));
        console.log("Status berhasil diubah menjadi success, user active menjadi active, dan tanggal diperbarui untuk item dengan data: ", tableData[rowIndex + 1]);

        $.post(sheetUpdateUrl, {
            row: rowIndex + 1,
            status: 'success',
            date: currentDate
        }).done(function(response) {
            console.log("Response dari server: ", response);
            document.getElementById("loadingModal").style.display = "none";
            fetchDataAndUpdateTable();
            const successModal = document.getElementById("successModal");
            successModal.style.display = "block";
        }).fail(function(jqxhr, textStatus, error) {
            handleAjaxResponse(jqxhr, textStatus, error);
        });
    } else {
        document.getElementById("loadingModal").style.display = "none";
        document.getElementById("alreadyPurchasedModal").style.display = "block";
    }
}

// Fungsi untuk menangani klik di luar modal
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    const successModal = document.getElementById("successModal");
    const alreadyPurchasedModal = document.getElementById("alreadyPurchasedModal");
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == successModal) {
        successModal.style.display = "none";
    } else if (event.target == alreadyPurchasedModal) {
        alreadyPurchasedModal.style.display = "none";
    }
}

// Fungsi untuk menutup modal sukses
document.getElementsByClassName("success-close")[0].onclick = function() {
    const successModal = document.getElementById("successModal");
    successModal.style.display = "none";
};
document.getElementById("ok-btn").onclick = function() {
    const successModal = document.getElementById("successModal");
    successModal.style.display = "none";
};

// Fungsi untuk menutup modal sudah dibeli
document.getElementsByClassName("already-purchased-close")[0].onclick = function() {
    const alreadyPurchasedModal = document.getElementById("alreadyPurchasedModal");
    alreadyPurchasedModal.style.display = "none";
};
document.getElementById("ok-already-purchased-btn").onclick = function() {
    const alreadyPurchasedModal = document.getElementById("alreadyPurchasedModal");
    alreadyPurchasedModal.style.display = "none";
};
