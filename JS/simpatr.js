export function calculateSimrat(numbers) {
    if (!numbers || numbers.length === 0) {
        alert("Data kosong!");
        return;
    }

    // Hitung jumlah data dan total nilai
    const n = numbers.length;
    const mean = numbers.reduce((acc, num) => acc + num, 0) / n;

    // Hitung simpangan rata-rata
    const sumOfDifferences = numbers.reduce((acc, num) => acc + Math.abs(num - mean), 0);
    const sumAbsDif = numbers.reduce((acc, num) => acc + Math.abs(num - mean) * num, 0);
    const simrat = sumAbsDif / n;

    // Bangun tabel frekuensi
    let frequencyTable = [];
    let lowerBound = Math.min(...numbers);

    // Tentukan jumlah kelas (Sturges' Rule)
    const numClasses = Math.ceil(1 + 3.322 * Math.log10(n));
    const range = Math.max(...numbers) - lowerBound;
    const classWidth = Math.ceil(range / numClasses);

    for (let i = 0; i < numClasses; i++) {
        const upperBound = lowerBound + classWidth - 1;
        const midPoint = (lowerBound + upperBound) / 2;
        const freq = numbers.filter(num => num >= lowerBound && num <= upperBound).length;
        const absMidDiff = numbers.reduce((acc, num) => acc + Math.abs(num - midPoint), 0);

        if (freq > 0) {
            frequencyTable.push({
                interval: `${lowerBound} - ${upperBound}`,
                midPoint,
                freq,
                freqTimesMid: freq * midPoint,
                absMidDiff,
                freqTimesAbsMidDiff: freq * absMidDiff,
            });
        }
        lowerBound = upperBound + 1;
    }

    // Total frekuensi
    const totalFreq = frequencyTable.reduce((acc, row) => acc + row.freq, 0);
    const totalFreqTimesAbsMidDiff = frequencyTable.reduce((acc, row) => acc + row.freqTimesAbsMidDiff, 0);

    // Tabel bantu
    let tableHTML = `
        <h3>Tabel Bantu Simpangan Rata-rata (Distribusi Frekuensi)</h3>
        <div class="table-responsive">
            <table>
                <tr>
                    <th>Interval</th>
                    <th>Nilai Tengah (x)</th>
                    <th>Frekuensi (f)</th>
                    <th>f * x</th>
                    <th>|x - x̄|</th>
                    <th>f * |x - x̄|</th>
                </tr>`;
    frequencyTable.forEach(row => {
        tableHTML += `
                <tr>
                    <td>${row.interval}</td>
                    <td>${row.midPoint}</td>
                    <td>${row.freq}</td>
                    <td>${row.freqTimesMid.toFixed(2)}</td>
                    <td>${row.absMidDiff.toFixed(2)}</td>
                    <td>${row.freqTimesAbsMidDiff.toFixed(2)}</td>
                </tr>`;
    });
    // Tambahkan baris total
    tableHTML += `
                <tr>
                    <th colspan="2">Jumlah Total</th>
                    <th>${totalFreq}</th>
                    <th></th>
                    <th></th>
                    <th>${totalFreqTimesAbsMidDiff.toFixed(2)}</th>
                </tr>
            </table>
        </div>`;

    // Rumus dan hasil
    const resultHTML = `
        <h3>Simpangan Rata-rata</h3>
        <p><strong>Rumus:</strong> Simrat = Σ(f * |x - x̄|) / n</p>
        <p><strong>Angka yang digunakan:</strong></p>
        <p>Σ(f * |x - x̄|) = ${totalFreqTimesAbsMidDiff.toFixed(2)}, n = ${n}</p>
        <p><strong>Proses Perhitungan:</strong></p>
        <p>Simrat = ${totalFreqTimesAbsMidDiff.toFixed(2)} / ${totalFreq}</p>
        <p><strong>Hasil Akhir:</strong></p>
        <p>Simrat = ${simrat.toFixed(2)}</p>
        <h3>Penjelasan Simbol:</h3>
        <p>Simrat : Simpangan rata-rata</p>
        <p>Σ(f * |x - x̄|) : Jumlah hasil perkalian frekuensi dengan harga mutlak dari selisih nilai dengan rata-rata</p>
        <p>n : Jumlah data</p>
    `;

    document.getElementById("statResults").innerHTML = tableHTML + resultHTML;
}