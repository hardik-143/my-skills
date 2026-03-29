import React from 'react';
import { Card, Flex, Button, Text } from '../sanity-ui-kit';

export interface ToolbarAction {
  name: string;
  title: string;
  icon?: string;
  shortcut?: string;
  handler: () => void;
}

export interface RichTextToolbarProps {
  actions?: ToolbarAction[];
  disabled?: boolean;
}

const DEFAULT_ACTIONS: ToolbarAction[] = [
  { name: 'bold', title: 'Bold', icon: 'B', shortcut: 'Ctrl+B', handler: () => {} },
  { name: 'italic', title: 'Italic', icon: 'I', shortcut: 'Ctrl+I', handler: () => {} },
  { name: 'underline', title: 'Underline', icon: 'U', shortcut: 'Ctrl+U', handler: () => {} },
  { name: 'link', title: 'Link', icon: '🔗', shortcut: 'Ctrl+K', handler: () => {} },
];

export const RichTextToolbar: React.FC<RichTextToolbarProps> = ({
  actions = DEFAULT_ACTIONS,
  disabled = false,
}) => {
  return (
    <Card padding={2} radius={2} border style={{ backgroundColor: '#fafafa' }}>
      <Flex gap={1} align="center" wrap="wrap">
        {actions.map((action) => (
          <Button
            key={action.name}
            text={action.icon ?? action.title}
            mode="ghost"
            fontSize={0}
            padding={1}
            disabled={disabled}
            onClick={action.handler}
            style={{ minWidth: 32 }}
          />
        ))}
        <div style={{ flex: 1 }} />
        <Text size={0} muted>
          Rich Text Toolbar
        </Text>
      </Flex>
    </Card>
  );
};
