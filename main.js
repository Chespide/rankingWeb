const app = document.getElementById('app');
const navButtons = document.querySelectorAll('nav button');

// Función para cargar una vista
async function loadView(route) {
    try {
        const res = await fetch(`views/${route}.html`);
        if (!res.ok) throw new Error('Vista no encontrada');
        const html = await res.text();
        app.innerHTML = html;
        ejecutarScriptPorVista(route);
    } catch (error) {
        app.innerHTML = `<p>Error al cargar la vista: ${error.message}</p>`;
    }
}

// Asociar evento click a cada botón de navegación
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const route = btn.getAttribute('data-route');
        loadView(route);
        history.pushState({ route }, '', `#${route}`);
    });
});

// Cargar vista inicial según URL
window.addEventListener('DOMContentLoaded', () => {
    const route = location.hash.replace('#', '') || 'home';
    loadView(route);
});

// Soportar navegación con botones del navegador (atrás/adelante)
window.addEventListener('popstate', (e) => {
    const route = e.state?.route || 'home';
    loadView(route);
});

// Scripts específicos por vista
function ejecutarScriptPorVista(route) {
    switch (route) {
        case 'ranking':
            import('./scripts/ranking.js').then(m => m.default()).catch(console.error);
            break;
        case 'agregar':
            import('./scripts/agregar.js').then(m => m.default()).catch(console.error);
            break;
        case 'login':
            import('./scripts/login.js').then(m => m.default()).catch(console.error);
            break;
        case 'registro':
            import('./scripts/registro.js').then(m => m.default()).catch(console.error);
            break;
        case 'avances':
            import('./scripts/avances.js').then(m => m.default()).catch(console.error);
            break;
        case 'estadisticas':
            import('./scripts/estadisticas.js').then(m => m.default()).catch(console.error);
            break;
        // Home no necesita script
    }
}
