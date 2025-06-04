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

// Gallery lightbox functionality
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const caption = this.getAttribute('data-caption');
        const imgSrc = this.querySelector('img').src;
        
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        
        const content = document.createElement('div');
        content.classList.add('lightbox-content');
        
        const img = document.createElement('img');
        img.src = imgSrc;
        
        const captionElement = document.createElement('p');
        captionElement.classList.add('lightbox-caption');
        captionElement.textContent = caption;
        
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('lightbox-close');
        closeBtn.innerHTML = '&times;';
        
        // Build the lightbox
        content.appendChild(img);
        content.appendChild(captionElement);
        content.appendChild(closeBtn);
        lightbox.appendChild(content);
        document.body.appendChild(lightbox);
        
        // Add open class to animate
        setTimeout(() => {
            lightbox.classList.add('open');
        }, 10);
        
        // Close lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('open');
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        });
        
        // Close on outside click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('open');
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            }
        });
    });
});