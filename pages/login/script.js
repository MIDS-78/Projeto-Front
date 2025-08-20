document.getElementById("forms-login").addEventListener("submit", async function (e) {
  e.preventDefault();

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
      document.getElementById("usuario-incorreto").style.display = "block";
      document.getElementById("usuario-incorreto").textContent = result.message || "Usuário ou senha incorretos.";
    }
  } catch (err) {
    console.error("Erro de conexão:", err);
    document.getElementById("usuario-incorreto").style.display = "block";
    document.getElementById("usuario-incorreto").textContent = "Erro de conexão. Tente novamente.";
  }
});
