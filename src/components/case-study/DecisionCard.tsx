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
    <div className="rounded-[28px] bg-bg px-7.5 py-6.5 shadow-neu-out">
      <h3 className="mb-3 text-[17px] font-bold">{heading.trim()}</h3>
      <p className="mb-2.5 max-w-190 text-[15px] leading-[1.7]">
        <strong className="text-tertiary">Decision:</strong>{" "}
        <span className="opacity-85">{decisionText}</span>
      </p>
      <p className="max-w-190 text-[15px] leading-[1.7]">
        <strong className="text-tertiary">Tradeoff:</strong>{" "}
        <span className="opacity-85">{tradeoffText}</span>
      </p>
    </div>
  );
}
