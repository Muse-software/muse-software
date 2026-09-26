"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/** Progressive enhancement: content stays visible without JS, IO, or animation. */
export default function SiteMotion() {
  const path = usePathname();
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !window.IntersectionObserver) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches || entry.target.contains(document.activeElement)) continue;
        const animation = entry.target.animate([
          { opacity: .65, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: .08 });
    // Homepage art has its own choreography. Forms never move beneath a user.
    document.querySelectorAll(".dir-service-intro,.dir-service-work,.dir-example,.dir-about-statement,.dir-principles,.dir-people,.dir-page-cta").forEach(node => observer.observe(node));
    const stop = () => { if(preference.matches) {observer.disconnect(); animations.forEach(animation => animation.cancel());} };
    const showFocused = (event: FocusEvent) => {
      let node = event.target instanceof Element ? event.target : null;
      while (node) {
        node.getAnimations().forEach(animation => {
          if (animations.has(animation)) { animation.cancel(); animations.delete(animation); }
        });
        node = node.parentElement;
      }
    };
    document.addEventListener("focusin", showFocused);
    preference.addEventListener("change", stop);
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); preference.removeEventListener("change", stop); document.removeEventListener("focusin", showFocused); };
  }, [path]);
  return null;
}
