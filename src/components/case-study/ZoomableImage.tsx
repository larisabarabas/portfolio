"use client";

import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

type ZoomableImageProps = {
  /** The thumbnail, as shown on the page. */
  children: ReactNode;
  /** The large version, loaded only when it's opened. */
  src: string;
  alt: string;
};

const CONTROL_CLASSES =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill bg-bg px-4.5 text-sm font-semibold text-ink transition-colors duration-300 hover:text-primary";

// Wraps a thumbnail in a button that opens the full picture in a native
// <dialog>: the browser handles Escape, focus and the inert page behind it.
// Inside, the picture fits the screen, and a click or the zoom button shows it
// at full size to scroll around. The large file isn't requested until then.
export function ZoomableImage({ children, src, alt }: ZoomableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Stop the page scrolling behind the dialog.
  useEffect(() => {
    if (!open) return;
    const { documentElement } = document;
    const previous = documentElement.style.overflow;
    documentElement.style.overflow = "hidden";
    return () => {
      documentElement.style.overflow = previous;
    };
  }, [open]);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={`Enlarge: ${alt}`}
        className="group relative block w-full cursor-zoom-in rounded-[inherit]"
      >
        {children}
        <span
          aria-hidden="true"
          className="absolute right-2.5 bottom-2.5 flex size-9 items-center justify-center rounded-full bg-bg text-ink transition-colors group-hover:text-primary"
        >
          <Maximize2 className="size-4" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClose={() => {
          setOpen(false);
          setZoomed(false);
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 backdrop:bg-black/80"
      >
        {/* Clicking the dark area around the picture closes it. */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape and the Close button already do this for the keyboard */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop click, same as above */}
        <div
          className="h-full w-full overflow-auto"
          onClick={(event) => {
            // Anything that isn't the picture or a button counts as the
            // dark area, including the wrapper around the picture.
            if (
              event.target instanceof Element &&
              !event.target.closest("img, button")
            ) {
              dialogRef.current?.close();
            }
          }}
        >
          <div className="sticky top-0 z-10 flex justify-end gap-3 p-4 nav:p-6">
            <button
              type="button"
              onClick={() => setZoomed((value) => !value)}
              aria-pressed={zoomed}
              className={CONTROL_CLASSES}
            >
              {zoomed ? (
                <ZoomOut className="size-4" aria-hidden="true" />
              ) : (
                <ZoomIn className="size-4" aria-hidden="true" />
              )}
              {zoomed ? "Fit to screen" : "Zoom in"}
            </button>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className={CONTROL_CLASSES}
            >
              <X className="size-4" aria-hidden="true" />
              Close
            </button>
          </div>
          {open && (
            <div
              className={`flex px-4 pb-6 nav:px-10 ${
                zoomed
                  ? "w-max min-w-full"
                  : "min-h-[calc(100dvh-5.5rem)] items-center justify-center"
              }`}
            >
              {/* A plain <img>: the large file is loaded on demand and shown
                  at its own size, which next/image's fixed frame can't do. */}
              {/* biome-ignore lint/performance/noImgElement: see above */}
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: the Zoom button does this for the keyboard */}
              <img
                src={src}
                alt={alt}
                onClick={() => setZoomed((value) => !value)}
                className={
                  zoomed
                    ? "block max-w-none cursor-zoom-out rounded-[12px]"
                    : "block max-h-[calc(100dvh-5.5rem)] max-w-full cursor-zoom-in rounded-[12px] object-contain"
                }
              />
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
