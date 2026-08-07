document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            title: "Questão 1",
            supportText: "O geoprocessamento reúne técnicas de coleta, tratamento e análise de dados que possuem referência espacial, ou seja, dados associados a uma posição no território. Com elas, transformam-se informações de diferentes origens em conhecimento sobre o espaço geográfico.",
            questionText: "Assinale a alternativa que apresenta uma aplicação típica do geoprocessamento na área ambiental:",
            options: [
                "Mapeamento de áreas desmatadas e acompanhamento da cobertura vegetal ao longo dos anos.",
                "Realização de oficinas de educação ambiental com estudantes da rede pública.",
                "Determinação da concentração de metais em amostras de água coletadas em um rio.",
                "Elaboração de pareceres jurídicos sobre a legislação ambiental aplicável a uma obra."
            ],
            // Resposta correta: 0
            hash: "MA=="
        },
        {
            title: "Questão 2",
            supportText: "Em ações judiciais ambientais, o perito é nomeado pelo juízo e deve atuar com imparcialidade, enquanto cada parte pode indicar um assistente técnico de sua confiança. O Código de Processo Civil assegura aos assistentes o acesso aos autos e a possibilidade de se manifestar sobre o laudo pericial.",
            questionText: "Sobre a atuação do perito e dos assistentes técnicos, assinale a alternativa correta:",
            options: [
                "Cabe ao perito judicial coordenar e supervisionar o trabalho dos assistentes técnicos indicados pelas partes.",
                "O assistente técnico indicado por uma das partes pode apresentar parecer com conclusões divergentes das do laudo pericial.",
                "O assistente técnico está sujeito às mesmas regras de impedimento e suspeição exigidas do perito judicial.",
                "O parecer do assistente técnico substitui o laudo do perito quando aponta falhas na metodologia empregada."
            ],
            // Resposta correta: 1
            hash: "MQ=="
        },
        {
            title: "Questão 3",
            supportText: "A Inteligência Artificial do imaginário popular — uma máquina consciente, com vontade própria — não corresponde à que existe hoje. Os sistemas em operação executam tarefas específicas para as quais foram construídos: classificar imagens, prever valores, organizar documentos. São competentes na tarefa, e não inteligentes no sentido humano.",
            questionText: "Sobre o que é, na prática, a Inteligência Artificial aplicada ao meio ambiente, assinale a alternativa correta:",
            options: [
                "A IA aplicada ao meio ambiente consiste basicamente em programas que geram textos e imagens a partir de comandos escritos.",
                "São máquinas dotadas de consciência e de vontade própria, capazes de definir sozinhas os objetivos ambientais a perseguir.",
                "São sistemas que aprendem padrões a partir de dados para executar tarefas ambientais específicas, como identificar desmatamento ou prever a qualidade do ar.",
                "São programas construídos a partir de regras fixas, escritas manualmente por especialistas, que não envolvem aprendizado com dados."
            ],
            // Resposta correta: 2
            hash: "Mg=="
        },
        {
            title: "Questão 4",
            supportText: "A Resolução CONAMA nº 420/2009 estabelece os valores orientadores para solo e água subterrânea: o Valor de Referência de Qualidade (VRQ), o Valor de Prevenção (VP) e o Valor de Investigação (VI).",
            questionText: "Sobre esses valores orientadores, assinale a alternativa correta:",
            options: [
                "O VRQ corresponde ao limite máximo de emissão de poluentes admitido no licenciamento ambiental.",
                "A superação do Valor de Investigação exige investigação detalhada e avaliação de risco na área.",
                "O VRQ é fixado em valor único e nacional, aplicável a qualquer tipo de solo do país.",
                "A superação do Valor de Prevenção classifica a área como contaminada e determina sua remediação."
            ],
            // Resposta correta: 1
            hash: "MQ=="
        },
        {
            title: "Questão 5",
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
            title: "Questão 6",
            supportText: "O sensoriamento remoto capta informações da superfície terrestre a distância, por satélites ou aeronaves. Sobre as imagens obtidas aplicam-se técnicas como índices de vegetação, classificação de alvos e comparação de cenas de datas diferentes, cada uma respondendo a um tipo de pergunta.",
            questionText: "Considerando essas técnicas, assinale a alternativa correta:",
            options: [
                "O índice NDVI é usado principalmente para delimitar áreas urbanas e superfícies pavimentadas.",
                "Para acompanhar a variação da cobertura entre dois anos, classifica-se uma única imagem da área.",
                "A comparação de imagens de datas diferentes permite identificar mudanças na cobertura do solo.",
                "Imagens de satélite não servem para monitorar desmatamento, apenas para produzir mapas-base."
            ],
            // Resposta correta: 2
            hash: "Mg=="
        },
        {
            title: "Questão 7",
            supportText: "O licenciamento ambiental brasileiro organiza-se em três etapas sucessivas: Licença Prévia (LP), Licença de Instalação (LI) e Licença de Operação (LO), concedidas em momentos diferentes da vida do empreendimento, do planejamento ao funcionamento.",
            questionText: "Assinale a alternativa que associa corretamente a licença à sua finalidade:",
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
            title: "Questão 8",
            supportText: "Os sistemas que aprendem com dados fazem isso de três formas. No aprendizado supervisionado, cada exemplo vem acompanhado da resposta certa. No não supervisionado, não há resposta e o sistema busca agrupamentos e padrões por conta própria. No aprendizado por reforço, um agente aprende por tentativa, erro e recompensa.",
            questionText: "Considerando aplicações ambientais desses regimes, assinale a alternativa correta:",
            options: [
                "Classificar o uso do solo a partir de pontos de campo com classes conhecidas é aprendizado supervisionado.",
                "Agrupar poços de monitoramento por semelhança química, sem definir os grupos antes, é supervisionado.",
                "Prever a concentração de um poluente a partir da série histórica é aprendizado por reforço.",
                "Definir a operação de uma estação de tratamento por tentativa e recompensa, ajustando a cada resultado, é um aprendizado não supervisionado."
            ],
            // Resposta correta: 0
            hash: "MA=="
        },
        {
            title: "Questão 9",
            supportText: "Em campanhas de monitoramento, parte dos resultados laboratoriais volta reportada como “menor que” o limite de quantificação do método analítico. São os chamados dados censurados, e o tratamento dado a eles influencia médias, tendências e comparações com padrões legais.",
            questionText: "Sobre o tratamento desses resultados, assinale a alternativa correta:",
            options: [
                "Valores reportados como \"menor que\" devem ser excluídos do conjunto antes de calcular médias e tendências.",
                "O procedimento adequado é substituir todo valor censurado por zero, por ser o limite inferior possível.",
                "O valor real está entre zero e o limite de quantificação, e substituições arbitrárias introduzem viés nos resultados.",
                "Substituir cada valor censurado pelo próprio limite de quantificação elimina o viés da análise."
            ],
            // Resposta correta: 2
            hash: "Mg=="
        },
        {
            title: "Questão 10",
            supportText: "O gerenciamento de áreas contaminadas segue uma sequência definida de etapas: avaliação preliminar, investigação confirmatória, investigação detalhada, avaliação de risco e, por fim, a intervenção. Cada etapa tem um objetivo próprio e prepara a seguinte.",
            questionText: "Assinale a alternativa que associa corretamente a etapa ao seu objetivo:",
            options: [
                "A investigação confirmatória coleta amostras dirigidas às áreas suspeitas para comprovar ou afastar a contaminação.",
                "A avaliação preliminar baseia-se no levantamento do histórico e de indícios da área, sem coleta de amostras.",
                "A investigação detalhada é a etapa inicial e define onde ficam localizadas as áreas suspeitas.",
                "A avaliação de risco antecede a investigação confirmatória e orienta onde as amostras serão coletadas."
            ],
            // Resposta correta: 0
            hash: "MA=="
        },
        {
            title: "Questão 11",
            supportText: "O Sistema Geodésico Brasileiro define os referenciais sobre os quais as coordenadas do país são calculadas. Bases cartográficas produzidas em épocas distintas podem estar em referenciais diferentes, como o antigo SAD69 e o atual SIRGAS2000.",
            questionText: "Sobre esses sistemas de referência, marque a alternativa correta:",
            options: [
                "A conversão de coordenadas entre SAD69 e SIRGAS2000 é dispensável quando ambas as bases cobrem a mesma região.",
                "Ignorar a diferença entre os referenciais pode gerar deslocamentos de dezenas de metros no dado.",
                "A transformação de SAD69 para SIRGAS2000 aplica um deslocamento constante, idêntico em qualquer ponto do país.",
                "O SIRGAS2000 é um referencial local, ao contrário do WGS84, o que impede a conversão entre eles."
            ],
            // Resposta correta: 1
            hash: "MQ=="
        },
        {
            title: "Questão 12",
            supportText: "Nos estudos ambientais, a avaliação de impactos organiza os efeitos previstos de um empreendimento segundo critérios como magnitude, duração, reversibilidade e a interação entre eles. É a base para definir as medidas de mitigação e de compensação exigidas no licenciamento.",
            questionText: "Sobre a avaliação de impactos ambientais, assinale a alternativa correta:",
            options: [
                "A avaliação de impactos considera apenas os efeitos diretos do empreendimento, pois os indiretos são de difícil previsão.",
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

        // Lógica de Desconto
        let desconto = 30;
        let nota = 0.0;

        if (acertos >= 10) {
            desconto = 70; // 10 a 12 acertos
        } else if (acertos >= 8) {
            desconto = 65; // 8 a 9 acertos
        } else if (acertos === 7) {
            desconto = 60; // 7 acertos
        } else if (acertos === 6) {
            desconto = 55; // 6 acertos
        } else if (acertos >= 4) {
            desconto = 50; // 4 a 5 acertos
        } else {
            desconto = 30; // 0 a 3 acertos
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

        const startTime = Date.now();
        const executeRedirect = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 1500 - elapsed);
            setTimeout(() => { window.location.href = '../matricula/'; }, remaining);
        };

        // Enviar os dados
        if (WEBHOOK_URL !== 'COLOQUE_SUA_URL_DO_APP_SCRIPT_AQUI') {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                body: JSON.stringify(payload),
                mode: 'no-cors'
            }).then(() => {
                executeRedirect();
            }).catch(err => {
                console.error("Erro ao salvar:", err);
                executeRedirect();
            });
        } else {
            executeRedirect();
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
                    const modalContent = modal.querySelector('.custom-modal');
                    if (modalContent) {
                        modalContent.innerHTML = `
                            <div style="padding: 20px 0;">
                                <p style="font-size: 1.2rem; font-weight: bold; margin: 0 0 15px 0; text-align: center; color: #22c55e;">Calculando resultado...</p>
                                <div style="width: 100%; max-width: 250px; margin: 0 auto; height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                                    <div id="calc-progress-bar" style="width: 0%; height: 100%; background: #22c55e; border-radius: 4px; transition: width 1.5s ease-in-out;"></div>
                                </div>
                            </div>
                        `;

                        setTimeout(() => {
                            const bar = document.getElementById('calc-progress-bar');
                            if (bar) bar.style.width = '100%';
                        }, 50);
                    }

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
