// Mostra o nome do usuário, link para página inicial e botão de sair
window.addEventListener("DOMContentLoaded", function() {
  const nome = localStorage.getItem("username") || "Usuário";
  const nomeEl = document.querySelector(".bem-vindo h2:nth-child(2)");
  if (nomeEl) nomeEl.textContent = nome + "!";

  // Adiciona links abaixo do nome
  const divBemVindo = document.querySelector(".bem-vindo");
  if (divBemVindo) {
    const links = document.getElementById("links");
  }

  // Botão sair remove token e nome
  document.querySelector("#logout-link")?.addEventListener("click", function(e) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  });

  // Botão sair antigo também faz logout
  document.querySelector(".sair")?.addEventListener("click", function() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "../login/index.html";
  });
});
