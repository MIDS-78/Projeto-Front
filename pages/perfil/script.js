// Mostra o nome do usuário, link para página inicial e botão de sair
window.addEventListener("DOMContentLoaded", function() {
  const nome = localStorage.getItem("nome_usuario") || "Usuário";
  const nomeEl = document.getElementById("nomeAluno");
  if (nomeEl) nomeEl.textContent = nome + "!";
});
