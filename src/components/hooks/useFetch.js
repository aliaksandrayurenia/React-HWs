import { useEffect, useState } from 'react';

export function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle');   
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        let cancelled = false;

        async function run() {
        setStatus('loading');
        setError(null);

        try {
            const response = await fetch(url, options);
            const payload = await response.json().catch(() => null);

            if (cancelled) return;

            setData(payload);
            setStatus(response.ok ? 'success' : 'error');

            const prev = JSON.parse(localStorage.getItem('fetchLogs') || '[]');

            prev.push({
            time: new Date().toISOString(),
            url,
            status: response.status,
            ok: response.ok,
            payload,
            });

            localStorage.setItem('fetchLogs', JSON.stringify(prev));
        } catch (e) {
            if (cancelled) return;

            setStatus('error');
            setError(e);

            const prev = JSON.parse(localStorage.getItem('fetchLogs') || '[]');
            prev.push({
            time: new Date().toISOString(),
            url,
            status: 'NETWORK_ERROR',
            ok: false,
            payload: null,
            error: String(e),
            });
            localStorage.setItem('fetchLogs', JSON.stringify(prev));
        }
        }

        run();

        return () => {
        cancelled = true;
        };
    }, [url, JSON.stringify(options)]);

    return { data, status, error };
}
