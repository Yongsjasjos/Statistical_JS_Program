export function calculateQuartil(numbers, quartil) {
    if (!numbers || numbers.length === 0) {
        alert("Data kosong!");
        return;
    }

    if (quartil < 1 || quartil > 3) {
        alert("Kuartil harus berada di antara 1 hingga 3!");
        return;
    }

    // Sortir data
    const sorted = [...numbers].sort((a, b) => a - b);

    // Posisi kuartil
    const n = numbers.length;
    const position = (quartil / 4) * n;

    // Hitung nilai kuartil
    let quartilValue;
    if (Number.isInteger(position)) {
        quartilValue = (sorted[position - 1] + sorted[position]) / 2;
    } else {
        quartilValue = sorted[Math.ceil(position) - 1];
    }

    // Bangun tabel distribusi frekuensi
    let frequencyTable = [];
    let cumulativeFreq = 0;
    const lowerBound = sorted[0];
    const upperBound = sorted[sorted.length - 1];
    const classWidth = Math.ceil((upperBound - lowerBound) / 4);

    let lowerClass = lowerBound;
    let quartilClassIndex = -1;

    for (let i = 0; i < 4; i++) {
        const upperClass = lowerClass + classWidth - 1;
        const freq = sorted.filter(num => num >= lowerClass && num <= upperClass).length;
        cumulativeFreq += freq;

        frequencyTable.push({
            interval: `${lowerClass} - ${upperClass}`,
            freq,
            cumulativeFreq,
            lowerClass,
        });

        // Tentukan kelas kuartil
        if (quartilClassIndex === -1 && cumulativeFreq >= position) {
            quartilClassIndex = i;
        }

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
    frequencyTable.forEach((row, index) => {
        const isQuartilClass = index === quartilClassIndex;
        tableHTML += `
                <tr style="${isQuartilClass ? "background-color: #ffff99; font-weight: bold;" : ""}">
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
        <h3>Kuartil</h3>
        <p><strong>Rumus:</strong> Q<sub>${quartil}</sub> = L + [(n/${4}) * (${quartil}) - F] / f * C</p>
        <p><strong>Posisi Kuartil:</strong> ${(quartil / 4) * 100}% atau posisi ke-${position.toFixed(2)}</p>
        <p><strong>Angka yang digunakan:</strong></p>
        <p>L = ${frequencyTable[quartilClassIndex].lowerClass}, n = ${n}, F = ${frequencyTable[quartilClassIndex - 1]?.cumulativeFreq || 0}, f = ${frequencyTable[quartilClassIndex].freq}, C = ${classWidth}</p>
        <p><strong>Proses Perhitungan:</strong></p>
        <p>Q<sub>${quartil}</sub> = ${frequencyTable[quartilClassIndex].lowerClass} + [(${(quartil / 4) * n} - ${frequencyTable[quartilClassIndex - 1]?.cumulativeFreq || 0}) / ${frequencyTable[quartilClassIndex].freq}] * ${classWidth}</p>
        <p><strong>Hasil Akhir:</strong></p>
        <p>Q<sub>${quartil}</sub> = ${quartilValue.toFixed(2)}</p>
        <h3>Penjelasan Simbol:</h3>
        <p>L : Batas bawah kelas kuartil</p>
        <p>n : Jumlah data</p>
        <p>F : Frekuensi kumulatif sebelum kelas kuartil</p>
        <p>f : Frekuensi kelas kuartil</p>
        <p>C : Panjang kelas</p>
    `;

    document.getElementById("statResults").innerHTML = tableHTML + resultHTML;
}