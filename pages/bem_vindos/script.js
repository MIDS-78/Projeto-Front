// Mostra o nome do usuário, link para página inicial e botão de sair
window.addEventListener("DOMContentLoaded", function() {
  const nome = localStorage.getItem("nome_usuario") || "Usuário";
  const nomeEl = document.querySelector(".bem-vindo h1:nth-child(2)");
  if (nomeEl) nomeEl.textContent = nome + "!";

  // Adiciona links abaixo do nome
  const divBemVindo = document.querySelector(".bem-vindo");
  if (divBemVindo) {
    const links = document.getElementById("links");
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
