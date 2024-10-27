let currentIndex = 0; // Başlangıç indexi

async function araclariGetir() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '67f650a4demsh36d2d7835aa2d11p13cd10jsn791958a28200', // API anahtarınız
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?limit=5', options);
if (!response.ok) {
    throw new Error(`HTTP Hatası: ${response.status} ${response.statusText}`);
}
const araclar = await response.json();

        const container = document.getElementById('araclar-container');
        container.innerHTML = ''; // Eski içeriği temizle

        // Gelen verileri kartlara dönüştür ve ekle
        araclar.forEach(arac => {
            const card = document.createElement('div');
            card.classList.add('arac-card');
            card.innerHTML = `
                <h3>${arac.make} ${arac.model}</h3>
                <p>Year: ${arac.year}</p>
                <p>Transmission: ${arac.transmission}</p>
                <button class="rezervasyon-button">Book Now</button>
            `;

            // Rezervasyon sayfasına yönlendirme
            card.querySelector('.rezervasyon-button').addEventListener('click', () => {
                window.location.href = 'arac.html';
            });

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Araçlar yüklenirken hata oluştu:', error);
    }
}

// Kaydırma fonksiyonları
function slideNext() {
    const container = document.getElementById('araclar-container');
    const totalCards = container.children.length;
    if (totalCards === 0) return;

    currentIndex = (currentIndex + 1) % totalCards;
    container.style.transform = `translateX(-${currentIndex * 310}px)`;
}

function slidePrev() {
    const container = document.getElementById('araclar-container');
    const totalCards = container.children.length;
    if (totalCards === 0) return;

    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    container.style.transform = `translateX(-${currentIndex * 310}px)`;
}

// Olay dinleyicileri
document.querySelector('.right-scroll').addEventListener('click', slideNext);
document.querySelector('.left-scroll').addEventListener('click', slidePrev);

// Sayfa yüklendiğinde araçları getir ve otomatik kaydırma başlat
document.addEventListener('DOMContentLoaded', async () => {
    await araclariGetir();
    setInterval(slideNext, 5000); // Her 5 saniyede bir otomatik kaydır
});
