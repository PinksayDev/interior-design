/* eslint-disable @next/next/no-img-element -- admin thumbnails of arbitrary pasted URLs */
export function Thumb({ src, className = "h-12 w-16" }) {
  return (
    <span className={`block shrink-0 overflow-hidden rounded-lg bg-sand ${className}`}>
      {src && <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />}
    </span>
  );
}
