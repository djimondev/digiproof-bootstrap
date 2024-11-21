import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Archive, Download, RefreshCw } from 'lucide-react';
import FileDropzone from '../shared/FileDropzone';
import FeedbackScreen from '../shared/FeedbackScreen';

const ArchiveFeature: React.FC = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleDrop = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((f) => f !== fileToRemove));
  };

  const handleNext = () => {
    // Mock archive creation
    setTimestamp(new Date().toISOString());
    setIsComplete(true);
  };

  const handleDownload = () => {
    // Mock ASIC archive download
    console.log('Downloading ASIC archive with files:', files.map((f) => f.name));
  };

  const handleReset = () => {
    setFiles([]);
    setIsComplete(false);
    setTimestamp('');
  };

  if (isComplete) {
    return (
      <FeedbackScreen
        icon={Archive}
        title={t('features.archive')}
        message={`${files.length} files have been archived at ${new Date(
          timestamp
        ).toLocaleString()}`}
        actions={[
          {
            label: 'Download Archive',
            icon: Download,
            onClick: handleDownload,
            primary: true
          },
          {
            label: 'Create Another',
            icon: RefreshCw,
            onClick: handleReset
          }
        ]}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <FileDropzone
        files={files}
        onDrop={handleDrop}
        onRemove={handleRemove}
        accept={{
          'application/pdf': ['.pdf'],
          'application/json': ['.json'],
          'text/plain': ['.txt']
        }}
        multiple
      />
      {files.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg 
                     hover:bg-purple-600 transition-colors"
          >
            {t('common.next')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ArchiveFeature;