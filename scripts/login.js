export default function() {
    const form = document.getElementById('form-login');
    const msg = document.getElementById('msg-login');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const correo = formData.get('correo');
        const contraseña = formData.get('contraseña');

        try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, contraseña }),
            });
            if (!res.ok) throw new Error('Credenciales incorrectas');
            const data = await res.json();
            msg.textContent = `Bienvenido, ${data.nombre}`;
            sessionStorage.setItem('usuarioId', data.usuarioId);
            sessionStorage.setItem('nombre', data.nombre);
        } catch (error) {
            msg.textContent = error.message;
        }
    });
}
