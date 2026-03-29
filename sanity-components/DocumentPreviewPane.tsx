import React, { useState, useMemo } from 'react';
import { Card, Stack, Flex, Text, Button } from '../sanity-ui-kit';

export interface DocumentPreviewPaneProps {
  documentId?: string;
  documentType?: string;
  slug?: string;
  previewUrl?: string;
  urlResolver?: (doc: { id?: string; type?: string; slug?: string }) => string;
}

export const DocumentPreviewPane: React.FC<DocumentPreviewPaneProps> = ({
  documentId,
  documentType,
  slug,
  previewUrl,
  urlResolver,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const resolvedUrl = useMemo(() => {
    if (previewUrl) return previewUrl;
    if (urlResolver) {
      return urlResolver({ id: documentId, type: documentType, slug });
    }
    if (slug) return `/${slug}`;
    return null;
  }, [previewUrl, urlResolver, documentId, documentType, slug]);

  const handleRefresh = () => {
    setIsLoading(true);
    const iframe = document.querySelector('[data-preview-iframe]') as HTMLIFrameElement;
    if (iframe) {
      const src = iframe.src;
      iframe.src = '';
      setTimeout(() => { iframe.src = src; }, 50);
    }
  };

  if (!resolvedUrl) {
    return (
      <Card padding={5} style={{ textAlign: 'center' }}>
        <Stack space={3}>
          <Text size={2} muted>No preview URL available</Text>
          <Text size={1} muted>
            Provide a previewUrl, urlResolver, or slug to enable the preview pane.
          </Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Card padding={0} radius={2} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <Card padding={2} border style={{ borderBottom: '1px solid #e5e7eb' }}>
        <Flex justify="space-between" align="center">
          <Text size={0} muted style={{ fontFamily: 'monospace' }}>
            {resolvedUrl}
          </Text>
          <Flex gap={2}>
            <Button
              text="Refresh"
              mode="ghost"
              fontSize={0}
              padding={1}
              onClick={handleRefresh}
            />
            <Button
              text="Open"
              mode="ghost"
              fontSize={0}
              padding={1}
              onClick={() => window.open(resolvedUrl, '_blank')}
            />
          </Flex>
        </Flex>
      </Card>

      {/* Preview iframe */}
      <div style={{ flex: 1, position: 'relative', minHeight: 400 }}>
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f9fafb',
              zIndex: 1,
            }}
          >
            <Text muted>Loading preview...</Text>
          </div>
        )}
        <iframe
          data-preview-iframe=""
          src={resolvedUrl}
          title="Document Preview"
          onLoad={() => setIsLoading(false)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            minHeight: 400,
          }}
          sandbox="allow-same-origin allow-scripts allow-popups"
        />
      </div>
    </Card>
  );
};
