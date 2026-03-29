import React from 'react';
import { createAdaptiveComponent, BaseUIProps } from './createAdapter';

export interface CardProps extends BaseUIProps {
  padding?: number | number[];
  radius?: number;
  shadow?: number;
  tone?:
    | 'default'
    | 'primary'
    | 'positive'
    | 'caution'
    | 'critical'
    | 'transparent';
  border?: boolean;
}

const CardFallback: React.FC<CardProps> = ({
  children,
  padding = 3,
  radius = 2,
  shadow = 0,
  tone = 'default',
  border,
  style,
  className,
}) => {
  const paddingPx = typeof padding === 'number' ? padding * 4 : 12;
  const borderRadiusPx = radius * 4;
  const toneColors: Record<string, { bg: string; border: string }> = {
    default: { bg: '#ffffff', border: '#e0e0e0' },
    primary: { bg: '#e8f0fe', border: '#4285f4' },
    positive: { bg: '#e6f4ea', border: '#34a853' },
    caution: { bg: '#fef7e0', border: '#fbbc04' },
    critical: { bg: '#fce8e6', border: '#ea4335' },
    transparent: { bg: 'transparent', border: 'transparent' },
  };
  const colors = toneColors[tone] || toneColors.default;

  return (
    <div
      className={className}
      style={{
        padding: paddingPx,
        borderRadius: borderRadiusPx,
        backgroundColor: colors.bg,
        border: border ? `1px solid ${colors.border}` : 'none',
        boxShadow:
          shadow > 0
            ? `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.1)`
            : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Card = createAdaptiveComponent<CardProps>('Card', CardFallback);
