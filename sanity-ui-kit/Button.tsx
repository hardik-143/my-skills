import React from 'react';
import { createAdaptiveComponent, BaseUIProps } from './createAdapter';

export interface ButtonProps extends BaseUIProps {
  text?: string;
  tone?: 'default' | 'primary' | 'positive' | 'caution' | 'critical';
  mode?: 'default' | 'ghost' | 'bleed';
  disabled?: boolean;
  onClick?: () => void;
  fontSize?: number;
  padding?: number;
  icon?: React.ReactNode;
}

const ButtonFallback: React.FC<ButtonProps> = ({
  children,
  text,
  tone = 'default',
  mode = 'default',
  disabled,
  onClick,
  fontSize = 1,
  padding = 3,
  icon,
  style,
  className,
}) => {
  const toneColors: Record<
    string,
    { bg: string; color: string; hoverBg: string }
  > = {
    default: { bg: '#f3f4f6', color: '#1a1a2e', hoverBg: '#e5e7eb' },
    primary: { bg: '#4285f4', color: '#ffffff', hoverBg: '#3367d6' },
    positive: { bg: '#34a853', color: '#ffffff', hoverBg: '#2d8e47' },
    caution: { bg: '#fbbc04', color: '#1a1a2e', hoverBg: '#f0b400' },
    critical: { bg: '#ea4335', color: '#ffffff', hoverBg: '#d93025' },
  };
  const colors = toneColors[tone] || toneColors.default;
  const isGhost = mode === 'ghost' || mode === 'bleed';
  const fontSizes = [12, 14, 16, 18];

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: `${padding * 2}px ${padding * 4}px`,
        fontSize: fontSizes[fontSize] || 14,
        fontWeight: 500,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: isGhost ? 'transparent' : colors.bg,
        color: isGhost ? colors.bg : colors.color,
        border: isGhost ? `1px solid ${colors.bg}` : 'none',
        borderRadius: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color 0.15s ease',
        ...style,
      }}
    >
      {icon}
      {text ?? children}
    </button>
  );
};

export const Button = createAdaptiveComponent<ButtonProps>(
  'Button',
  ButtonFallback
);
