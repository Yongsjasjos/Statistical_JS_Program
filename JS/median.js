export function calculateMedian(numbers) {
    if (!numbers || numbers.length === 0) {
        alert("Data kosong!");
        return;
    }

    // Sortir data
    const sorted = [...numbers].sort((a, b) => a - b);

    // Tentukan jumlah kelas (Sturges' Rule)
    const n = numbers.length;
    const numClasses = Math.ceil(1 + 3.322 * Math.log10(n));

    // Tentukan lebar kelas
    const minVal = Math.min(...numbers);
    const maxVal = Math.max(...numbers);
    const range = maxVal - minVal;
    const classWidth = Math.ceil(range / numClasses);

    // Bangun tabel distribusi frekuensi
    let frequencyTable = [];
    let lowerBound = minVal;
    let cumulativeFreq = 0;

    for (let i = 0; i < numClasses; i++) {
        const upperBound = lowerBound + classWidth - 1;
        const freq = sorted.filter(num => num >= lowerBound && num <= upperBound).length;
        cumulativeFreq += freq;

        if (freq > 0) {
            frequencyTable.push({
                interval: `${lowerBound} - ${upperBound}`,
                freq,
                cumulativeFreq,
                lowerBound,
            });
        }
        lowerBound = upperBound + 1;
    }

    // Cari kelas median
    const medianPosition = n / 2;
    const medianClass = frequencyTable.find(row => row.cumulativeFreq >= medianPosition);

    // Hitung Median
    const L = medianClass.lowerBound; // Batas bawah kelas median
    const F = medianClass.cumulativeFreq - medianClass.freq; // Frekuensi kumulatif sebelum kelas median
    const f = medianClass.freq; // Frekuensi kelas median
    const C = classWidth; // Panjang kelas
    const median = L + ((medianPosition - F) / f) * C;

    // Tabel bantu
    let tableHTML = `
        <h3>Tabel Bantu Median</h3>
        <div class="table-responsive">
            <table>
                <tr>
                    <th>Interval</th>
                    <th>Frekuensi (f)</th>
                    <th>Frekuensi Kumulatif (F)</th>
                </tr>`;
    frequencyTable.forEach(row => {
        const isMedianClass = row === medianClass;
        tableHTML += `
                <tr style="${isMedianClass ? "font-weight: bold;" : ""}">
                    <td>${row.interval}</td>
                    <td>${row.freq}</td>
                    <td>${row.cumulativeFreq}</td>
                </tr>`;
    });
    tableHTML += `
            </table>
        </div>`;

    // Rumus dan hasil
    const resultHTML = `
        <h3>Median</h3>
        <p><strong>Rumus:</strong> Median = L + [(n/2 - F) / f] * C</p>
        <p><strong>Letak Kelas Median:</strong></p>
        <p>Kelas median: ${medianClass.interval}, dengan frekuensi kumulatif sebelum kelas median (F) = ${F}, dan frekuensi kelas median (f) = ${f}</p>
        <p><strong>Angka yang digunakan:</strong></p>
        <p>L = ${L}, n = ${n}, F = ${F}, f = ${f}, C = ${C}</p>
        <p><strong>Proses Perhitungan:</strong></p>
        <p>Median = ${L} + [(${medianPosition} - ${F}) / ${f}] * ${C}</p>
        <p><strong>Hasil Akhir:</strong></p>
        <p>Median = ${median.toFixed(2)}</p>
        <h3>Penjelasan Simbol:</h3>
        <p>L : Batas bawah kelas median</p>
        <p>n : Jumlah data</p>
        <p>F : Frekuensi kumulatif sebelum kelas median</p>
        <p>f : Frekuensi kelas median</p>
        <p>C : Panjang kelas</p>
    `;

    document.getElementById("statResults").innerHTML = tableHTML + resultHTML;
}
