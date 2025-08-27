document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioCadastro');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const titulo = document.getElementById('titulo');
    const imagem = document.getElementById('imagem');
    const tipoInformativo = document.getElementById('tipoInformativo');
    const destinatarios = document.getElementById('destinatarios');
    const fileName = document.getElementById('fileName');
    const imagemLabel = document.getElementById('imagemLabel');

    imagemLabel.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            imagem.click();
        }
    });
    imagemLabel.setAttribute('tabindex', '0');

    imagem.addEventListener('change', function () {
        if (imagem.files.length > 0) {
            fileName.textContent = imagem.files[0].name;
        } else {
            fileName.textContent = '';
        }
        validarCampos();
    });

    function validarCampos() {
        const tituloValido = titulo.value.trim() !== '';
        // imagem é opcional agora
        const tipoValido = tipoInformativo.value !== '' && tipoInformativo.selectedIndex !== 0;
        const destinatarioValido = destinatarios.value !== '' && destinatarios.selectedIndex !== 0;
        if (tituloValido && tipoValido && destinatarioValido) {
            btnCadastrar.disabled = false;
        } else {
            btnCadastrar.disabled = true;
        }
    }

    titulo.addEventListener('input', validarCampos);
    tipoInformativo.addEventListener('change', validarCampos);
    destinatarios.addEventListener('change', validarCampos);

    validarCampos();

    form.addEventListener('submit', function(e) {
        validarCampos();
        if (btnCadastrar.disabled) {
            e.preventDefault();
        }
    });
});