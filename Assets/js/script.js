(function () {
    const themes = ['coffee', 'cyberpunk'];
    const storageKey = 'portfolioTheme';
    const body = document.body;

    let currentTheme = localStorage.getItem(storageKey);
    if (currentTheme === 'cafe') {
        currentTheme = 'coffee';
    }
    if (!themes.includes(currentTheme)) {
        currentTheme = 'coffee';
    }

    document.addEventListener('DOMContentLoaded', () => {
        const themeButton = document.getElementById('btn-theme-toggle');
        const themeMenu = document.getElementById('theme-menu');

        if (!themeButton || !themeMenu) {
            console.warn('Theme controls not found: #btn-theme-toggle or #theme-menu');
            return;
        }

        const themeOptions = Array.from(themeMenu.querySelectorAll('[data-theme-option]'));

        function setMenuOpen(isOpen) {
            themeMenu.hidden = !isOpen;
            themeButton.setAttribute('aria-expanded', String(isOpen));
        }

        function syncActiveTheme(themeName) {
            themeOptions.forEach((option) => {
                const isActive = option.dataset.themeOption === themeName;
                option.classList.toggle('is-active', isActive);
                option.setAttribute('aria-pressed', String(isActive));
            });
        }

        function applyTheme(themeName) {
            const nextTheme = themes.includes(themeName) ? themeName : 'coffee';
            currentTheme = nextTheme;
            body.dataset.theme = nextTheme;
            localStorage.setItem(storageKey, nextTheme);
            syncActiveTheme(nextTheme);
        }

        applyTheme(currentTheme);
        setMenuOpen(false);

        themeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            setMenuOpen(themeMenu.hidden);
        });

        themeMenu.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        themeOptions.forEach((option) => {
            option.addEventListener('click', () => {
                applyTheme(option.dataset.themeOption);
                setMenuOpen(false);
            });
        });

        document.addEventListener('click', (event) => {
            if (!themeMenu.hidden && !themeMenu.contains(event.target) && !themeButton.contains(event.target)) {
                setMenuOpen(false);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        });
    });
})();

