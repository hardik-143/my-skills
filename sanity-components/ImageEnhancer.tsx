import React, { useMemo } from 'react';
import { Card, Stack, Text, Flex, Grid, Badge } from '../sanity-ui-kit';
import { SanityInputProps } from '../sanity-core/types';

export interface ImageValue {
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
  caption?: string;
}

export interface ImageEnhancerProps extends SanityInputProps<ImageValue> {
  showMetadata?: boolean;
}

export const ImageEnhancer: React.FC<ImageEnhancerProps> = ({
  value = {},
  readOnly: _readOnly,
  showMetadata = true,
}) => {
  const hasImage = Boolean(value.asset?._ref || value.asset?.url);
  const hasHotspot = Boolean(value.hotspot);
  const hasCrop = Boolean(value.crop);

  const imageUrl = useMemo(() => {
    if (value.asset?.url) return value.asset.url;
    if (value.asset?._ref) {
      const ref = value.asset._ref;
      const parts = ref.replace('image-', '').split('-');
      if (parts.length >= 3) {
        return `https://cdn.sanity.io/images/PROJECT/DATASET/${parts.join('-').replace(/-([^-]+)$/, '.$1')}`;
      }
    }
    return undefined;
  }, [value.asset]);

  return (
    <Card padding={3} radius={2} border>
      <Stack space={3}>
        <Flex justify="space-between" align="center">
          <Text size={1} weight="semibold">Image</Text>
          <Flex gap={2}>
            {hasImage && <Badge tone="positive">Has Image</Badge>}
            {hasHotspot && <Badge tone="primary">Hotspot</Badge>}
            {hasCrop && <Badge tone="caution">Cropped</Badge>}
          </Flex>
        </Flex>

        {/* Preview Area */}
        {hasImage && imageUrl ? (
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxHeight: 300,
              overflow: 'hidden',
              borderRadius: 4,
              backgroundColor: '#f3f4f6',
            }}
          >
            <img
              src={imageUrl}
              alt={value.alt ?? 'Image preview'}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: 300,
                objectFit: 'contain',
                display: 'block',
              }}
            />
            {hasHotspot && value.hotspot && (
              <div
                style={{
                  position: 'absolute',
                  left: `${value.hotspot.x * 100}%`,
                  top: `${value.hotspot.y * 100}%`,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(66, 133, 244, 0.8)',
                  border: '2px solid white',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
          </div>
        ) : (
          <Card padding={5} tone="transparent" style={{ textAlign: 'center', backgroundColor: '#f9fafb' }}>
            <Text muted>No image selected</Text>
          </Card>
        )}

        {/* Metadata */}
        {showMetadata && hasImage && (
          <Grid columns={2} gap={2}>
            {value.alt !== undefined && (
              <Card padding={2} tone="transparent">
                <Stack space={1}>
                  <Text size={0} weight="semibold">Alt Text</Text>
                  <Text size={0} muted>{value.alt || 'Not set'}</Text>
                </Stack>
              </Card>
            )}
            {value.caption !== undefined && (
              <Card padding={2} tone="transparent">
                <Stack space={1}>
                  <Text size={0} weight="semibold">Caption</Text>
                  <Text size={0} muted>{value.caption || 'Not set'}</Text>
                </Stack>
              </Card>
            )}
          </Grid>
        )}
      </Stack>
    </Card>
  );
};
