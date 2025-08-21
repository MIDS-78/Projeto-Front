// Mostra o nome do usuário, link para página inicial e botão de sair
window.addEventListener("DOMContentLoaded", function() {
  const nome = localStorage.getItem("nome_usuario") || "Usuário";
  const email = localStorage.getItem("email_usuario") || "aluno@gmail.com";
  const nomeEl = document.querySelector(".nome-email h1");
  const emailEl = document.querySelector(".nome-email p");
  if (nomeEl) nomeEl.textContent = nome;
  if (emailEl) emailEl.textContent = email;
});
