import { useEffect, useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type FetchLog = {
  time: string;
  url: string;
  status: number | "NETWORK_ERROR";
  ok: boolean;
  payload: unknown;
  error?: string;
};

type UseFetchResult<T> = {
  data: T | null;
  status: Status;
  error: Error | null;
};

export function useFetch<T = unknown>(
  url: string,
  options: RequestInit = {}
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<Error | null>(null);

  const optionsKey = useMemo(() => JSON.stringify(options), [options]);

  const stableOptions = useMemo<RequestInit>(() => options, [optionsKey]);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    async function run() {
      setStatus("loading");
      setError(null);

      try {
        const response = await fetch(url, stableOptions);
        const payload = (await response.json().catch(() => null)) as T | null;

        if (cancelled) return;

        setData(payload);
        setStatus(response.ok ? "success" : "error");

        const prev: FetchLog[] = JSON.parse(
          localStorage.getItem("fetchLogs") || "[]"
        );

        prev.push({
          time: new Date().toISOString(),
          url,
          status: response.status,
          ok: response.ok,
          payload,
        });

        localStorage.setItem("fetchLogs", JSON.stringify(prev));
      } catch (e) {
        if (cancelled) return;

        const err = e instanceof Error ? e : new Error(String(e));

        setStatus("error");
        setError(err);

        const prev: FetchLog[] = JSON.parse(
          localStorage.getItem("fetchLogs") || "[]"
        );

        prev.push({
          time: new Date().toISOString(),
          url,
          status: "NETWORK_ERROR",
          ok: false,
          payload: null,
          error: String(err),
        });

        localStorage.setItem("fetchLogs", JSON.stringify(prev));
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [url, stableOptions]);

  return { data, status, error };
}
