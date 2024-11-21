import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Download, RefreshCw } from 'lucide-react';
import FileDropzone from '../shared/FileDropzone';
import FeedbackScreen from '../shared/FeedbackScreen';

const SealFeature: React.FC = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleDrop = (files: File[]) => {
    setFile(files[0]);
  };

  const handleNext = () => {
    // Mock sealing process
    setTimestamp(new Date().toISOString());
    setIsComplete(true);
  };

  const handleDownload = () => {
    // Mock sealed PDF download
    console.log('Downloading sealed PDF:', file?.name);
  };

  const handleReset = () => {
    setFile(null);
    setIsComplete(false);
    setTimestamp('');
  };

  if (isComplete) {
    return (
      <FeedbackScreen
        icon={ShieldCheck}
        title={t('features.seal')}
        message={`File "${file?.name}" has been sealed at ${new Date(
          timestamp
        ).toLocaleString()}`}
        actions={[
          {
            label: 'Download Sealed PDF',
            icon: Download,
            onClick: handleDownload,
            primary: true
          },
          {
            label: 'Seal Another',
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
        accept={{ 'application/pdf': ['.pdf'] }}
        maxFiles={1}
      />
      {file && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-green-500 text-white rounded-lg 
                     hover:bg-green-600 transition-colors"
          >
            {t('common.next')}
          </button>
        </div>
      )}
    </div>
  );
};

export default SealFeature;