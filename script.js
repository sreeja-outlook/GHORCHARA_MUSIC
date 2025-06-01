// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu after clicking
        navLinks.classList.remove('active');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Gallery images
const galleryImages = [
    'assets/gallery1.jpg',
    'assets/gallery3.jpg',
    'assets/gallery2.jpg',
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Populate gallery
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryImages.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.backgroundImage = `url(${image})`;
            galleryItem.style.backgroundSize = 'cover';
            galleryItem.style.backgroundPosition = 'center';
            galleryGrid.appendChild(galleryItem);
        });
    }
});

// Tour dates
const tourDates = [
    { date: '2024-04-15', venue: 'Science City Auditorium', city: 'Kolkata' },
    { date: '2024-04-22', venue: 'Salt Lake Stadium', city: 'Kolkata' },
    { date: '2024-05-05', venue: 'Rabindra Sadan', city: 'Kolkata' },
    { date: '2024-05-15', venue: 'Nazrul Mancha', city: 'Kolkata' }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Populate tour dates
    const tourDatesContainer = document.querySelector('.tour-dates');
    if (tourDatesContainer) {
        tourDates.forEach(tour => {
            const tourCard = document.createElement('div');
            tourCard.className = 'tour-card';
            tourCard.innerHTML = `
                <h3>${new Date(tour.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                <p>${tour.venue}</p>
                <p>${tour.city}</p>
            `;
            tourDatesContainer.appendChild(tourCard);
        });
    }
});

// Merch items
const merchItems = [
    { name: 'GHORCHARA T-Shirt', price: '₹999', image: 'https://source.unsplash.com/random/400x400/?t-shirt' },
    { name: 'Band Hoodie', price: '₹1999', image: 'https://source.unsplash.com/random/400x400/?hoodie' },
    { name: 'Signed Album', price: '₹1499', image: 'https://source.unsplash.com/random/400x400/?vinyl' },
    { name: 'Band Poster', price: '₹499', image: 'https://source.unsplash.com/random/400x400/?poster' }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Populate merch store
    const merchGrid = document.querySelector('.merch-grid');
    if (merchGrid) {
        merchItems.forEach(item => {
            const merchCard = document.createElement('div');
            merchCard.className = 'merch-card';
            merchCard.innerHTML = `
                <div class="merch-image" style="background-image: url(${item.image})"></div>
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <button>Add to Cart</button>
            `;
            merchGrid.appendChild(merchCard);
        });
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show sending state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(contactForm);
    
    // Submit the form using fetch
    fetch(contactForm.action, {
        method: 'POST',
        mode: 'no-cors', // This is important for Google Forms
        body: formData
    })
    .then(() => {
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error sending message';
    })
    .finally(() => {
        // Reset button after a delay
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 3000);
    });
});

// Music player functionality
const musicPlayer = document.querySelector('.music-player');
const audio = new Audio('path-to-your-music-file.mp3'); // Replace with actual music file
let isPlaying = false;

musicPlayer.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicPlayer.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        musicPlayer.innerHTML = '<i class="fas fa-pause"></i>';
    }    isPlaying = !isPlaying;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});
