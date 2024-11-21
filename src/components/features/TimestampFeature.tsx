import { Clock, Download, RefreshCw } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFileProcessor } from '../../hooks/useFileProcessor';
import FeedbackScreen from '../shared/FeedbackScreen';
import FileDropzone from '../shared/FileDropzone';

const TimestampFeature: React.FC = () => {
  const { t } = useTranslation();
  const {
    file,
    isComplete,
    timestamp,
    handleDrop,
    handleNext,
    handleReset
  } = useFileProcessor();

  const handleDownload = () => {
    // Mock token download
    console.log('Downloading token for:', file?.name);
  };

  if (isComplete) {
    return (
      <FeedbackScreen
        icon={Clock}
        title={t('features.timestamp')}
        message={`File "${file?.name}" has been timestamped at ${new Date(timestamp).toLocaleString()}`}
        actions={[
          {
            label: 'Download Token',
            icon: Download,
            onClick: handleDownload,
            primary: true
          },
          {
            label: 'New Timestamp',
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
        file={file}
        onDrop={handleDrop}
        onRemove={() => setFile(null)}
        accept={{ 'application/pdf': ['.pdf'], 'application/json': ['.json'] }}
        maxFiles={1}
      />
      {file && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                     hover:bg-blue-600 transition-colors"
          >
            {t('common.next')}
          </button>
        </div>
      )}
    </div>
  );
};

export default TimestampFeature;