// API'den araçları getir ve sayfada göster
async function araclariGetir() {
    try {
        const response = await fetch('http://localhost:3000/araclar'); // API endpoint'inizi güncelleyin
        const araclar = await response.json();
        const container = document.getElementById('araclar-container');
        container.innerHTML = '';

        araclar.forEach(arac => {
            const card = document.createElement('div');
            card.classList.add('arac-card');

            card.innerHTML = `
                <h3>${arac.marka} ${arac.model}</h3>
                <p>Yıl: ${arac.yil}</p>
                <p>Kiralık: ${arac.kiralik ? 'Evet' : 'Hayır'}</p>
                <button>Rezervasyon Yap</button>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Araçlar yüklenirken bir hata oluştu:', error);
    }
}

// Sayfa yüklendiğinde araçları getir
document.addEventListener('DOMContentLoaded', araclariGetir);

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
