// botao mudar tema claro/escuro/coffee
(function () {
        const themes = ['light', 'dark'];
        const themeClassMap = {
            light: 'light-mode',
            dark: 'dark-mode',
        };
    const body = document.body;

    // load saved index (string) -> int
    let currentThemeIndex = localStorage.getItem('savedThemeIndex');
    if (currentThemeIndex === null) currentThemeIndex = 0;
    else currentThemeIndex = parseInt(currentThemeIndex, 10) || 0;

    function applyTheme(themeName) {
            Object.values(themeClassMap).forEach(c => body.classList.remove(c));
            const cls = themeClassMap[themeName] || null;
            if (cls) body.classList.add(cls);

        localStorage.setItem('savedThemeIndex', currentThemeIndex);
    }

    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(themes[currentThemeIndex]);

        const btn = document.getElementById('btn-theme-toggle');
        if (!btn) {
            console.warn('Theme toggle button not found: #btn-theme-toggle');
            return;s
        }

        btn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            applyTheme(themes[currentThemeIndex]);
        });
    });
})();

