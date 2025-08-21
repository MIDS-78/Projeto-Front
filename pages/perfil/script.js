// Mostra o nome do usuário, link para página inicial e botão de sair
window.addEventListener("DOMContentLoaded", function() {
  const nome = localStorage.getItem("username") || "Usuário";
  const emailEl = document.querySelector(".nome-email h1");
  const nomeEl = document.querySelector(".nome-email p");
  if (nomeEl) nomeEl.textContent = nome;
  if (emailEl) emailEl.textContent = nome;

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
