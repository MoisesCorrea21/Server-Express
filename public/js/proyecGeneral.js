document.addEventListener('DOMContentLoaded', function() {
    localStorage.removeItem('patient');

    var dropdownButton = document.getElementById('dropdownMenuButton');
    var dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownButton.addEventListener('click', function() {
      dropdownMenu.classList.toggle('show');
    });
  });