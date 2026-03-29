import React, { useCallback, useMemo } from 'react';
import { Card, Stack, Text, Heading, Flex, Badge } from '../sanity-ui-kit';
import { SanityInputProps } from '../sanity-core/types';
import { set, createPatchEvent } from '../sanity-core/patches';
import { truncate } from '../sanity-core/utils';

export interface SeoValue {
  title?: string;
  description?: string;
}

export interface SeoInputConfig {
  titleMaxLength?: number;
  descriptionMaxLength?: number;
  siteUrl?: string;
}

const DEFAULT_TITLE_MAX = 60;
const DEFAULT_DESC_MAX = 160;

export interface SeoInputProps extends SanityInputProps<SeoValue> {
  config?: SeoInputConfig;
}

export const SeoInput: React.FC<SeoInputProps> = ({
  value = {},
  onChange,
  readOnly,
  config = {},
}) => {
  const titleMax = config.titleMaxLength ?? DEFAULT_TITLE_MAX;
  const descMax = config.descriptionMaxLength ?? DEFAULT_DESC_MAX;
  const siteUrl = config.siteUrl ?? 'https://example.com';

  const title = value.title ?? '';
  const description = value.description ?? '';

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      onChange(createPatchEvent(set('title', newTitle)));
    },
    [onChange]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newDesc = e.target.value;
      onChange(createPatchEvent(set('description', newDesc)));
    },
    [onChange]
  );

  const titleTone = useMemo(() => {
    if (title.length === 0) return 'default' as const;
    if (title.length > titleMax) return 'critical' as const;
    if (title.length > titleMax * 0.9) return 'caution' as const;
    return 'positive' as const;
  }, [title.length, titleMax]);

  const descTone = useMemo(() => {
    if (description.length === 0) return 'default' as const;
    if (description.length > descMax) return 'critical' as const;
    if (description.length > descMax * 0.9) return 'caution' as const;
    return 'positive' as const;
  }, [description.length, descMax]);

  return (
    <Card padding={4} radius={2} border>
      <Stack space={4}>
        <Heading size={1}>SEO Preview</Heading>

        {/* Title Field */}
        <Stack space={2}>
          <Flex justify="space-between" align="center">
            <Text size={1} weight="semibold">Meta Title</Text>
            <Badge tone={titleTone}>{title.length}/{titleMax}</Badge>
          </Flex>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            disabled={readOnly}
            placeholder="Enter SEO title..."
            maxLength={titleMax + 20}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: 14,
              border: '1px solid #d1d5db',
              borderRadius: 4,
              fontFamily: 'inherit',
              boxSizing: 'border-box' as const,
            }}
          />
        </Stack>

        {/* Description Field */}
        <Stack space={2}>
          <Flex justify="space-between" align="center">
            <Text size={1} weight="semibold">Meta Description</Text>
            <Badge tone={descTone}>{description.length}/{descMax}</Badge>
          </Flex>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            disabled={readOnly}
            placeholder="Enter SEO description..."
            rows={3}
            maxLength={descMax + 40}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: 14,
              border: '1px solid #d1d5db',
              borderRadius: 4,
              fontFamily: 'inherit',
              resize: 'vertical' as const,
              boxSizing: 'border-box' as const,
            }}
          />
        </Stack>

        {/* Google Preview */}
        <Card padding={3} radius={2} tone="transparent" style={{ backgroundColor: '#f8f9fa' }}>
          <Stack space={1}>
            <Text size={0} muted>Search Preview</Text>
            <Text size={1} style={{ color: '#1a0dab', fontWeight: 500 }}>
              {title || 'Page Title'}
            </Text>
            <Text size={0} style={{ color: '#006621' }}>
              {siteUrl}/page-slug
            </Text>
            <Text size={0} muted>
              {description ? truncate(description, descMax) : 'Add a meta description to see how this page will appear in search results.'}
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
};
