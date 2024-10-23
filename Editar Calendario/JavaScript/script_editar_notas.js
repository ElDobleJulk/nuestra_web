document.addEventListener('DOMContentLoaded', function() {
    // Abrir el modal
    document.getElementById('addNoteButton').addEventListener('click', function() {
        document.getElementById('noteModal').style.display = 'flex';
    });

    // Cerrar el modal
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('noteModal').style.display = 'none';
    });

    // Añadir la nota al día correspondiente
    document.getElementById('noteForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const noteText = document.getElementById('noteText').value;
        const noteDate = new Date(document.getElementById('noteDate').value); // Convertir la fecha a formato de Date
        const noteColor = document.getElementById('noteColor').value;

        const day = noteDate.getDate(); // Obtener el número del día (1-31)
        
        // Buscar el día correspondiente en el calendario
        const dayElement = document.querySelector(`.dia[data-dia="${day}"]`);

        if (dayElement) {
            // Crear un elemento de nota
            const noteElement = document.createElement('div');
            noteElement.classList.add('nota');
            noteElement.style.backgroundColor = noteColor;
            noteElement.textContent = noteText;

            // Añadir la nota al contenedor de notas
            dayElement.querySelector('.notas').appendChild(noteElement);
        } else {
            console.log("No se encontró el día en el calendario.");
        }

        // Limpiar el formulario y cerrar el modal
        document.getElementById('noteForm').reset();
        document.getElementById('noteModal').style.display = 'none';
    });
});
