// script.js

// Objeto que mapeia o nome da tela para o nome do arquivo HTML
const ROUTES = {
    'home': 'index.html',
    'iluminacao': 'iluminacao.html',
    'eletrodomesticos': 'eletrodomesticos.html',
    'resultados': 'resultados.html',
    'dicas': 'dicas.html',
    'historico': 'historico.html',
    'configuracoes': 'configuracoes.html'
};

/**
 * Navega para uma rota específica.
 * @param {string} routeName - A chave da rota no objeto ROUTES (ex: 'resultados').
 */
function navigateTo(routeName) {
    if (ROUTES[routeName]) {
        window.location.href = ROUTES[routeName];
    } else {
        console.error(`Rota não encontrada: ${routeName}`);
    }
}

/**
 * Configura os listeners de clique nos botões principais e itens da barra de navegação.
 * Esta função deve ser chamada quando a página carregar (onload).
 */
function setupNavigationListeners() {
    // 1. Configura o botão principal 'Começar' ou 'Próximo'
    const primaryButton = document.querySelector('.button-primary');
    if (primaryButton) {
        // A próxima tela será definida no HTML de cada página
        const nextScreen = primaryButton.getAttribute('data-next-screen');
        if (nextScreen) {
            primaryButton.addEventListener('click', () => navigateTo(nextScreen));
        }
    }

    // 2. Configura a barra de navegação inferior
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const route = item.getAttribute('data-route');
        if (route) {
            item.addEventListener('click', () => navigateTo(route));
        }
    });

    // 3. Configura o botão de voltar na app-bar
    const backButton = document.querySelector('.back-icon');
    if (backButton) {
        // Usa a funcionalidade nativa do navegador para voltar, 
        // a menos que haja uma rota de volta específica
        const backRoute = backButton.getAttribute('data-back-route');
        if (backRoute) {
             backButton.addEventListener('click', () => navigateTo(backRoute));
        } else {
             backButton.addEventListener('click', () => history.back());
        }
    }
}

// Chama a função principal quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', setupNavigationListeners);


// ==========================================================
// Lógica para Simular o Stepper (aumentar/diminuir) em Iluminacao
// Esta função é executada apenas na página iluminacao.html
// ==========================================================
function setupStepperLogic() {
    document.querySelectorAll('.stepper-control').forEach(control => {
        const valueSpan = control.querySelector('.stepper-value');
        const minusBtn = control.querySelector('.stepper-btn[data-action="minus"]');
        const plusBtn = control.querySelector('.stepper-btn[data-action="plus"]');
        
        if (minusBtn && plusBtn) {
            minusBtn.addEventListener('click', () => {
                let currentValue = parseInt(valueSpan.textContent);
                if (currentValue > 0) {
                    valueSpan.textContent = currentValue - 1;
                }
            });

            plusBtn.addEventListener('click', () => {
                let currentValue = parseInt(valueSpan.textContent);
                valueSpan.textContent = currentValue + 1;
            });
        }
    });
}

// Adicione a lógica do stepper ao evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', setupStepperLogic);