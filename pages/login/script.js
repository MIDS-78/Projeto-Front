document.querySelector("forms-login").addEventListener("entrar", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#usuario").value;
    const password = document.querySelector("#senha").value;

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include" // se for usar cookies
        });

        const data = await res.json();

        if (res.ok && data.success) {
            // Salva token no localStorage (se usar JWT)
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            // Redireciona pra tela principal
            window.location.href = "/index.html";
        } else {
            document.querySelector("#usuario-incorreto").style.display = "block";
        }
    } catch (err) {
        console.error("Erro no login:", err);
        alert("Erro ao conectar com o servidor");
    }
});