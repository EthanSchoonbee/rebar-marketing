type MetricBlockProps = {
  value: string;
  label: string;
};

export default function MetricBlock({ value, label }: MetricBlockProps) {
  return (
    <div className="metric-block">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
