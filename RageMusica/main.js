// Toggle menú hamburguesa
const btnMenu = document.getElementById('btn-menu');
const nav = document.querySelector('nav');

btnMenu?.addEventListener('click', () => {
    nav.classList.toggle('mostrar-menu');
});

// Buscador: prevenir envío y mostrar alerta con texto
const formBuscar = document.getElementById('form-buscar');
const inputBuscar = document.getElementById('input-buscar');

formBuscar?.addEventListener('submit', e => {
    e.preventDefault();
    const termino = inputBuscar.value.trim();
    if (termino) {
        alert(`Buscando álbum: "${termino}"`);
        // Aquí puedes añadir la lógica real para buscar y filtrar álbumes
    }
});
