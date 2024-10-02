// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('miModal');
    const buttons = document.querySelectorAll('.modificar-btn');
    const closeButton = document.getElementById('cerrarModal');

    // Función para abrir el modal
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            modal.style.display = 'flex'; // Mostrar el modal
        });
    });

    // Función para cerrar el modal
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none'; // Ocultar el modal
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
