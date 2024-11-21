import { RefreshCw, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import FeedbackScreen from '../shared/FeedbackScreen';
import FileDropzone from '../shared/FileDropzone';

const VerifyFeature: React.FC = () => {
  // const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [token, setToken] = useState<File | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleFileDrop = (files: File[]) => {
    setFile(files[0]);
  };

  const handleTokenDrop = (files: File[]) => {
    setToken(files[0]);
  };

  const handleVerify = () => {
    // Mock verification process
    setIsValid(true);
    setTimestamp(new Date().toISOString());
    setIsComplete(true);
  };

  const handleReset = () => {
    setFile(null);
    setToken(null);
    setIsComplete(false);
    setIsValid(false);
    setTimestamp('');
  };

  if (isComplete) {
    return (
      <FeedbackScreen
        icon={ShieldCheck}
        title="Verification Result"
        message={
          isValid
            ? `File "${file?.name}" was timestamped at ${new Date(
                timestamp
              ).toLocaleString()} and is valid.`
            : `File "${file?.name}" verification failed.`
        }
        status={isValid ? 'success' : 'error'}
        actions={[
          {
            label: 'Verify Another',
            icon: RefreshCw,
            onClick: handleReset
          }
        ]}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <FileDropzone
        file={file}
        onDrop={handleFileDrop}
        onRemove={() => setFile(null)}
        accept={{ 'application/pdf': ['.pdf'], 'application/json': ['.json'] }}
        maxFiles={1}
        label="Drop your file here"
      />

      <FileDropzone
        file={token}
        onDrop={handleTokenDrop}
        onRemove={() => setToken(null)}
        accept={{ 'application/json': ['.json'] }}
        maxFiles={1}
        label="Drop the timestamp token here"
      />

      {file && token && (
        <div className="flex justify-end">
          <button
            onClick={handleVerify}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                     hover:bg-blue-600 transition-colors"
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyFeature;