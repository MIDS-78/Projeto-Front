// Verifica se existe token salvo no localStorage
(function() {
  const token = localStorage.getItem("token");
  // Se não estiver na página de login e não houver token, redireciona para login
  if (!token && !window.location.pathname.includes("/login/")) {
    window.location.href = "/pages/login/index.html";
  }
})();
