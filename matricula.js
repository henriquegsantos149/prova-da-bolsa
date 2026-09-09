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
    
    // if (numAcertos < 4) {
    //     desconto = '30';
    // }

    const descontoNum = parseInt(desconto, 10) || 0;

    if (descontoNum >= 60) {
        if (subtitleEl) {
            subtitleEl.innerHTML = 'Excelente resultado! Isso mostra seu compromisso com o crescimento profissional.<br>Nossa pós-graduação foi feita para quem deseja se destacar no mercado. Sua participação garantiu um desconto exclusivo de';
        }
    } else if (descontoNum > 0) {
        const titleH1 = document.querySelector('.results-title');
        if (titleH1) {
            titleH1.innerHTML = `Olá, <span id="user-name" class="gradient-highlight">${nome.split(' ')[0]}</span>!`;
        }
        if (subtitleEl) {
            subtitleEl.innerHTML = 'Não se desanime com o resultado! Aproveite esta oportunidade para ampliar seus conhecimentos e construir uma carreira ainda mais sólida. O aprendizado contínuo faz toda a diferença na vida profissional. Sua participação garantiu';
        }
    } else {
        const titleH1 = document.querySelector('.results-title');
        if (titleH1) {
            titleH1.innerHTML = `Olá, <span id="user-name" class="gradient-highlight">${nome.split(' ')[0]}</span>!`;
        }
        if (subtitleEl) {
            subtitleEl.innerHTML = 'Não se desanime com o resultado! Infelizmente, a sua nota não foi suficiente para garantir uma bolsa de estudos neste momento.<br><br>Mas não desista! Entre em contato com a nossa equipe comercial para avaliarmos a sua situação e encontrarmos a melhor forma de você iniciar a sua pós-graduação.';
        }
    }

    const acertosEl = document.getElementById('score-acertos');
    if (acertosEl) acertosEl.textContent = `${acertos}/12`;
    
    const notaEl = document.getElementById('score-nota');
    if (notaEl) notaEl.textContent = Math.round(parseFloat(nota));

    const hugeDescontoEl = document.getElementById('huge-score-desconto');
    const urgencyTimerEl = document.querySelector('.urgency-timer');
    if (hugeDescontoEl) {
        const deBolsaTextEl = hugeDescontoEl.nextElementSibling;
        if (descontoNum === 0) {
            hugeDescontoEl.style.display = 'none';
            if (deBolsaTextEl && deBolsaTextEl.textContent.includes('DE BOLSA')) deBolsaTextEl.style.display = 'none';
            if (urgencyTimerEl) urgencyTimerEl.style.display = 'none';
        } else {
            hugeDescontoEl.textContent = `${desconto}%`;
            hugeDescontoEl.style.display = 'block';
            if (deBolsaTextEl && deBolsaTextEl.textContent.includes('DE BOLSA')) deBolsaTextEl.style.display = 'block';
            if (urgencyTimerEl) urgencyTimerEl.style.display = 'flex';
        }
    }

    const ctaDescontoEl = document.getElementById('cta-desconto');
    if (ctaDescontoEl) {
        if (descontoNum === 0) {
            const btnCta = ctaDescontoEl.closest('a');
            if (btnCta) {
                btnCta.innerHTML = 'Fale com nosso comercial para conhecer as condições!';
                btnCta.href = 'https://api.whatsapp.com/send/?phone=5521982639824&text=Ol%C3%A1!%20Fiz%20a%20Prova%20da%20Bolsa%20e%20gostaria%20de%20falar%20com%20um%20consultor%20sobre%20as%20p%C3%B3s-gradua%C3%A7%C3%B5es.&type=phone_number&app_absent=0';
                btnCta.target = '_blank';
            }
        } else {
            ctaDescontoEl.textContent = `${desconto}%`;
        }
    }

    // 2. Calcular preços dinâmicos
    const descMult = 1 - (parseFloat(desconto) / 100);

    // Função auxiliar para formatar moeda
    const formatBRL = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Função auxiliar para passar UTMs ao checkout
    const getCheckoutUtms = () => {
        const params = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(k => {
            if (!params.has(k)) {
                const val = localStorage.getItem('ambientalpro_' + k) || sessionStorage.getItem('ambientalpro_' + k);
                if (val) params.set(k, val);
            }
        });
        const str = params.toString();
        return str ? '&' + str : '';
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
        const btn = priceGgsr.nextElementSibling;
        if (btn && btn.tagName === 'A') {
            if (descontoNum === 0) {
                btn.href = 'https://api.whatsapp.com/send/?phone=5521982639824&text=Ol%C3%A1!%20Fiz%20a%20Prova%20da%20Bolsa%20e%20gostaria%20de%20falar%20com%20um%20consultor%20sobre%20a%20p%C3%B3s-gradua%C3%A7%C3%A3o%20GGSR.&type=phone_number&app_absent=0';
                btn.textContent = 'FALAR COM O COMERCIAL';
                btn.target = '_blank';
            } else {
                btn.href = `/api/checkout?curso=ggsr&desconto=${desconto}` + getCheckoutUtms();
            }
        }
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
        const btn = priceEl.nextElementSibling;
        if (btn && btn.tagName === 'A') {
            const curso = priceEl.id.split('-')[1]; // ida, iama, alpa
            if (descontoNum === 0) {
                btn.href = `https://api.whatsapp.com/send/?phone=5521982639824&text=Ol%C3%A1!%20Fiz%20a%20Prova%20da%20Bolsa%20e%20gostaria%20de%20falar%20com%20um%20consultor%20sobre%20a%20p%C3%B3s-gradua%C3%A7%C3%A3o%20${curso.toUpperCase()}.&type=phone_number&app_absent=0`;
                btn.textContent = 'FALAR COM O COMERCIAL';
                btn.target = '_blank';
            } else {
                btn.href = `/api/checkout?curso=${curso}&desconto=${desconto}` + getCheckoutUtms();
            }
        }
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
        const btn = priceEl.nextElementSibling;
        if (btn && btn.tagName === 'A') {
            if (descontoNum === 0) {
                btn.href = 'https://api.whatsapp.com/send/?phone=5521982639824&text=Ol%C3%A1!%20Fiz%20a%20Prova%20da%20Bolsa%20e%20gostaria%20de%20falar%20com%20um%20consultor%20sobre%20a%20p%C3%B3s-gradua%C3%A7%C3%A3o%20GRAC.&type=phone_number&app_absent=0';
                btn.textContent = 'FALAR COM O COMERCIAL';
                btn.target = '_blank';
            } else {
                btn.href = `/api/checkout?curso=grac&desconto=${desconto}` + getCheckoutUtms();
            }
        }
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

    // Gabarito da prova (exibido ao clicar em "Conferir gabarito")
    const gabaritoSection = document.getElementById('gabarito-section');
    const gabaritoList = document.getElementById('gabarito-list');
    const gabaritoCta = document.getElementById('gabarito-cta');
    const btnGabarito = document.getElementById('btn-conferir-gabarito');

    let gabarito = null;
    try {
        gabarito = JSON.parse(localStorage.getItem('ambientalpro_prova_gabarito'));
    } catch (err) {
        gabarito = null;
    }

    if (gabaritoSection && gabaritoList && Array.isArray(gabarito) && gabarito.length > 0) {
        const escapeHtml = (text) => String(text == null ? '' : text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        gabaritoList.innerHTML = gabarito.map((item, index) => {
            const options = Array.isArray(item.options) ? item.options : [];
            const userAnswer = (item.userAnswer === null || item.userAnswer === undefined) ? null : Number(item.userAnswer);
            const correct = Number(item.correct);
            const acertou = userAnswer !== null && userAnswer === correct;

            let statusClass = 'gabarito-status-wrong';
            let statusText = 'Você errou';
            if (acertou) {
                statusClass = 'gabarito-status-correct';
                statusText = 'Você acertou';
            } else if (userAnswer === null) {
                statusText = 'Não respondida';
            }

            const optionsHtml = options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                let optionClass = 'gabarito-option';
                let tag = '';

                if (i === correct) {
                    optionClass += ' gabarito-option-correct';
                    tag = '<span class="gabarito-tag gabarito-tag-correct">Resposta correta</span>';
                } else if (i === userAnswer) {
                    optionClass += ' gabarito-option-wrong';
                    tag = '<span class="gabarito-tag gabarito-tag-wrong">Sua resposta</span>';
                }

                return `
                    <div class="${optionClass}">
                        <span class="gabarito-option-letter">${letter})</span>
                        <span class="gabarito-option-text">${escapeHtml(opt)}</span>
                        ${tag}
                    </div>
                `;
            }).join('');

            const supportHtml = item.supportText
                ? `<p class="gabarito-support-text">${escapeHtml(item.supportText)}</p>`
                : '';

            return `
                <div class="gabarito-card">
                    <div class="gabarito-card-header">
                        <span class="gabarito-card-title">${escapeHtml(item.title || `Questão ${index + 1}`)}</span>
                        <span class="gabarito-status ${statusClass}">${statusText}</span>
                    </div>
                    ${supportHtml}
                    <p class="gabarito-question-text">${escapeHtml(item.questionText)}</p>
                    <div class="gabarito-options">${optionsHtml}</div>
                </div>
            `;
        }).join('');

        gabaritoSection.style.display = 'block';

        if (gabaritoCta) gabaritoCta.style.display = 'block';

        if (btnGabarito) {
            btnGabarito.addEventListener('click', () => {
                gabaritoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

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
