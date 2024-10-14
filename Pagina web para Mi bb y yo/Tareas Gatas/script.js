document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskItems = document.getElementById('task-items');
    const calendar = document.getElementById('calendar');

    // Función para agregar una tarea
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const description = document.getElementById('task-description').value;
        const date = document.getElementById('task-date').value;

        // Crear una nueva tarea
        const taskItem = document.createElement('li');
        taskItem.textContent = `${description} - ${date}`;
        taskItems.appendChild(taskItem);

        // Lógica para actualizar el calendario
        // Aquí podrías usar una librería de calendario para agregar la tarea a la fecha seleccionada.

        // Limpiar el formulario
        taskForm.reset();
    });
});
