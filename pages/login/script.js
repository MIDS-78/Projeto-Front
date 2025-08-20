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
        email: email,      // precisa ser "email"
        password: password // precisa ser "password"
      })
    });

    const result = await response.json();
    console.log("Resposta do back:", result);

    if (response.ok && result.status === "success") {
      alert("Login realizado com sucesso!");

      const token = result.data?.jwtTokenDto?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      window.location.href = "/home/"; 
    } else {
      document.getElementById("usuario-incorreto").style.display = "block";
    }
  } catch (err) {
    console.error("Erro de conexão:", err);
    document.getElementById("usuario-incorreto").style.display = "block";
  }
});
