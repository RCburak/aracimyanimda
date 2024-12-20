// Login butonuna tıklanınca başka bir sayfaya yönlendir
document.getElementById('loginButton').addEventListener('click', function () {
    window.location.href = 'login.html'; // Yönlendirilecek sayfa
});

const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Automatically change slides every 5 seconds
setInterval(nextSlide, 5000);

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode'); // Gece modunu aktif/pasif yapar.
    darkModeToggle.classList.toggle('active'); // Animasyonu tetikler.
});
