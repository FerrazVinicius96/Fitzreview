import { useState } from 'react';

type AtmosphereImageProps = {
  src: string;
  className?: string;
  alt?: string;
};

/**
 * Foto opcional: se 404, o componente não renderiza.
 * Assim o visual funciona só com CSS até você soltar os JPGs em /public/images.
 */
export function AtmosphereImage({
  src,
  className,
  alt = '',
}: AtmosphereImageProps) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setOk(false)}
    />
  );
}
