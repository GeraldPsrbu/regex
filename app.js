function validateEmail() {
    const emailInput = document.getElementById('emailInput');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = 'Invalid email format';
    } else {
        emailError.textContent = '';
    }
}
function validateDate() {
    const dateInput = document.getElementById('dateInput');
    const dateError = document.getElementById('dateError');
    const inputValue = dateInput.value.trim();

    // Pattern untuk memeriksa format DD/MM/YYYY
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    // Memeriksa apakah format sesuai dengan pola
    if (!datePattern.test(inputValue)) {
        dateError.textContent = 'Invalid date format (DD/MM/YYYY)';
        return;
    }

    // Mendapatkan nilai tanggal, bulan, dan tahun dari input
    const [, day, month, year] = inputValue.match(datePattern);

    // Konversi nilai menjadi integer
    const numericDay = parseInt(day, 10);
    const numericMonth = parseInt(month, 10);
    const numericYear = parseInt(year, 10);

    // Memeriksa apakah tanggal, bulan, dan tahun valid
    if (!isValidDate(numericDay, numericMonth, numericYear)) {
        dateError.textContent = 'Invalid date';
        return;
    }

    // Memeriksa apakah tanggal tersebut sudah berlalu atau sudah berjalan
    const inputDate = new Date(numericYear, numericMonth - 1, numericDay);
    const currentDate = new Date();

    if (inputDate > currentDate) {
        dateError.textContent = 'Date cannot be in the future';
        return;
    }

    // Jika semua validasi berhasil, hapus pesan kesalahan
    dateError.textContent = '';
}

// Fungsi untuk memeriksa apakah tanggal, bulan, dan tahun valid
function isValidDate(day, month, year) {
    // Membuat objek Date untuk memeriksa validitas tanggal
    const dateObject = new Date(year, month - 1, day);

    // Memeriksa apakah objek Date menghasilkan tanggal yang valid
    return (
        dateObject.getFullYear() === year &&
        dateObject.getMonth() === month - 1 &&
        dateObject.getDate() === day
    );
}

function validatePhoneNumber() {
    const phoneInput = document.getElementById('phoneInput');
    const phoneError = document.getElementById('phoneError');
    const phonePattern = /^\+62\d{9,15}$/;
    if (!phonePattern.test(phoneInput.value)) {
        phoneError.textContent = 'Invalid phone number (+62XXXXXXXXX)';
    } else {
        phoneError.textContent = '';
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
    } else {
        passwordError.textContent = '';
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const toggleIcon = document.querySelector('.toggle-password i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function validateURL() {
    const urlInput = document.getElementById('urlInput');
    const urlError = document.getElementById('urlError');
    const urlPattern = /^(http(s)?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}$/;
    if (!urlPattern.test(urlInput.value)) {
        urlError.textContent = 'Invalid URL format';
    } else {
        urlError.textContent = '';
    }
}

// Fungsi untuk menampilkan notifikasi berdasarkan status validasi
// Fungsi untuk menampilkan notifikasi berdasarkan status validasi
// Fungsi untuk menampilkan notifikasi berdasarkan status validasi
function showNotification(type) {
    const notification = document.getElementById('notification');
    const icon = document.getElementById('notification-icon');
    notification.style.display = 'block';

    if (type === 'error') {
        notification.style.backgroundColor = '#ff4d4d'; // Merah
        icon.className = 'fas fa-times-circle'; // Icon cross/silang
        notification.innerHTML = '<i class="fas fa-times-circle"></i> Mohon lengkapi data yang diperlukan.';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#ffd966'; // Kuning
        icon.className = 'fas fa-exclamation-triangle'; // Icon hati-hati
        notification.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Terdapat data yang tidak valid pada form.';
    } else if (type === 'success') {
        notification.style.backgroundColor = '#b3ffb3'; // Hijau
        icon.className = 'fas fa-check-circle'; // Icon checklist
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Data berhasil diverifikasi!';
    } else if (type === 'empty') {
        notification.style.backgroundColor = '#ff4d4d'; // Merah
        icon.className = 'fas fa-times-circle'; // Icon cross/silang
        notification.innerHTML = '<i class="fas fa-times-circle"></i> Harap isi semua field pada form.';
    }

    // Sembunyikan notifikasi setelah beberapa detik
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000); // Sembunyikan setelah 5 detik
}

// Fungsi untuk menghandle submit form
function handleSubmit(event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    // Validasi setiap field menggunakan fungsi yang ada
    const isEmailValid = validateEmail();
    const isDateValid = validateDate();
    const isPhoneValid = validatePhoneNumber();
    const isPasswordValid = validatePassword();
    const isUrlValid = validateURL();

    // Memeriksa apakah semua validasi berhasil
    if (isEmailValid && isDateValid && isPhoneValid && isPasswordValid && isUrlValid) {
        showNotification('success'); // Menampilkan notifikasi sukses (hijau)
    } else if (isEmailValid !== null || isDateValid !== null || isPhoneValid !== null || isPasswordValid !== null || isUrlValid !== null) {
        showNotification('warning'); // Menampilkan notifikasi warning (kuning)
    } else {
        showNotification('error'); // Menampilkan notifikasi error (merah)
    }
}

// Menambahkan event listener untuk form submission
const form = document.getElementById('validationForm');
form.addEventListener('submit', handleSubmit);

