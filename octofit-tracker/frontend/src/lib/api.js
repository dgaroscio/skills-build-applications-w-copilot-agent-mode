const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

const baseOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const apiBaseUrl = `${baseOrigin}/api`;

const readItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items;
  }

  if (Array.isArray(payload?.data?.results)) {
    return payload.data.results;
  }

  return [];
};

export const fetchCollection = async (resource) => {
  const cleanResource = String(resource).replace(/^\/+|\/+$/g, '');
  const response = await fetch(`${apiBaseUrl}/${cleanResource}/`);

  if (!response.ok) {
    throw new Error(`Request failed for ${cleanResource}: ${response.status}`);
  }

  const payload = await response.json();
  return readItems(payload);
};
