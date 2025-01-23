export function calculatePersentil(numbers, persentil) {
    if (!numbers || numbers.length === 0) {
        alert("Data kosong!");
        return;
    }

    if (persentil < 1 || persentil > 99) {
        alert("Persentil harus berada di antara 1 hingga 99!");
        return;
    }

    // Sortir data
    const sorted = [...numbers].sort((a, b) => a - b);

    // Posisi persentil
    const n = numbers.length;
    const position = (persentil / 100) * n;

    // Hitung nilai persentil
    let persentilValue;
    if (Number.isInteger(position)) {
        persentilValue = (sorted[position - 1] + sorted[position]) / 2;
    } else {
        persentilValue = sorted[Math.ceil(position) - 1];
    }

    // Aturan statistika data kelompok: panjang kelas dihitung berdasarkan data kelompok
    const k = Math.ceil(1 + 3.322 * Math.log10(n)); // Jumlah kelas (aturan Sturges)
    const lowerBound = sorted[0]; // Nilai terkecil
    const upperBound = sorted[sorted.length - 1]; // Nilai terbesar
    const classWidth = Math.ceil((upperBound - lowerBound) / k); // Panjang kelas

    // Bangun tabel distribusi frekuensi
    let frequencyTable = [];
    let cumulativeFreq = 0;

    let lowerClass = lowerBound;
    let persentilClassIndex = -1;
    for (let i = 0; i < k; i++) {
        const upperClass = lowerClass + classWidth - 1;
        const freq = sorted.filter(num => num >= lowerClass && num <= upperClass).length;
        cumulativeFreq += freq;

        // Tentukan kelas yang mengandung persentil
        if (persentilClassIndex === -1 && cumulativeFreq >= position) {
            persentilClassIndex = i;
        }

        frequencyTable.push({
            interval: `${lowerClass} - ${upperClass}`,
            freq,
            cumulativeFreq,
            lowerClass,
        });

        lowerClass = upperClass + 1;
    }

    // Tabel bantu dengan penanda kelas persentil
    let tableHTML = `
        <h3>Tabel Bantu Persentil</h3>
        <div class="table-responsive">
            <table>
                <tr>
                    <th>Interval</th>
                    <th>Frekuensi (f)</th>
                    <th>Frekuensi Kumulatif (F)</th>
                </tr>`;
    frequencyTable.forEach((row, index) => {
        const isPersentilClass = index === persentilClassIndex;
        tableHTML += `
                <tr style="${isPersentilClass ? "font-weight: bold; background-color: #f0f8ff;" : ""}">
                    <td>${row.interval}</td>
                    <td>${row.freq}</td>
                    <td>${row.cumulativeFreq}</td>
                </tr>`;
    });
    tableHTML += `
            </table>
        </div>`;

    // Data kelas persentil
    const persentilClass = frequencyTable[persentilClassIndex];
    const L = persentilClass.lowerClass; // Batas bawah kelas persentil
    const F = persentilClassIndex > 0 ? frequencyTable[persentilClassIndex - 1].cumulativeFreq : 0; // Frekuensi kumulatif sebelum kelas persentil
    const f = persentilClass.freq; // Frekuensi kelas persentil
    const C = classWidth; // Panjang kelas

    // Rumus dan hasil
    const resultHTML = `
        <h3>Persentil</h3>
        <p><strong>Rumus:</strong> P<sub>${persentil}</sub> = L + [(n/${100}) * (${persentil}) - F] / f * C</p>
        <p><strong>Posisi Persentil:</strong> ${persentil}% atau posisi ke-${position.toFixed(2)}</p>
        <p><strong>Angka yang digunakan:</strong></p>
        <p>L = ${L}, n = ${n}, F = ${F}, f = ${f}, C = ${C}</p>
        <p><strong>Proses Perhitungan:</strong></p>
        <p>P<sub>${persentil}</sub> = ${L} + [(${(persentil / 100) * n} - ${F}) / ${f}] * ${C}</p>
        <p><strong>Hasil Akhir:</strong></p>
        <p>P<sub>${persentil}</sub> = ${(L + (((persentil / 100) * n - F) / f) * C).toFixed(2)}</p>
        <h3>Penjelasan Simbol:</h3>
        <p>L : Batas bawah kelas persentil</p>
        <p>n : Jumlah data</p>
        <p>F : Frekuensi kumulatif sebelum kelas persentil</p>
        <p>f : Frekuensi kelas persentil</p>
        <p>C : Panjang kelas</p>
    `;

    document.getElementById("statResults").innerHTML = tableHTML + resultHTML;
}
