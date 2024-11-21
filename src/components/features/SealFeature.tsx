import { Download, RefreshCw, ShieldCheck } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFileProcessor } from "../../hooks/useFileProcessor";
import FeedbackScreen from "../shared/FeedbackScreen";
import FileDropzone from "../shared/FileDropzone";

const SealFeature: React.FC = () => {
    const { t } = useTranslation();
    const { file, isComplete, timestamp, handleDrop, handleNext, handleReset } = useFileProcessor();

    const handleDownload = () => {
        // Mock sealed PDF download
        console.log("Downloading sealed PDF:", file?.name);
    };

    if (isComplete) {
        return (
            <FeedbackScreen
                icon={ShieldCheck}
                title={t("features.seal")}
                message={`File "${file?.name}" has been sealed at ${new Date(timestamp).toLocaleString()}`}
                actions={[
                    {
                        label: "Download Sealed PDF",
                        icon: Download,
                        onClick: handleDownload,
                        primary: true
                    },
                    {
                        label: "Seal Another",
                        icon: RefreshCw,
                        onClick: handleReset
                    }
                ]}
            />
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <FileDropzone file={file} onDrop={handleDrop} onRemove={() => setFile(null)} accept={{ "application/pdf": [".pdf"] }} maxFiles={1} />
            {file && (
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg 
                     hover:bg-green-600 transition-colors"
                    >
                        {t("common.next")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SealFeature;
