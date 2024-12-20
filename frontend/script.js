
const UNSPLASH_API_KEY = 'pftSBzuuwcq2WGJqTZs9cGfX007Qbo5lwMSWYyCl2-c';

        // Fetch image from Unsplash API based on car brand and model
        async function fetchCarImageFromAPI(car) {
            const query = `${car.marka} ${car.model}`;
            const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_API_KEY}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data.results[0]?.urls?.regular || 'https://via.placeholder.com/300';  // Fallback image
            } catch (error) {
                console.error('Resim alınırken hata oluştu:', error);
                return 'https://via.placeholder.com/300';  // Fallback image in case of error
            }
        }

        // Fetch car data from backend
        async function fetchCars() {
            try {
                const response = await fetch('http://localhost:3000/araclar');
                const cars = await response.json();
                displayCars(cars);
            } catch (error) {
                console.error('Araç verilerini alırken hata oluştu:', error);
            }
        }

        // Display the car data and dynamically add images
        async function displayCars(cars) {
            const carContainer = document.getElementById('araclar-container');
            carContainer.innerHTML = ''; // Clear previous cars

            for (const car of cars) {
                // Fetch car image based on the brand and model
                const imageURL = await fetchCarImageFromAPI(car);

                // Create a new car item and add it to the container
                const carItem = document.createElement('div');
                carItem.classList.add('car-item');
                carItem.innerHTML = `
                    <div class="car-image">
                        <img src="${imageURL}" alt="${car.marka} ${car.model}">
                    </div>
                    <div class="car-details">
                        <h3>${car.marka} ${car.model}</h3>
                        <p><strong>${car.year}</strong> | ${car.km} km</p>
                        <button>Aracı Kirala</button>
                    </div>
                `;
                carContainer.appendChild(carItem);
            }
        }

        // Load cars when the page is ready
        window.onload = fetchCars;


    <script src="script.js"></script> 
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
