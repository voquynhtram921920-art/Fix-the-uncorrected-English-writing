
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { getWritingCorrection } from './services/geminiService';
import type { CorrectionResult } from './types';
import { WelcomeMessage } from './components/WelcomeMessage';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<CorrectionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    } else {
      setImageFile(null);
      setImageUrl(null);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const correctionResult = await getWritingCorrection(imageFile);
      setResult(correctionResult);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8">
          <ImageUploader
            onFileChange={handleFileChange}
            imageUrl={imageUrl}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            hasFile={!!imageFile}
          />

          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {result && !isLoading && <ResultsDisplay result={result} />}

          {!result && !isLoading && !error && <WelcomeMessage />}
        </div>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
