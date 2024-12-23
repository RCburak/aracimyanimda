
const UNSPLASH_API_KEY = 'elRlm2laRZ9vqHlRGVPfJ8nIWzZogHmttMsb9StTvEA';

        // Fetch image from Unsplash API based on car brand and model
        async function fetchCarImageFromAPI(car) {
            const query = `${car.marka} ${car.model}`;
            const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${elRlm2laRZ9vqHlRGVPfJ8nIWzZogHmttMsb9StTvEA}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data.results[0]?.urls?.regular || 'https://via.placeholder.com/300';  // Fallback image
            } catch (error) {
                console.error('Resim alınırken hata oluştu:', error);
                return 'https://via.placeholder.com/300';  // Fallback image in case of error
            }
        }

         // Fetch Cars

        async function fetchCars() {
            try {
                const response = await fetch('http://localhost:3000/araclar');
                const cars = await response.json();
                displayCars(cars);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        }

        async function displayCars(cars) {
            const carContainer = document.getElementById('araclar-container');
            carContainer.innerHTML = '';
            for (const car of cars) {
                const imageURL = car.imageUrl;
                const carItem = document.createElement('div');
                carItem.classList.add('car-item');
                carItem.innerHTML = `
                    <div class="car-image">
                        <img src="${imageURL}" alt="${car.marka} ${car.model}">
                    </div>
                    <div class="details">
                        <strong>Brand:</strong> ${car.marka}<br>
                        <strong>Model:</strong> ${car.model}<br>
                        <strong>Year:</strong> ${car.yil}<br>
                        <a href="arac.html" class="book-now-btn">Book Now</a>
                    </div>
                `;
                carContainer.appendChild(carItem);
            }
        }

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
        document.addEventListener('DOMContentLoaded', () => {
            const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                darkModeToggle.classList.add('active');
            }
        });

        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            darkModeToggle.classList.toggle('active');
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        });

      

       
