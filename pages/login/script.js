const btnEntrar = document.getElementById("entrar");
const loadingSpinner = document.getElementById("loading-spinner");
const usuarioIncorreto = document.getElementById("usuario-incorreto");

// Oculta mensagem de erro ao digitar
["email", "senha"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    usuarioIncorreto.style.display = "none";
  });
});

// Olhinho para mostrar/ocultar senha
const senhaInput = document.getElementById("senha");
const togglePassword = document.getElementById("toggle-password");
if (togglePassword && senhaInput) {
  togglePassword.addEventListener("click", function() {
    if (senhaInput.type === "password") {
      senhaInput.type = "text";
      togglePassword.textContent = "🙈";
    } else {
      senhaInput.type = "password";
      togglePassword.textContent = "👁️";
    }
  });
}

// Caps Lock warning
const capsWarning = document.getElementById("capslock-warning");
senhaInput?.addEventListener("keyup", function(e) {
  if (e.getModifierState && e.getModifierState("CapsLock")) {
    capsWarning.style.display = "block";
  } else {
    capsWarning.style.display = "none";
  }
});
senhaInput?.addEventListener("blur", function() {
  capsWarning.style.display = "none";
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
      const nome = result.data?.usuario?.nome || email;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("nome_usuario", nome);
      }
      alert(result.message || "Login realizado com sucesso!");
      window.location.href = "../bem_vindos/index.html";
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
