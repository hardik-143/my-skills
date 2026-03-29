import React from 'react';
import { createAdaptiveComponent, BaseUIProps } from './createAdapter';

export interface FlexProps extends BaseUIProps {
  align?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: number;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
}

const FlexFallback: React.FC<FlexProps> = ({
  children,
  align,
  direction = 'row',
  gap = 0,
  justify,
  wrap,
  style,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: align,
        flexDirection: direction,
        gap: gap * 4,
        justifyContent: justify,
        flexWrap: wrap,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Flex = createAdaptiveComponent<FlexProps>('Flex', FlexFallback);
