import {
  useState,
  useRef,
  useCallback,
  forwardRef,
  type DragEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import type { FileUploaderProps, UploadedFile } from './file-uploader.types';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function cx(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      accept,
      maxSize,
      multiple = false,
      onFilesChange,
      promptText = 'Drag & drop files here or click to browse',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleProcessFiles = useCallback(
      (incoming: FileList | null) => {
        if (!incoming || incoming.length === 0) return;
        setErrorMessage(null);

        const newFiles: UploadedFile[] = [];

        for (let i = 0; i < incoming.length; i++) {
          const file = incoming.item(i);
          if (!file) continue;

          if (maxSize && file.size > maxSize) {
            setErrorMessage(`File "${file.name}" exceeds maximum allowed size (${formatFileSize(maxSize)}).`);
            continue;
          }

          newFiles.push({
            id: `${file.name}-${file.lastModified}-${Math.random()}`,
            file,
            name: file.name,
            size: file.size,
          });

          if (!multiple) break;
        }

        if (newFiles.length === 0) return;

        const updated = multiple ? [...files, ...newFiles] : newFiles;
        setFiles(updated);
        onFilesChange?.(updated.map((f) => f.file));
      },
      [files, maxSize, multiple, onFilesChange]
    );

    const handleRemoveFile = (id: string) => {
      const updated = files.filter((f) => f.id !== id);
      setFiles(updated);
      onFilesChange?.(updated.map((f) => f.file));
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      handleProcessFiles(e.dataTransfer.files);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleProcessFiles(e.target.files);
      if (inputRef.current) inputRef.current.value = '';
    };

    const handleClick = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div ref={ref} className={cx('sora-file-uploader', className)} {...props}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="sora-file-uploader__input"
          tabIndex={-1}
          aria-hidden="true"
          aria-label="File upload"
        />
        <div
          role="button"
          tabIndex={disabled ? undefined : 0}
          aria-disabled={disabled || undefined}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cx(
            'sora-file-uploader__dropzone',
            isDragging && 'sora-file-uploader__dropzone--dragging',
            disabled && 'sora-file-uploader__dropzone--disabled'
          )}
        >

          <div className="sora-file-uploader__icon" aria-hidden="true">
            📁
          </div>
          <div className="sora-file-uploader__prompt">{promptText}</div>
          {maxSize && (
            <div className="sora-file-uploader__hint">
              Max file size: {formatFileSize(maxSize)}
            </div>
          )}
        </div>

        {errorMessage && (
          <div role="alert" className="sora-file-uploader__error">
            {errorMessage}
          </div>
        )}

        {files.length > 0 && (
          <ul className="sora-file-uploader__list" aria-label="Uploaded files">
            {files.map((item) => (
              <li key={item.id} className="sora-file-uploader__item">
                <span className="sora-file-uploader__item-name">{item.name}</span>
                <span className="sora-file-uploader__item-size">
                  {formatFileSize(item.size)}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(item.id)}
                  aria-label={`Remove file ${item.name}`}
                  className="sora-file-uploader__remove-btn"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
FileUploader.displayName = 'FileUploader';