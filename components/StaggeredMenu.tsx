"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import MuseLogo from './MuseLogo';
import { socialIconGlyphs } from './SocialLinks';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#fd4601', '#c23800'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  accentColor = '#fd4601',
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}: StaggeredMenuProps) => {
  const socialIcons = socialIconGlyphs;

  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  // Only shade the header once content has scrolled under it — keeps the
  // hero visual (e.g. the statue's head) clear on first paint.
  const [scrolled, setScrolled] = useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);


  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  const menuGridRef = useRef<HTMLDivElement | null>(null);
  const menuGridTimeouts = useRef<number[]>([]);

  const burstMenuGrid = useCallback(() => {
    const grid = menuGridRef.current;
    if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    menuGridTimeouts.current.forEach(clearTimeout);
    menuGridTimeouts.current = [];

    const cells = Array.from(grid.children) as HTMLElement[];
    cells.forEach((cell) => cell.classList.remove('sm-grid-cell-out'));
    grid.classList.add('sm-grid-active');

    cells
      .map((cell) => ({ cell, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .forEach(({ cell }, i) => {
        menuGridTimeouts.current.push(
          window.setTimeout(() => cell.classList.add('sm-grid-cell-out'), 60 + i * 5)
        );
      });

    menuGridTimeouts.current.push(
      window.setTimeout(() => grid.classList.remove('sm-grid-active'), 60 + cells.length * 5 + 300)
    );
  }, []);

  React.useEffect(() => {
    return () => {
      menuGridTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;

      if (!panel || !plusH || !plusV || !icon) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      // `visibility` (not the CSS default `transform`) hides the panel/prelayers
      // pre-hydration — GSAP treats any transform already present on an element
      // as a foreign value to preserve and composes its own xPercent shift on
      // top of it (translate(100%,0) + translate(420px,0) = 840px, double the
      // intended offset), so the CSS default must never touch `transform`.
      gsap.set([panel, ...preLayers], { xPercent: offscreen, visibility: 'visible' });

      gsap.set(plusH, { transformOrigin: '50% 50%', y: -4, rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', y: 4, rotate: 0 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as string]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as string]: 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as string]: 0 });

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { y: 0, rotate: 45, duration: 0.3 }, 0)
        .to(v, { y: 0, rotate: -45, duration: 0.3 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { y: -4, rotate: 0, duration: 0.3 }, 0)
        .to(v, { y: 4, rotate: 0, duration: 0.3 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
      burstMenuGrid();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose, burstMenuGrid]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
    }
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  // Move focus into the panel the moment it becomes interactive (inert
  // lifts in the same render as `open` flips true), so keyboard users don't
  // have to hunt for it after it slides in.
  React.useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>('nav a[href], nav button');
    first?.focus();
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const getFocusable = () =>
      panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled])'
            )
          )
        : [];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        toggleBtnRef.current?.focus();
        return;
      }

      // Trap Tab within the panel while it's open — without this, tabbing
      // past the last link falls through to page content that's visually
      // hidden behind the panel.
      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const handleClickOutside = (event: PointerEvent) => {
      if (
        closeOnClickAway &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={`sm-scope z-40 font-space-grotesk ${isFixed ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none' : 'w-full h-full'}`}
    >
      <div
        className={
          (className ? className + ' ' : '') + 'staggered-menu-wrapper pointer-events-none relative w-full h-full z-40'
        }
        style={accentColor ? ({ ['--sm-accent' as string]: accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw = colors && colors.length ? colors.slice(0, 4) : ['#fd4601', '#c23800'];
            const arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        <div
          className={`sm-header-scrim absolute top-0 left-0 w-full h-[6em] max-[767px]:h-[5em] max-[479px]:h-[4em] bg-[#060608]/90 backdrop-blur-md pointer-events-none z-10 transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        <div
          className={`sm-header-scrim-fade absolute top-[6em] left-0 w-full h-8 max-[767px]:top-[5em] max-[479px]:top-[4em] bg-linear-to-b from-[#060608]/90 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        <header
          className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between py-[2em] px-[3em] max-[991px]:px-[2em] max-[991px]:py-[1em] max-[767px]:px-[1.5em] max-[479px]:px-[1em] max-[479px]:py-[0.5em] bg-transparent pointer-events-none z-20"
          aria-label="Main navigation header"
        >
          <div className="sm-logo flex items-center select-none pointer-events-auto">
            <Link href="/" className="text-white no-underline" aria-label="Muse home">
              <MuseLogo iconClassName="h-7 w-auto text-[#fd4601] md:h-8" />
            </Link>
          </div>

          <button
            ref={toggleBtnRef}
            className={`sm-toggle relative inline-flex items-center justify-center bg-transparent border-0 cursor-pointer overflow-visible pointer-events-auto w-12 h-12 p-0 ${
              open ? 'text-black' : 'text-white'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span
              ref={iconRef}
              className="sm-icon relative w-[26px] h-[26px] inline-flex items-center justify-center [will-change:transform]"
              aria-hidden="true"
            >
              <span
                ref={plusHRef}
                className="sm-icon-line absolute left-0 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-y-1/2 [will-change:transform]"
              />
              <span
                ref={plusVRef}
                className="sm-icon-line absolute left-0 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-y-1/2 [will-change:transform]"
              />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col p-[6em_2em_6em_2em] overflow-y-auto z-10 backdrop-blur-[12px] pointer-events-auto"
          style={{ WebkitBackdropFilter: 'blur(12px)' }}
          // `inert` (not just aria-hidden) so the panel's links can't be
          // tabbed into while it's visually offscreen — aria-hidden alone
          // hides it from assistive tech but does nothing to the tab order,
          // and is invalid ARIA on a container that still holds focusable
          // descendants.
          inert={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <nav aria-label="Main menu">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => {
                  const isExternal = it.link.startsWith('http') || it.link.startsWith('mailto:');
                  const linkClass = "sm-panel-item relative text-black font-semibold cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear no-underline";
                  const inner = (
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      {it.label}
                    </span>
                  );
                  return (
                    <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                      {isExternal ? (
                        <a
                          className={linkClass}
                          href={it.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={it.ariaLabel}
                          data-index={idx + 1}
                          onClick={closeMenu}
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link
                          className={linkClass}
                          href={it.link}
                          aria-label={it.ariaLabel}
                          data-index={idx + 1}
                          onClick={closeMenu}
                        >
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                  <span className="sm-panel-item relative text-black font-semibold cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear no-underline">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>
            </nav>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials mt-auto pt-8 pb-[env(safe-area-inset-bottom,1.5rem)] flex flex-col gap-3" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#fd4601)]">Socials</h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s) => (
                    <li key={s.label} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="sm-socials-link font-medium text-black no-underline relative inline-flex items-center gap-2 p-2 -m-2 transition-[color,opacity] duration-300 ease-linear [&_svg]:w-6 [&_svg]:h-6"
                      >
                        {socialIcons[s.label] ? (
                          <>
                            {socialIcons[s.label]}
                            <span className="sr-only">{s.label}</span>
                          </>
                        ) : (
                          s.label
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <div ref={menuGridRef} className="sm-menu-grid" aria-hidden="true">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="sm-grid-cell" />
        ))}
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 2em 3em; background: transparent; pointer-events: none; z-index: 20; }
@media (max-width: 991px) { .sm-scope .staggered-menu-header { padding: 1em 2em; } }
@media (max-width: 767px) { .sm-scope .staggered-menu-header { padding: 1em 1.5em; } }
@media (max-width: 479px) { .sm-scope .staggered-menu-header { padding: 0.5em 1em; } }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; justify-content: center; background: transparent; border: none; cursor: pointer; color: #fff; overflow: visible; width: 48px; height: 48px; padding: 0; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-icon { position: relative; width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-icon-line { position: absolute; left: 0; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translateY(-50%); will-change: transform; }
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(260px, 38vw, 420px); height: 100%; background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 6em 2em; overflow-y: auto; z-index: 10; visibility: hidden; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(260px, 38vw, 420px); pointer-events: none; z-index: 5; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); visibility: hidden; }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; padding-bottom: env(safe-area-inset-bottom, 1.5rem); display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: var(--sm-accent, #fd4601); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #fd4601); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-weight: 500; color: #000; text-decoration: none; position: relative; padding: 0.5rem; margin: -0.5rem; display: inline-flex; align-items: center; gap: 0.5rem; transition: color 0.3s ease, opacity 0.3s ease; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #fd4601); }
.sm-scope .sm-panel-title { margin: 0; font-size: 1rem; font-weight: 600; color: #fff; text-transform: uppercase; }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-item { position: relative; width: 100%; color: #000; font-weight: 600; font-size: 2.5rem; cursor: pointer; line-height: 1.05; letter-spacing: -2px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: block; text-decoration: none; padding-right: 1.4em; overflow-wrap: break-word; }
/* Numbers are positioned via right:Xem off each item's OWN box edge — with
   display:block every item now shares the same full-width box (instead of
   shrinking to fit its own label via inline-block), so that edge lines up
   identically across rows and the counters read as a straight column. */
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #fd4601); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-size: 18px; font-weight: 400; color: var(--sm-accent, #fd4601); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo a { filter: invert(100%); } }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo a { filter: invert(100%); } }
/* Panel item font-size tuned per range rather than one fluid clamp, because
   the panel itself isn't monotonically wider as the viewport grows: it's
   full-width below 1024px (plenty of room once the viewport itself isn't
   tiny) but a narrow 260-420px column above 1024px. The longest single
   label ("Newsletter") needs to fit on one line in both the narrow-phone
   and narrow-desktop-column cases without triggering a mid-word break. */
@media (min-width: 480px) and (max-width: 1024px) { .sm-scope .sm-panel-item { font-size: 4rem; } }
@media (min-width: 1025px) { .sm-scope .sm-panel-item { font-size: 3rem; } }
.sm-scope .sm-menu-grid { position: fixed; inset: 0; display: none; grid-template-columns: repeat(10, 1fr); grid-template-rows: repeat(10, 1fr); pointer-events: none; }
.sm-scope .sm-menu-grid.sm-grid-active { display: grid; }
.sm-scope .sm-grid-cell { background: #060608; border: 1px solid rgba(253, 70, 1, 0.1); opacity: 1; }
.sm-scope .sm-grid-cell.sm-grid-cell-out { opacity: 0; transition: opacity 0.3s ease; }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
