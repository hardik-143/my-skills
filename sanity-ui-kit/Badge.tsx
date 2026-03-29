import React from 'react';
import { createAdaptiveComponent, BaseUIProps } from './createAdapter';

export interface BadgeProps extends BaseUIProps {
  tone?: 'default' | 'primary' | 'positive' | 'caution' | 'critical';
  mode?: 'default' | 'outline';
  fontSize?: number;
  padding?: number;
}

const BadgeFallback: React.FC<BadgeProps> = ({
  children,
  tone = 'default',
  mode = 'default',
  fontSize = 0,
  padding = 1,
  style,
  className,
}) => {
  const toneColors: Record<
    string,
    { bg: string; color: string; border: string }
  > = {
    default: { bg: '#f3f4f6', color: '#4b5563', border: '#d1d5db' },
    primary: { bg: '#dbeafe', color: '#1d4ed8', border: '#93c5fd' },
    positive: { bg: '#dcfce7', color: '#166534', border: '#86efac' },
    caution: { bg: '#fef9c3', color: '#854d0e', border: '#fde047' },
    critical: { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
  };
  const colors = toneColors[tone] || toneColors.default;
  const fontSizes = [11, 12, 14];
  const isOutline = mode === 'outline';

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${padding}px ${padding * 4}px`,
        fontSize: fontSizes[fontSize] || 11,
        fontWeight: 600,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: 1.4,
        borderRadius: 999,
        backgroundColor: isOutline ? 'transparent' : colors.bg,
        color: colors.color,
        border: isOutline ? `1px solid ${colors.border}` : 'none',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export const Badge = createAdaptiveComponent<BadgeProps>(
  'Badge',
  BadgeFallback
);
