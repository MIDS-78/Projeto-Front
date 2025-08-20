// Mostra o nome do usuário, link para página inicial e botão de sair
window.addEventListener("DOMContentLoaded", function() {
  const nome = localStorage.getItem("nome_usuario") || "Usuário";
  const nomeEl = document.querySelector(".bem-vindo h1:nth-child(2)");
  if (nomeEl) nomeEl.textContent = nome + "!";

  // Adiciona links abaixo do nome
  const divBemVindo = document.querySelector(".bem-vindo");
  if (divBemVindo) {
    const linksDiv = document.createElement("div");
    linksDiv.style.marginTop = "2rem";
    linksDiv.innerHTML = `
      <a href="../../index.html" style="color:#005691; font-weight:600; margin-right:2rem; text-decoration:none; font-size:18px;">Página Inicial</a>
      <a href="../login/index.html" id="logout-link" style="color:#005691; font-weight:600; text-decoration:none; font-size:18px;">Sair</a>
    `;
    divBemVindo.appendChild(linksDiv);
  }

  // Botão sair remove token e nome
  document.querySelector("#logout-link")?.addEventListener("click", function(e) {
    localStorage.removeItem("token");
    localStorage.removeItem("nome_usuario");
  });

  // Botão sair antigo também faz logout
  document.querySelector(".sair")?.addEventListener("click", function() {
    localStorage.removeItem("token");
    localStorage.removeItem("nome_usuario");
    window.location.href = "../login/index.html";
  });
});
