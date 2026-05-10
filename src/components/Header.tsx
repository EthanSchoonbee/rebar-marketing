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
const DESKTOP_MENU_CLOSE_MS = 460;
const lastNavItemIndex = navItems.length - 1;

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [headerTone, setHeaderTone] = useState("dark");
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
    const [desktopMenuMounted, setDesktopMenuMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);
    const desktopMenuCloseTimer = useRef<number | null>(null);
    const toneColor = headerTone === "light" ? "var(--color-dark-brown)" : "var(--color-white)";
    const headerStyle = {
        "--mobile-menu-color": toneColor,
        ...(scrolled ? {
            "--header-brand": toneColor,
            "--header-nav": toneColor,
        } : {}),
    } as CSSProperties;

    const clearDesktopMenuCloseTimer = () => {
        if (desktopMenuCloseTimer.current !== null) {
            window.clearTimeout(desktopMenuCloseTimer.current);
            desktopMenuCloseTimer.current = null;
        }
    };

    const openDesktopMenu = () => {
        clearDesktopMenuCloseTimer();
        setDesktopMenuMounted(true);
        window.requestAnimationFrame(() => setDesktopMenuOpen(true));
    };

    const closeDesktopMenu = () => {
        clearDesktopMenuCloseTimer();
        setDesktopMenuOpen(false);
        desktopMenuCloseTimer.current = window.setTimeout(() => {
            setDesktopMenuMounted(false);
            desktopMenuCloseTimer.current = null;
        }, DESKTOP_MENU_CLOSE_MS);
    };

    const toggleDesktopMenu = () => {
        if (desktopMenuOpen) {
            closeDesktopMenu();
        } else {
            openDesktopMenu();
        }
    };

    useEffect(() => {
        if (!scrolled && desktopMenuMounted) {
            closeDesktopMenu();
        }
    }, [scrolled, desktopMenuMounted]);

    useEffect(() => {
        return () => {
            clearDesktopMenuCloseTimer();
        };
    }, []);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth <= MOBILE_NAV_WIDTH) {
                closeDesktopMenu();
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
            const wordmarkRect = headerRef.current.querySelector(".wordmark")?.getBoundingClientRect();
            const probeY = wordmarkRect
                ? wordmarkRect.top + wordmarkRect.height / 2
                : headerRect.top + Math.min(headerRect.height, 72) / 2;
            const sections = Array.from(document.querySelectorAll("[data-header-tone]"));

            let nextTone = "dark";

            for (const section of sections) {
                const tone = section.getAttribute("data-header-tone");
                const rect = section.getBoundingClientRect();

                if (probeY >= rect.top && probeY < rect.bottom) {
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
                        {navItems.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                style={{
                                    "--nav-collapse-delay": `${(lastNavItemIndex - index) * 42}ms`,
                                    "--nav-expand-delay": `${index * 34}ms`,
                                    "--nav-collapse-distance": `${(lastNavItemIndex - index + 1) * 3.8}rem`,
                                } as CSSProperties}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <button
                        type="button"
                        className={`desktop-menu-button ${desktopMenuOpen ? "is-open" : ""}`}
                        onClick={toggleDesktopMenu}
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
                    {navItems.map((item, index) => (
                        <a
                            key={item.href}
                            href={item.href}
                            style={{
                                "--menu-open-delay": `${index * 70}ms`,
                                "--menu-close-delay": `${(lastNavItemIndex - index) * 45}ms`,
                            } as CSSProperties}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>
            {desktopMenuMounted ? (
                <div className="desktop-menu-panel" aria-hidden={!desktopMenuOpen}>
                    <nav aria-label="Expanded desktop navigation">
                        {navItems.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                style={{
                                    "--menu-open-delay": `${index * 70}ms`,
                                    "--menu-close-delay": `${(lastNavItemIndex - index) * 45}ms`,
                                } as CSSProperties}
                                onClick={closeDesktopMenu}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            ) : null}
            {desktopMenuMounted ? (
                <button
                    type="button"
                    className="desktop-menu-backdrop"
                    aria-label="Close navigation menu"
                    onClick={closeDesktopMenu}
                />
            ) : null}
        </header>
    );
}
