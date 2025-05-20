export default async function() {
    const cont = document.getElementById('estadisticas-content');
    try {
        const res = await fetch('https://pruebamicroservices.onrender.com/estadisticas');
        if (!res.ok) throw new Error('Error al obtener estadísticas');
        const data = await res.json();

        cont.innerHTML = `
            <p>Total de jugadores registrados: ${data.totalJugadores}</p>
            <p>Mayor puntaje registrado: ${data.mayorPuntaje}</p>
            <p>Promedio de puntajes: ${data.promedioPuntajes}</p>
        `;
    } catch (error) {
        cont.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
