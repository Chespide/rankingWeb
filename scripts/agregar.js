export default function() {
    const form = document.getElementById('form-agregar');
    const msg = document.getElementById('msg');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const jugador = formData.get('jugador');
        const puntaje = parseInt(formData.get('puntaje'), 10);

        try {
            const res = await fetch('http://localhost:3000/ranking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jugador, puntaje }),
            });
            if (!res.ok) throw new Error('Error al agregar puntaje');
            const data = await res.json();
            msg.textContent = data.mensaje || 'Puntaje agregado';
            form.reset();
        } catch (error) {
            msg.textContent = error.message;
        }
    });
}
