import Button from "./Button";
import Header from "./Header";
import MetricBlock from "./MetricBlock";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import ServiceRow from "./ServiceRow";

const services = [
  {
    number: "01",
    title: "Project command center",
    description: "Bring schedules, RFIs, submittals, documents, and field notes into one operating view.",
  },
  {
    number: "02",
    title: "Cost and change control",
    description: "Track exposure before it becomes a dispute, with clean ownership and decision history.",
  },
  {
    number: "03",
    title: "Field coordination",
    description: "Keep crews, supers, and office teams aligned around the work happening today.",
  },
  {
    number: "04",
    title: "Executive visibility",
    description: "Translate daily activity into the signals leaders need to protect margin and delivery.",
  },
];

const metrics = [
  { value: "14%", label: "Less time spent chasing updates" },
  { value: "3.2x", label: "Faster decision turnaround" },
  { value: "1", label: "Source for field and office truth" },
  { value: "24/7", label: "Project context when details move" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="home">
        <section className="hero">
          <Reveal className="hero-panel">
            <div>
              <SectionLabel>Construction clarity, always in view.</SectionLabel>
              <h1>Construction management, made clear.</h1>
            </div>
            <div className="hero-copy">
              <p>
                Rebar gives construction teams a calmer way to manage schedules, costs, documents,
                and field decisions before small misses become expensive surprises.
              </p>
              <Button href="#contact">Start a conversation</Button>
            </div>
          </Reveal>
        </section>

        <section className="services-section dark-section" id="platform">
          <Reveal className="section-shell section-grid">
            <div className="section-intro">
              <SectionLabel>What Rebar brings together.</SectionLabel>
              <p>
                Sophisticated enough for complex builds. Simple enough for the daily coordination
                that keeps work moving.
              </p>
            </div>
            <div className="service-list">
              {services.map((service) => (
                <ServiceRow key={service.number} {...service} />
              ))}
            </div>
          </Reveal>
        </section>

        <section className="split-section" id="approach">
          <div className="split-background" aria-hidden="true" />
          <Reveal className="split-copy">
            <SectionLabel>One operating picture.</SectionLabel>
            <h2>Fewer handoffs. Faster answers. Better control.</h2>
          </Reveal>
          <Reveal className="split-detail">
            <p>
              Construction teams do not need another place for information to disappear. Rebar
              connects field reality with office commitments, so every open question has context,
              ownership, and a visible path to resolution.
            </p>
            <Button href="#platform" variant="ghost">
              See the platform
            </Button>
          </Reveal>
        </section>

        <section className="metrics-section" id="proof">
          <Reveal className="section-shell metrics-heading">
            <SectionLabel>Proof in the process.</SectionLabel>
            <h2>Small signals that protect the whole build.</h2>
          </Reveal>
          <Reveal className="section-shell metrics-grid">
            {metrics.map((metric) => (
              <MetricBlock key={metric.label} {...metric} />
            ))}
          </Reveal>
        </section>

        <section className="testimonial-section section-shell">
          <Reveal>
            <SectionLabel>Site leadership</SectionLabel>
            <blockquote>
              Rebar gives our project team the one thing every complex build needs: the current
              truth. Decisions are cleaner, meetings are shorter, and issues stop drifting.
            </blockquote>
            <cite>
              <strong>Elena Marais</strong>
              <span>Director of Delivery, Northline Projects</span>
            </cite>
          </Reveal>
        </section>

        <section className="insights-section section-shell">
          <Reveal className="insights-copy">
            <SectionLabel>Featured insight</SectionLabel>
            <h2>Practical guidance for decisions that move work forward.</h2>
            <Button href="#contact" variant="ghost">
              Talk to Rebar
            </Button>
          </Reveal>
          <Reveal className="insight-stack">
            <article className="insight-minimal">
              <p className="eyebrow">Field note</p>
              <h3>Why the best project meetings start before the meeting.</h3>
              <p>
                A practical look at turning field updates, cost movement, and open decisions into
                executive-ready clarity.
              </p>
              <a href="#contact">Read article</a>
            </article>
          </Reveal>
        </section>

        <section className="contact-section dark-section" id="contact">
          <div className="contact-background" aria-hidden="true" />
          <Reveal className="contact-grid">
            <div>
              <SectionLabel>Contact Rebar</SectionLabel>
              <h2>Every scope, every signal, one clear path.</h2>
              <Button href="mailto:hello@rebar.build">Contact us</Button>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <h2>Hold the whole build in view.</h2>
          <p>Rebar brings construction management into one calm operating picture.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href="#platform">Platform</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
        <p>© 2026 Rebar</p>
      </footer>
    </>
  );
}
