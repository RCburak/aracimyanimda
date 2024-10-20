// API'den araçları getir ve sayfada göster
async function araclariGetir() {
    try {
        const response = await fetch('http://localhost:3000/araclar');
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
