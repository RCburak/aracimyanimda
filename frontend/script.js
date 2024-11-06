// Yeni araç ekleme işlevi
async function aracEkle() {
    try {
        const response = await fetch('http://localhost:3000/araclar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                marka: 'Honda',   // Burada eklemek istediğiniz araç bilgilerini güncelleyin
                model: 'Civic',
                yil: 2023,
                kiralik: true
            })
        });
        
        const data = await response.json();
        console.log('Araç eklendi:', data);
        
        // Yeni araç eklendikten sonra listeyi güncelle
        fetchCars();
        
    } catch (error) {
        console.error('Veri eklenirken hata:', error);
    }
}

// Sayfa yüklendiğinde gerekli işlevleri tanımla
document.addEventListener('DOMContentLoaded', () => {
    fetchCars();

    // Yeni Araç Ekle butonuna tıklayınca aracEkle işlevini çalıştır
    const addButton = document.getElementById('add-vehicle-button');
    if (addButton) {
        addButton.addEventListener('click', aracEkle);
    }
});

// Araçları getirme işlevi (mevcut fetchCars işleviniz)
async function fetchCars() {
    try {
        const response = await fetch('http://localhost:3000/araclar');
        const cars = await response.json();
        displayCars(cars);
    } catch (error) {
        console.error('Araç verilerini alırken hata oluştu:', error);
    }
}

// Araç verilerini sayfada gösterme işlevi (mevcut displayCars işleviniz)
function displayCars(cars) {
    const carList = document.getElementById('carList');
    carList.innerHTML = '';  // Önceki içerikleri temizle

    cars.forEach(car => {
        const carItem = document.createElement('div');
        carItem.classList.add('car-item');
        carItem.innerHTML = `
            <div class="details">
                <strong>Marka:</strong> ${car.marka} <br>
                <strong>Model:</strong> ${car.model} <br>
                <strong>Yıl:</strong> ${car.yil}
            </div>
            <div class="status ${car.kiralik ? '' : 'unavailable'}">
                ${car.kiralik ? 'Kiralık' : 'Kiralık Değil'}
            </div>
        `;
        carList.appendChild(carItem);
    });
}
