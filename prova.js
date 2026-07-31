document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            title: "Questão 1 – Geoprocessamento, Georreferenciamento e Sensoriamento Remoto",
            supportText: "O geoprocessamento reúne técnicas de coleta, tratamento e análise de dados que possuem referência espacial. No setor ambiental, permite mapear áreas, medir extensões, cruzar informações de fontes diferentes e acompanhar mudanças no território ao longo do tempo.",
            questionText: "Assinale a alternativa que apresenta uma aplicação típica do geoprocessamento na área ambiental:",
            options: [
                "Mapeamento de áreas desmatadas e acompanhamento da cobertura vegetal ao longo dos anos.",
                "Cálculo do balanço patrimonial de empresas dos setores de mineração e siderurgia.",
                "Avaliação do desempenho e da produtividade das equipes de gestão ambiental.",
                "Controle interno dos gastos com combustível da frota de fiscalização ambiental."
            ],
            // Resposta correta: 0
            hash: "MA=="
        },
        {
            title: "Questão 2 – Auditoria, Licenciamento e Perícia Ambiental",
            supportText: "Em ações judiciais ambientais, o perito é nomeado pelo juízo e deve atuar com imparcialidade, enquanto cada parte pode indicar um assistente técnico de sua confiança. O Código de Processo Civil assegura aos assistentes o acesso aos autos e a possibilidade de se manifestar sobre o laudo pericial.",
            questionText: "Sobre a atuação do perito e dos assistentes técnicos, assinale a alternativa correta:",
            options: [
                "O perito judicial deve acatar as conclusões dos assistentes técnicos para que seu laudo seja validado.",
                "O assistente técnico pode apresentar parecer divergente do laudo pericial, desde que fundamentado.",
                "O assistente técnico, por ser indicado por uma das partes, não precisa fundamentar suas conclusões.",
                "Somente o perito judicial pode se manifestar tecnicamente, não sendo admitidos assistentes nessas ações."
            ],
            // Resposta correta: 1
            hash: "MQ=="
        },
        {
            title: "Questão 3 – Inteligência Artificial Aplicada ao Meio Ambiente",
            supportText: "A Inteligência Artificial do imaginário popular — uma máquina consciente, com vontade própria — não corresponde à que existe hoje. Os sistemas em operação executam tarefas específicas para as quais foram construídos: classificar imagens, prever valores, organizar documentos. São competentes na tarefa, e não inteligentes no sentido humano.",
            questionText: "Sobre o que é, na prática, a Inteligência Artificial aplicada ao meio ambiente, assinale a alternativa correta:",
            options: [
                "É uma tecnologia ainda experimental, sem aplicação real no setor ambiental brasileiro de hoje.",
                "São sistemas conscientes, capazes de raciocinar sobre qualquer assunto como faria um ser humano.",
                "É um conjunto de métodos que executam tarefas específicas, sem consciência ou compreensão do mundo.",
                "São programas que apenas seguem regras fixas, escritas manualmente por equipes de especialistas."
            ],
            // Resposta correta: 2
            hash: "Mg=="
        },
        {
            title: "Questão 4 – Gestão e Remediação de Áreas Contaminadas",
            supportText: "A Resolução CONAMA nº 420/2009 estabelece os valores orientadores para solo e água subterrânea: o Valor de Referência de Qualidade (VRQ), o Valor de Prevenção (VP) e o Valor de Investigação (VI).",
            questionText: "Sobre esses valores orientadores, assinale a alternativa correta:",
            options: [
                "O VRQ corresponde ao limite máximo de emissão de poluentes admitido no licenciamento ambiental.",
                "A superação do Valor de Investigação exige investigação detalhada e avaliação de risco na área.",
                "Os valores são idênticos em todo o país, pois independem das características naturais do solo.",
                "A superação do Valor de Prevenção classifica a área como contaminada e exige remediação imediata."
            ],
            // Resposta correta: 1
            hash: "MQ=="
        },
        {
            title: "Questão 5 – Inteligência de Dados Ambientais",
            supportText: "A análise de dados ambientais trabalha com grandes volumes de informação vinda de sensores, estações de monitoramento e imagens de satélite. Bibliotecas de código aberto em Python, como Pandas, GeoPandas e Rasterio, são hoje o padrão para organizar, cruzar e visualizar esses dados.",
            questionText: "Sobre o uso dessas ferramentas na análise de dados ambientais, é correto afirmar:",
            options: [
                "O tratamento desses dados dispensa o especialista, pois os resultados se interpretam sozinhos.",
                "O GeoPandas serve apenas para desenhar mapas, não permitindo calcular áreas ou cruzar camadas.",
                "O Rasterio destina-se a planilhas e tabelas, não a imagens de satélite georreferenciadas.",
                "Bibliotecas de código aberto permitem tratar dados tabulares, camadas vetoriais e imagens de satélite."
            ],
            // Resposta correta: 3
            hash: "Mw=="
        },
        {
            title: "Questão 6 – Geoprocessamento, Georreferenciamento e Sensoriamento Remoto",
            supportText: "O sensoriamento remoto capta informações da superfície terrestre a distância, por satélites ou aeronaves. Sobre as imagens obtidas aplicam-se técnicas como índices de vegetação, classificação de alvos e comparação de cenas de datas diferentes, cada uma respondendo a um tipo de pergunta.",
            questionText: "Considerando essas técnicas, assinale a alternativa correta:",
            options: [
                "O índice NDVI é usado principalmente para delimitar áreas urbanas e superfícies pavimentadas.",
                "A classificação de imagens só pode ser feita com dados de radar, e não com imagens ópticas.",
                "A comparação de imagens de datas diferentes permite identificar mudanças na cobertura do solo.",
                "Imagens de satélite não servem para monitorar desmatamento, apenas para produzir mapas-base."
            ],
            // Resposta correta: 2
            hash: "Mg=="
        },
        {
            title: "Questão 7 – Auditoria, Licenciamento e Perícia Ambiental",
            supportText: "O licenciamento ambiental brasileiro organiza-se em três etapas sucessivas. A Licença Prévia aprova a localização e a concepção do empreendimento ainda na fase de planejamento; a Licença de Instalação autoriza o início das obras; e a Licença de Operação permite o funcionamento, depois de verificado o cumprimento das exigências anteriores.",
            questionText: "Com base nessas etapas, assinale a alternativa correta:",
            options: [
                "As três licenças são concedidas de uma só vez, ao final do processo de análise.",
                "A Licença Prévia autoriza o funcionamento do empreendimento em caráter provisório.",
                "A Licença de Operação é a primeira etapa, concedida ainda na fase de planejamento.",
                "A Licença de Instalação é a que autoriza o início das obras do empreendimento."
            ],
            // Resposta correta: 3
            hash: "Mw=="
        },
        {
            title: "Questão 8 – Inteligência Artificial Aplicada ao Meio Ambiente",
            supportText: "Os sistemas que aprendem com dados fazem isso de três formas. No aprendizado supervisionado, cada exemplo vem acompanhado da resposta certa. No não supervisionado, não há resposta e o sistema busca agrupamentos e padrões por conta própria. No aprendizado por reforço, um agente aprende por tentativa, erro e recompensa.",
            questionText: "Considerando aplicações ambientais desses regimes, assinale a alternativa correta:",
            options: [
                "Classificar o uso do solo a partir de pontos de campo com classes conhecidas é aprendizado supervisionado.",
                "Agrupar poços de monitoramento por semelhança química, sem definir os grupos antes, é supervisionado.",
                "Prever a concentração de um poluente a partir da série histórica é aprendizado por reforço.",
                "O aprendizado não supervisionado exige que cada exemplo venha com a resposta certa anotada."
            ],
            // Resposta correta: 0
            hash: "MA=="
        },
        {
            title: "Questão 9 – Inteligência de Dados Ambientais",
            supportText: "Em campanhas de monitoramento, parte dos resultados laboratoriais volta reportada como “menor que” o limite de quantificação do método analítico. São os chamados dados censurados, e o tratamento dado a eles influencia médias, tendências e comparações com padrões legais.",
            questionText: "Sobre o tratamento desses resultados, assinale a alternativa correta:",
            options: [
                "Resultados abaixo do limite de quantificação devem ser descartados, por não trazerem informação.",
                "Substituir todos os valores censurados por zero é o procedimento estatisticamente recomendado.",
                "O valor está entre zero e o limite de quantificação, e substituições arbitrárias geram viés.",
                "O tratamento adotado é indiferente, desde que o número de amostras da campanha seja elevado."
            ],
            // Resposta correta: 2
            hash: "Mg=="
        },
        {
            title: "Questão 10 – Gestão e Remediação de Áreas Contaminadas",
            supportText: "O gerenciamento de áreas contaminadas segue uma sequência definida: avaliação preliminar (levantamento do histórico e dos indícios), investigação confirmatória (amostragem dirigida às áreas suspeitas), investigação detalhada, avaliação de risco e, por fim, a intervenção.",
            questionText: "Sobre essa sequência de etapas, assinale a alternativa correta:",
            options: [
                "A investigação confirmatória busca comprovar ou afastar a contaminação por meio de amostragem.",
                "A avaliação preliminar exige a coleta e a análise química de amostras em toda a extensão da área.",
                "A investigação detalhada antecede a confirmatória e define onde as amostras serão coletadas.",
                "A avaliação de risco é a primeira etapa, pois orienta todo o trabalho de campo subsequente."
            ],
            // Resposta correta: 0
            hash: "MA=="
        },
        {
            title: "Questão 11 – Geoprocessamento, Georreferenciamento e Sensoriamento Remoto",
            supportText: "O Sistema Geodésico Brasileiro define os referenciais sobre os quais as coordenadas do país são calculadas. Bases cartográficas produzidas em épocas distintas podem estar em referenciais diferentes, como o antigo SAD69 e o atual SIRGAS2000.",
            questionText: "Sobre esses sistemas de referência, marque a alternativa correta:",
            options: [
                "A conversão entre SAD69 e SIRGAS2000 se faz somando um valor fixo, igual para todo o território.",
                "Ignorar a diferença entre os referenciais pode gerar deslocamentos de dezenas de metros no dado.",
                "Por serem ambos consolidados, coordenadas em SAD69 e em SIRGAS2000 podem ser usadas juntas.",
                "O SIRGAS2000 é um referencial local, ao contrário do WGS84, o que impede a conversão entre eles."
            ],
            // Resposta correta: 1
            hash: "MQ=="
        },
        {
            title: "Questão 12 – Auditoria, Licenciamento e Perícia Ambiental",
            supportText: "Nos estudos ambientais, a avaliação de impactos organiza os efeitos previstos de um empreendimento segundo critérios como magnitude, duração, reversibilidade e a interação entre eles. É a base para definir as medidas de mitigação e de compensação exigidas no licenciamento.",
            questionText: "Sobre a avaliação de impactos ambientais, assinale a alternativa correta:",
            options: [
                "Os impactos positivos devem ser desconsiderados, para que a avaliação seja mais conservadora.",
                "A análise deve se restringir à fase de instalação, por ser a etapa de maior magnitude do projeto.",
                "Apenas critérios qualitativos devem ser usados, pois quantificar impactos é sempre impreciso.",
                "Os impactos devem ser analisados também em sua interação, para não mascarar efeitos cumulativos."
            ],
            // Resposta correta: 3
            hash: "Mw=="
        }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = new Array(questions.length).fill(null);
    
    // Timer: 35 minutos
    let timeRemaining = 35 * 60;
    let timerInterval;

    const questionContainer = document.getElementById('question-container');
    const currentNumSpan = document.getElementById('current-question-num');
    const totalNumSpan = document.getElementById('total-questions-num');
    const progressBar = document.getElementById('progress-bar');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const timeLeftSpan = document.getElementById('time-left');
    
    totalNumSpan.textContent = questions.length;

    function renderQuestion(index) {
        const q = questions[index];
        currentNumSpan.textContent = index + 1;
        
        function updateProgressBar() {
            const answeredCount = userAnswers.filter(answer => answer !== null).length;
            const progressPercentage = (answeredCount / questions.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
        
        // Atualiza barra de progresso
        updateProgressBar();

        // Renderiza HTML
        let html = `
            <div class="question-title">${q.title}</div>
            <div class="question-support-text">${q.supportText}</div>
            <div class="question-text">${q.questionText}</div>
            <div class="options-container">
        `;

        q.options.forEach((opt, i) => {
            const letter = String.fromCharCode(65 + i); // A, B, C, D
            const isChecked = userAnswers[index] === i ? 'checked' : '';
            html += `
                <label class="option-label ${isChecked ? 'selected' : ''}" data-index="${i}">
                    <input type="radio" name="q${index}" value="${i}" class="option-input" ${isChecked}>
                    <span class="option-letter">${letter})</span>
                    <span class="option-text">${opt}</span>
                </label>
            `;
        });

        html += `</div>`;
        questionContainer.innerHTML = html;

        // Atualiza estado dos botões
        btnPrev.disabled = index === 0;
        
        if (index === questions.length - 1) {
            btnNext.textContent = 'Finalizar Prova';
            btnNext.classList.add('btn-finish');
        } else {
            btnNext.textContent = 'Avançar';
            btnNext.classList.remove('btn-finish');
        }

        // Adiciona listeners para os radios recém-criados
        const options = questionContainer.querySelectorAll('input[type="radio"]');
        options.forEach(radio => {
            radio.addEventListener('change', (e) => {
                // Atualiza seleção visual
                document.querySelectorAll('.option-label').forEach(lbl => lbl.classList.remove('selected'));
                e.target.closest('.option-label').classList.add('selected');
                
                // Salva resposta
                userAnswers[index] = parseInt(e.target.value);
                
                // Atualiza progresso da barra verde
                updateProgressBar();
                
                // Auto-avança após pequeno delay
                setTimeout(() => {
                    if (currentQuestionIndex < questions.length - 1) {
                        currentQuestionIndex++;
                        renderQuestion(currentQuestionIndex);
                    } else {
                        btnNext.click(); // Aciona o botão de finalizar
                    }
                }, 400);
            });
        });
    }

    function calculateScoreAndRedirect() {
        clearInterval(timerInterval);
        
        // Mostra loading
        const btnNavSection = document.querySelector('.navigation-section');
        btnNavSection.innerHTML = '<div class="spinner"></div><p>Calculando sua nota...</p>';
        
        let acertos = 0;
        
        questions.forEach((q, index) => {
            const userAnswer = userAnswers[index];
            if (userAnswer !== null) {
                // Desofusca a resposta
                const correctHash = btoa(userAnswer.toString());
                if (correctHash === q.hash) {
                    acertos++;
                }
            }
        });

        // Lógica de Desconto (fornecida)
        // 10-12 acertos: 70%
        // 7-9 acertos: 60%
        // 0-6 acertos: 50%
        let desconto = 30;
        let nota = 0.0;
        
        if (acertos >= 10) {
            desconto = 70;
        } else if (acertos >= 7) {
            desconto = 60;
        } else if (acertos >= 1) {
            desconto = 50;
        } else {
            desconto = 30;
        }

        // Mapeamento exato de nota
        const notasMap = {
            12: 10.0,
            11: 9.2,
            10: 8.3,
            9: 7.5,
            8: 6.7,
            7: 5.8,
            6: 5.0,
            5: 4.2,
            4: 3.3,
            3: 2.5,
            2: 1.7,
            1: 0.8,
            0: 0.0
        };
        nota = notasMap[acertos] || 0.0;

        // Salvar resultados
        localStorage.setItem('ambientalpro_prova_acertos', acertos);
        localStorage.setItem('ambientalpro_prova_nota', nota);
        localStorage.setItem('ambientalpro_prova_desconto', desconto);
        localStorage.setItem('ambientalpro_prova_realizada', 'true');

        // Preparar payload para o Webhook do Google Sheets
        const payload = {
            nome: localStorage.getItem('ambientalpro_lead_nome') || '',
            email: localStorage.getItem('ambientalpro_lead_email') || '',
            telefone: localStorage.getItem('ambientalpro_lead_telefone') || '',
            area: localStorage.getItem('ambientalpro_lead_area') || '',
            graduacao: localStorage.getItem('ambientalpro_lead_graduacao') || '',
            acertos: acertos,
            nota: nota,
            desconto: desconto
        };

        const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxYq0BAjUQClV1NM9xrdrdJxvgHuW8ZesafyOx3ZLSzoRVVixuTVQsyiI_3GqAwwd_P/exec';

        // Enviar os dados
        if (WEBHOOK_URL !== 'COLOQUE_SUA_URL_DO_APP_SCRIPT_AQUI') {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                body: JSON.stringify(payload),
                mode: 'no-cors' // Google Script requires no-cors when accessed directly from browser without proper CORS headers
            }).then(() => {
                setTimeout(() => { window.location.href = 'matricula.html'; }, 1000);
            }).catch(err => {
                console.error("Erro ao salvar:", err);
                setTimeout(() => { window.location.href = 'matricula.html'; }, 1000);
            });
        } else {
            // Se a URL não estiver configurada, apenas redireciona
            setTimeout(() => {
                window.location.href = 'matricula.html';
            }, 1500);
        }
    }

    // Botões de navegação
    btnPrev.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion(currentQuestionIndex);
        }
    });

    btnNext.addEventListener('click', () => {
        // Exige resposta antes de avançar? (opcional, deixaremos avançar sem responder se quiser)
        if (userAnswers[currentQuestionIndex] === null) {
            alert('Por favor, selecione uma alternativa antes de avançar.');
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        } else {
            // Mostrar Modal Customizado
            const modal = document.getElementById('custom-confirm-modal');
            if (modal) {
                modal.style.display = 'flex';
                
                const btnConfirm = document.getElementById('btn-confirm-modal');
                const btnCancel = document.getElementById('btn-cancel-modal');
                
                btnConfirm.onclick = () => {
                    modal.style.display = 'none';
                    calculateScoreAndRedirect();
                };
                
                btnCancel.onclick = () => {
                    modal.style.display = 'none';
                };
            } else {
                // Fallback de segurança
                if (confirm('Tem certeza que deseja finalizar a prova?')) {
                    calculateScoreAndRedirect();
                }
            }
        }
    });

    // Formatação do tempo
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // Timer logic
    function startTimer() {
        timeLeftSpan.textContent = formatTime(timeRemaining);
        
        timerInterval = setInterval(() => {
            timeRemaining--;
            timeLeftSpan.textContent = formatTime(timeRemaining);
            
            if (timeRemaining <= 300) { // 5 minutos restantes
                timeLeftSpan.classList.add('time-warning');
            }
            
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                document.getElementById('timeOutModal').style.display = 'block';
                setTimeout(calculateScoreAndRedirect, 4000);
            }
        }, 1000);
    }

    // Inicialização e Start da Prova
    const btnStartQuiz = document.getElementById('btn-start-quiz');
    if (btnStartQuiz) {
        btnStartQuiz.addEventListener('click', () => {
            document.getElementById('instructions-section').style.display = 'none';
            document.getElementById('quiz-content').style.display = 'block';
            
            renderQuestion(0);
            startTimer();
        });
    }
});
