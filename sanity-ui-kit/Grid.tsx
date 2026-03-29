import React from 'react';
import { createAdaptiveComponent, BaseUIProps } from './createAdapter';

export interface GridProps extends BaseUIProps {
  columns?: number | number[];
  gap?: number | number[];
  rows?: number;
}

const GridFallback: React.FC<GridProps> = ({
  children,
  columns = 1,
  gap = 3,
  rows,
  style,
  className,
}) => {
  const cols = typeof columns === 'number' ? columns : (columns[0] ?? 1);
  const gapPx = typeof gap === 'number' ? gap * 4 : ((gap[0] ?? 3) * 4);

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: rows ? `repeat(${rows}, 1fr)` : undefined,
        gap: gapPx,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Grid = createAdaptiveComponent<GridProps>('Grid', GridFallback);
