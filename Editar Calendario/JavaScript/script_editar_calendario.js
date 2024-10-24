// Ejecutar la función para mostrar el mes actual al cargar la página 
document.addEventListener("DOMContentLoaded", function() {
    // Obtenemos la fecha actual
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // Devuelve el mes actual (0 es Enero, 11 es Diciembre)
    const yearActual = fechaActual.getFullYear(); // Año actual

    // Array con los nombres de los meses en español (puedes hacerlo dinámico si lo necesitas)
    const meses = [
      "enero2024", "febrero2024", "marzo2024", "abril2024", "mayo2024", "junio2024",
      "julio2024", "agosto2024", "septiembre2024", "octubre2024", "noviembre2024", "diciembre2024",
      "enero2025", "febrero2025", "marzo2025", "abril2025", "mayo2025", "junio2025",
      "julio2025", "agosto2025", "septiembre2025", "octubre2025", "noviembre2025", "diciembre2025"
    ];

    let mesVisible = mesActual + (yearActual - 2024) * 12; // Inicializamos en el mes actual

    // Función para ocultar todos los meses
    function ocultarTodosLosMeses() {
        meses.forEach(function (mesId) {
            const mes = document.getElementById(mesId);
            if (mes) mes.style.display = "none";
        });
    }

    // Función para mostrar un mes específico
    function mostrarMes(mesIndex) {
        ocultarTodosLosMeses();
        const idMes = meses[mesIndex];
        const mesElement = document.getElementById(idMes);
        if (mesElement) {
            mesElement.style.display = "block";
        }
    }

    // Función para cambiar de mes al hacer click en las flechas
    function cambiarMes(direccion) {
        const maxMeses = meses.length - 1;
        if (direccion === 'subir' && mesVisible > 0) {
            mesVisible--;
        } else if (direccion === 'bajar' && mesVisible < maxMeses) {
            mesVisible++;
        }
        mostrarMes(mesVisible);
    }

    // Seleccionar los elementos de las flechas
    const upIcon = document.querySelector(".up-icon");
    const downIcon = document.querySelector(".down-icon");

    // Verificar si se encuentran las flechas antes de añadir los eventos
    if (upIcon && downIcon) {
        upIcon.addEventListener("click", function() {
            cambiarMes('subir');
        });

        downIcon.addEventListener("click", function() {
            cambiarMes('bajar');
        });
    } else {
        console.error("No se encontraron las flechas de navegación");
    }

    // Mostrar el mes actual al cargar la página
    mostrarMes(mesVisible);
});
