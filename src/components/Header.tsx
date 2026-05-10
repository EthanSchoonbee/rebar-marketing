import type {CSSProperties} from "react";
import {useEffect, useRef, useState} from "react";

const navItems = [
    {label: "Home", href: "#home"},
    {label: "Platform", href: "#platform"},
    {label: "Approach", href: "#approach"},
    {label: "Proof", href: "#proof"},
    {label: "Contact", href: "#contact"},
];

const MOBILE_NAV_WIDTH = 760;

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [headerTone, setHeaderTone] = useState("dark");
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);
    const headerStyle = scrolled ? ({
        "--header-brand": headerTone === "light" ? "var(--color-dark-brown)" : "var(--color-white)",
        "--header-nav": headerTone === "light" ? "var(--color-dark-brown)" : "var(--color-white)",
    } as CSSProperties) : undefined;

    useEffect(() => {
        if (!scrolled && desktopMenuOpen) {
            setDesktopMenuOpen(false);
        }
    }, [scrolled, desktopMenuOpen]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth <= MOBILE_NAV_WIDTH) {
                setDesktopMenuOpen(false);
            } else {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("menu-open", mobileMenuOpen);

        return () => {
            document.body.classList.remove("menu-open");
        };
    }, [mobileMenuOpen]);

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
            className={`site-header ${scrolled ? "is-scrolled" : ""} ${desktopMenuOpen ? "site-header--desktop-menu-open" : ""} ${mobileMenuOpen ? "site-header--mobile-menu-open" : ""}`}
            style={headerStyle}
        >
            <div className={`site-header__chrome ${scrolled ? "site-header__chrome--visible" : ""}`} aria-hidden="true" />
            <div className="site-header__content">
                <a className="wordmark" href="#home" aria-label="Rebar home">
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
            <button
                type="button"
                className="menu-button"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileMenuOpen((current) => !current)}
            >
                <span className="menu-button__icon" aria-hidden="true">
                    <span className="menu-button__icon-line menu-button__icon-line--top"/>
                    <span className="menu-button__icon-line menu-button__icon-line--middle"/>
                    <span className="menu-button__icon-line menu-button__icon-line--bottom"/>
                </span>
            </button>
            <div className="mobile-menu" id="mobile-menu" aria-hidden={!mobileMenuOpen}>
                <nav aria-label="Mobile navigation">
                    {navItems.map((item) => (
                        <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
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
            {desktopMenuOpen ? (
                <button
                    type="button"
                    className="desktop-menu-backdrop"
                    aria-label="Close navigation menu"
                    onClick={() => setDesktopMenuOpen(false)}
                />
            ) : null}
        </header>
    );
}
