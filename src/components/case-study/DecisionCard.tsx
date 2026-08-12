type DecisionCardProps = {
  heading: string;
  decisionText: string;
  tradeoffText: string;
};

export function DecisionCard({
  heading,
  decisionText,
  tradeoffText,
}: DecisionCardProps) {
  return (
    <div className="rounded-card border border-line bg-paper p-6.5">
      <h3 className="mb-2 text-[17px] font-bold">{heading}</h3>
      <p className="mb-2 text-[15px] leading-[1.7] opacity-85">
        <strong>Decision:</strong> {decisionText}
      </p>
      <p className="text-[15px] leading-[1.7] opacity-85">
        <strong>Tradeoff:</strong> {tradeoffText}
      </p>
    </div>
  );
}
