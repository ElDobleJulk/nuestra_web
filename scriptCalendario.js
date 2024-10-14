document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const guardarNota = document.getElementById('guardar-nota');
    const modalDia = document.getElementById('modal-dia');
    const notaText = document.getElementById('nota-text');
    const contextMenu = document.getElementById('context-menu');
    let currentDia;
    let clickTimer;

    const isTouchDevice = 'ontouchstart' in document.documentElement;

    // Función para abrir el modal
    function abrirModal() {
        modalDia.textContent = currentDia;
        notaText.value = localStorage.getItem(`nota-dia-${currentDia}`) || '';
        modal.style.display = 'flex';
    }

    // Función para alternar entre los turnos M (mañana), T (tarde) y vacío
    function toggleTurno(dia) {
        const diaNumero = dia.getAttribute('data-dia');
        let currentTurno = dia.getAttribute('data-turno') || '';

        currentTurno = currentTurno === '' ? 'M' : currentTurno === 'M' ? 'T' : '';
        dia.setAttribute('data-turno', currentTurno);
        localStorage.setItem(`turno-dia-${diaNumero}`, currentTurno);
    }

    // Función para mostrar el menú contextual
    function showContextMenu(e) {
        e.preventDefault(); // Evitar que se abra el menú contextual del navegador
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.display = 'block';
    }

    // Manejo de eventos en los días del calendario
    document.querySelectorAll('.dias_mes p').forEach(dia => {
        // Evento click: alternar turno (Mañana, Tarde, vacío)
        dia.addEventListener('click', (event) => {
            clickTimer = setTimeout(() => {
                toggleTurno(dia);
            }, 200); // Esperamos 200ms para evitar interferencias con doble clic
        });

        // Evento doble clic: abrir el modal para añadir notas (principalmente en pantallas grandes)
        dia.addEventListener('dblclick', () => {
            clearTimeout(clickTimer); // Cancelamos el temporizador del clic simple
            currentDia = dia.getAttribute('data-dia');
            abrirModal();
        });

        // Evento de clic derecho o toque sostenido para mostrar el menú contextual
        dia.addEventListener('contextmenu', (e) => {
            e.preventDefault();  // Evitar que se abra el menú contextual nativo del navegador
            currentDia = dia.getAttribute('data-dia'); // Asegurar que currentDia se asigna correctamente
            showContextMenu(e);
        });

        // Soporte para pantallas táctiles (clic sostenido)
        if (isTouchDevice) {
            dia.addEventListener('touchstart', (e) => {
                clickTimer = setTimeout(() => {
                    currentDia = dia.getAttribute('data-dia'); // Aseguramos que se asigne el día
                    showContextMenu(e.touches[0]); // Usamos el primer toque
                }, 500); // Activamos el menú después de 500ms de toque sostenido
            });

            dia.addEventListener('touchend', () => {
                clearTimeout(clickTimer); // Cancelamos si se suelta antes del tiempo
            });
        }
    });

    // Cierra el modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Guarda la nota en localStorage
    guardarNota.addEventListener('click', () => {
        const nota = notaText.value;
        if (currentDia) {
            localStorage.setItem(`nota-dia-${currentDia}`, nota);
            document.querySelector(`.dias_mes p[data-dia="${currentDia}"]`).setAttribute('data-nota', nota);
            modal.style.display = 'none';
        } else {
            console.error('No se pudo guardar la nota porque currentDia no está definido.');
        }
    });

    // Ocultar el menú contextual si se hace clic fuera
    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });

    // Menú contextual: aplicar o eliminar borde según opción seleccionada o añadir nota
    contextMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const color = e.target.getAttribute('data-color');
            if (color === 'nota') {
                abrirModal(); // Nueva opción: abrir modal para añadir notas
            } else {
                toggleBorderColor(currentDia, color);
            }
            contextMenu.style.display = 'none';
        }
    });

    // Función para alternar (aplicar o eliminar) el borde según la opción seleccionada
    function toggleBorderColor(diaNumero, color) {
        const diaElement = document.querySelector(`.dias_mes p[data-dia="${diaNumero}"]`);
        const colorClasses = ['borde-rojo', 'borde-verde', 'borde-azul'];
        const colorClass = `borde-${color}`;

        // Si el día ya tiene el borde de ese color, lo eliminamos
        if (diaElement.classList.contains(colorClass)) {
            diaElement.classList.remove(colorClass);
            localStorage.removeItem(`borde-dia-${diaNumero}`);
        } else {
            // Eliminar otros bordes si los tiene y aplicar el nuevo
            diaElement.classList.remove(...colorClasses);
            diaElement.classList.add(colorClass);
            localStorage.setItem(`borde-dia-${diaNumero}`, color);
        }
    }

    // Cargar notas guardadas, turnos y bordes al cargar la página
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

        const bordeGuardado = localStorage.getItem(`borde-dia-${diaNumero}`);
        if (bordeGuardado) {
            dia.classList.add(`borde-${bordeGuardado}`);
        }
    });
});
