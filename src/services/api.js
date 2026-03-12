const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginWithGoogle(googleToken) {
  const requestBody = { IdToken: googleToken };

  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.Error || data?.message || "Login failed");
  }

  return data;
}

export async function searchMovies(query, token) {
  const url = `${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.Error || data?.message || "Search failed");
  }

  return data;
}
