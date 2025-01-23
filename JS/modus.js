export function calculateModus(frequencyTable) {
    if (!frequencyTable || frequencyTable.length === 0) {
        alert("Tabel frekuensi kosong!");
        return;
    }

    const maxFreq = Math.max(...frequencyTable.map(row => row.freq));
    const modusIntervals = frequencyTable.filter(row => row.freq === maxFreq);

    // Tabel bantu
    let tableHTML = `
        <h3>Tabel Bantu Modus</h3>
        <div class="table-responsive">
            <table>
                <tr>
                    <th>Interval</th>
                    <th>Frekuensi</th>
                </tr>`;
    frequencyTable.forEach(row => {
        const isModus = modusIntervals.includes(row);
        tableHTML += `<tr style="${isModus ? "font-weight: bold;" : ""}">
            <td>${row.lowerBound}-${row.upperBound}</td>
            <td>${row.freq}</td>
        </tr>`;
    });
    tableHTML += `
            </table>
        </div>`;

    // Rumus
    let resultHTML = `
        <h3>Modus</h3>
        <p><strong>Rumus:</strong> M<sub>o</sub> = L + [(f<sub>m</sub> - f<sub>1</sub>) / ((f<sub>m</sub> - f<sub>1</sub>) + (f<sub>m</sub> - f<sub>2</sub>))] * C</p>
    `;

    // Hitung modus
    const moduses = modusIntervals.map((interval, index) => {
        const lowerBound = interval.lowerBound;
        const classWidth = interval.upperBound - interval.lowerBound + 1;
        const freqModus = interval.freq;
        const freqBefore = frequencyTable[frequencyTable.indexOf(interval) - 1]?.freq || 0;
        const freqAfter = frequencyTable[frequencyTable.indexOf(interval) + 1]?.freq || 0;

        const modus = lowerBound + ((freqModus - freqBefore) / ((freqModus - freqBefore) + (freqModus - freqAfter))) * classWidth;

        // Perhitungan dengan nomor
        resultHTML += `
            <h4>Perhitungan ${index + 1}</h4>
            <p><strong>Interval Modus:</strong> ${interval.lowerBound}-${interval.upperBound}</p>
            <p><strong>Angka yang digunakan:</strong></p>
            <p>L = ${lowerBound}, f<sub>m</sub> = ${freqModus}, f<sub>1</sub> = ${freqBefore}, f<sub>2</sub> = ${freqAfter}, C = ${classWidth}</p>
            <p><strong>Proses Perhitungan:</strong></p>
            <p>M<sub>o</sub> = ${lowerBound} + [(${freqModus} - ${freqBefore}) / ((${freqModus} - ${freqBefore}) + (${freqModus} - ${freqAfter}))] * ${classWidth}</p>
            <p><strong>Hasil:</strong> M<sub>o</sub> = ${modus.toFixed(2)}</p>
        `;

        return modus.toFixed(2);
    });

    // Keterangan berdasarkan jumlah modus
    if (moduses.length === 1) {
        resultHTML += `
            <p><strong>Hasil Akhir:</strong> M<sub>o</sub> = ${moduses[0]} <span class="modal-label" data-type="unimodal" data-value="${moduses[0]}">(Unimodal)</span></p>
        `;
    } else if (moduses.length === 2) {
        resultHTML += `
            <p><strong>Hasil Akhir:</strong> M<sub>o</sub> = ${moduses.join(", ")} <span class="modal-label" data-type="bimodal" data-value="${moduses.join(", ")}">(Bimodal)</span></p>
        `;
    } else {
        resultHTML += `
            <p><strong>Hasil Akhir:</strong> M<sub>o</sub> = ${moduses.join(", ")} <span class="modal-label" data-type="multimodal" data-value="${moduses.join(", ")}">(Multi Modal)</span></p>
        `;
    }

    resultHTML += `
        <h3>Penjelasan Simbol:</h3>
        <p>L : Batas bawah kelas modus</p>
        <p>f<sub>m</sub> : Frekuensi kelas modus</p>
        <p>f<sub>1</sub> : Frekuensi kelas sebelum kelas modus</p>
        <p>f<sub>2</sub> : Frekuensi kelas setelah kelas modus</p>
        <p>C : Panjang kelas</p>
    `;

    document.getElementById("statResults").innerHTML = tableHTML + resultHTML;

    // Event listener untuk label modal
    document.querySelectorAll(".modal-label").forEach(label => {
        label.addEventListener("click", () => {
            const type = label.getAttribute("data-type");
            const value = label.getAttribute("data-value");

            if (type === "unimodal") {
                alert(`Data ini memiliki satu nilai modus yaitu: ${value}`);
            } else if (type === "bimodal") {
                alert(`Data ini memiliki 2 nilai modus yaitu: ${value}`);
            } else if (type === "multimodal") {
                alert(`Data ini memiliki modus lebih dari 2 yaitu: ${value}`);
            }
        });
    });
}
