export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface PostJsonOptions {
  timeoutMs?: number;
  signal?: AbortSignal;
}

export async function postJson<T>(
  url: string,
  body: unknown,
  options: PostJsonOptions = {}
): Promise<T> {
  const { timeoutMs, signal: externalSignal } = options;

  const controller = new AbortController();
  const timeoutId = timeoutMs
    ? setTimeout(() => controller.abort(), timeoutMs)
    : null;

  const onExternalAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    else externalSignal.addEventListener("abort", onExternalAbort);
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const data = (await res.json().catch(() => ({}))) as Partial<T> & {
      error?: string;
    };

    if (!res.ok) {
      throw new ApiError(
        data.error || `Request failed with status ${res.status}`,
        res.status
      );
    }

    return data as T;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
    if (externalSignal) externalSignal.removeEventListener("abort", onExternalAbort);
  }
}
