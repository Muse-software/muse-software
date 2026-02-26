import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import GlassCard from "../../components/ui/GlassCard";
import CollectionHero from "../../components/sections/CollectionHero";

export const metadata = {
  title: "Contact",
  description: "Start a project with Muse AI.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen text-white">
      <Nav />
      <main className="pt-20">
        <CollectionHero
          eyebrow="Contact"
          title="Start your AI program with a strategy session."
          subtitle="Tell us about your goals, risk profile, and timeline. We will respond within one business day."
          gradient="coral-purple"
        />
        <section className="mx-auto w-full max-w-4xl px-6 pb-20">
          <GlassCard className="space-y-8 p-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Email</p>
                <p className="text-base text-white">hello@muse.ai</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Phone</p>
                <p className="text-base text-white">+1 (415) 555-0149</p>
              </div>
            </div>
            <form className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  Name
                  <input
                    name="name"
                    type="text"
                    required
                    className="h-12 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none"
                    placeholder="Your name"
                  />
                </label>
                <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    className="h-12 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none"
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Company
                <input
                  name="company"
                  type="text"
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none"
                  placeholder="Company name"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Project brief
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none"
                  placeholder="Share goals, timeline, and key stakeholders."
                />
              </label>
              <button
                type="submit"
                className="h-12 rounded-full bg-[var(--gold)] text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:opacity-90"
              >
                Send request
              </button>
            </form>
            <div className="border-t border-white/10 pt-6 text-sm text-white/70">
              Contact forms are secured with reCAPTCHA and CSRF protection in production deployments.
            </div>
          </GlassCard>
        </section>
      </main>
      <Footer />
    </div>
  );
}
