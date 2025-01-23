export function calculateIQR(numbers) {
    if (!numbers || numbers.length === 0) {
        alert("Data kosong!");
        return;
    }

    // Fungsi untuk menghitung nilai kuartil
    function calculateQuartilValue(numbers, quartil) {
        const sorted = [...numbers].sort((a, b) => a - b);
        const n = numbers.length;
        const position = (quartil / 4) * n;

        if (Number.isInteger(position)) {
            return (sorted[position - 1] + sorted[position]) / 2;
        } else {
            return sorted[Math.ceil(position) - 1];
        }
    }

    // Sortir data
    const sorted = [...numbers].sort((a, b) => a - b);

    // Hitung Q1 dan Q3
    const Q1 = calculateQuartilValue(numbers, 1);
    const Q3 = calculateQuartilValue(numbers, 3);

    // Hitung IQR dan SIQR
    const IQR = Q3 - Q1;
    const SIQR = IQR / 2;

    // Bangun tabel distribusi frekuensi
    const n = numbers.length;
    const lowerBound = sorted[0];
    const upperBound = sorted[sorted.length - 1];
    const classWidth = Math.ceil((upperBound - lowerBound) / 4);

    let frequencyTable = [];
    let cumulativeFreq = 0;
    let lowerClass = lowerBound;
    let quartilClasses = [];

    for (let i = 0; i < 4; i++) {
        const upperClass = lowerClass + classWidth - 1;
        const freq = sorted.filter(num => num >= lowerClass && num <= upperClass).length;
        cumulativeFreq += freq;

        const isQ1Class = cumulativeFreq >= (n / 4) && quartilClasses.length === 0;
        const isQ3Class = cumulativeFreq >= (3 * n / 4) && quartilClasses.length === 1;

        if (isQ1Class || isQ3Class) quartilClasses.push(i);

        frequencyTable.push({
            interval: `${lowerClass} - ${upperClass}`,
            freq,
            cumulativeFreq,
            lowerClass,
            isQuartilClass: isQ1Class || isQ3Class,
        });

        lowerClass = upperClass + 1;
    }

    // Tabel bantu
    let tableHTML = `
        <h3>Tabel Bantu Kuartil</h3>
        <div class="table-responsive">
            <table>
                <tr>
                    <th>Interval</th>
                    <th>Frekuensi (f)</th>
                    <th>Frekuensi Kumulatif (F)</th>
                </tr>`;
    frequencyTable.forEach(row => {
        tableHTML += `
                <tr style="${row.isQuartilClass ? "background-color: #ffff99; font-weight: bold;" : ""}">
                    <td>${row.interval}</td>
                    <td>${row.freq}</td>
                    <td>${row.cumulativeFreq}</td>
                </tr>`;
    });
    tableHTML += `
            </table>
        </div>`;

    // Rumus dan proses perhitungan
    const resultHTML = `
        <h3>Rentang Antar Kuartil (IQR) dan Rentang Semi Antar Kuartil (SIQR)</h3>
        <p><strong>Kuartil 1 (Q1):</strong> ${Q1.toFixed(2)}</p>
        <p><strong>Kuartil 3 (Q3):</strong> ${Q3.toFixed(2)}</p>
        <p><strong>Rentang Antar Kuartil (IQR):</strong> Q3 - Q1 = ${Q3.toFixed(2)} - ${Q1.toFixed(2)} = ${IQR.toFixed(2)}</p>
        <p><strong>Rentang Semi Antar Kuartil (SIQR):</strong> IQR / 2 = ${IQR.toFixed(2)} / 2 = ${SIQR.toFixed(2)}</p>
        <h3>Proses Perhitungan Kuartil:</h3>
        <p><strong>Q1:</strong> Letak Q1 ada di kelas interval <strong>${frequencyTable[quartilClasses[0]].interval}</strong>.</p>
        <p><strong>Q3:</strong> Letak Q3 ada di kelas interval <strong>${frequencyTable[quartilClasses[1]].interval}</strong>.</p>
        <h3>Penjelasan:</h3>
        <p><strong>IQR:</strong> Selisih antara Kuartil 3 (Q3) dan Kuartil 1 (Q1).</p>
        <p><strong>SIQR:</strong> Setengah dari Rentang Antar Kuartil (IQR), menunjukkan tingkat penyebaran data di sekitar median.</p>
    `;

    // Gabungkan tabel dan hasil
    document.getElementById("statResults").innerHTML = tableHTML + resultHTML;
}