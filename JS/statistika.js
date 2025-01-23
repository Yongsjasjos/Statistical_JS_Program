// Inisialisasi variabel global
window.randomNumbers = [];
window.frequencyTable = [];

// Event listener untuk tombol Buat
document.getElementById("generateButton").addEventListener("click", () => {
    const count = parseInt(document.getElementById("count").value);
    const minVal = parseInt(document.getElementById("minVal").value);
    const maxVal = parseInt(document.getElementById("maxVal").value);

    // Validasi input
    if (isNaN(count) || isNaN(minVal) || isNaN(maxVal) || count <= 0 || minVal >= maxVal) {
        alert("Periksa kembali input Anda.");
        return;
    }

    // Generate angka random
    window.randomNumbers = Array.from({ length: count }, () =>
        Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
    );

    document.getElementById("randomNumbers").textContent = `Angka Random: ${window.randomNumbers.join(", ")}`;
    generateFrequencyTable(window.randomNumbers, minVal, maxVal);
    document.getElementById("statButtons").style.display = "block";
});

// Fungsi membuat tabel frekuensi
function generateFrequencyTable(numbers, minVal, maxVal) {
    const range = maxVal - minVal;
    const classWidth = Math.max(1, Math.ceil(range / Math.ceil(1 + 3.322 * Math.log10(numbers.length))));
    let lowerBound = minVal;

    window.frequencyTable = [];
    while (lowerBound <= maxVal) {
        const upperBound = lowerBound + classWidth - 1;
        const freq = numbers.filter(num => num >= lowerBound && num <= upperBound).length;
        if (freq > 0) {
            window.frequencyTable.push({ lowerBound, upperBound, freq });
        }
        lowerBound = upperBound + 1;
    }

    renderFrequencyTable();
}

// Fungsi menampilkan tabel frekuensi
function renderFrequencyTable() {
    let tableHTML = `<table><tr><th>Interval</th><th>Frekuensi</th></tr>`;
    window.frequencyTable.forEach(row => {
        tableHTML += `<tr><td>${row.lowerBound}-${row.upperBound}</td><td>${row.freq}</td></tr>`;
    });
    tableHTML += `</table>`;
    document.getElementById("frequencyTable").innerHTML = tableHTML;
}
