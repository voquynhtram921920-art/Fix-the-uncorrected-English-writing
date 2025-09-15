
import React from 'react';
import type { CorrectionResult } from '../types';

interface ResultsDisplayProps {
  result: CorrectionResult;
}

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
  </svg>
);

const CorrectedText: React.FC<{ text: string }> = ({ text }) => {
  const formatText = (inputText: string) => {
    // Replace **word** with <strong>word</strong>
    const htmlText = inputText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-600 font-semibold">$1</strong>');
    return { __html: htmlText };
  };

  return <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={formatText(text)} />;
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Feedback Section */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <LightbulbIcon className="h-6 w-6 text-amber-500" />
          Feedback & Suggestions
        </h3>
        <div className="space-y-4">
          {result.corrections.length > 0 ? (
            result.corrections.map((correction, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-700">{correction.type}</p>
                <p className="text-slate-600 mt-1">{correction.explanation}</p>
              </div>
            ))
          ) : (
             <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-700">
                <p className="font-semibold">Excellent Work!</p>
                <p className="mt-1">No major errors were found in your writing.</p>
              </div>
          )}
        </div>
      </div>

      {/* Corrected Version Section */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
          Corrected Version
        </h3>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <CorrectedText text={result.correctedText} />
        </div>
      </div>
    </div>
  );
};
