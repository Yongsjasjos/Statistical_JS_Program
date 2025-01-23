export function calculateVarianceAndStdDev(numbers) {
    if (!numbers || numbers.length === 0) {
        alert("Data kosong!");
        return;
    }

    // Hitung jumlah data dan rata-rata
    const n = numbers.length;
    const mean = numbers.reduce((acc, num) => acc + num, 0) / n;

    // Hitung varians
    const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
    const variance = squaredDifferences.reduce((acc, diff) => acc + diff, 0) / n;

    // Hitung simpangan baku
    const stdDev = Math.sqrt(variance);

    // Bangun tabel distribusi frekuensi
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
        const midPointDiff = midPoint - mean;
        const squaredMidPointDiff = Math.pow(midPointDiff, 2);
        const freqTimesSquaredMidDiff = freq * squaredMidPointDiff;

        if (freq > 0) {
            frequencyTable.push({
                interval: `${lowerBound} - ${upperBound}`,
                freq,
                midPoint,
                midPointDiff,
                squaredMidPointDiff,
                freqTimesSquaredMidDiff,
            });
        }
        lowerBound = upperBound + 1;
    }

    // Total frekuensi
    const totalFreq = frequencyTable.reduce((acc, row) => acc + row.freq, 0);
    const totalFreqTimesSquaredMidDiff = frequencyTable.reduce((acc, row) => acc + row.freqTimesSquaredMidDiff, 0);

    // Tabel bantu
    let tableHTML = `
        <h3>Tabel Bantu Varians dan Simpangan Baku</h3>
        <div class="table-responsive">
            <table>
                <tr>
                    <th>Interval</th>
                    <th>Frekuensi (f)</th>
                    <th>Nilai Tengah (x)</th>
                    <th>(x - x̄)</th>
                    <th>(x - x̄)²</th>
                    <th>f * (x - x̄)²</th>
                </tr>`;
    frequencyTable.forEach(row => {
        tableHTML += `
                <tr>
                    <td>${row.interval}</td>
                    <td>${row.freq}</td>
                    <td>${row.midPoint.toFixed(2)}</td>
                    <td>${row.midPointDiff.toFixed(2)}</td>
                    <td>${row.squaredMidPointDiff.toFixed(2)}</td>
                    <td>${row.freqTimesSquaredMidDiff.toFixed(2)}</td>
                </tr>`;
    });
    // Tambahkan baris total
    tableHTML += `
                <tr>
                    <th colspan="2">Jumlah Total</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>${totalFreqTimesSquaredMidDiff.toFixed(2)}</th>
                </tr>
            </table>
        </div>`;

    // Rumus dan hasil
    const resultHTML = `
        <h3>Varians dan Simpangan Baku</h3>
        <p><strong>Rumus Varians:</strong> Variance = Σ(f * (x - x̄)²) / n</p>
        <p><strong>Rumus Simpangan Baku:</strong> StdDev = √Variance</p>
        <p><strong>Angka yang digunakan:</strong></p>
        <p>Σ(f * (x - x̄)²) = ${totalFreqTimesSquaredMidDiff.toFixed(2)}, n = ${n}</p>
        <p><strong>Proses Perhitungan:</strong></p>
        <p>Varians = ${totalFreqTimesSquaredMidDiff.toFixed(2)} / ${totalFreq}</p>
        <p>Simpangan Baku = √(${variance.toFixed(2)})</p>
        <p><strong>Hasil Akhir:</strong></p>
        <p>Varians = ${variance.toFixed(2)}</p>
        <p>Simpangan Baku = ${stdDev.toFixed(2)}</p>
        <h3>Penjelasan Simbol:</h3>
        <p>Varians : Penyebaran data terhadap rata-rata</p>
        <p>Simpangan Baku : Akar kuadrat dari Varians</p>
        <p>Σ(f * (x - x̄)²) : Jumlah hasil perkalian frekuensi dengan selisih kuadrat nilai terhadap rata-rata</p>
        <p>n : Jumlah data</p>
    `;

    document.getElementById("statResults").innerHTML = tableHTML + resultHTML;
}