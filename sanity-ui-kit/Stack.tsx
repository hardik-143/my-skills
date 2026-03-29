import React from 'react';
import { createAdaptiveComponent, BaseUIProps } from './createAdapter';

export interface StackProps extends BaseUIProps {
  space?: number;
}

const StackFallback: React.FC<StackProps> = ({
  children,
  space = 3,
  style,
  className,
}) => {
  const gapPx = space * 4;
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: gapPx,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Stack = createAdaptiveComponent<StackProps>(
  'Stack',
  StackFallback
);
