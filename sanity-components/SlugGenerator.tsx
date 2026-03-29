import React, { useState, useCallback } from 'react';
import { Card, Stack, Text, Flex, Button } from '../sanity-ui-kit';
import { SanityInputProps } from '../sanity-core/types';
import { set, createPatchEvent } from '../sanity-core/patches';
import { slugify } from '../sanity-core/utils';

export interface SlugValue {
  current?: string;
  _type?: string;
}

export interface SlugGeneratorProps extends SanityInputProps<SlugValue> {
  sourceField?: string;
}

export const SlugGenerator: React.FC<SlugGeneratorProps> = ({
  value = {},
  onChange,
  readOnly,
  sourceField = 'title',
  document,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const slug = value.current ?? '';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSlug = slugify(e.target.value);
      onChange(createPatchEvent(set('current', newSlug)));
    },
    [onChange]
  );

  const handleGenerate = useCallback(() => {
    const source = document?.[sourceField];
    if (typeof source === 'string' && source.length > 0) {
      const newSlug = slugify(source);
      onChange(createPatchEvent(set('current', newSlug)));
    }
  }, [document, sourceField, onChange]);

  return (
    <Card padding={3} radius={2} border>
      <Stack space={3}>
        <Flex justify="space-between" align="center">
          <Text size={1} weight="semibold">Slug</Text>
          <Flex gap={2}>
            <Button
              text="Generate"
              tone="primary"
              mode="ghost"
              onClick={handleGenerate}
              disabled={readOnly}
              fontSize={0}
              padding={2}
            />
            <Button
              text={isEditing ? 'Lock' : 'Edit'}
              mode="ghost"
              onClick={() => setIsEditing(!isEditing)}
              disabled={readOnly}
              fontSize={0}
              padding={2}
            />
          </Flex>
        </Flex>
        <input
          type="text"
          value={slug}
          onChange={handleChange}
          disabled={readOnly || !isEditing}
          placeholder="auto-generated-slug"
          style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: 14,
            border: '1px solid #d1d5db',
            borderRadius: 4,
            fontFamily: 'monospace',
            backgroundColor: isEditing ? '#fff' : '#f9fafb',
            boxSizing: 'border-box' as const,
          }}
        />
        {slug && (
          <Text size={0} muted>
            /{slug}
          </Text>
        )}
      </Stack>
    </Card>
  );
};
