/**
 * Fungsi untuk menangani permintaan GET dan mengembalikan data dari Google Sheets sebagai JSON.
 */
function doGet(e) {
  // Memeriksa apakah parameter `e` ada
  if (!e) {
    return ContentService.createTextOutput('{"error": "Parameter e tidak ditemukan."}').setMimeType(ContentService.MimeType.JSON);
  }

  const sheetName = e.parameter.sheet || 'vouchers_db';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues().map(row => {
    // Mengatur nilai default jika kolom "user active" atau "status" kosong
    row[6] = row[6] || 'inactive';
    row[7] = row[7] || 'pending';
    return row;
  });

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(data));
  return output;
}

/**
 * Fungsi untuk menangani permintaan POST dan memperbarui status dan tanggal di Google Sheets.
 * @param {Object} e - Parameter event yang berisi data dari permintaan POST.
 */
function doPost(e) {
  // Memeriksa apakah parameter `e` ada
  if (!e) {
    return ContentService.createTextOutput('{"error": "Parameter e tidak ditemukan."}').setMimeType(ContentService.MimeType.JSON);
  }

  const sheetName = e.parameter.sheet || 'vouchers_db';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const row = e.parameter.row;
  const status = e.parameter.status;
  const date = e.parameter.date;

  Logger.log(`Sheet: ${sheetName}, Row: ${row}, Status: ${status}, Date: ${date}`);

  sheet.getRange(parseInt(row) + 1, 8).setValue(status);
  sheet.getRange(parseInt(row) + 1, 7).setValue('active');
  sheet.getRange(parseInt(row) + 1, 5).setValue(date);

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ status: 'success' }));
  return output;
}
