import React from 'react';
import { createAdaptiveComponent, BaseUIProps } from './createAdapter';

export interface HeadingProps extends BaseUIProps {
  size?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const HeadingFallback: React.FC<HeadingProps> = ({
  children,
  size = 2,
  as: Tag = 'h2',
  style,
  className,
}) => {
  const fontSizes = [14, 18, 24, 32, 40, 48];

  return (
    <Tag
      className={className}
      style={{
        fontSize: fontSizes[size] || 24,
        fontWeight: 700,
        lineHeight: 1.25,
        margin: 0,
        color: '#1a1a2e',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};

export const Heading = createAdaptiveComponent<HeadingProps>(
  'Heading',
  HeadingFallback
);
