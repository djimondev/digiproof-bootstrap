import clsx from 'clsx';
import { Upload, X } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

interface FileDropzoneProps {
  file?: File | null;
  files?: File[];
  onDrop: (files: File[]) => void;
  onRemove: (file: File) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  multiple?: boolean;
  label?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  file,
  files,
  onDrop,
  onRemove,
  accept,
  maxFiles = 1,
  multiple = false,
  label
}) => {
  const { t } = useTranslation();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple
  });

  const renderFileList = () => {
    const fileList = files || (file ? [file] : []);
    
    return fileList.map((f) => (
      <div
        key={f.name}
        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
      >
        <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
          {f.name}
        </span>
        <button
          onClick={() => onRemove(f)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={clsx(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {label || t('project.dropzone')}
        </p>
      </div>

      {(file || (files && files.length > 0)) && (
        <div className="space-y-2">{renderFileList()}</div>
      )}
    </div>
  );
};

export default FileDropzone;