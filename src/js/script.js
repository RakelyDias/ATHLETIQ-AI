// Theme toggle (Modo Claro / Modo Escuro)
(function () {
    const root = document.documentElement;
    const stored = localStorage.getItem('athletiq-theme');
    const initial = stored || 'light';

    root.setAttribute('data-theme', initial);

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.theme-toggle');

        if (!toggle) return;

        updateToggleIcon(toggle, initial);

        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';

            root.setAttribute('data-theme', next);
            localStorage.setItem('athletiq-theme', next);

            updateToggleIcon(toggle, next);
        });
    });

    function updateToggleIcon(elemento, tema) {
        elemento.textContent = tema === 'dark' ? '☀️' : '🌙';

        elemento.setAttribute(
            'aria-label',
            tema === 'dark'
                ? 'Ativar modo claro'
                : 'Ativar modo escuro'
        );
    }
})();


// Login
function handleLoginSubmit(form) {
    const btn = form.querySelector('.btn-primary');

    btn.textContent = 'Entrando ✓';

    const emailInput = form.querySelector('#email-login');

    localStorage.setItem(
        'athletiq-auth',
        JSON.stringify({
            email: emailInput ? emailInput.value : ''
        })
    );

    showLoginThanks();

    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1500);
}


// Cadastro
function handleCadastroSubmit(form) {
    const btn = form.querySelector('.btn-primary');

    btn.textContent = 'Conta criada ✓';

    const nomeInput = form.querySelector('#nome-cad');
    const emailInput = form.querySelector('#email-cad');

    localStorage.setItem(
        'athletiq-auth',
        JSON.stringify({
            nome: nomeInput ? nomeInput.value : '',
            email: emailInput ? emailInput.value : ''
        })
    );

    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1000);
}


// Verifica se o usuário está logado
document.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.getElementById('auth-nav-btn');
    const heroBtn = document.getElementById('hero-comecar-btn');

    const explorarTecnologiaBtn = document.getElementById(
        'explorar-tecnologia-btn'
    );

    const isLoggedIn = Boolean(
        localStorage.getItem('athletiq-auth')
    );

    // Botão "Começar Agora" da Home
    if (heroBtn) {
        heroBtn.style.display = isLoggedIn ? 'none' : '';
    }

    // Botão "Explorar Tecnologia" da Home
    if (explorarTecnologiaBtn) {
        explorarTecnologiaBtn.style.display = isLoggedIn
            ? ''
            : 'none';
    }

    if (!authBtn || !isLoggedIn) return;

    // Modifica o botão do cabeçalho
    authBtn.textContent = 'Sair da Conta';
    authBtn.setAttribute('href', '#');

    authBtn.addEventListener('click', (event) => {
        event.preventDefault();

        localStorage.removeItem('athletiq-auth');

        location.reload();
    });
});


// Mensagem após o login
function showLoginThanks() {
    let toast = document.querySelector('.login-thanks');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'login-thanks';

        document.body.appendChild(toast);
    }

    toast.textContent = 'Login realizado com sucesso! 🎉';
    toast.classList.add('show');
}


// Menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector(
        '.nav-mobile-toggle'
    );

    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');

        navToggle.setAttribute(
            'aria-expanded',
            String(isOpen)
        );
    });
});