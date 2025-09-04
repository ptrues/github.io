document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeOverlay = document.querySelector('.close-overlay');
  const overlayLinks = document.querySelectorAll('.overlay-nav a');

  // Open the overlay
  menuToggle.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });

  // Close the overlay when clicking the 'x'
  closeOverlay.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Close the overlay when clicking on the background
  menuOverlay.addEventListener('click', (event) => {
    if (event.target === menuOverlay) {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });

  // Optional: Close the overlay when a link is clicked
  overlayLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    });
  });
});