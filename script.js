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

    // Carousel Logic
    const prevButtons = document.querySelectorAll('.prev-btn');
    const nextButtons = document.querySelectorAll('.next-btn');
    
    document.querySelectorAll('.faculty-avatars').forEach(container => {
        // Wait a small delay to ensure CSS is fully applied and widths are calculated correctly
        setTimeout(() => {
            if (container.scrollWidth > container.clientWidth) {
                const children = Array.from(container.children);
                // Duplicate elements to create the infinite scroll illusion
                children.forEach(child => {
                    const clone = child.cloneNode(true);
                    container.appendChild(clone);
                });

                container.addEventListener('scroll', () => {
                    const half = container.scrollWidth / 2;
                    // If scrolled past the cloned half
                    if (container.scrollLeft >= half) {
                        container.style.scrollBehavior = 'auto';
                        container.scrollLeft -= half;
                    } 
                    // If scrolled backwards past 0
                    else if (container.scrollLeft <= 0) {
                        container.style.scrollBehavior = 'auto';
                        container.scrollLeft += half;
                    }
                });
            }
        }, 100);
    });

    prevButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('.carousel-container').querySelector('.faculty-avatars');
            // If we're exactly at 0, jump to the middle first so we can smoothly scroll left
            if (container.scrollLeft <= 0) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft += container.scrollWidth / 2;
                container.offsetHeight; // Force reflow
            }
            container.style.scrollBehavior = 'smooth';
            container.scrollBy({ left: -175, behavior: 'smooth' });
        });
    });
    
    nextButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('.carousel-container').querySelector('.faculty-avatars');
            container.style.scrollBehavior = 'smooth';
            container.scrollBy({ left: 175, behavior: 'smooth' });
        });
    });

    // Modal Logic
    const modal = document.getElementById('leadModal');
    const btnOpenModal = document.getElementById('btn-open-modal');
    const stickyCta = document.getElementById('sticky-cta');
    const spanClose = document.querySelector('.close-modal');
    const leadForm = document.getElementById('leadForm');
    const telefoneInput = document.getElementById('telefone');

    if (btnOpenModal) {
        btnOpenModal.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }

    if (stickyCta) {
        stickyCta.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        stickyCta.classList.add('visible');
                    } else {
                        stickyCta.classList.remove('visible');
                    }
                });
            }, {
                threshold: 0.1
            });
            observer.observe(heroSection);
        }
    }

    if (spanClose) {
        spanClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Restrict Phone Input to Numbers Only
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            // Remove anything that is not a number
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Handle Form Submit
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const telefoneInput = document.getElementById('telefone');
            const areaInput = document.getElementById('area');
            const graduacaoInput = document.querySelector('input[name="graduacao"]:checked');
            
            if (nomeInput) localStorage.setItem('ambientalpro_lead_nome', nomeInput.value);
            if (emailInput) localStorage.setItem('ambientalpro_lead_email', emailInput.value);
            if (telefoneInput) localStorage.setItem('ambientalpro_lead_telefone', telefoneInput.value);
            if (areaInput) localStorage.setItem('ambientalpro_lead_area', areaInput.value);
            if (graduacaoInput) localStorage.setItem('ambientalpro_lead_graduacao', graduacaoInput.value);
            
            // Redireciona para a página da prova
            window.location.href = 'prova.html';
        });
    }

});
