type ServiceRowProps = {
  number: string;
  title: string;
  description: string;
};

export default function ServiceRow({ number, title, description }: ServiceRowProps) {
  return (
    <a className="service-row" href="#contact">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
}
