// Menambahkan meta tag 'notranslate' secara dinamis
const preventTranslate = () => {
    const meta = document.createElement('meta');
    meta.name = "google";
    meta.content = "notranslate";
    document.getElementsByTagName('head')[0].appendChild(meta);
};

// Menambahkan atribut 'translate="no"' ke seluruh elemen
const disableTranslation = () => {
    document.querySelectorAll('*').forEach((el) => {
        el.setAttribute('translate', 'no');
    });
};

// Memanggil fungsi
preventTranslate();
disableTranslation();

//loading
window.onload = function() {
  setTimeout(() => {
    // Sembunyikan layar loading
    document.getElementById("loading-screen").style.display = "none";
    // Tampilkan konten utama
    document.getElementById("content").style.display = "block";
  }, 1000); // Tunda 1 detik
};

//pagination
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".list .item");
  const itemsPerPage = 5;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationNumbers = document.querySelector(".pagination-numbers");
  const prevButton = document.querySelector(".pagination-button.prev");
  const nextButton = document.querySelector(".pagination-button.next");
  const paginationInfo = document.querySelector(".pagination-info");

  let currentPage = 1;

  function updatePagination() {
    // Sembunyikan semua item
    items.forEach((item, index) => {
      item.style.display = "none";
      if (
        index >= (currentPage - 1) * itemsPerPage &&
        index < currentPage * itemsPerPage
      ) {
        item.style.display = "block";
      }
    });

    // Update tombol aktif
    document.querySelectorAll(".pagination-numbers button").forEach((btn, index) => {
      if (index + 1 === currentPage) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update tombol navigasi
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Update informasi
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    paginationInfo.textContent = `Showing ${startItem}–${endItem}`;
  }

  function createPaginationNumbers() {
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      if (i === currentPage) button.classList.add("active");
      button.addEventListener("click", () => {
        currentPage = i;
        updatePagination();
      });
      paginationNumbers.appendChild(button);
    }
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });

  // Inisialisasi
  createPaginationNumbers();
  updatePagination();
});

//searching
    const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const items = document.querySelectorAll('.item');

// Event Listener untuk pencarian
searchForm.addEventListener('submit', function(event) {
  const query = searchInput.value.trim(); // Ambil input pengguna (hilangkan spasi)
  
  // Jika input kosong, lakukan refresh halaman
  if (!query) {
    location.reload(); // Refresh halaman
    return;
  }

  event.preventDefault(); // Mencegah reload halaman jika ada input
  const lowerQuery = query.toLowerCase();

  let found = false; // Variabel untuk mengecek apakah materi ditemukan

  items.forEach(item => {
    const materiText = item.querySelector('.materi').textContent.toLowerCase(); // Ambil teks dalam tag <a>
    
    // Tampilkan atau sembunyikan item berdasarkan pencarian
    if (materiText.includes(lowerQuery)) {
      item.style.display = ''; // Tampilkan
      found = true; // Materi ditemukan
    } else {
      item.style.display = 'none'; // Sembunyikan
    }
  });

  // Jika tidak ditemukan, tampilkan alert dan refresh halaman
  if (!found) {
    alert('Materi yang kamu cari tidak ada...');
    location.reload(); // Refresh halaman
  }
});