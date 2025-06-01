document.addEventListener('DOMContentLoaded', () => {
    // Handle notification form submission
    const notifyForm = document.getElementById('notify-form');
    notifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = notifyForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your server or email service
        // For now, we'll just show an alert
        alert('Thanks! We\'ll notify you at ' + email + ' about upcoming tour dates.');
        notifyForm.reset();
    });

    // Add some animation to the icons
    const icons = document.querySelectorAll('.tour-info .info-item i');
    icons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2)';
            icon.style.color = '#ffd700';
        });

        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1)';
            icon.style.color = '';
        });
    });
});