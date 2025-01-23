export function calculateMean(numbers) {
    if (!numbers || numbers.length === 0) {
        alert("Data kosong!");
        return;
    }

    // Hitung jumlah data dan total nilai
    const n = numbers.length;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / n;

    // Tentukan jumlah kelas (Sturges' Rule)
    const numClasses = Math.ceil(1 + 3.322 * Math.log10(n));

    // Tentukan lebar kelas
    const minVal = Math.min(...numbers);
    const maxVal = Math.max(...numbers);
    const range = maxVal - minVal;
    const classWidth = Math.ceil(range / numClasses);

    // Bangun tabel frekuensi
    let frequencyTable = [];
    let lowerBound = minVal;

    for (let i = 0; i < numClasses; i++) {
        const upperBound = lowerBound + classWidth - 1;
        const midPoint = (lowerBound + upperBound) / 2;
        const freq = numbers.filter(num => num >= lowerBound && num <= upperBound).length;

        if (freq > 0) {
            frequencyTable.push({
                interval: `${lowerBound} - ${upperBound}`,
                midPoint,
                freq,
                freqTimesMid: freq * midPoint,
            });
        }
        lowerBound = upperBound + 1;
    }

    // Total frekuensi dan f * x
    const totalFreq = frequencyTable.reduce((acc, row) => acc + row.freq, 0);
    const totalFreqTimesMid = frequencyTable.reduce((acc, row) => acc + row.freqTimesMid, 0);

    // Tabel bantu
    let tableHTML = `
        <h3>Tabel Bantu Mean (Distribusi Frekuensi)</h3>
        <div class="table-responsive">
            <table>
                <tr>
                    <th>Interval</th>
                    <th>Nilai Tengah (x)</th>
                    <th>Frekuensi (f)</th>
                    <th>f * x</th>
                </tr>`;
    frequencyTable.forEach(row => {
        tableHTML += `
                <tr>
                    <td>${row.interval}</td>
                    <td>${row.midPoint}</td>
                    <td>${row.freq}</td>
                    <td>${row.freqTimesMid.toFixed(2)}</td>
                </tr>`;
    });
    // Tambahkan baris total
    tableHTML += `
                <tr>
                    <th colspan="2">Jumlah Total</th>
                    <th>${totalFreq}</th>
                    <th>${totalFreqTimesMid.toFixed(2)}</th>
                </tr>
            </table>
        </div>`;

    // Rumus dan hasil
    const resultHTML = `
        <h3>Mean</h3>
        <p><strong>Rumus:</strong> x̄ = Σ(f * x) / Σf</p>
        <p><strong>Angka yang digunakan:</strong></p>
        <p>Σ(f * x) = ${totalFreqTimesMid.toFixed(2)}, Σf = ${totalFreq}</p>
        <p><strong>Proses Perhitungan:</strong></p>
        <p>x̄ = ${totalFreqTimesMid.toFixed(2)} / ${totalFreq}</p>
        <p><strong>Hasil Akhir:</strong></p>
        <p>x̄ = ${mean.toFixed(2)}</p>
        <h3>Penjelasan Simbol:</h3>
        <p>x̄ : Mean (rata-rata)</p>
        <p>Σ(f * x) : Total hasil perkalian frekuensi dengan nilai tengah</p>
        <p>Σf : Total frekuensi</p>
    `;

    document.getElementById("statResults").innerHTML = tableHTML + resultHTML;
}
