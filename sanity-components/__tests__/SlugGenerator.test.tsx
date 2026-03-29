import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SlugGenerator } from '../SlugGenerator';

describe('SlugGenerator', () => {
  const defaultProps = {
    value: { current: '' },
    onChange: jest.fn(),
    type: { name: 'slug', type: 'slug' },
    document: { title: 'Hello World' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the slug input', () => {
    render(<SlugGenerator {...defaultProps} />);
    expect(screen.getByPlaceholderText('auto-generated-slug')).toBeTruthy();
  });

  it('displays current slug value', () => {
    render(
      <SlugGenerator {...defaultProps} value={{ current: 'hello-world' }} />
    );
    expect((screen.getByPlaceholderText('auto-generated-slug') as HTMLInputElement).value).toBe('hello-world');
  });

  it('shows the slug path', () => {
    render(
      <SlugGenerator {...defaultProps} value={{ current: 'hello-world' }} />
    );
    expect(screen.getByText('/hello-world')).toBeTruthy();
  });

  it('generates slug from source field on click', () => {
    render(<SlugGenerator {...defaultProps} />);
    fireEvent.click(screen.getByText('Generate'));
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('has Edit/Lock toggle', () => {
    render(<SlugGenerator {...defaultProps} />);
    expect(screen.getByText('Edit')).toBeTruthy();
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Lock')).toBeTruthy();
  });
});
