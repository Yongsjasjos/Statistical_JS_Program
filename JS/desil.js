export function calculateDesil(numbers, desil) {
    if (!numbers || numbers.length === 0) {
        alert("Data kosong!");
        return;
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const n = numbers.length;
    const position = (desil / 10) * n;

    const minVal = Math.min(...numbers);
    const maxVal = Math.max(...numbers);
    const range = maxVal - minVal;
    const numClasses = Math.ceil(1 + 3.322 * Math.log10(n));
    const classWidth = Math.max(1, Math.ceil(range / numClasses));

    let frequencyTable = [];
    let lowerBound = minVal;
    let cumulativeFreq = 0;
    let desilClass;

    for (let i = 0; i < numClasses; i++) {
        const upperBound = lowerBound + classWidth - 1;
        const freq = sorted.filter(num => num >= lowerBound && num <= upperBound).length;
        cumulativeFreq += freq;

        const row = {
            interval: `${lowerBound} - ${upperBound}`,
            freq,
            cumulativeFreq,
            lowerBound,
        };

        if (!desilClass && cumulativeFreq >= position) {
            desilClass = row;
        }

        frequencyTable.push(row);
        lowerBound = upperBound + 1;
    }

    const L = desilClass.lowerBound;
    const F = desilClass.cumulativeFreq - desilClass.freq;
    const f = desilClass.freq;
    const C = classWidth;
    const desilValue = L + ((position - F) / f) * C;

    // Tabel bantu desil
    let tableHTML = `
        <h3>Tabel Bantu Desil</h3>
        <table>
            <tr>
                <th>Interval</th>
                <th>Frekuensi (f)</th>
                <th>Frekuensi Kumulatif (F)</th>
            </tr>`;
    frequencyTable.forEach(row => {
        const isDesilClass = row === desilClass;
        tableHTML += `
            <tr style="${isDesilClass ? "font-weight: bold;" : ""}">
                <td>${row.interval}</td>
                <td>${row.freq}</td>
                <td>${row.cumulativeFreq}</td>
            </tr>`;
    });
    tableHTML += `</table>`;

    // Informasi tambahan
    const detailsHTML = `
        <h3>Detail Perhitungan Desil</h3>
        <p><strong>Rumus:</strong> D<sub>${desil}</sub> = L + [(n/10 × ${desil} - F) / f] × C</p>
        <p><strong>Posisi Desil:</strong> ${(desil / 10) * 100}% atau posisi ke-${position.toFixed(2)}</p>
        <p><strong>Angka yang digunakan:</strong></p>
        <p>L = ${L}</p>
        <p>n = ${n}</p>
        <p>F = ${F}</p>
        <p>f = ${f}</p>
        <p>C = ${C}</p>
        <p><strong>Proses Perhitungan:</strong></p>
        <p>D<sub>${desil}</sub> = ${L} + [(${position.toFixed(2)} - ${F}) / ${f}] × ${C}</p>
        <p><strong>Hasil Akhir:</strong> D<sub>${desil}</sub> = ${desilValue.toFixed(2)}</p>
        <h3>Penjelasan Simbol:</h3>
        <p><strong>L</strong>: Batas bawah kelas desil</p>
        <p><strong>n</strong>: Jumlah data</p>
        <p><strong>F</strong>: Frekuensi kumulatif sebelum kelas desil</p>
        <p><strong>f</strong>: Frekuensi kelas desil</p>
        <p><strong>C</strong>: Panjang kelas</p>
    `;

    document.getElementById("statResults").innerHTML = tableHTML + detailsHTML;
}
