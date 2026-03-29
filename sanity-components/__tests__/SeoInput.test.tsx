import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SeoInput } from '../SeoInput';

describe('SeoInput', () => {
  const defaultProps = {
    value: { title: '', description: '' },
    onChange: jest.fn(),
    type: { name: 'seo', type: 'object' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and description inputs', () => {
    render(<SeoInput {...defaultProps} />);
    expect(screen.getByPlaceholderText('Enter SEO title...')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter SEO description...')).toBeTruthy();
  });

  it('displays current values', () => {
    render(
      <SeoInput
        {...defaultProps}
        value={{ title: 'My Title', description: 'My Description' }}
      />
    );
    expect((screen.getByPlaceholderText('Enter SEO title...') as HTMLInputElement).value).toBe('My Title');
    expect((screen.getByPlaceholderText('Enter SEO description...') as HTMLTextAreaElement).value).toBe('My Description');
  });

  it('calls onChange when title changes', () => {
    render(<SeoInput {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText('Enter SEO title...'), {
      target: { value: 'New Title' },
    });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('calls onChange when description changes', () => {
    render(<SeoInput {...defaultProps} />);
    fireEvent.change(screen.getByPlaceholderText('Enter SEO description...'), {
      target: { value: 'New Description' },
    });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('displays character counts', () => {
    render(
      <SeoInput
        {...defaultProps}
        value={{ title: 'Hello', description: 'World' }}
      />
    );
    expect(screen.getByText('5/60')).toBeTruthy();
    expect(screen.getByText('5/160')).toBeTruthy();
  });

  it('shows Google-style preview', () => {
    render(
      <SeoInput
        {...defaultProps}
        value={{ title: 'My Page Title', description: 'Page description for search.' }}
      />
    );
    expect(screen.getByText('Search Preview')).toBeTruthy();
    expect(screen.getByText('My Page Title')).toBeTruthy();
  });

  it('disables inputs when readOnly', () => {
    render(<SeoInput {...defaultProps} readOnly />);
    expect((screen.getByPlaceholderText('Enter SEO title...') as HTMLInputElement).disabled).toBe(true);
    expect((screen.getByPlaceholderText('Enter SEO description...') as HTMLTextAreaElement).disabled).toBe(true);
  });
});
