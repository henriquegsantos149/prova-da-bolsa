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

    
    // Grade Dropdown Logic
    const gradeToggles = document.querySelectorAll('.grade-toggle');
    gradeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const dropdown = toggle.closest('.grade-dropdown');
            dropdown.classList.toggle('active');
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
            const card = container.querySelector('.faculty-card');
            const scrollAmount = card ? card.offsetWidth + 15 : 175; // 15 is the gap
            
            // If we're exactly at 0, jump to the middle first so we can smoothly scroll left
            if (container.scrollLeft <= 0) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft += container.scrollWidth / 2;
                container.offsetHeight; // Force reflow
            }
            container.style.scrollBehavior = 'smooth';
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    });
    
    nextButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.closest('.carousel-container').querySelector('.faculty-avatars');
            const card = container.querySelector('.faculty-card');
            const scrollAmount = card ? card.offsetWidth + 15 : 175;
            
            container.style.scrollBehavior = 'smooth';
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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

    // Helper para capturar e persistir UTMs da URL e do storage
    function getUTMs() {
        const params = new URLSearchParams(window.location.search);
        const utms = {
            utm_source: '',
            utm_medium: '',
            utm_campaign: '',
            utm_term: '',
            utm_content: ''
        };

        // 1. Extrai da URL de forma insensível a maiúsculas/minúsculas
        params.forEach((val, key) => {
            const k = key.toLowerCase();
            const upper = key.toUpperCase();
            if (k === 'utm_source' || upper.includes('UTM_SOURCE')) utms.utm_source = val;
            else if (k === 'utm_medium' || upper.includes('UTM_MEDIUM')) utms.utm_medium = val;
            else if (k === 'utm_campaign' || upper.includes('UTM_CAMPAIGN')) utms.utm_campaign = val;
            else if (k === 'utm_term' || upper.includes('UTM_TERM')) utms.utm_term = val;
            else if (k === 'utm_content' || upper.includes('UTM_CONTENT')) utms.utm_content = val;
        });

        // 2. Persiste em sessionStorage e localStorage para não perder se o usuário recarregar ou navegar
        Object.keys(utms).forEach(k => {
            if (utms[k]) {
                try {
                    sessionStorage.setItem('ambientalpro_' + k, utms[k]);
                    localStorage.setItem('ambientalpro_' + k, utms[k]);
                } catch (e) {}
            } else {
                // Recupera caso não esteja na URL atual
                try {
                    utms[k] = sessionStorage.getItem('ambientalpro_' + k) || localStorage.getItem('ambientalpro_' + k) || '';
                } catch (e) {}
            }
        });

        return utms;
    }

    // Inicializa captura de UTMs ao carregar
    getUTMs();

    // Handle Form Submit
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processando inscrição...';
            }

            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const telefoneInput = document.getElementById('telefone');
            const areaInput = document.getElementById('area');
            const graduacaoInput = document.querySelector('input[name="graduacao"]:checked');
            
            const utmData = getUTMs();
            const payload = {
                nome: nomeInput ? nomeInput.value.trim() : '',
                name: nomeInput ? nomeInput.value.trim() : '',
                email: emailInput ? emailInput.value.trim().toLowerCase() : '',
                telefone: telefoneInput ? telefoneInput.value.trim() : '',
                phone: telefoneInput ? telefoneInput.value.trim() : '',
                area: areaInput ? areaInput.value.trim() : '',
                graduacao: graduacaoInput ? graduacaoInput.value : '',
                ...utmData
            };

            if (nomeInput) localStorage.setItem('ambientalpro_lead_nome', nomeInput.value.trim());
            if (emailInput) localStorage.setItem('ambientalpro_lead_email', emailInput.value.trim().toLowerCase());
            if (telefoneInput) localStorage.setItem('ambientalpro_lead_telefone', telefoneInput.value.trim());
            if (areaInput) localStorage.setItem('ambientalpro_lead_area', areaInput.value.trim());
            if (graduacaoInput) localStorage.setItem('ambientalpro_lead_graduacao', graduacaoInput.value);
            
            // 1. Webhook de inscrição (n8n / endpoint externo)
            fetch('https://node2.rodrigogreco.com.br/webhook/prova/bolsa/inscricao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                keepalive: true
            }).catch(err => console.error("Erro ao enviar webhook de inscrição:", err));

            // 2. Envia para a API ActiveCampaign com timeout de segurança e keepalive para evitar cancelamento do navegador
            try {
                const timeoutPromise = new Promise(resolve => setTimeout(resolve, 2000));
                const fetchPromise = fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                    keepalive: true
                }).then(async res => {
                    if (!res.ok) {
                        const err = await res.text();
                        console.warn("ActiveCampaign sync response not OK:", res.status, err);
                    }
                }).catch(err => console.error("Erro ao integrar com ActiveCampaign:", err));

                await Promise.race([fetchPromise, timeoutPromise]);
            } catch (err) {
                console.error("Erro no envio:", err);
            }

            // Preserva parâmetros na URL ao redirecionar
            const searchParams = new URLSearchParams(window.location.search);
            Object.keys(utmData).forEach(k => {
                if (utmData[k] && !searchParams.has(k)) {
                    searchParams.set(k, utmData[k]);
                }
            });
            const searchStr = searchParams.toString() ? '?' + searchParams.toString() : '';

            // Redireciona para a página da prova
            window.location.href = 'prova/' + searchStr;
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {
    const graduacaoRadios = document.querySelectorAll('input[name="graduacao"]');
    const formGroupArea = document.getElementById('form-group-area');
    const inputArea = document.getElementById('area');

    if (graduacaoRadios.length > 0 && formGroupArea && inputArea) {
        graduacaoRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'Sim') {
                    formGroupArea.style.display = 'block';
                    inputArea.setAttribute('required', 'required');
                } else {
                    formGroupArea.style.display = 'none';
                    inputArea.removeAttribute('required');
                    inputArea.value = ''; // clear value if they change mind
                }
            });
        });
    }
});
