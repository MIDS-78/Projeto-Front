document.addEventListener("DOMContentLoaded", () => {
    const basePath = window.location.pathname.includes("/pages/") ? "../../" : "./";

    // HEAD
    fetch(`${basePath}components/head.html`)
        .then(res => res.text())
        .then(data => document.head.insertAdjacentHTML("beforeend", data));

    // HEADER
    const headerContainer = document.querySelector("#header-container");
    if (headerContainer) {
        fetch(`${basePath}components/header.html`)
            .then(res => res.text())
            .then(data => headerContainer.innerHTML = data);
    }

    // FOOTER
    const footerContainer = document.querySelector("#footer-container");
    if (footerContainer) {
        fetch(`${basePath}components/footer.html`)
            .then(res => res.text())
            .then(data => footerContainer.innerHTML = data);
    }
});
