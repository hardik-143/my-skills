import React from 'react';
import { Card, Stack, Text, Heading, Flex, Badge } from '../sanity-ui-kit';
import { truncate } from '../sanity-core/utils';

export type PreviewCardVariant = 'blog' | 'product' | 'author' | 'default';

export interface PreviewCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  variant?: PreviewCardVariant;
  status?: string;
  statusTone?: 'default' | 'primary' | 'positive' | 'caution' | 'critical';
  metadata?: Record<string, string>;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  variant = 'default',
  status,
  statusTone = 'default',
  metadata,
}) => {
  return (
    <Card padding={3} radius={2} shadow={1} border>
      <Flex gap={3}>
        {/* Thumbnail */}
        {imageUrl && (
          <div
            style={{
              width: variant === 'author' ? 64 : 80,
              height: variant === 'author' ? 64 : 60,
              borderRadius: variant === 'author' ? '50%' : 4,
              overflow: 'hidden',
              flexShrink: 0,
              backgroundColor: '#f3f4f6',
            }}
          >
            <img
              src={imageUrl}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Content */}
        <Stack space={2} style={{ flex: 1, minWidth: 0 }}>
          <Flex justify="space-between" align="center">
            <Heading size={0} as="h3">{title}</Heading>
            {status && <Badge tone={statusTone}>{status}</Badge>}
          </Flex>

          {subtitle && (
            <Text size={0} muted>{subtitle}</Text>
          )}

          {description && (
            <Text size={0} muted>{truncate(description, 120)}</Text>
          )}

          {/* Variant-specific metadata */}
          {variant === 'product' && metadata?.price && (
            <Text size={1} weight="bold" style={{ color: '#166534' }}>
              {metadata.price}
            </Text>
          )}

          {variant === 'author' && metadata?.role && (
            <Badge tone="primary">{metadata.role}</Badge>
          )}

          {variant === 'blog' && metadata?.date && (
            <Text size={0} muted>{metadata.date}</Text>
          )}
        </Stack>
      </Flex>
    </Card>
  );
};
