
import React, { useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface ImageUploaderProps {
  onFileChange: (file: File | null) => void;
  imageUrl: string | null;
  onSubmit: () => void;
  isLoading: boolean;
  hasFile: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileChange,
  imageUrl,
  onSubmit,
  isLoading,
  hasFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleAreaClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    onFileChange(file);
  }, [onFileChange]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div
        className="w-full md:w-1/2 h-64 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-center p-4 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
        onClick={handleAreaClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
        {imageUrl ? (
          <img src={imageUrl} alt="Handwriting preview" className="max-w-full max-h-full object-contain rounded-md" />
        ) : (
          <div className="text-slate-500">
            <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-2 font-semibold">Click to upload or drag & drop</p>
            <p className="text-xs">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-semibold text-slate-700">Ready to improve your writing?</h2>
          <p className="text-slate-500 mt-2 mb-6">Upload an image of your handwritten text, and I'll provide feedback and corrections.</p>
          <button
            onClick={onSubmit}
            disabled={isLoading || !hasFile}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Analyzing...' : 'Correct My Writing'}
            {!isLoading && <ArrowRightIcon className="h-5 w-5" />}
          </button>
      </div>
    </div>
  );
};
