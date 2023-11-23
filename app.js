let passwords = [];
let masterPassword = "rusakdeh";

// Fungsi untuk check Password
function checkMasterPassword() {
  const masterPasswordInput = document.getElementById("master-password");
  const masterPasswordTitle = document.getElementById("master-password-title");
  const masterPasswordButton = document.getElementById(
    "master-password-button"
  );
  const passwordForm = document.getElementById("password-form");

  if (masterPasswordInput.value === masterPassword) {
    passwordForm.style.display = "block";
    masterPasswordInput.style.display = "none";
    masterPasswordTitle.style.display = "none";
    masterPasswordButton.style.display = "none";
    masterPasswordInput.value = ""; // Clear master password input
    loadDataFromLocal(); // Load existing passwords
  } else {
    alert("Incorrect master password");
  }
}

// Fungsi untuk menambahkan password
function addPassword() {
  const unitInput = document.getElementById("unit-input");
  const locationInput = document.getElementById("location-input");
  const ssidInput = document.getElementById("ssid-input");
  const ipInput = document.getElementById("ip-input");
  const passwordInput = document.getElementById("password-input");

  // Mendapatkan nilai dari input
  const unit = unitInput.value;
  const location = locationInput.value;
  const ssid = ssidInput.value;
  const ip = ipInput.value;
  const password = passwordInput.value;

  // Verifikasi apakah semua kolom diisi
  if (
    unit.trim() === "" ||
    location.trim() === "" ||
    ssid.trim() === "" ||
    ip.trim() === "" ||
    password.trim() === ""
  ) {
    alert("All fields must be filled");
    return;
  }

  // Menambahkan password baru ke array
  const newPassword = {
    unit,
    location,
    ssid,
    ip,
    password,
  };
  passwords.push(newPassword);

  // Clear input fields
  unitInput.value = "";
  locationInput.value = "";
  ssidInput.value = "";
  ipInput.value = "";
  passwordInput.value = "";

  // Memperbarui tampilan tabel
  renderPasswordList();

  // Menyimpan data ke localStorage
  saveDataToLocal();
}

/// Fungsi untuk menampilkan atau menyembunyikan password saat hover
function togglePasswordVisibility(passwordInput) {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

// Fungsi untuk menampilkan password saat diklik (mode mobile)
function toggleMobilePasswordVisibility(passwordInput) {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

// Fungsi untuk menampilkan password saat diklik
function showPasswordOnClick(passwordInput) {
  passwordInput.type = "text";
}

// Fungsi untuk menyembunyikan password setelah diklik
function hidePasswordOnClick(passwordInput) {
  passwordInput.type = "password";
}

// Fungsi untuk menampilkan data di tabel
function renderPasswordList() {
  const passwordList = document.getElementById("password-list");
  passwordList.innerHTML = "";

  passwords.forEach((entry, index) => {
    const row = passwordList.insertRow();
    const cellIndex = row.insertCell(0);
    const cellUnit = row.insertCell(1);
    const cellLocation = row.insertCell(2);
    const cellSSID = row.insertCell(3);
    const cellIP = row.insertCell(4);
    const cellPassword = row.insertCell(5);

    cellIndex.textContent = index + 1;
    cellUnit.textContent = entry.unit;
    cellLocation.textContent = entry.location;
    cellSSID.textContent = entry.ssid;
    cellIP.textContent = entry.ip;

    // Ganti elemen teks dengan elemen input password
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.value = entry.password;
    passwordInput.readOnly = true; // Agar tidak dapat diedit

    // Tambahkan event listener untuk hover
    cellPassword.addEventListener("mouseover", () =>
      togglePasswordVisibility(passwordInput)
    );
    cellPassword.addEventListener("mouseout", () =>
      togglePasswordVisibility(passwordInput)
    );

    // Tambahkan event listener untuk klik
    cellPassword.addEventListener("click", (event) => {
      event.preventDefault(); // Menghindari navigasi pada link
      showPasswordOnClick(passwordInput);
    });

    // Tambahkan event listener untuk menyembunyikan kembali password setelah diklik
    passwordInput.addEventListener("blur", () => {
      hidePasswordOnClick(passwordInput);
    });

    cellPassword.appendChild(passwordInput);
  });
}

// Fungsi untuk menyimpan data ke localStorage
function saveDataToLocal() {
  localStorage.setItem("passwords", JSON.stringify(passwords));
}

// Fungsi untuk memuat data dari localStorage saat halaman dimuat
function loadDataFromLocal() {
  const storedPasswords = localStorage.getItem("passwords");
  if (storedPasswords) {
    passwords = JSON.parse(storedPasswords);
    renderPasswordList();
  }
}

// Memuat data dari localStorage saat halaman dimuat
loadDataFromLocal();
