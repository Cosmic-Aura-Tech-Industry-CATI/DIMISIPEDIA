import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
  phaseNumber?: string;
  title?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
      else if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
    >
      {/* Top Bar */}
      <div className="flex w-full max-w-6xl items-center justify-between border-b border-white/10 pb-3 text-white">
        <div className="flex items-center gap-3">
          {currentImage.phaseNumber ? (
            <span className="font-mono text-xs uppercase tracking-wider text-primary border border-primary/40 px-2.5 py-0.5">
              Phase {currentImage.phaseNumber}
            </span>
          ) : null}
          <span className="font-mono text-xs text-white/70">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomed(!zoomed)}
            className="p-2 text-white/80 transition-colors hover:text-white cursor-pointer"
            title={zoomed ? "Zoom out" : "Zoom in"}
          >
            {zoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white/80 transition-colors hover:text-white cursor-pointer"
            title="Close (Esc)"
          >
            <X className="size-6" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative flex flex-1 w-full max-w-6xl items-center justify-center overflow-hidden py-4">
        {/* Previous Button */}
        {images.length > 1 ? (
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white/80 transition-all hover:bg-white hover:text-black cursor-pointer z-10"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="size-6" />
          </button>
        ) : null}

        {/* Image */}
        <div
          className={`transition-transform duration-300 max-h-[75vh] flex items-center justify-center ${
            zoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={() => setZoomed(!zoomed)}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[75vh] max-w-full object-contain shadow-2xl border border-white/10"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 ? (
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white/80 transition-all hover:bg-white hover:text-black cursor-pointer z-10"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="size-6" />
          </button>
        ) : null}
      </div>

      {/* Caption Footer */}
      <div className="w-full max-w-4xl border-t border-white/10 pt-3 text-center text-white/90">
        <p className="font-mono text-xs text-white/60">{currentImage.alt}</p>
        <p className="mt-1 font-serif text-sm text-white/90">{currentImage.caption}</p>
      </div>
    </div>
  );
}
