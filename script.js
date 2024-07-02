function openMoonPay() {
  window.open("https://www.moonpay.com/buy/btc", "_blank");
}

// scripts.js

function copyBitcoinAddress() {
  // Select the Bitcoin address text field
  const bitcoinAddress = document.getElementById("bitcoinAddress");

  // Select its text
  bitcoinAddress.select();
  bitcoinAddress.setSelectionRange(0, 99999); /* For mobile devices */

  // Copy the text inside the text field
  document.execCommand("copy");

  // Deselect the Bitcoin address text field
  bitcoinAddress.setSelectionRange(0, 0);
}

document.querySelectorAll(".amount-box").forEach((box) => {
  box.addEventListener("click", function () {
    document
      .querySelectorAll(".amount-box")
      .forEach((b) => b.classList.remove("selected"));
    this.classList.add("selected");
    document.getElementById("amount").value = this.getAttribute("data-amount");
  });
});

function submitDonation() {
  const form = document.getElementById("donationForm");
  if (form.checkValidity()) {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const amount = document.getElementById("amount").value;
    const paymentProof = document.getElementById("paymentProof").files[0];
    const agreePolicy = document.getElementById("agreePolicy").checked;

    if (paymentProof && agreePolicy) {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("amount", amount);
      formData.append("paymentProof", paymentProof);

      document.getElementById("loader").style.display = "block";

      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form).then(
        () => {
          document.getElementById("loader").style.display = "none";
          document.getElementById("popup").style.display = "block";
          document.getElementById("userName").textContent = fullName;
          setTimeout(() => {
            document.getElementById("popup").style.display = "none";
          }, 5000);
        },
        (error) => {
          document.getElementById("loader").style.display = "none";
          alert("Failed to send email. Please try again later.");
          console.log("EmailJS Error:", error);
        }
      );
    } else {
      alert("Please complete all required fields and agree to the policy.");
    }
  } else {
    form.reportValidity();
  }
}
