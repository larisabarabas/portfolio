import Image from "next/image";

type ImagePlaceholderProps = {
  src?: string;
  alt: string;
  placeholder: string;
  radius?: number;
  aspectRatio?: string;
  sizes?: string;
  /**
   * "cover" (default) crops a plain rectangular photo to fill the box, with
   * a card border + shadow. "contain" is for assets that already carry their
   * own shape/rounding (e.g. an app-icon-style logo export with transparent
   * corners) — it skips the border/shadow/radius chrome so the asset's own
   * shape isn't double-clipped by a mismatched container radius.
   */
  fit?: "cover" | "contain";
  className?: string;
};

export function ImagePlaceholder({
  src,
  alt,
  placeholder,
  radius = 20,
  aspectRatio = "1/1",
  sizes = "100vw",
  fit = "cover",
  className,
}: ImagePlaceholderProps) {
  const style = { aspectRatio, borderRadius: `${radius}px` };

  if (src) {
    if (fit === "contain") {
      return (
        <div className={`relative ${className ?? ""}`} style={{ aspectRatio }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain"
          />
        </div>
      );
    }

    return (
      <div
        className={`relative overflow-hidden border border-line shadow-[0_30px_60px_-30px_rgba(34,20,16,0.35)] ${className ?? ""}`}
        style={style}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={placeholder}
      className={`flex items-center justify-center border border-dashed border-line bg-paper px-4 text-center text-sm text-ink/60 ${className ?? ""}`}
      style={style}
    >
      {placeholder}
    </div>
  );
}
