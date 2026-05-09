import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Platform", href: "#platform" },
  { label: "Approach", href: "#approach" },
  { label: "Proof", href: "#proof" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Rebar home">
        Rebar
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
      </button>
      <div className={`mobile-menu ${isOpen ? "is-open" : ""}`} id="mobile-menu">
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
