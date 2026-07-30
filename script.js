document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add subtle hover micro-animations to course cards
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const btn = card.querySelector('.btn');
            if(btn) {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 10px 20px rgba(111, 176, 58, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const btn = card.querySelector('.btn-primary');
            if(btn) {
                btn.style.transform = 'none';
                btn.style.boxShadow = '0 10px 20px rgba(111, 176, 58, 0.2)';
            }
        });
    });

    // Toggle course details
    const moreButtons = document.querySelectorAll('.btn-more');
    moreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const details = this.nextElementSibling;
            if (details && details.classList.contains('course-details')) {
                details.classList.toggle('active');
                if (details.classList.contains('active')) {
                    this.textContent = 'Menos Informações';
                } else {
                    this.textContent = 'Saiba mais';
                }
            }
        });
    });
});
