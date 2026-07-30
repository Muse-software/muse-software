"use client";

import { useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

const DEFAULT_CATCH_MESSAGE =
  "Something went wrong. Please try again, or reach us on WhatsApp.";

/**
 * Shared submit-state-machine for ContactForm/GetStartedForm/NewsletterForm —
 * all three POST the form body as JSON to their own /api route and track the
 * same idle/submitting/success/error lifecycle. `delivered` covers both the
 * contact/get-started routes' `result.delivered` and the subscribe route's
 * `result.subscribed` — only one is ever present on a given endpoint's
 * response, so reading either is safe.
 */
export function useFormSubmit(endpoint: string, catchMessage = DEFAULT_CATCH_MESSAGE) {
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
        setError(result.error || "Something went wrong. Please try again.");
        return;
      }

      setDelivered(Boolean(result.delivered ?? result.subscribed));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(catchMessage);
    }
  }

  return { status, delivered, error, submit };
}
