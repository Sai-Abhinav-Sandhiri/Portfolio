// =======================
// MOBILE MENU
// =======================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// =======================
// VIMEO MODAL CAROUSEL
// =======================
const modal = document.getElementById('videoModal');
const modalFrame = document.getElementById('modalFrame');
const cards = [...document.querySelectorAll('.video-card')];
let currentIndex = 0;

// Play selected video
function playVideo(index) {
  currentIndex = index;
  modalFrame.src = cards[index].dataset.video + '?autoplay=1';
}

// Open modal on thumbnail click
cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    modal.classList.add('active');
    playVideo(index);
  });
});

// Next button
document.querySelector('.next').addEventListener('click', e => {
  e.stopPropagation();
  playVideo((currentIndex + 1) % cards.length);
});

// Previous button
document.querySelector('.prev').addEventListener('click', e => {
  e.stopPropagation();
  playVideo((currentIndex - 1 + cards.length) % cards.length);
});

// Close modal on background click
modal.addEventListener('click', () => {
  modalFrame.src = '';
  modal.classList.remove('active');
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('active')) return;

  if (e.key === 'ArrowRight') {
    playVideo((currentIndex + 1) % cards.length);
  }

  if (e.key === 'ArrowLeft') {
    playVideo((currentIndex - 1 + cards.length) % cards.length);
  }

  if (e.key === 'Escape') {
    modalFrame.src = '';
    modal.classList.remove('active');
  }
});
