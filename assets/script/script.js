async function fetchProtected(url, options = {}, method = 'GET', body = null, params = null) {
  const token = localStorage.getItem("token");
  if (!options.headers) options.headers = {};
  options.headers["Authorization"] = `Bearer ${token}`;
  options.headers["Content-Type"] = "application/json";

  options.method = method;
  if (body) options.body = JSON.stringify(body);

  let fullUrl = `https://infoweg-backend.onrender.com${url}`;
  if (params && typeof params === 'object') {
    const queryString = new URLSearchParams(params).toString();
    fullUrl += `?${queryString}`;
  }

  const res = await fetch(fullUrl, options);
  if (!res.ok) throw new Error("Erro na requisição");
  return res.json();
}