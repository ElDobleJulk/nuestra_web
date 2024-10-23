
// Asegurarnos de que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
    // Lista de frases
    const frases = [
        "Julián te ama muchiiisiimo.",
        "Las malditas porrongas se han comido mi hamburguesa.",
        "Si somos.",
        "El éxito es la suma de pequeños esfuerzos.",
        "La motivación te impulsa a comenzar.",
        "El único límite para lograr tus sueños eres tú.",
        "Cada día es una nueva oportunidad para mejorar."
    ];
    
    // Seleccionar el elemento de la frase
    const quoteElement = document.getElementById("quote");

    // Función para cambiar la frase
    function cambiarFrase() {
        // Elegir un índice aleatorio del array de frases
        const indiceAleatorio = Math.floor(Math.random() * frases.length);
        // Cambiar el texto del elemento
        quoteElement.textContent = frases[indiceAleatorio];
    }

    // Cambiar la frase cada 10 segundos
    setInterval(cambiarFrase, 10000);
    

    // Definir los meses en orden
    const meses = [
        "octubre2024", "noviembre2024", "diciembre2024", "enero2025", 
        "febrero2025", "marzo2025", "abril2025", "mayo2025", 
        "junio2025", "julio2025", "agosto2025", "septiembre2025", 
        "octubre2025", "noviembre2025", "diciembre2025"
    ];

    // Obtenemos la fecha actual
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate(); // Día del mes actual
    const mesActual = fechaActual.getMonth(); // Mes actual (0 = enero, 1 = febrero, etc.)
    const añoActual = fechaActual.getFullYear(); // Año actual

    // Mostramos en consola para verificar
    console.log("Fecha actual:", fechaActual);
    console.log("Día actual:", diaActual);
    console.log("Mes actual:", mesActual);
    console.log("Año actual:", añoActual);

    // Ajustamos el índice del mes según el año
    let indiceMesActual = -1;
    if (añoActual === 2024 && mesActual >= 9) { // Octubre a diciembre de 2024
        indiceMesActual = mesActual - 9; // Octubre es el mes 9
    } else if (añoActual === 2025) { // Meses de 2025
        indiceMesActual = mesActual + 3; // Enero de 2025 es el cuarto índice
    }

    // Verificamos si el índice se ha calculado correctamente
    console.log("Índice del mes actual:", indiceMesActual);

    // Mostrar solo el mes actual
    function mostrarMes(indice) {
        document.querySelectorAll('.calendario').forEach(calendario => {
            calendario.style.display = 'none'; // Ocultamos todos los calendarios
        });

        const calendarioActual = document.getElementById(meses[indice]);
        calendarioActual.style.display = 'block'; // Mostramos solo el calendario actual
    }

    // Flecha arriba - Mostrar el mes anterior
    document.getElementById("toggle_up").addEventListener("click", function() {
        indiceMesActual = (indiceMesActual - 1 + meses.length) % meses.length; // Decrementar el índice con ciclo
        mostrarMes(indiceMesActual); // Mostrar el mes anterior
    });

    // Flecha abajo - Mostrar el mes siguiente
    document.getElementById("toggle_down").addEventListener("click", function() {
        indiceMesActual = (indiceMesActual + 1) % meses.length; // Incrementar el índice con ciclo
        mostrarMes(indiceMesActual); // Mostrar el mes siguiente
    });

    // Mostrar el mes inicial al cargar la página
    mostrarMes(indiceMesActual);
});

   

