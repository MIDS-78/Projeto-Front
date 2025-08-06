document.addEventListener("DOMContentLoaded", () => {
    // Detecta se está dentro de /pages/
    const isPaginaInterna = window.location.pathname.includes("/pages/");
    
    // Calcula caminho relativo (../ ou ../../) com base no nível da pasta
    const depth = window.location.pathname.split("/").length - 2;
    const basePath = "../".repeat(depth);

    // Função genérica pra carregar componentes
    function loadComponent(selector, filePath, insertAt = "innerHTML") {
        const container = selector ? document.querySelector(selector) : null;

        fetch(`${basePath}${filePath}`)
            .then(res => res.text())
            .then(data => {
                if (insertAt === "head") {
                    document.head.insertAdjacentHTML("beforeend", data);
                } else if (container) {
                    container.innerHTML = data;
                }
            })
            .catch(err => console.error(`Erro ao carregar ${filePath}:`, err));
    }

    // HEAD - carrega o head certo
    const headFile = isPaginaInterna ? "head-telas.html" : "head-inicial.html";
    loadComponent(null, `components/${headFile}`, "head");

    // HEADERS
    loadComponent("#header-container-inicial", "components/header-inicial.html");
    loadComponent("#header-container-telas", "components/header-telas.html");

    // FOOTER
    loadComponent("#footer-container", "components/footer.html");
});
