export default function () {
    const form = document.getElementById('form-avances');
    const lista = document.getElementById('lista-avances');
    const msg = document.getElementById('msg-avances');

    const usuarioId = sessionStorage.getItem('usuarioId');
    if (!usuarioId) {
        lista.innerHTML = '<li>Debe iniciar sesión para ver avances</li>';
        form.style.display = 'none';
        return;
    }

    async function cargarAvances() {
        try {
            const res = await fetch(`http://localhost:3000/avances/${usuarioId}`);
            if (!res.ok) throw new Error('Error al cargar avances');
            const data = await res.json();

            lista.innerHTML = '';
            if (data.length === 0) {
                lista.innerHTML = '<li>No hay avances registrados</li>';
                return;
            }

            data.forEach(({ tema, porcentaje }) => {
                const li = document.createElement('li');
                li.textContent = `${tema}: ${porcentaje}%`;  // <-- Usar template string correctamente
                lista.appendChild(li);
            });
        } catch (error) {
            lista.innerHTML = `<li>${error.message}</li>`;  // <-- También usar template string y comillas
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const tema = formData.get('tema');
        const porcentaje = parseInt(formData.get('porcentaje'), 10);

        try {
            const res = await fetch('http://localhost:3000/avances', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuarioId, tema, porcentaje }),
            });
            if (!res.ok) throw new Error('Error al guardar avance');
            msg.textContent = 'Avance guardado';
            form.reset();
            cargarAvances();
        } catch (error) {
            msg.textContent = error.message;
        }
    });

    cargarAvances();
}
