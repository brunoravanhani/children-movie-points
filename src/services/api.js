const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

let accessToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
let refreshToken = localStorage.getItem("refreshToken");
let refreshRequestPromise = null;
let authFailureHandler = null;

function resolveTokenValue(payload) {
  return payload?.token || payload?.Token || null;
}

function resolveRefreshTokenValue(payload) {
  return payload?.refreshToken || payload?.RefreshToken || null;
}

async function parseResponseData(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json().catch(() => null);
}

function getErrorMessage(data, fallbackMessage) {
  return data?.Error || data?.error || data?.message || fallbackMessage;
}

function buildHeaders(headers) {
  const resolvedHeaders = new Headers(headers || {});

  if (accessToken) {
    resolvedHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  return resolvedHeaders;
}

export function setAuthFailureHandler(handler) {
  authFailureHandler = handler;
}

export function setTokens(newAccessToken, newRefreshToken) {
  accessToken = newAccessToken || null;
  refreshToken = newRefreshToken || null;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("token", accessToken);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    localStorage.removeItem("refreshToken");
  }
}

export function clearTokens() {
  setTokens(null, null);
}

export function getAccessToken() {
  return accessToken;
}

export async function refreshAccessToken() {
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${AUTH_BASE_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await parseResponseData(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Token refresh failed"));
  }

  const nextAccessToken = resolveTokenValue(data);
  const nextRefreshToken = resolveRefreshTokenValue(data) || refreshToken;

  if (!nextAccessToken) {
    throw new Error("Token refresh did not return an access token");
  }

  setTokens(nextAccessToken, nextRefreshToken);
  return data;
}

async function runRefreshFlow() {
  if (!refreshRequestPromise) {
    refreshRequestPromise = refreshAccessToken().finally(() => {
      refreshRequestPromise = null;
    });
  }

  return refreshRequestPromise;
}

export async function fetchWithAuth(url, options = {}, allowRetry = true) {
  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options.headers),
  });

  if (response.status !== 401 || !allowRetry || !refreshToken) {
    return response;
  }

  try {
    await runRefreshFlow();
  } catch (refreshError) {
    clearTokens();
    if (typeof authFailureHandler === "function") {
      authFailureHandler(refreshError);
    }
    throw refreshError;
  }

  return fetchWithAuth(url, options, false);
}

export async function loginWithGoogle(googleToken) {
  const requestBody = { IdToken: googleToken };

  const response = await fetch(`${AUTH_BASE_URL}/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const data = await parseResponseData(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Login failed"));
  }

  const nextAccessToken = resolveTokenValue(data);
  const nextRefreshToken = resolveRefreshTokenValue(data);

  if (!nextAccessToken || !nextRefreshToken) {
    throw new Error("Login response is missing token information");
  }

  setTokens(nextAccessToken, nextRefreshToken);
  return data;
}

export async function logout() {
  try {
    if (refreshToken) {
      await fetch(`${AUTH_BASE_URL}/logout`, {
        method: "POST",
        headers: buildHeaders({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ refreshToken }),
      });
    }
  } finally {
    clearTokens();
  }
}

export async function searchMovies(query) {
  const url = `${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}`;
  const response = await fetchWithAuth(url);
  const data = await parseResponseData(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Search failed"));
  }

  return data;
}

export async function AddMovie(movieData) {
  const response = await fetchWithAuth(`${API_BASE_URL}/movies/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });

  const data = await parseResponseData(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Failed to add movie"));
  }

  return data;
}

export async function deleteMovie(movieId) {
  const response = await fetchWithAuth(`${API_BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
  });

  const data = await parseResponseData(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Failed to delete movie"));
  }
}

export async function updateMoviePoints(movieId, points) {
  const response = await fetchWithAuth(`${API_BASE_URL}/movies/${movieId}/points`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ points }),
  });

  const data = await parseResponseData(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Failed to update movie points"));
  }

  return data;
}

export async function getAll() {
  const response = await fetchWithAuth(`${API_BASE_URL}/movies/`);
  const data = await parseResponseData(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Get all movies failed"));
  }

  return data;
}
