import { getClientConfig } from "../config/client";
import { ApiPath, DEFAULT_CORS_HOST } from "../constant";

export function corsPath(path: string) {
  const baseUrl = getClientConfig()?.isApp ? `${DEFAULT_CORS_HOST}` : "";

  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  if (!path.endsWith("/")) {
    path += "/";
  }

  return `${baseUrl}${path}`;
}

export function corsFetch(
  url: string,
  options: RequestInit & {
    proxyUrl?: string;
  },
) {
  console.log('get cors url:', url)
  if (!url.startsWith("http")) {
    throw Error(`[CORS Fetch] url must start with http/https, but was: ${url}`);
  }

  let proxyUrl = options.proxyUrl ?? corsPath(ApiPath.Cors);
  if (!proxyUrl.endsWith("/")) {
    proxyUrl += "/";
  }

  url = url.replace("://", "/");

  const corsOptions = {
    ...options,
    method: "POST",
    headers: options.method
      ? {
          ...options.headers,
          method: options.method,
        }
      : options.headers,
  };

  const corsUrl = proxyUrl + url;
  console.info("[CORS] target = ", corsUrl);

  return fetch(corsUrl, corsOptions);
}
