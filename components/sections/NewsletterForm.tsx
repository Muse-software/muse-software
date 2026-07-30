"use client";

import Link from "next/link";
import { useFormSubmit } from "../../lib/useFormSubmit";

export default function NewsletterForm() {
  const {
    status,
    delivered: subscribed,
    error,
    submit,
  } = useFormSubmit("/api/subscribe", "Something went wrong. Please try again.");

  if (status === "success") {
    return (
      <p className="text-lg text-white/80">
        {subscribed
          ? "You're on the list — the next issue lands in your inbox."
          : "Thanks — we've noted your email and will add you once signups are live."}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          className="w-full max-w-sm border border-white/35 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/45 outline-none transition-colors focus:border-[#fd4601]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-3 border border-black bg-white px-6 py-3 text-base font-medium font-space-grotesk text-black transition-colors duration-200 hover:bg-[#fd4601] disabled:opacity-60"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <p className="max-w-md text-xs text-white/50">
        By subscribing, you agree to receive occasional emails from Muse Studios. You can unsubscribe
        at any time. See our{" "}
        <Link href="/terms" className="underline hover:text-[#fd4601]">
          Terms
        </Link>{" "}
        &amp;{" "}
        <Link href="/privacy" className="underline hover:text-[#fd4601]">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
