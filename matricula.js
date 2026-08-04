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
    const desconto = localStorage.getItem('ambientalpro_prova_desconto') || '50';
    
    // Atualizar UI com resultados
    document.getElementById('user-name').textContent = nome.split(' ')[0]; // Primeiro nome
    
    if (acertos === '0') {
        const titleH1 = document.querySelector('.results-title');
        if (titleH1) {
            titleH1.innerHTML = `Olá, <span id="user-name" class="gradient-highlight">${nome.split(' ')[0]}</span>!`;
        }
        const subtitleEl = document.querySelector('.results-hero .container > p:first-of-type');
        if (subtitleEl) {
            subtitleEl.textContent = 'Você não alcançou nota mínima, mas não se desanime! Aproveite 30% de desconto na pós-graduação e aprimore seus conhecimentos para tornar-se um especialista valorizado na área ambiental.';
        }
    }

    const acertosEl = document.getElementById('score-acertos');
    if (acertosEl) acertosEl.textContent = `${acertos}/12`;
    
    const notaEl = document.getElementById('score-nota');
    if (notaEl) notaEl.textContent = nota.replace('.', ',');
    
    const descontoEl = document.getElementById('score-desconto');
    if (descontoEl) descontoEl.textContent = `${desconto}%`;
    
    const textDescontoEl = document.getElementById('text-desconto');
    if (textDescontoEl) textDescontoEl.textContent = `${desconto}%`;

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

    // 3. Atualizar links de checkout dinamicamente com base no desconto
    // Você pode alterar as URLs base para as do Hotmart/Eduzz depois
    const checkoutGgsr = document.getElementById('checkout-ggsr');
    if (checkoutGgsr) {
        checkoutGgsr.href = `https://checkout.ambientalpro.com/ggsr/${desconto}off`;
    }

    const checkoutIdas = document.querySelectorAll('[id^="checkout-ida"]');
    checkoutIdas.forEach(checkoutEl => {
        checkoutEl.href = `https://checkout.ambientalpro.com/ida/${desconto}off`;
    });

    const checkoutGrac = document.getElementById('checkout-grac');
    if (checkoutGrac) {
        checkoutGrac.href = `https://checkout.ambientalpro.com/grac/${desconto}off`;
    }

    // Lógica do carrossel e botões de "Ver Grade Curricular" (Copiado do script.js original)
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
});
