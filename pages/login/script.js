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
  const eyeOpen = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#005691\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-eye-icon lucide-eye\"><path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>`;
  const eyeClosed = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#005691\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-eye-off-icon lucide-eye-off\"><path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\"/><path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\"/><path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\"/><path d=\"m2 2 20 20\"/></svg>`;
  togglePassword.innerHTML = eyeOpen;
  togglePassword.addEventListener("click", function() {
    if (senhaInput.type === "password") {
      senhaInput.type = "text";
      togglePassword.innerHTML = eyeClosed;
    } else {
      senhaInput.type = "password";
      togglePassword.innerHTML = eyeOpen;
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
