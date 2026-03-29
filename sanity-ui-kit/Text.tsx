import React from 'react';
import { createAdaptiveComponent, BaseUIProps } from './createAdapter';

export interface TextProps extends BaseUIProps {
  size?: number;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  muted?: boolean;
  accent?: boolean;
  align?: 'left' | 'center' | 'right';
}

const TextFallback: React.FC<TextProps> = ({
  children,
  size = 1,
  weight = 'regular',
  muted,
  accent,
  align,
  style,
  className,
}) => {
  const fontSizes = [12, 14, 16, 18, 21, 24];
  const fontWeights = { regular: 400, medium: 500, semibold: 600, bold: 700 };

  return (
    <span
      className={className}
      style={{
        fontSize: fontSizes[size] || 14,
        fontWeight: fontWeights[weight],
        color: muted ? '#6b7280' : accent ? '#4285f4' : '#1a1a2e',
        textAlign: align,
        lineHeight: 1.5,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export const Text = createAdaptiveComponent<TextProps>('Text', TextFallback);
