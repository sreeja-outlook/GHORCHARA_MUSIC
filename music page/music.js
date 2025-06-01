document.addEventListener('DOMContentLoaded', () => {
    // Set the launch date (3 months from now)
    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 3);
    launchDate.setHours(0, 0, 0, 0);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelectorAll('.countdown-item span').forEach(span => {
                span.textContent = '00';
            });
        }
    }

    // Update countdown immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Handle notification form submission
    const notifyForm = document.getElementById('notify-form');
    notifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = notifyForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your server or email service
        // For now, we'll just show an alert
        alert('Thanks! We\'ll notify you at ' + email + ' when we launch.');
        notifyForm.reset();
    });
});