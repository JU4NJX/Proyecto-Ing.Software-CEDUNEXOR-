document.addEventListener("DOMContentLoaded", () => {
    renderDashboard();
    renderCharts();
    renderTablaJuegos();
    renderResumen();
});

/* =========================
   OBTENER DATOS
========================= */

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function obtenerCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/* =========================
   CALCULAR ESTADÍSTICAS REALES
========================= */

function calcularStats() {

    const usuarios = obtenerUsuarios();
    const cart = obtenerCart();

    let totalUsuarios = usuarios.length;
    let totalPuntos = 0;
    let totalJuegos = 0;
    let totalEstudiantes = 0;

    usuarios.forEach(u => {
        totalPuntos += u.puntos || 0;
        totalJuegos += u.juegosJugados || 0;
        totalEstudiantes += u.estudiantesAyudados || 0;
    });

    let productosDonados = 0;
    cart.forEach(item => {
        productosDonados += item.quantity || 0;
    });

    return {
        totalUsuarios,
        totalPuntos,
        totalJuegos,
        totalEstudiantes,
        productosDonados
    };
}

/* =========================
   RENDER DASHBOARD
========================= */

function renderDashboard() {

    const stats = calcularStats();

    // ===== ESTADÍSTICAS PRINCIPALES =====
    const users = document.getElementById("usersCount");
    const games = document.getElementById("gamesCount");
    const points = document.getElementById("pointsCount");
    const students = document.getElementById("studentsCount");

    if (users) users.textContent = stats.totalUsuarios;
    if (games) games.textContent = stats.totalJuegos;
    if (points) points.textContent = stats.totalPuntos;
    if (students) students.textContent = stats.totalEstudiantes;

    // ===== IMPACTO (CARD INFERIOR) =====
    const impactStudents = document.getElementById("impactStudents");
    const impactProducts = document.getElementById("impactProducts");

    if (impactStudents) impactStudents.textContent = stats.totalEstudiantes;
    if (impactProducts) impactProducts.textContent = stats.productosDonados;
}
/* =========================
   TABLAS DINÁMICAS
========================= */

function renderTablaJuegos() {

    const usuarios = obtenerUsuarios();

    let totalJugadas = 0;
    let totalPuntos = 0;

    usuarios.forEach(u => {
        totalJugadas += u.juegosJugados || 0;
        totalPuntos += u.puntos || 0;
    });

    const tbody = document.querySelector("table tbody");

    if (!tbody) return;

    tbody.innerHTML = `
        <tr>
            <td>Desafío Matemático</td>
            <td>${totalJugadas.toLocaleString()}</td>
            <td class="yellow">${totalPuntos.toLocaleString()}</td>
            <td>${(Math.random() * 5 + 5).toFixed(1)} min</td>
        </tr>
    `;
}

function renderResumen() {

    const stats = calcularStats();

    const products = document.getElementById("sumProducts");
    const students = document.getElementById("sumStudents");
    const points = document.getElementById("sumPoints");
    const users = document.getElementById("sumUsers");

    if (products) products.textContent = stats.productosDonados;
    if (students) students.textContent = stats.totalEstudiantes;
    if (points) points.textContent = stats.totalPuntos.toLocaleString();
    if (users) users.textContent = stats.totalUsuarios;
}


/* =========================
   GRÁFICAS DINÁMICAS
========================= */

function renderCharts() {

    const stats = calcularStats();

    /* ===== GRÁFICA BARRAS ===== */
    const pointsChart = document.getElementById('pointsChart');

    if (pointsChart) {
        new Chart(pointsChart, {
            type: 'bar',
            data: {
                labels: ['Usuarios', 'Juegos', 'Puntos', 'Estudiantes'],
                datasets: [{
                    label: 'Estadísticas reales',
                    data: [
                        stats.totalUsuarios,
                        stats.totalJuegos,
                        stats.totalPuntos,
                        stats.totalEstudiantes
                    ],
                    backgroundColor: '#2169FF',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    /* ===== GRÁFICA LINEAL ===== */
    const activityChart = document.getElementById('activityChart');

    if (activityChart) {
        new Chart(activityChart, {
            type: 'line',
            data: {
                labels: ['Usuarios', 'Juegos', 'Puntos', 'Estudiantes'],
                datasets: [{
                    label: 'Actividad del sistema',
                    data: [
                        stats.totalUsuarios,
                        stats.totalJuegos,
                        stats.totalPuntos,
                        stats.totalEstudiantes
                    ],
                    borderColor: '#8B5CF6',
                    backgroundColor: 'rgba(139,92,246,0.15)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    /* ===== GRÁFICA PIE ===== */
    const categoryChart = document.getElementById('categoryChart');

    if (categoryChart) {
        new Chart(categoryChart, {
            type: 'pie',
            data: {
                labels: ['Usuarios', 'Juegos', 'Puntos', 'Estudiantes'],
                datasets: [{
                    data: [
                        stats.totalUsuarios,
                        stats.totalJuegos,
                        stats.totalPuntos,
                        stats.totalEstudiantes
                    ],
                    backgroundColor: [
                        '#2169FF',
                        '#8B5CF6',
                        '#22C55E',
                        '#F59E0B'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}