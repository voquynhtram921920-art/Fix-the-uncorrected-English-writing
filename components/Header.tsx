
import React from 'react';

const PenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center space-x-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
           <PenIcon className="text-white h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">
          Handwriting English Corrector
        </h1>
      </div>
    </header>
  );
};
