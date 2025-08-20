async function fetchProtected(url, options = {}) {
  const token = localStorage.getItem("token");
  if (!options.headers) options.headers = {};
  options.headers["Authorization"] = `Bearer ${token}`;
  options.headers["Content-Type"] = "application/json";

  const res = await fetch(`https://infoweg-backend.onrender.com${url}`, options);
  if (!res.ok) throw new Error("Erro na requisição");
  return res.json();
}

fetchProtected("/api/auth")
  .then(data => console.log(data))
  .catch(err => console.error(err));