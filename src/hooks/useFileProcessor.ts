import { useState } from 'react';

interface FileProcessorState {
  file: File | null;
  isComplete: boolean;
  timestamp: string;
}

interface FileProcessorActions {
  handleDrop: (files: File[]) => void;
  handleNext: () => void;
  handleReset: () => void;
}

export function useFileProcessor(): FileProcessorState & FileProcessorActions {
  const [file, setFile] = useState<File | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [timestamp, setTimestamp] = useState<string>('');

  const handleDrop = (files: File[]) => {
    setFile(files[0]);
  };

  const handleNext = () => {
    setTimestamp(new Date().toISOString());
    setIsComplete(true);
  };

  const handleReset = () => {
    setFile(null);
    setIsComplete(false);
    setTimestamp('');
  };

  return {
    file,
    isComplete,
    timestamp,
    handleDrop,
    handleNext,
    handleReset,
  };
} 