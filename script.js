// ==========================================================================
// ESTRUTURAS DE DADOS (ARRAY DE OBJETOS)
// ==========================================================================

const depoimentos = [
    {
        texto: "Saimos de 62 para 84 sacas de soja por hectare na última safra. O suporte biotecnológico foi o divisor de águas na nossa fazenda.",
        autor: "Ronaldo Steinmetz",
        local: "Sorriso - MT"
    },
    {
        texto: "O milho safrinha respondeu de forma espetacular ao manejo de solo proposto. Mesmo com o veranico, a raiz buscou água no fundo.",
        autor: "Mauro Pozzebon",
        local: "Cascavel - PR"
    },
    {
        texto: "A uniformidade da lavoura de milho impressionou desde a emergência. Tecnologia indispensável para quem busca alta performance hoje.",
        autor: "Juliana Schwingel",
        local: "Rio Verde - GO"
    }
];

const perguntasFrequentes = [
    {
        pergunta: "A biotecnologia oferecida é adaptada para a safrinha de milho?",
        resposta: "Sim. Nossos híbridos e manejos de milho são desenvolvidos especificamente focando o zoneamento climático brasileiro, garantindo tolerância ao estresse térmico e hídrico típico da safrinha."
    },
    {
        pergunta: "Como funciona o diagnóstico gratuito de solo?",
        resposta: "Um de nossos engenheiros agrônomos analisa os seus históricos recentes de produtividade, mapa de calor e dados de análises físicas/químicas anteriores para apontar onde estão os gargalos de produtividade."
    },
    {
        pergunta: "Qual o prazo para começar a ver os resultados?",
        resposta: "Desde o arranque inicial da planta e emergência das plântulas na soja e milho, os resultados de vigor foliar e estruturação radicular já se tornam visíveis visualmente e via monitoramento aéreo."
    }
];

// ==========================================================================
// RENDERIZAÇÃO DINÂMICA
// ==========================================================================

function renderizarCarrossel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    track.innerHTML = depoimentos.map(dep => `
        <div class="carousel-item">
            <div class="testimonial-card">
                <p class="testimonial-text">"${dep.texto}"</p>
                <div class="testimonial-author">${dep.autor}</div>
                <div class="testimonial-meta">${dep.local}</div>
            </div>
        </div>
    `).join('');
}

function renderizarAcordeao() {
    const accordion = document.getElementById('faq-accordion');
    if (!accordion) return;

    accordion.innerHTML = perguntasFrequentes.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" data-index="${index}" aria-expanded="false">
                ${item.pergunta}
                <i class="fa-solid fa-plus icon"></i>
            </button>
            <div class="accordion-content">
                <p>${item.resposta}</p>
            </div>
        </div>
    `).join('');

    configurarEventosAcordeao();
}

// ==========================================================================
// LÓGICA DO CARROSSEL
// ==========================================================================

let carouselIndex = 0;

function configurarCarrossel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!track || !prevBtn || !nextBtn) return;

    const atualizarPosicao = () => {
        track.style.transform = `translateX(-${carouselIndex * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex + 1) % depoimentos.length;
        atualizarPosicao();
    });

    prevBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex - 1 + depoimentos.length) % depoimentos.length;
        atualizarPosicao();
    });
}

// ==========================================================================
// LÓGICA DO ACORDEÃO
// ==========================================================================

function configurarEventosAcordeao() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('i');
            const isActive = item.classList.contains('active');

            // Fechar todos
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
                i.querySelector('.accordion-header i').className = 'fa-solid fa-plus icon';
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                icon.className = 'fa-solid fa-minus icon';
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ==========================================================================
// ACESSIBILIDADE: FONTE E CONTRASTE
// ==========================================================================

function configurarAcessibilidade() {
    const htmlElement = document.documentElement;
    const btnIncrease = document.getElementById('btn-font-increase');
    const btnDecrease = document.getElementById('btn-font-decrease');
    const btnContrast = document.getElementById('btn-contrast');

    let currentFontSize = 16;

    btnIncrease.addEventListener('click', () => {
        if (currentFontSize < 24) {
            currentFontSize += 2;
            htmlElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });

    btnDecrease.addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            htmlElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });

    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
}

// ==========================================================================
// INICIALIZAÇÃO
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrossel();
    renderizarAcordeao();
    configurarCarrossel();
    configurarAcessibilidade();
});