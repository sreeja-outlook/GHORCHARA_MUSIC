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
    'https://source.unsplash.com/random/800x600/?concert',
    'https://source.unsplash.com/random/800x600/?band-performance',
    'https://source.unsplash.com/random/800x600/?music-studio',
    'https://source.unsplash.com/random/800x600/?rock-band',
    'https://source.unsplash.com/random/800x600/?live-music',
    'https://source.unsplash.com/random/800x600/?band-rehearsal'
];

// Populate gallery
const galleryGrid = document.querySelector('.gallery-grid');
galleryImages.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.backgroundImage = `url(${image})`;
    galleryItem.style.backgroundSize = 'cover';
    galleryItem.style.backgroundPosition = 'center';
    galleryGrid.appendChild(galleryItem);
});

// Tour dates
const tourDates = [
    { date: '2024-04-15', venue: 'Science City Auditorium', city: 'Kolkata' },
    { date: '2024-04-22', venue: 'Salt Lake Stadium', city: 'Kolkata' },
    { date: '2024-05-05', venue: 'Rabindra Sadan', city: 'Kolkata' },
    { date: '2024-05-15', venue: 'Nazrul Mancha', city: 'Kolkata' }
];

// Populate tour dates
const tourDatesContainer = document.querySelector('.tour-dates');
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

// Merch items
const merchItems = [
    { name: 'GHORCHARA T-Shirt', price: '₹999', image: 'https://source.unsplash.com/random/400x400/?t-shirt' },
    { name: 'Band Hoodie', price: '₹1999', image: 'https://source.unsplash.com/random/400x400/?hoodie' },
    { name: 'Signed Album', price: '₹1499', image: 'https://source.unsplash.com/random/400x400/?vinyl' },
    { name: 'Band Poster', price: '₹499', image: 'https://source.unsplash.com/random/400x400/?poster' }
];

// Populate merch store
const merchGrid = document.querySelector('.merch-grid');
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

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        // Using EmailJS to send the email
        emailjs.init("YOUR_EMAILJS_USER_ID"); // You'll need to get this from EmailJS

        const response = await emailjs.send("YOUR_EMAILJS_SERVICE_ID", "YOUR_EMAILJS_TEMPLATE_ID", {
            to_email: "ghorcharamusic@gmail.com",
            from_name: data.name,
            from_email: data.email,
            phone: data.phone,
            message: data.message
        });

        if (response.status === 200) {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 3000);
        }
    } catch (error) {
        // Show error message
        submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error!';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 3000);
        
        console.error('Error sending email:', error);
    }
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
    }
    isPlaying = !isPlaying;
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
