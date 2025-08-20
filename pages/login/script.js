const btnEntrar = document.getElementById("entrar");
const loadingSpinner = document.getElementById("loading-spinner");
const usuarioIncorreto = document.getElementById("usuario-incorreto");

// Oculta mensagem de erro ao digitar
["email", "senha"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    usuarioIncorreto.style.display = "none";
  });
});

let isLoading = false;
document.getElementById("forms-login").addEventListener("submit", async function (e) {
  e.preventDefault();
  if (isLoading) return; // Bloqueia múltiplos envios
  isLoading = true;
  btnEntrar.disabled = true;
  loadingSpinner.style.display = "flex";

  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  try {
    const response = await fetch("https://infoweg-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const result = await response.json();
    console.log("Resposta do back:", result);

    if (response.ok && result.status === "success") {
      const token = result.data?.jwtTokenDto?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      alert(result.message || "Login realizado com sucesso!");
      window.location.href = "../../index.html";
    } else {
      usuarioIncorreto.style.display = "block";
      usuarioIncorreto.textContent = result.message || "Usuário ou senha incorretos.";
    }
  } catch (err) {
    console.error("Erro de conexão:", err);
    usuarioIncorreto.style.display = "block";
    usuarioIncorreto.textContent = "Erro de conexão. Tente novamente.";
  } finally {
    isLoading = false;
    btnEntrar.disabled = false;
    loadingSpinner.style.display = "none";
  }
});
