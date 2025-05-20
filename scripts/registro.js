export default function() {
    const form = document.getElementById('form-registro');
    const msg = document.getElementById('msg-registro');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const nombre = formData.get('nombre');
        const correo = formData.get('correo');
        const contraseña = formData.get('contraseña');

        try {
            const res = await fetch('https://pruebamicroservices.onrender.com/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, correo, contraseña }),
            });
            if (!res.ok) throw new Error('Error en el registro');
            const data = await res.json();
            msg.textContent = data.mensaje || 'Usuario creado';
            form.reset();
        } catch (error) {
            msg.textContent = error.message;
        }
    });
}
