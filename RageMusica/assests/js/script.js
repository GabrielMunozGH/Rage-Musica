function cambioImagen() {
  let index = 0;
  const fondos = [
    "img/disco_1.jpg",
    "img/disco 2.jpg",
    "img/disco 3.jpg"
  ];

  const fondoElemento = document.querySelector(".detras");

  setInterval(() => {
    index = (index + 1) % fondos.length;
    fondoElemento.src = fondos[index];
  }, 2000);
}
window.onload = cambioImagen;



function abrirModal(tipo) {
    const titulo = document.getElementById('modalTitulo');
    const contenido = document.getElementById('modalContenido');
    const esRegistro = tipo === 'registro';
    const formId = esRegistro ? 'formRegistro' : 'formLogin';

    titulo.textContent = esRegistro ? 'Registro' : 'Iniciar Sesión';

    let campos = '';

    if (esRegistro) {
        campos += `
            <div class="mb-3">
                <label class="form-label">Nombre</label>
                <input type="text" class="form-control" name="nombre" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" name="email" required>
            </div>
        `;
    } else {
        campos += `
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" name="usuario" required>
            </div>
        `;
    }

    campos += `
        <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input type="password" class="form-control" name="password" required>
        </div>
        <div id="mensajeError" class="text-danger mb-2"></div>
        <button type="submit" class="btn btn-${esRegistro ? 'success' : 'primary'}">
            ${esRegistro ? 'Registrarse' : 'Entrar'}
        </button>
    `;

    contenido.innerHTML = `<form id="${formId}">${campos}</form>`;

    const modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.show();

    document.getElementById(formId).addEventListener('submit', function (e) {
        e.preventDefault();

        const form = e.target;
        const errorDiv = document.getElementById('mensajeError');
        errorDiv.textContent = '';

        const password = form.password.value.trim();

        if (!password) {
            errorDiv.textContent = 'La contraseña es obligatoria.';
            return;
        }

        if (password.length < 8) {
            errorDiv.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            return;
        }

        if (esRegistro) {
            const nombre = form.nombre.value.trim();
            const email = form.email.value.trim();

            if (!nombre || !email) {
                errorDiv.textContent = 'Todos los campos son obligatorios.';
                return;
            }

            const nuevoUsuario = {
                nombre: nombre,
                email: email,
                password: password
            };

            localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
            alert('Registro exitoso');
            modal.hide();
        } else {
            const email = form.usuario.value.trim();
            const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));

            if (!email || !usuarioGuardado || email !== usuarioGuardado.email || password !== usuarioGuardado.password) {
                errorDiv.textContent = 'Email o contraseña incorrectos.';
                return;
            }

            alert('Inicio de sesión exitoso');
            modal.hide();
        }
    });
}
