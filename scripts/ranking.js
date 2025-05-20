export default async function() {
    const tbody = document.querySelector('#ranking-table tbody');
    tbody.innerHTML = 'Cargando...';

    try {
        const res = await fetch('https://pruebamicroservices.onrender.com/ranking');
        if (!res.ok) throw new Error('Error al obtener ranking');
        const data = await res.json();

        tbody.innerHTML = '';
        data.forEach(({ jugador, puntaje }, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${index + 1}</td><td>${jugador}</td><td>${puntaje}</td>`;
            tbody.appendChild(tr);
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="3">Error: ${error.message}</td></tr>`;
    }
}
