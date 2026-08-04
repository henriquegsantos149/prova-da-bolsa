// Prevent browser from auto-scrolling to hash or previous position on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
if (window.location.hash) {
    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Recuperar dados do localStorage
    const nome = localStorage.getItem('ambientalpro_lead_nome') || 'Olivio';
    const acertos = localStorage.getItem('ambientalpro_prova_acertos') || '0';
    const nota = localStorage.getItem('ambientalpro_prova_nota') || '0.0';
    let desconto = localStorage.getItem('ambientalpro_prova_desconto') || '50';

    // Atualizar UI com resultados
    document.getElementById('user-name').textContent = nome.split(' ')[0]; // Primeiro nome

    const numAcertos = parseInt(acertos, 10);
    const subtitleEl = document.querySelector('.results-hero .container > p:first-of-type');
    
    if (numAcertos >= 10) {
        if (subtitleEl) subtitleEl.textContent = 'Excelente desempenho! Sua nota desbloqueou um desconto exclusivo de';
    } else if (numAcertos >= 8) {
        if (subtitleEl) subtitleEl.textContent = 'Você conquistou uma excelente oportunidade:';
    } else if (numAcertos === 7) {
        if (subtitleEl) subtitleEl.textContent = 'Sua dedicação foi recompensada com';
    } else if (numAcertos === 6) {
        if (subtitleEl) subtitleEl.textContent = 'Você conquistou uma condição exclusiva para iniciar sua pós-graduação:';
    } else if (numAcertos >= 4) {
        if (subtitleEl) subtitleEl.textContent = 'Sua participação já garantiu uma excelente oportunidade:';
    } else {
        desconto = '30';
        const titleH1 = document.querySelector('.results-title');
        if (titleH1) {
            titleH1.innerHTML = `Olá, <span id="user-name" class="gradient-highlight">${nome.split(' ')[0]}</span>!`;
        }
        if (subtitleEl) {
            subtitleEl.textContent = 'Aproveite essa oportunidade para aprofundar seus conhecimentos na área ambiental. Sua participação garantiu';
        }
    }

    const acertosEl = document.getElementById('score-acertos');
    if (acertosEl) acertosEl.textContent = `${acertos}/12`;
    
    const notaEl = document.getElementById('score-nota');
    if (notaEl) notaEl.textContent = Math.round(parseFloat(nota));

    const hugeDescontoEl = document.getElementById('huge-score-desconto');
    if (hugeDescontoEl) hugeDescontoEl.textContent = `${desconto}%`;

    const ctaDescontoEl = document.getElementById('cta-desconto');
    if (ctaDescontoEl) ctaDescontoEl.textContent = `${desconto}%!`;

    // 2. Calcular preços dinâmicos
    const descMult = 1 - (parseFloat(desconto) / 100);

    // Função auxiliar para formatar moeda
    const formatBRL = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Atualizar Pós GGSR (R$ 7.970,00)
    const priceGgsr = document.getElementById('price-ggsr');
    if (priceGgsr) {
        const base = 7970.00;
        const discounted = base * descMult;
        priceGgsr.innerHTML = `
            <div class="old-price">De: ${formatBRL(base)}</div>
            <div class="dynamic-price">Por: ${formatBRL(discounted)} <span style="font-size: 1rem; font-weight: normal; color: #a0aec0;">à vista</span></div>
            <div style="font-size: 0.9rem; color: var(--primary-color);">Parcele em até 12x no cartão</div>
        `;
    }

    // Atualizar MBA IDA (R$ 11.970,00) - Isso vai aplicar a todos os MBAs
    const priceIdas = document.querySelectorAll('[id^="price-ida"], [data-base="11970"]');
    priceIdas.forEach(priceEl => {
        const base = 11970.00;
        const discounted = base * descMult;
        priceEl.innerHTML = `
            <div class="old-price">De: ${formatBRL(base)}</div>
            <div class="dynamic-price">Por: ${formatBRL(discounted)} <span style="font-size: 1rem; font-weight: normal; color: #a0aec0;">à vista</span></div>
            <div style="font-size: 0.9rem; color: var(--primary-color);">Parcele em até 12x no cartão</div>
        `;
    });

    // Atualizar Pós GRAC (R$ 9.700,00)
    const priceGrac = document.querySelectorAll('[id^="price-grac"], [data-base="9700"]');
    priceGrac.forEach(priceEl => {
        const base = 9700.00;
        const discounted = base * descMult;
        priceEl.innerHTML = `
            <div class="old-price">De: ${formatBRL(base)}</div>
            <div class="dynamic-price">Por: ${formatBRL(discounted)} <span style="font-size: 1rem; font-weight: normal; color: #a0aec0;">à vista</span></div>
            <div style="font-size: 0.9rem; color: var(--primary-color);">Parcele em até 12x no cartão</div>
        `;
    });

    // Os links de checkout não são mais atualizados dinamicamente pelo JS.

    // Lógica do carrossel e botões de "Ver Grade Curricular" (Copiado do script.js original)
    // Toggle course details
    const moreButtons = document.querySelectorAll('.btn-more');
    moreButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const details = this.nextElementSibling;
            if (details && details.classList.contains('course-details')) {
                details.classList.toggle('active');
                if (details.classList.contains('active')) {
                    this.textContent = 'Menos Informações';
                } else {
                    this.textContent = 'Ver Grade Curricular';
                }
            }
        });
    });

    // Carousel Logic
    const prevButtons = document.querySelectorAll('.prev-btn');
    const nextButtons = document.querySelectorAll('.next-btn');

    document.querySelectorAll('.faculty-avatars').forEach(container => {
        setTimeout(() => {
            if (container.scrollWidth > container.clientWidth) {
                const children = Array.from(container.children);
                children.forEach(child => {
                    const clone = child.cloneNode(true);
                    container.appendChild(clone);
                });

                container.addEventListener('scroll', () => {
                    const half = container.scrollWidth / 2;
                    if (container.scrollLeft >= half) {
                        container.style.scrollBehavior = 'auto';
                        container.scrollLeft -= half;
                    }
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
            if (container.scrollLeft <= 0) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft += container.scrollWidth / 2;
                container.offsetHeight;
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

    // Lógica do cronômetro (até 23:59:59 do dia atual)
    const timerElement = document.getElementById('countdown-timer');
    if (timerElement) {
        function updateTimer() {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const diff = endOfDay - now;

            if (diff <= 0) {
                timerElement.textContent = "00:00:00";
                return;
            }

            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            timerElement.textContent =
                String(hours).padStart(2, '0') + ':' +
                String(minutes).padStart(2, '0') + ':' +
                String(seconds).padStart(2, '0');
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }
});
