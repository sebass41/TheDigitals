
  document.addEventListener("DOMContentLoaded", function() {
      const menuItems = document.querySelectorAll('.menu-item');
      const loginMenu = document.getElementById('menu-login');

      if (localStorage.getItem("idSesion")!==null) {
          // Si el usuario está logueado, mostrar las otras opciones y ocultar "Iniciar Sesión"
          menuItems.forEach(item => item.style.display = 'block');
          loginMenu.style.display = 'none';
      } else {
          // Si no está logueado, mostrar solo "Iniciar Sesión"
          menuItems.forEach(item => item.style.display = 'none');
          loginMenu.style.display = 'block';
      }
  });