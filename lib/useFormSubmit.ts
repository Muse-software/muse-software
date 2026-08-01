"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Shared submit-state-machine for ContactForm/GetStartedForm/NewsletterForm —
 * all three POST the form body as JSON to their own /api route and track the
 * same idle/submitting/success/error lifecycle. `delivered` covers both the
 * contact/get-started routes' `result.delivered` and the subscribe route's
 * `result.subscribed` — only one is ever present on a given endpoint's
 * response, so reading either is safe.
 *
 * Error copy is localized here rather than on the server. The /api routes are
 * not locale-prefixed (the proxy matcher excludes them), so a handler has no
 * reliable locale to render into; instead each error response carries a stable
 * machine `code` that maps to a message under `Forms.errors`. The route's
 * English `error` string is kept as the fallback for a code this build does
 * not recognise, so a new server-side error can never render as a blank alert.
 */
export function useFormSubmit(endpoint: string, catchKey: "network" | "generic" = "network") {
  const t = useTranslations("Forms.errors");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [delivered, setDelivered] = useState(true);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok || !result.ok) {
        setStatus("error");
        setError(
          result.code && t.has(result.code)
            ? t(result.code)
            : result.error || t("generic"),
        );
        return;
      }

      setDelivered(Boolean(result.delivered ?? result.subscribed));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(t(catchKey));
    }
  }

  return { status, delivered, error, submit };
}
