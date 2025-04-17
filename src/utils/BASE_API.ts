export async function fetchClient(input: RequestInfo, init?: RequestInit) {
  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      // "x-csrf-token": "",
      "Content-Type": "application/json",
    },
  });
}
