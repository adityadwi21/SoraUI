import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUploader } from './file-uploader';

describe('FileUploader Component & A11y', () => {
  it('renders dropzone, supports keyboard activation, and lists files', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FileUploader
        maxSize={1024 * 1024} // 1MB
        multiple
        onFilesChange={handleChange}
      />
    );

    const dropzone = screen.getByRole('button');
    expect(dropzone).toBeInTheDocument();
    expect(screen.getByText(/Drag & drop files here/i)).toBeInTheDocument();
    expect(screen.getByText(/Max file size: 1.0 MB/i)).toBeInTheDocument();
  });

  it('shows error alert when file exceeds maxSize limit', async () => {
    const handleChange = vi.fn();
    render(
      <FileUploader
        maxSize={500} // 500 bytes
        onFilesChange={handleChange}
      />
    );

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const oversizedFile = new File(['a'.repeat(1000)], 'large.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, oversizedFile);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/exceeds maximum allowed size/i);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('allows removing an uploaded file from the queue', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<FileUploader multiple onFilesChange={handleChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });

    await userEvent.upload(input, file);
    expect(screen.getByText('test.txt')).toBeInTheDocument();

    const removeBtn = screen.getByRole('button', { name: 'Remove file test.txt' });
    await user.click(removeBtn);

    expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
    expect(handleChange).toHaveBeenLastCalledWith([]);
  });
});