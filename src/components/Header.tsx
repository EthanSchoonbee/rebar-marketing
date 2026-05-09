const navItems = [
  { label: "Home", href: "#home" },
  { label: "Platform", href: "#platform" },
  { label: "Approach", href: "#approach" },
  { label: "Proof", href: "#proof" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="site-header">
      <input className="mobile-menu-toggle" type="checkbox" id="mobile-menu-toggle" />
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
      <label className="menu-button" htmlFor="mobile-menu-toggle">
        <span className="menu-button__label menu-button__label--open">Menu</span>
        <span className="menu-button__label menu-button__label--close">Close</span>
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
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
            const toggle = document.getElementById("mobile-menu-toggle");
            const links = document.querySelectorAll("[data-menu-link]");
            links.forEach((link) => {
              link.addEventListener("click", () => {
                if (toggle) toggle.checked = false;
              });
            });
          `,
        }}
      />
    </header>
  );
}
