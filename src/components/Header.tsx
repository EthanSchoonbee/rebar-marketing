import type {CSSProperties} from "react";
import {useEffect, useRef, useState} from "react";
import GlassSurface from "./GlassSurface.jsx";

const navItems = [
    {label: "Home", href: "#home"},
    {label: "Platform", href: "#platform"},
    {label: "Approach", href: "#approach"},
    {label: "Proof", href: "#proof"},
    {label: "Contact", href: "#contact"},
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [headerTone, setHeaderTone] = useState("dark");
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!scrolled && desktopMenuOpen) {
            setDesktopMenuOpen(false);
        }
    }, [scrolled, desktopMenuOpen]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth <= 920) {
                setDesktopMenuOpen(false);
            }
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        const resolveHeaderTone = () => {
            if (typeof window === "undefined" || !headerRef.current) return;

            const headerRect = headerRef.current.getBoundingClientRect();
            const probeY = window.scrollY + headerRect.bottom + 8;
            const sections = Array.from(document.querySelectorAll("[data-header-tone]"));

            let nextTone = "dark";

            for (const section of sections) {
                const tone = section.getAttribute("data-header-tone");
                const rect = section.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const bottom = rect.bottom + window.scrollY;

                if (probeY >= top && probeY < bottom) {
                    nextTone = tone === "light" ? "light" : "dark";
                    break;
                }
            }

            setHeaderTone((current) => (current === nextTone ? current : nextTone));
        };

        const onScroll = () => {
            const doc = document.documentElement;
            const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 4;
            setScrolled(window.scrollY > 88 && !atBottom);
            resolveHeaderTone();
        };

        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        window.addEventListener("resize", resolveHeaderTone);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", resolveHeaderTone);
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className={`site-header ${scrolled ? "is-scrolled" : ""} ${desktopMenuOpen ? "site-header--desktop-menu-open" : ""}`}
            style={scrolled ? ({
                "--header-brand": headerTone === "light" ? "var(--color-dark-brown)" : "var(--color-white)",
                "--header-nav": headerTone === "light" ? "var(--color-dark-brown)" : "var(--color-white)",
            } as CSSProperties) : undefined}
        >
            <GlassSurface
                className={`site-header__chrome ${scrolled ? "site-header__chrome--visible" : ""}`}
                width="100%"
                height="100%"
                borderRadius={0}
                opacity={0.9}
                brightness={66}
                blur={10}
                backgroundOpacity={0.06}
                saturation={1.75}
                distortionScale={-160}
                redOffset={0}
                greenOffset={8}
                blueOffset={16}
            />
            <input className="mobile-menu-toggle" type="checkbox" id="mobile-menu-toggle"/>
            <div className="site-header__content">
                <a className={`wordmark ${scrolled ? "is-scrolled" : ""}`} href="#home" aria-label="Rebar home">
                    Rebar
                </a>
                <div className="desktop-actions">
                    <nav className="desktop-nav" aria-label="Primary navigation">
                        {navItems.map((item) => (
                            <a key={item.href} href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <button
                        type="button"
                        className={`desktop-menu-button ${desktopMenuOpen ? "is-open" : ""}`}
                        onClick={() => setDesktopMenuOpen((current) => !current)}
                        aria-label={desktopMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={desktopMenuOpen}
                    >
                        <span className="menu-button__icon" aria-hidden="true">
                            <span className="menu-button__icon-line menu-button__icon-line--top"/>
                            <span className="menu-button__icon-line menu-button__icon-line--middle"/>
                            <span className="menu-button__icon-line menu-button__icon-line--bottom"/>
                        </span>
                    </button>
                </div>
            </div>
            <label className={`menu-button ${scrolled ? "is-scrolled" : ""}`} htmlFor="mobile-menu-toggle"
                   aria-label="Toggle navigation menu">
                <span className="menu-button__icon" aria-hidden="true">
                    <span className="menu-button__icon-line menu-button__icon-line--top"/>
                    <span className="menu-button__icon-line menu-button__icon-line--middle"/>
                    <span className="menu-button__icon-line menu-button__icon-line--bottom"/>
                </span>
            </label>
            <div className="mobile-menu" id="mobile-menu">
                <div className="mobile-menu__top">
                    <span className="mobile-menu__label">Navigation</span>
                    <label className="mobile-menu__close" htmlFor="mobile-menu-toggle">
                        Close
                    </label>
                </div>
                <nav aria-label="Mobile navigation">
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} data-menu-link>
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>
            <div className="desktop-menu-panel" aria-hidden={!desktopMenuOpen}>
                <nav aria-label="Expanded desktop navigation">
                    {navItems.map((item, index) => (
                        <a
                            key={item.href}
                            href={item.href}
                            style={{ "--menu-delay": `${index * 70}ms` } as CSSProperties}
                            onClick={() => setDesktopMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
            const toggle = document.getElementById("mobile-menu-toggle");
            const links = document.querySelectorAll("[data-menu-link]");
            const syncBodyLock = () => {
              document.body.classList.toggle("menu-open", Boolean(toggle && toggle.checked));
            };

            syncBodyLock();

            if (toggle) {
              toggle.addEventListener("change", syncBodyLock);
            }

            links.forEach((link) => {
              link.addEventListener("click", () => {
                if (toggle) toggle.checked = false;
                syncBodyLock();
              });
            });
          `,
        }}
      />
        </header>
    );
}
