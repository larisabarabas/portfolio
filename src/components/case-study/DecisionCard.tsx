import { CASE_STUDY } from "@/lib/constants";

type DecisionCardProps = {
  heading: string;
  decisionText: string;
  tradeoffText: string;
};

const LABEL_CLASSES = "mb-1.5 text-[13px] font-semibold text-tertiary";
const TEXT_CLASSES = "text-[15.5px] leading-[1.7] opacity-90";

// One row, three columns on wide screens (title, decision, trade-off), sized
// to the usual text lengths so the card has no empty end. Stacked on phones.
export function DecisionCard({
  heading,
  decisionText,
  tradeoffText,
}: DecisionCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-[24px] bg-bg px-5.5 py-5.5 shadow-neu-out lg:flex-row lg:gap-10 lg:rounded-[28px] lg:px-9 lg:py-7.5">
      <h3 className="text-[16.5px] leading-[1.35] font-bold lg:flex-[1_1_200px] lg:text-[19px]">
        {heading.trim()}
      </h3>
      <div className="min-w-0 lg:flex-[1.1_1_260px]">
        <p className={LABEL_CLASSES}>{CASE_STUDY.decisionLabel}</p>
        <p className={TEXT_CLASSES}>{decisionText}</p>
      </div>
      <div className="min-w-0 lg:flex-[1.8_1_340px]">
        <p className={LABEL_CLASSES}>{CASE_STUDY.tradeoffLabel}</p>
        <p className={TEXT_CLASSES}>{tradeoffText}</p>
      </div>
    </div>
  );
}
