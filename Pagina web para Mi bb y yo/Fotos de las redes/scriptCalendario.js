// script.js

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const guardarNota = document.getElementById('guardar-nota');
    const modalDia = document.getElementById('modal-dia');
    const notaText = document.getElementById('nota-text');
    let currentDia;

    // Abre el modal cuando se hace clic en un día
    document.querySelectorAll('.dias_mes p').forEach(dia => {
        dia.addEventListener('click', (event) => {
            const isDoubleClick = event.detail === 2; // Doble clic abre el modal de notas

            currentDia = dia.getAttribute('data-dia');
            if (isDoubleClick) {
                modalDia.textContent = currentDia;
                notaText.value = localStorage.getItem(`nota-dia-${currentDia}`) || '';
                modal.style.display = 'flex';
            } else {
                toggleTurno(dia);
            }
        });
    });

    // Cierra el modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Guarda la nota en localStorage
    guardarNota.addEventListener('click', () => {
        const nota = notaText.value;
        localStorage.setItem(`nota-dia-${currentDia}`, nota);
        document.querySelector(`.dias_mes p[data-dia="${currentDia}"]`).setAttribute('data-nota', nota);
        modal.style.display = 'none';
    });

    // Cargar notas guardadas y turnos al cargar la página
    document.querySelectorAll('.dias_mes p').forEach(dia => {
        const diaNumero = dia.getAttribute('data-dia');

        const notaGuardada = localStorage.getItem(`nota-dia-${diaNumero}`);
        if (notaGuardada) {
            dia.setAttribute('data-nota', notaGuardada);
        }

        const turnoGuardado = localStorage.getItem(`turno-dia-${diaNumero}`);
        if (turnoGuardado) {
            dia.setAttribute('data-turno', turnoGuardado);
        }
    });

    // Función para alternar entre los turnos M (mañana), T (tarde) y vacío
    function toggleTurno(dia) {
        const diaNumero = dia.getAttribute('data-dia');
        let currentTurno = dia.getAttribute('data-turno') || '';

        if (currentTurno === '') {
            currentTurno = 'M';
        } else if (currentTurno === 'M') {
            currentTurno = 'T';
        } else {
            currentTurno = '';
        }

        dia.setAttribute('data-turno', currentTurno);
        localStorage.setItem(`turno-dia-${diaNumero}`, currentTurno);
    }
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const guardarNota = document.getElementById('guardar-nota');
    const modalDia = document.getElementById('modal-dia');
    const notaText = document.getElementById('nota-text');
    const contextMenu = document.getElementById('context-menu');
    let currentDia;

    // Abre el modal cuando se hace doble clic en un día
    document.querySelectorAll('.dias_mes p').forEach(dia => {
        dia.addEventListener('dblclick', () => {
            currentDia = dia.getAttribute('data-dia');
            modalDia.textContent = currentDia;
            notaText.value = localStorage.getItem(`nota-dia-${currentDia}`) || '';
            modal.style.display = 'flex';
        });

        // Abrir menú contextual con clic derecho o mantener clic
        dia.addEventListener('contextmenu', (e) => {
            e.preventDefault();  // Evitar el menú contextual del navegador
            currentDia = dia;
            showContextMenu(e);
        });
    });

    // Cierra el modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Guarda la nota en localStorage
    guardarNota.addEventListener('click', () => {
        const nota = notaText.value;
        localStorage.setItem(`nota-dia-${currentDia}`, nota);
        document.querySelector(`.dias_mes p[data-dia="${currentDia}"]`).setAttribute('data-nota', nota);
        modal.style.display = 'none';
    });

    // Menú contextual: aplicar o eliminar borde según opción seleccionada
    contextMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const color = e.target.getAttribute('data-color');
            toggleBorderColor(currentDia, color);
            contextMenu.style.display = 'none';
        }
    });

    // Ocultar el menú contextual si se hace clic fuera
    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });

    // Función para mostrar el menú contextual
    function showContextMenu(e) {
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.display = 'block';
    }

    // Función para alternar (aplicar o eliminar) el borde según la opción seleccionada
    function toggleBorderColor(dia, color) {
        const diaNumero = dia.getAttribute('data-dia');
        let colorClass;

        // Definir la clase del borde según el color seleccionado
        if (color === 'rojo') {
            colorClass = 'borde-rojo';
        } else if (color === 'verde') {
            colorClass = 'borde-verde';
        } else if (color === 'azul') {
            colorClass = 'borde-azul';
        }

        // Si el día ya tiene el borde de ese color, lo eliminamos
        if (dia.classList.contains(colorClass)) {
            dia.classList.remove(colorClass);
            localStorage.removeItem(`borde-dia-${diaNumero}`);  // Eliminar de localStorage
        } else {
            // Eliminar otros bordes si los tiene y aplicar el nuevo
            dia.classList.remove('borde-rojo', 'borde-verde', 'borde-azul');
            dia.classList.add(colorClass);
            localStorage.setItem(`borde-dia-${diaNumero}`, color);  // Guardar en localStorage
        }
    }

    // Cargar bordes guardados al cargar la página
    document.querySelectorAll('.dias_mes p').forEach(dia => {
        const diaNumero = dia.getAttribute('data-dia');
        const bordeGuardado = localStorage.getItem(`borde-dia-${diaNumero}`);

        if (bordeGuardado === 'rojo') {
            dia.classList.add('borde-rojo');
        } else if (bordeGuardado === 'verde') {
            dia.classList.add('borde-verde');
        } else if (bordeGuardado === 'azul') {
            dia.classList.add('borde-azul');
        }
    });
});
