import React from 'react';

export const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={{
        '--background': '#ffffff',
        '--color': 'rgba(13, 71, 161, 0.1)',
        '--height': '5px',
        '--width': '1px',
        '--fade-stop': '90%',
        '--offset': offset || '150px',
        '--color-dark': 'rgba(13, 71, 161, 0.15)',
        position: 'absolute',
        top: 'calc(var(--offset)/2*-1)',
        height: 'calc(100% + var(--offset))',
        width: 'var(--width)',
        background: 'linear-gradient(to bottom, var(--color), var(--color) 50%, transparent 0, transparent)',
        backgroundSize: 'var(--width) var(--height)',
        mask: 'linear-gradient(to top, var(--background) var(--fade-stop), transparent), linear-gradient(to bottom, var(--background) var(--fade-stop), transparent), linear-gradient(black, black)',
        zIndex: 30
      } as React.CSSProperties}
      className={className}
    ></div>
  );
}; 