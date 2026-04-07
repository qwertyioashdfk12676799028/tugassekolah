/* =========================
   SCROLL KE SECTION
========================= */
function scrollToSection(id) {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth"
    });
  }
}


/* =========================
   SET NOMINAL CEPAT
========================= */
function setNominal(amount) {
  document.getElementById("nominal").value = amount;
}


/* =========================
   DONASI (LENGKAP + POPUP KHUSUS)
========================= */
function kirimDonasi() {
  let nama = document.getElementById("nama").value.trim();
  let email = document.getElementById("email").value.trim();
  let nominal = document.getElementById("nominal").value;
  let metode = document.getElementById("metode").value;
  let kartu = document.getElementById("kartu").value.trim();
  let expiry = document.getElementById("expiry").value.trim();
  let cvv = document.getElementById("cvv").value.trim();

  // VALIDASI
  if (!nama || !email || !nominal || !kartu || !expiry || !cvv) {
    alert("Harap lengkapi semua data!");
    return;
  }

  if (nominal <= 0) {
    alert("Nominal tidak valid!");
    return;
  }

  if (kartu.replace(/\s/g, "").length < 12) {
    alert("Nomor kartu tidak valid!");
    return;
  }

  if (cvv.length < 3) {
    alert("CVV tidak valid!");
    return;
  }

  let formatNominal = Number(nominal).toLocaleString("id-ID");

  /* =========================
     POPUP LOGIC (FIXED)
  ========================= */
  if (nominal >= 1000000) {

    // MODAL DONASI BESAR
    let modal = new bootstrap.Modal(document.getElementById('bigDonasiModal'));
    modal.show();

  } else {

    // POPUP NORMAL
    alert(
      "Terima kasih " + nama + " 🙏\n\n" +
      "Donasi sebesar Rp " + formatNominal + " berhasil.\n" +
      "Metode: " + metode + "\n\n" +
      "Semoga kebaikan Anda dibalas ❤️"
    );

  }

  // RESET FORM
  document.getElementById("nama").value = "";
  document.getElementById("email").value = "";
  document.getElementById("nominal").value = "";
  document.getElementById("kartu").value = "";
  document.getElementById("expiry").value = "";
  document.getElementById("cvv").value = "";
}


/* =========================
   EVENT REGISTRATION
========================= */
function daftarEvent() {
  let inputs = document.querySelectorAll("#event input");
  let nama = inputs[0].value.trim();
  let email = inputs[1].value.trim();

  if (!nama || !email) {
    alert("Harap isi nama dan email!");
    return;
  }

  if (!email.includes("@")) {
    alert("Email tidak valid!");
    return;
  }

  alert(
    "Pendaftaran berhasil 🎉\n\n" +
    "Nama: " + nama + "\n" +
    "Email: " + email
  );

  inputs[0].value = "";
  inputs[1].value = "";
}


/* =========================
   FORMAT INPUT + AUTOFOCUS
========================= */
document.addEventListener("DOMContentLoaded", function () {

  // FORMAT KARTU
  let kartuInput = document.getElementById("kartu");

  if (kartuInput) {
    kartuInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      value = value.substring(0, 16);
      this.value = value.replace(/(.{4})/g, "$1 ").trim();
    });
  }

  // AUTOFOCUS MODAL
  let donasiModal = document.getElementById("donasiModal");

  if (donasiModal) {
    donasiModal.addEventListener("shown.bs.modal", function () {
      document.getElementById("nama").focus();
    });
  }

});