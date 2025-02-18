document.addEventListener("DOMContentLoaded", function () {
    const donateButtons = document.querySelectorAll('.donate-button');
    const donationModal = document.getElementById('donationModal');
    const confirmDonationButton = document.getElementById('confirmDonation');
    const cancelDonationButton = document.getElementById('cancelDonation');
    const donationAmountInput = document.getElementById('donationAmount');
    let selectedCause = null;

    // Show the donation modal when a donate button is clicked
    donateButtons.forEach(button => {
        button.addEventListener('click', function () {
            selectedCause = this.closest('.cause-card');
            donationModal.style.display = 'flex';
        });
    });

    // Cancel donation and close the modal
    cancelDonationButton.addEventListener('click', function () {
        donationModal.style.display = 'none';
        donationAmountInput.value = '';
    });

    // Confirm donation
    confirmDonationButton.addEventListener('click', function () {
        const amount = parseFloat(donationAmountInput.value);

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid donation amount');
        } else {
            alert(`Thank you for your donation of $${amount} to the "${selectedCause.querySelector('h2').textContent}" cause!`);
            window.location.href = "thank_you.html";
        }
    });
});


