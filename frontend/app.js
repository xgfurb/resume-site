(function () {
    var toggle = document.getElementById('theme-toggle');
    var label  = document.getElementById('theme-label');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        label.textContent = theme === 'dark' ? 'LIGHT' : 'DARK';
    }

    applyTheme(localStorage.getItem('theme') || 'dark');

    toggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });
})();
