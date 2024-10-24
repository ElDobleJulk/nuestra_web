document.addEventListener('DOMContentLoaded', function() {
    const dias = document.querySelectorAll('.dia');
    
    // Añadir evento a cada día del calendario
    dias.forEach(dia => {
      dia.addEventListener('click', function() {
        toggleTurno(this);
      });
    });
    
    // Función para cambiar entre M/T al hacer clic
    function toggleTurno(diaElement) {
      const turno = diaElement.querySelector('.turno');
      let currentTurno = turno.textContent;
  
      // Cambiar entre M/T y aplicar el color correspondiente
      if (currentTurno === "") {
        turno.textContent = "M";
        turno.style.backgroundColor = ""; // Color para M
      } else if (currentTurno === "M") {
        turno.textContent = "T";
        turno.style.backgroundColor = ""; // Color para T
      } else {
        turno.textContent = "";
        turno.style.backgroundColor = ""; // Sin turno
      }
      
      // Guardar el turno en el almacenamiento local (localStorage)
      const diaId = diaElement.getAttribute('data-dia');
      const mesId = diaElement.closest('.calendario').id;
      guardarTurno(mesId, diaId, turno.textContent);
    }
  
    // Función para guardar el turno de un día en localStorage
    function guardarTurno(mesId, diaId, turno) {
      let turnos = JSON.parse(localStorage.getItem('turnos')) || {};
      
      // Guardar el turno para el mes y día específico
      if (!turnos[mesId]) {
        turnos[mesId] = {};
      }
      
      turnos[mesId][diaId] = turno;
      localStorage.setItem('turnos', JSON.stringify(turnos));
    }
  
    // Función para cargar los turnos desde localStorage
    function cargarTurnos() {
      const turnos = JSON.parse(localStorage.getItem('turnos')) || {};
  
      dias.forEach(dia => {
        const diaId = dia.getAttribute('data-dia');
        const mesId = dia.closest('.calendario').id;
  
        if (turnos[mesId] && turnos[mesId][diaId]) {
          const turno = turnos[mesId][diaId];
          const turnoElement = dia.querySelector('.turno');
          turnoElement.textContent = turno;
  
          // Aplicar color según el turno
          if (turno === "M") {
            turnoElement.style.backgroundColor = ""; // Color para M
          } else if (turno === "T") {
            turnoElement.style.backgroundColor = ""; // Color para T
          }
        }
      });
    }
  
    // Cargar los turnos al iniciar la página
    cargarTurnos();
  });
  