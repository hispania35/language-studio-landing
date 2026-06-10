import { useState, useEffect } from "react";

const CACHE_KEY = "detected_city";

export const useCity = () => {
  const [city, setCity] = useState<string>(() => {
    try {
      return localStorage.getItem(CACHE_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    if (city) return;

    let cancelled = false;
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const detected = data?.city || "";
        if (detected) {
          setCity(detected);
          try {
            localStorage.setItem(CACHE_KEY, detected);
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {
        /* ignore */
      });

    return () => {
      cancelled = true;
    };
  }, [city]);

  return city;
};
