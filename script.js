// Smooth scroll
const cards = [...document.querySelectorAll('.video-card')];
let currentIndex = 0;

function playVideo(index) {
  currentIndex = index;
  modalVideo.src = cards[index].dataset.video;
  modalVideo.play();
}

cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    modal.classList.add('active');
    playVideo(index);
  });
});

document.querySelector('.next').addEventListener('click', e => {
  e.stopPropagation();
  playVideo((currentIndex + 1) % cards.length);
});

document.querySelector('.prev').addEventListener('click', e => {
  e.stopPropagation();
  playVideo((currentIndex - 1 + cards.length) % cards.length);
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
});


// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Auto-detect video orientation
document.querySelectorAll('.video-card video').forEach(video => {
  video.addEventListener('loadedmetadata', () => {
    const card = video.closest('.video-card');
    if (video.videoWidth > video.videoHeight) {
      card.classList.add('horizontal');
    } else {
      card.classList.add('vertical');
    }
  });
});

// Hover preview (desktop only)
const isTouch = 'ontouchstart' in window;

document.querySelectorAll('.video-card').forEach(card => {
  const preview = card.querySelector('video');

  if (!isTouch) {
    card.addEventListener('mouseenter', () => {
      preview.currentTime = 0;
      preview.play();
    });

    card.addEventListener('mouseleave', () => {
      preview.pause();
      preview.currentTime = 0;
    });
  }
});

// Modal
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalContent = document.querySelector('.modal-content');

document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    modalVideo.src = card.dataset.video;
    modal.classList.add('active');
    modalVideo.play();
  });
});

modalContent.addEventListener('click', e => e.stopPropagation());

modal.addEventListener('click', () => {
  modalVideo.pause();
  modalVideo.src = '';
  modal.classList.remove('active');
});

