
import React from 'react';

const Step: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {number}
        </div>
        <div>
            <h4 className="font-semibold text-slate-700">{title}</h4>
            <p className="text-slate-500">{description}</p>
        </div>
    </div>
);


export const WelcomeMessage: React.FC = () => {
    return (
        <div className="border-t border-slate-200 pt-8 mt-8">
            <h3 className="text-lg font-bold text-center text-slate-800 mb-6">How It Works</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <Step 
                    number={1} 
                    title="Upload Your Handwriting" 
                    description="Take a clear photo of a short English paragraph you've written and upload it using the panel above."
                />
                 <Step 
                    number={2} 
                    title="Get Instant Feedback" 
                    description="Our AI will analyze your text for errors in grammar, spelling, and word choice, providing helpful explanations."
                />
                 <Step 
                    number={3} 
                    title="Review Your Correction" 
                    description="See a polished version of your text with all the corrections clearly marked in bold."
                />
                 <Step 
                    number={4} 
                    title="Improve Your Skills" 
                    description="Use the feedback to understand your common mistakes and become a more confident writer."
                />
            </div>
        </div>
    );
};
