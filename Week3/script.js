// Update the card preview with the selected theme and message
function updateCard() {
    // Get selected theme
    const theme = document.getElementById('theme').value;
    const message = document.getElementById('message').value;
  
    // Set the theme in the card preview
    const cardTheme = document.getElementById('card-theme');
    cardTheme.textContent = theme.charAt(0).toUpperCase() + theme.slice(1); // Capitalize first letter
  
    // Set the message in the card preview
    const cardMessage = document.getElementById('card-message');
    cardMessage.textContent = message ? message : "Write your personalized message here."; // Default message
  
    // Optional: Adjust card styles based on theme (Example: Color scheme or background image)
    updateCardStyles(theme);
  }
  
  // Update card styles based on the theme (e.g., background color)
  function updateCardStyles(theme) {
    const card = document.getElementById('card');
    switch (theme) {
      case 'birthday':
        card.style.backgroundColor = '#f9f9d9';
        break;
      case 'holiday':
        card.style.backgroundColor = '#e0f7fa';
        break;
      case 'anniversary':
        card.style.backgroundColor = '#ffe0b2';
        break;
      case 'thank-you':
        card.style.backgroundColor = '#c8e6c9';
        break;
      case 'love':
        card.style.backgroundColor = '#f8bbd0';
        break;
      default:
        card.style.backgroundColor = '#ffffff';
    }
  }
  
  // Handle image upload and update the card preview
  function uploadImage() {
    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const cardImage = document.getElementById('card-image');
        cardImage.src = event.target.result; // Set the uploaded image in the preview
      };
      reader.readAsDataURL(file);
    }
  }
  
  // Initialize the card preview on page load
  document.addEventListener('DOMContentLoaded', () => {
    updateCard(); // Default card update
  });
  
