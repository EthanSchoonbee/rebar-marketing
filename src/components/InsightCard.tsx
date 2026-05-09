import SectionLabel from "./SectionLabel";

export default function InsightCard() {
  return (
    <article className="insight-card">
      <SectionLabel>Field note</SectionLabel>
      <h3>Why the best project meetings start before the meeting.</h3>
      <p>
        A practical look at turning field updates, cost movement, and open decisions into
        executive-ready clarity.
      </p>
      <a href="#contact">Read article</a>
    </article>
  );
}
