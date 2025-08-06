document.addEventListener("DOMContentLoaded", () => {
    const basePath = window.location.pathname.includes("/pages/") ? "../../" : "./";

    // HEAD
    fetch(`${basePath}components/head.html`)
        .then(res => res.text())
        .then(data => document.head.insertAdjacentHTML("beforeend", data));

    // HEADER
    const headerContainerInicial = document.querySelector("#header-container-inicial");
    if (headerContainerInicial) {
        fetch(`${basePath}components/header-inicial.html`)
            .then(res => res.text())
            .then(data => headerContainerInicial.innerHTML = data);
    }

    const headerContainerTelas = document.querySelector("#header-container-telas");
    if (headerContainerTelas) {
        fetch(`${basePath}components/header-telas.html`)
            .then(res => res.text())
            .then(data => headerContainerTelas.innerHTML = data);
    }

    // FOOTER
    const footerContainer = document.querySelector("#footer-container");
    if (footerContainer) {
        fetch(`${basePath}components/footer.html`)
            .then(res => res.text())
            .then(data => footerContainer.innerHTML = data);
    }
});
