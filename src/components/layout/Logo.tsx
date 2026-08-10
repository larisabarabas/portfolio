import { LOGO_TEXT } from "@/lib/constants";

export function Logo() {
  return (
    <div className="fixed top-[22px] left-[28px] z-50 flex items-baseline gap-0.5 font-serif text-2xl italic text-tertiary">
      {LOGO_TEXT}
      <span className="text-primary">.</span>
    </div>
  );
}
